import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, TrendingUp, ShieldCheck, Zap, ChevronRight } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

interface Suggestion {
    name: string;
    description: string;
    expectedReturn: string;
    minAmount: string;
    icon: "shield" | "trend" | "zap";
}

function getSuggestions(budget: number, risk: RiskLevel): Suggestion[] {
    if (risk === "low") {
        return [
            {
                name: "Public Provident Fund (PPF)",
                description: "Government-backed, tax-free returns. Ideal for long-term safe savings.",
                expectedReturn: "7.1% p.a.",
                minAmount: "₹500",
                icon: "shield",
            },
            {
                name: "Fixed Deposit (FD)",
                description: "Guaranteed returns with flexible tenures from leading banks.",
                expectedReturn: "6.5 – 7.5% p.a.",
                minAmount: "₹1,000",
                icon: "shield",
            },
            {
                name: "Debt Mutual Funds",
                description: "Invests in bonds and government securities. Low risk, stable returns.",
                expectedReturn: "6 – 8% p.a.",
                minAmount: "₹500",
                icon: "shield",
            },
        ];
    }

    if (risk === "medium") {
        if (budget < 50000) {
            return [
                {
                    name: "Balanced / Hybrid Mutual Funds",
                    description: "Mix of equity and debt. Moderate risk with decent growth potential.",
                    expectedReturn: "9 – 11% p.a.",
                    minAmount: "₹500 SIP",
                    icon: "trend",
                },
                {
                    name: "Index Funds (Nifty 50)",
                    description: "Passively tracks the Nifty 50 index. Low cost, diversified exposure.",
                    expectedReturn: "10 – 12% p.a.",
                    minAmount: "₹100",
                    icon: "trend",
                },
                {
                    name: "ELSS (Tax Saver Funds)",
                    description: "Equity-linked savings with 3-year lock-in and Section 80C tax benefits.",
                    expectedReturn: "10 – 14% p.a.",
                    minAmount: "₹500",
                    icon: "trend",
                },
            ];
        } else {
            return [
                {
                    name: "Blue-chip Stocks (Large Cap)",
                    description: "Invest in market leaders like Reliance, TCS, HDFC Bank for steady growth.",
                    expectedReturn: "12 – 15% p.a.",
                    minAmount: "₹5,000+",
                    icon: "trend",
                },
                {
                    name: "Nifty ETF / Sensex ETF",
                    description: "Exchange-traded funds mirroring the index. Low cost and highly liquid.",
                    expectedReturn: "11 – 13% p.a.",
                    minAmount: "₹1,000",
                    icon: "trend",
                },
                {
                    name: "NPS (National Pension System)",
                    description: "Long-term retirement vehicle with market-linked returns and tax benefits.",
                    expectedReturn: "9 – 12% p.a.",
                    minAmount: "₹1,000",
                    icon: "shield",
                },
            ];
        }
    }

    // High risk
    return [
        {
            name: "Mid & Small Cap Stocks",
            description: "Higher growth potential with higher volatility. Best for 5+ year horizon.",
            expectedReturn: "15 – 25% p.a.",
            minAmount: "₹10,000+",
            icon: "zap",
        },
        {
            name: "Sectoral / Thematic Funds",
            description: "Focused exposure to sectors like IT, Pharma, or Banking. High conviction bets.",
            expectedReturn: "15 – 30%+ p.a.",
            minAmount: "₹5,000",
            icon: "zap",
        },
        {
            name: "Direct Equity (Derivatives)",
            description: "F&O and direct stock picks. High risk — suitable only for experienced investors.",
            expectedReturn: "Variable",
            minAmount: "₹50,000+",
            icon: "zap",
        },
    ];
}

const IconMap = {
    shield: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
    trend: <TrendingUp className="h-5 w-5 text-yellow-400" />,
    zap: <Zap className="h-5 w-5 text-red-400" />,
};

const riskColors: Record<RiskLevel, string> = {
    low: "from-emerald-500 to-emerald-600",
    medium: "from-yellow-500 to-yellow-600",
    high: "from-red-500 to-red-600",
};

const riskLabels: Record<RiskLevel, string> = {
    low: "🛡️ Low Risk – Conservative",
    medium: "⚖️ Medium Risk – Balanced",
    high: "⚡ High Risk – Aggressive",
};

export function InvestmentSuggestion() {
    const [budget, setBudget] = useState("");
    const [risk, setRisk] = useState<RiskLevel>("medium");
    const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        const b = parseFloat(budget);
        if (isNaN(b) || b <= 0) return;
        setSuggestions(getSuggestions(b, risk));
    };

    return (
        <section className="py-12 lg:py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950" id="investment-suggestion">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Investment Suggestions</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Where Should You <span className="text-yellow-400">Invest?</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Tell us your budget and risk appetite—get instant, personalised investment ideas.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleGenerate}
                    className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 mb-8"
                >
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5 font-medium">Investment Budget (₹)</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="e.g. 25000"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5 font-medium">Risk Level</label>
                            <div className="flex gap-2">
                                {(["low", "medium", "high"] as RiskLevel[]).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRisk(r)}
                                        className={`flex-1 py-3 rounded-xl text-xs font-semibold capitalize transition-all border ${risk === r
                                            ? `bg-gradient-to-r ${riskColors[r]} border-transparent text-white`
                                            : "bg-slate-900 border-slate-600 text-slate-300 hover:border-yellow-500/40"
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Lightbulb className="h-4 w-4" />
                            Get Suggestions
                        </button>
                    </div>
                </motion.form>

                {/* Suggestions */}
                <AnimatePresence>
                    {suggestions && (
                        <motion.div
                            key="suggestions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-slate-400 text-sm">Showing suggestions for:</span>
                                <span className={`text-sm font-semibold bg-gradient-to-r ${riskColors[risk]} bg-clip-text text-transparent`}>
                                    {riskLabels[risk]}
                                </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                {suggestions.map((s, i) => (
                                    <motion.div
                                        key={s.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 hover:border-yellow-500/30 group"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            {IconMap[s.icon]}
                                            <span className="text-white font-semibold text-sm">{s.name}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed mb-4">{s.description}</p>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Expected Return</span>
                                                <span className="text-emerald-400 font-semibold">{s.expectedReturn}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Min. Amount</span>
                                                <span className="text-yellow-400 font-semibold">{s.minAmount}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-700">
                                            <a
                                                href="/contact"
                                                className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                                            >
                                                Talk to an advisor <ChevronRight className="h-3 w-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
