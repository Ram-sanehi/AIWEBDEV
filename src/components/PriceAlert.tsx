import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bell, BellRing, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { createPriceAlert, getPriceAlerts } from "@/api/priceAlert";

const STOCKS = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2890.50 },
    { symbol: "TCS", name: "Tata Consultancy", price: 4120.75 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1945.80 },
    { symbol: "INFY", name: "Infosys Limited", price: 1678.35 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1234.20 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1456.90 },
    { symbol: "SBIN", name: "State Bank of India", price: 845.30 },
    { symbol: "WIPRO", name: "Wipro Limited", price: 685.45 },
];

interface Alert {
    id: string;
    stockSymbol: string;
    stockName: string;
    targetPrice: number;
    alertType: "above" | "below";
    alertEmail: string;
    triggered: boolean;
}

const fmt = (n: number) =>
    "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PriceAlert() {
    const [symbol, setSymbol] = useState(STOCKS[0].symbol);
    const [targetPrice, setTarget] = useState("");
    const [alertType, setAlertType] = useState<"above" | "below">("above");
    const [email, setEmail] = useState("");
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchAlerts = async () => {
        try {
            const data = await getPriceAlerts();
            setAlerts(
                data.map((a) => ({
                    id: a.id,
                    stockSymbol: a.stock_symbol,
                    stockName: a.stock_name,
                    targetPrice: Number(a.target_price),
                    alertType: a.alert_type as "above" | "below",
                    alertEmail: a.alert_email,
                    triggered: a.triggered,
                }))
            );
        } catch (error) {
            const local = localStorage.getItem("price_alerts");
            if (local) setAlerts(JSON.parse(local));
        }
    };

    // Check alerts against current prices every 30 seconds
    useEffect(() => {
        fetchAlerts();

        intervalRef.current = setInterval(async () => {
            let activeAlerts: Alert[] = [];
            try {
                const data = await getPriceAlerts();
                activeAlerts = data.map((a) => ({
                    id: a.id,
                    stockSymbol: a.stock_symbol,
                    stockName: a.stock_name,
                    targetPrice: Number(a.target_price),
                    alertType: a.alert_type as "above" | "below",
                    alertEmail: a.alert_email,
                    triggered: a.triggered,
                }));
            } catch (error) {
                const local = localStorage.getItem("price_alerts");
                if (local) {
                    activeAlerts = JSON.parse(local);
                }
            }

            for (const alertInfo of activeAlerts) {
                const stock = STOCKS.find((s) => s.symbol === alertInfo.stockSymbol);
                if (!stock) continue;

                const shouldFire =
                    (alertInfo.alertType === "above" && stock.price >= alertInfo.targetPrice) ||
                    (alertInfo.alertType === "below" && stock.price <= alertInfo.targetPrice);

                if (shouldFire) {
                    toast(`🔔 Price Alert: ${alertInfo.stockSymbol} has crossed ${fmt(alertInfo.targetPrice)}!`, {
                        description: `Current price: ${fmt(stock.price)}. Notification ready.`,
                        duration: 8000,
                    });
                }
            }

            // Refresh UI list
            fetchAlerts();
        }, 30000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetPrice || !email) {
            toast.error("Please fill in all fields.");
            return;
        }

        const stock = STOCKS.find((s) => s.symbol === symbol)!;
        setLoading(true);

        try {
            await createPriceAlert({
                stock_symbol: symbol,
                stock_name: stock.name,
                target_price: parseFloat(targetPrice),
                alert_type: alertType,
                alert_email: email,
            });
            toast.success(`Alert set! You'll be notified when ${symbol} goes ${alertType} ${fmt(parseFloat(targetPrice))}.`);
            fetchAlerts();
        } catch (error) {
            toast.error("Failed to save alert. Please try again.");
        } finally {
            setLoading(false);
            setTarget("");
        }
    };

    return (
        <section className="py-12 lg:py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950" id="price-alerts">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
                        <BellRing className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Smart Alerts</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Set a <span className="text-yellow-400">Price Alert</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Get instantly notified (on this page) when your stock hits your target price. We check every 30 seconds.
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Stock</label>
                                <select
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                                >
                                    {STOCKS.map((s) => (
                                        <option key={s.symbol} value={s.symbol}>
                                            {s.symbol} – Current: {fmt(s.price)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Alert When Price Goes</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(["above", "below"] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setAlertType(t)}
                                            className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${alertType === t
                                                ? "bg-yellow-500 border-yellow-500 text-slate-900"
                                                : "bg-slate-900 border-slate-600 text-slate-300 hover:border-yellow-500/50"
                                                }`}
                                        >
                                            {t === "above" ? "↑ Above" : "↓ Below"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Target Price (₹)</label>
                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="e.g. 3000"
                                    value={targetPrice}
                                    onChange={(e) => setTarget(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1.5 font-medium">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                <Bell className="h-4 w-4" />
                                {loading ? "Setting..." : "Set Alert"}
                            </button>
                        </form>
                    </motion.div>

                    {/* Active Alerts */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6"
                    >
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Bell className="h-4 w-4 text-yellow-400" />
                            Active Alerts
                            <span className="ml-auto text-xs text-slate-500">Checked every 30s</span>
                        </h3>

                        {alerts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-center">
                                <AlertTriangle className="h-8 w-8 text-slate-600 mb-2" />
                                <p className="text-slate-500 text-sm">No active alerts yet. Set one on the left!</p>
                            </div>
                        ) : (
                            <ul className="space-y-2">
                                {alerts.map((a) => (
                                    <li
                                        key={a.id}
                                        className="bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 flex items-center justify-between gap-2"
                                    >
                                        <div>
                                            <p className="text-white text-sm font-semibold">{a.stockSymbol}</p>
                                            <p className="text-slate-400 text-xs">
                                                {a.alertType === "above" ? "↑ Above" : "↓ Below"} {fmt(a.targetPrice)}
                                            </p>
                                        </div>
                                        <CheckCircle2 className="h-4 w-4 text-yellow-400 shrink-0" />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
