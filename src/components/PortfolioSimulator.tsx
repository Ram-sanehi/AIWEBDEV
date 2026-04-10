import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calculator, Plus, Trash2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { savePortfolioSimulation, getPortfolioSimulations } from "@/api/portfolio";

// Reuse the same stock list already in StockTicker so we always have a price source
const AVAILABLE_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2890.50 },
  { symbol: "TCS", name: "Tata Consultancy", price: 4120.75 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1945.80 },
  { symbol: "INFY", name: "Infosys Limited", price: 1678.35 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1234.20 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1456.90 },
  { symbol: "SBIN", name: "State Bank of India", price: 845.30 },
  { symbol: "WIPRO", name: "Wipro Limited", price: 685.45 },
  { symbol: "SENSEX", name: "BSE Sensex", price: 77234.56 },
  { symbol: "NIFTY", name: "Nifty 50", price: 23456.45 },
];

interface SimResult {
  id?: string;
  stockSymbol: string;
  stockName: string;
  amountInvested: number;
  buyDate: string;
  buyPrice: number;
  currentPrice: number;
  profitLoss: number;
  profitLossPct: number;
}

interface ChartData {
  name: string;
  Invested: number;
  "Current Value": number;
}

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PortfolioSimulator() {
  const [symbol, setSymbol] = useState(AVAILABLE_STOCKS[0].symbol);
  const [amount, setAmount] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [result, setResult] = useState<SimResult | null>(null);
  const [history, setHistory] = useState<SimResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Pre-fill current price when stock is selected
  useEffect(() => {
    const stock = AVAILABLE_STOCKS.find((s) => s.symbol === symbol);
    if (stock) setBuyPrice(stock.price.toString());
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getPortfolioSimulations(5);
      setHistory(
        data.map((r) => ({
          id: r.id,
          stockSymbol: r.stock_symbol,
          stockName: r.stock_name,
          amountInvested: Number(r.amount_invested),
          buyDate: r.buy_date,
          buyPrice: Number(r.buy_price),
          currentPrice: Number(r.current_price),
          profitLoss: Number(r.profit_loss),
          profitLossPct: Number(r.profit_loss_pct),
        }))
      );
    } catch (error) {
      const local = localStorage.getItem("portfolio_history");
      if (local) setHistory(JSON.parse(local));
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !buyDate || !buyPrice) {
      toast.error("Please fill in all fields.");
      return;
    }

    const stock = AVAILABLE_STOCKS.find((s) => s.symbol === symbol)!;
    const invested = parseFloat(amount);
    const bp = parseFloat(buyPrice);
    if (isNaN(invested) || isNaN(bp) || invested <= 0 || bp <= 0) {
      toast.error("Please enter valid amounts.");
      return;
    }

    const units = invested / bp;
    const currentValue = units * stock.price;
    const pl = currentValue - invested;
    const plPct = (pl / invested) * 100;

    const sim: SimResult = {
      id: Date.now().toString(),
      stockSymbol: symbol,
      stockName: stock.name,
      amountInvested: invested,
      buyDate,
      buyPrice: bp,
      currentPrice: stock.price,
      profitLoss: pl,
      profitLossPct: plPct,
    };

    setResult(sim);
    setLoading(true);

    try {
      await savePortfolioSimulation({
        stock_symbol: sim.stockSymbol,
        stock_name: sim.stockName,
        amount_invested: sim.amountInvested,
        buy_date: sim.buyDate,
        buy_price: sim.buyPrice,
        current_price: sim.currentPrice,
        profit_loss: sim.profitLoss,
        profit_loss_pct: sim.profitLossPct,
      });
      toast.success("Simulation saved!");
      fetchHistory();
    } catch (error) {
      const local = localStorage.getItem("portfolio_history");
      const h = local ? JSON.parse(local) : [];
      h.unshift(sim);
      localStorage.setItem("portfolio_history", JSON.stringify(h.slice(0, 5)));
      toast.error("Failed to save to database. Saved locally instead.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? [
      { name: "Initial", value: result.amountInvested },
      { name: "Current", value: result.amountInvested + result.profitLoss }
    ]
    : [];

  const isProfit = result && result.profitLoss >= 0;

  return (
    <section className="py-12 lg:py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900" id="portfolio-simulator">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
            <Calculator className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Portfolio Simulator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Simulate Your <span className="text-yellow-400">Investment</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Enter a stock, your investment amount, and the date you bought—see your profit/loss at a glance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
          >
            <form onSubmit={handleSimulate} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Stock</label>
                <select
                  value={symbol}
                  onChange={(e) => {
                    setSymbol(e.target.value);
                    const st = AVAILABLE_STOCKS.find((s) => s.symbol === e.target.value);
                    if (st) setBuyPrice(st.price.toString());
                  }}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                >
                  {AVAILABLE_STOCKS.map((s) => (
                    <option key={s.symbol} value={s.symbol}>
                      {s.symbol} – {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Amount Invested (₹)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Buy Date</label>
                <input
                  type="date"
                  value={buyDate}
                  onChange={(e) => setBuyDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Buy Price per Unit (₹)</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Price at which you bought"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {loading ? "Saving..." : "Simulate Now"}
              </button>
            </form>
          </motion.div>

          {/* Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {result ? (
              <>
                {/* Result Card */}
                <div className={`rounded-2xl p-6 border ${isProfit ? "bg-emerald-900/30 border-emerald-700/50" : "bg-red-900/30 border-red-700/50"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {isProfit ? <TrendingUp className="h-6 w-6 text-emerald-400" /> : <TrendingDown className="h-6 w-6 text-red-400" />}
                    <span className={`text-lg font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                      {isProfit ? "Profit" : "Loss"} – {result.stockSymbol}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-slate-400 text-xs mb-1">Invested</p>
                      <p className="text-white font-semibold">{fmt(result.amountInvested)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-slate-400 text-xs mb-1">Current Value</p>
                      <p className="text-white font-semibold">{fmt(result.amountInvested + result.profitLoss)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 col-span-2">
                      <p className="text-slate-400 text-xs mb-1">Profit / Loss</p>
                      <p className={`text-xl font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                        {result.profitLoss >= 0 ? "+" : ""}{fmt(result.profitLoss)} ({result.profitLossPct.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                  <p className="text-slate-300 text-sm font-medium mb-6 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    Growth Projection
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isProfit ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={isProfit ? "#10b981" : "#ef4444"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '12px',
                          color: '#f8fafc'
                        }}
                        formatter={(value: number) => [fmt(value), "Value"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={isProfit ? "#10b981" : "#ef4444"}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
                <Calculator className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-slate-500 text-sm">Fill in the form and click <span className="text-yellow-400 font-medium">Simulate Now</span> to see your result here.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* History Table */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-700">
              <h3 className="text-white font-semibold">Recent Simulations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs border-b border-slate-700">
                    <th className="text-left px-6 py-3 font-medium">Stock</th>
                    <th className="text-right px-4 py-3 font-medium">Invested</th>
                    <th className="text-right px-4 py-3 font-medium">P/L</th>
                    <th className="text-right px-4 py-3 font-medium">Return %</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={h.id ?? i} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-3 text-white font-medium">{h.stockSymbol}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{fmt(h.amountInvested)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${h.profitLoss >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {h.profitLoss >= 0 ? "+" : ""}{fmt(h.profitLoss)}
                      </td>
                      <td className={`px-4 py-3 text-right font-semibold ${h.profitLossPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {h.profitLossPct >= 0 ? "+" : ""}{h.profitLossPct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
