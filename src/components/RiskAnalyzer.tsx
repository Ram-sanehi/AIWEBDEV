import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Target, PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Goal = "retirement" | "education" | "wealth" | "emergency";

interface RiskProfile {
    label: string;
    color: string;
    description: string;
    advice: string;
    allocation: { name: string; value: number; color: string }[];
}

const GOALS: { value: Goal; label: string }[] = [
    { value: "retirement", label: "🏖️ Retirement Planning" },
    { value: "education", label: "🎓 Child Education" },
    { value: "wealth", label: "📈 Wealth Growth" },
    { value: "emergency", label: "🛡️ Emergency Fund" },
];

function calcProfile(income: number, savings: number, goal: Goal): RiskProfile {
    const rate = income > 0 ? savings / income : 0;

    // base score: 0 = conservative, 1 = moderate, 2 = aggressive
    let score = rate < 0.15 ? 0 : rate < 0.35 ? 1 : 2;

    // goal modifiers
    if (goal === "emergency" || goal === "retirement") score = Math.max(0, score - 1);
    if (goal === "wealth") score = Math.min(2, score + 1);

    if (score === 0) {
        return {
            label: "Conservative",
            color: "#34d399",
            description: "Your savings rate suggests a cautious approach. Capital preservation is the priority.",
            advice:
                "Focus on FDs, PPF, and Government Bonds. Keep 6-12 months of expenses as liquid cash. Avoid direct equities until your savings rate improves.",
            allocation: [
                { name: "Debt / FD / Bonds", value: 60, color: "#34d399" },
                { name: "Gold / Commodities", value: 20, color: "#f59e0b" },
                { name: "Equity (Index Funds)", value: 15, color: "#60a5fa" },
                { name: "Cash / Liquid Fund", value: 5, color: "#a78bfa" },
            ],
        };
    }

    if (score === 1) {
        return {
            label: "Moderate",
            color: "#f59e0b",
            description: "You have a healthy savings rate. A balanced portfolio will help you grow wealth steadily.",
            advice:
                "Invest in a 60:40 equity-to-debt mix. Use SIPs in index funds and hybrid mutual funds. Consider NPS for tax efficiency.",
            allocation: [
                { name: "Equity (Mutual Funds / Stocks)", value: 50, color: "#f59e0b" },
                { name: "Debt / Bonds", value: 30, color: "#34d399" },
                { name: "Gold", value: 10, color: "#fbbf24" },
                { name: "Cash / Liquid", value: 10, color: "#a78bfa" },
            ],
        };
    }

    // Aggressive
    return {
        label: "Aggressive",
        color: "#f87171",
        description: "You save a high portion of income. You can take on more risk for potentially higher returns.",
        advice:
            "Invest in mid/small-cap equities, sector funds, and direct stocks. Keep only 3-6 months in liquid assets. Consider international diversification.",
        allocation: [
            { name: "Direct Equity / Small Cap", value: 55, color: "#f87171" },
            { name: "Debt / Bonds", value: 20, color: "#34d399" },
            { name: "International / ETFs", value: 15, color: "#60a5fa" },
            { name: "Gold", value: 10, color: "#f59e0b" },
        ],
    };
}

const RADIAN = Math.PI / 180;
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return percent > 0.08 ? (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    ) : null;
}

export function RiskAnalyzer() {
    const [income, setIncome] = useState("");
    const [savings, setSavings] = useState("");
    const [goal, setGoal] = useState<Goal>("wealth");
    const [profile, setProfile] = useState<RiskProfile | null>(null);

    const handleAnalyze = (e: React.FormEvent) => {
        e.preventDefault();
        const inc = parseFloat(income);
        const sav = parseFloat(savings);
        if (isNaN(inc) || isNaN(sav) || inc <= 0 || sav < 0) return;
        setProfile(calcProfile(inc, sav, goal));
    };

    return (
        <section className="py-12 lg:py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900" id="risk-analyzer">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
                        <Activity className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Risk Analyzer</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Know Your <span className="text-yellow-400">Risk Profile</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Answer three quick questions and get a personalised risk assessment with an asset allocation breakdown.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleAnalyze}
                        className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-4 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                    >
                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5 font-medium">Monthly Income (₹)</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="e.g. 80000"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5 font-medium">Monthly Savings (₹)</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 20000"
                                value={savings}
                                onChange={(e) => setSavings(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 placeholder-slate-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5 font-medium">Primary Investment Goal</label>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value as Goal)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 text-sm"
                            >
                                {GOALS.map((g) => (
                                    <option key={g.value} value={g.value}>{g.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Target className="h-4 w-4" />
                            Analyze My Risk Profile
                        </button>
                    </motion.form>

                    {/* Result */}
                    <AnimatePresence mode="wait">
                        {profile ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {/* Profile Badge */}
                                <div
                                    className="rounded-2xl p-5 border"
                                    style={{ borderColor: profile.color + "50", background: profile.color + "15" }}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <Activity className="h-6 w-6" style={{ color: profile.color }} />
                                        <div>
                                            <p className="text-xs text-slate-400">Your Risk Profile</p>
                                            <p className="text-lg font-bold text-white">{profile.label} Investor</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3">{profile.description}</p>
                                    <p className="text-slate-400 text-xs leading-relaxed">{profile.advice}</p>
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
                                    <p className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                                        <PieIcon className="h-4 w-4 text-yellow-400" />
                                        Suggested Asset Allocation
                                    </p>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={profile.allocation}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                                labelLine={false}
                                                label={CustomLabel}
                                            >
                                                {profile.allocation.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                                                formatter={(val: number) => [`${val}%`, ""]}
                                            />
                                            <Legend
                                                iconType="circle"
                                                iconSize={8}
                                                wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-800/40 border border-slate-700 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] text-center"
                            >
                                <Activity className="h-10 w-10 text-slate-600 mb-3" />
                                <p className="text-slate-500 text-sm">
                                    Fill in your income, savings, and goal to see your<br />
                                    <span className="text-yellow-400 font-medium">personalised risk profile</span>.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
