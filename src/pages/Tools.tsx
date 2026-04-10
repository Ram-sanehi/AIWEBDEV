import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PortfolioSimulator } from "@/components/PortfolioSimulator";
import { PriceAlert } from "@/components/PriceAlert";
import { InvestmentSuggestion } from "@/components/InvestmentSuggestion";
import { RiskAnalyzer } from "@/components/RiskAnalyzer";
import { SIPCalculator } from "@/components/SIPCalculator";
import { SEO } from "@/components/SEO";
import { StockTicker } from "@/components/StockTicker";
import { motion } from "framer-motion";
import { Calculator, Bell, Lightbulb, Activity } from "lucide-react";

export default function Tools() {
    return (
        <div className="min-h-screen bg-slate-950">
            <SEO
                title="Financial Tools"
                description="Use our professional financial tools including SIP Calculator, Portfolio Simulator, and Risk Analyzer to plan your investments."
            />
            <Navbar />

            {/* Hero */}
            <section className="pt-28 pb-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-5">
                        <Calculator className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Free Investment Tools</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Smart <span className="text-yellow-400">Tools</span> for Smart Investors
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Use our free portfolio simulator, smart alerts, investment suggestions, and risk analyzer to easily manage and track your wealth.
                    </p>
                </motion.div>

                {/* Jump links */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    <a
                        href="#portfolio-simulator"
                        className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-300 hover:text-yellow-400 px-4 py-2 rounded-full text-sm transition-all"
                    >
                        <Calculator className="h-4 w-4" /> Portfolio Simulator
                    </a>
                    <a
                        href="#price-alerts"
                        className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-300 hover:text-yellow-400 px-4 py-2 rounded-full text-sm transition-all"
                    >
                        <Bell className="h-4 w-4" /> Price Alerts
                    </a>
                    <a
                        href="#investment-suggestion"
                        className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-300 hover:text-yellow-400 px-4 py-2 rounded-full text-sm transition-all"
                    >
                        <Lightbulb className="h-4 w-4" /> Investment Suggestions
                    </a>
                    <a
                        href="#risk-analyzer"
                        className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-300 hover:text-yellow-400 px-4 py-2 rounded-full text-sm transition-all"
                    >
                        <Activity className="h-4 w-4" /> Risk Analyzer
                    </a>
                    <a
                        href="#sip-calculator"
                        className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-300 hover:text-yellow-400 px-4 py-2 rounded-full text-sm transition-all"
                    >
                        <Calculator className="h-4 w-4" /> SIP Calculator
                    </a>
                </div>
            </section>

            <PortfolioSimulator />
            <PriceAlert />
            <SIPCalculator />
            <InvestmentSuggestion />
            <RiskAnalyzer />

            <div className="pb-24">
                <Footer />
            </div>

            <StockTicker />
        </div>
    );
}
