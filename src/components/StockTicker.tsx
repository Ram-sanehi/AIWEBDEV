import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetchAllStocks } from "@/api/stocks";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Check if Indian market is currently open (9:15 AM to 3:30 PM IST, Monday-Friday)
function isIndianMarketOpen(): boolean {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  const dayOfWeek = istTime.getDay();
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  
  // Market is closed on weekends (0 = Sunday, 6 = Saturday)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }
  
  // Market hours: 9:15 AM (555 minutes) to 3:30 PM (930 minutes)
  const marketOpenMinutes = 9 * 60 + 15; // 9:15 AM
  const marketCloseMinutes = 15 * 60 + 30; // 3:30 PM
  
  return totalMinutes >= marketOpenMinutes && totalMinutes <= marketCloseMinutes;
}

export function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketOpen, setMarketOpen] = useState(isIndianMarketOpen());
  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch stocks from API
  const loadStocks = async () => {
    try {
      const data = await fetchAllStocks();
      setStocks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading stocks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadStocks();

    // Check market status every minute
    const marketStatusInterval = setInterval(() => {
      setMarketOpen(isIndianMarketOpen());
    }, 60000);

    // Update stock prices every 30 seconds
    updateIntervalRef.current = setInterval(() => {
      loadStocks();
    }, 30000);

    return () => {
      clearInterval(marketStatusInterval);
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 overflow-hidden py-3 shadow-2xl z-40">
      {loading && (
        <div className="px-6 text-slate-400 text-sm">Loading market data...</div>
      )}
      {!loading && stocks.length > 0 && (
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          style={{
            width: "fit-content",
            animation: "scroll-left 40s linear infinite",
          }}
        >
          {/* Duplicate stocks for seamless loop */}
          {[...stocks, ...stocks].map((stock, index) => (
            <div key={`${stock.symbol}-${index}`} className="flex items-center gap-3 px-6 min-w-max">
              <span className="font-bold text-white text-sm min-w-fit">{stock.symbol}</span>
              <span className="text-slate-300 text-sm min-w-fit">₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span
                className={`flex items-center gap-1 text-xs font-semibold min-w-fit ${
                  stock.change >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stock.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          ))}
        </motion.div>
      )}
      {!loading && stocks.length === 0 && (
        <div className="px-6 text-slate-400 text-sm">No stock data available</div>
      )}
      
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
