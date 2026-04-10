import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, PieChart as PieChartIcon, TrendingUp, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
    const [expectedReturn, setExpectedReturn] = useState<number>(12);
    const [timePeriod, setTimePeriod] = useState<number>(10);
    const [result, setResult] = useState<{
        totalInvested: number;
        estReturns: number;
        totalValue: number;
    } | null>(null);

    useEffect(() => {
        calculateSIP();
    }, [monthlyInvestment, expectedReturn, timePeriod]);

    const calculateSIP = () => {
        const P = monthlyInvestment;
        const r = expectedReturn / 12 / 100;
        const n = timePeriod * 12;

        const totalValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalInvested = P * n;
        const estReturns = totalValue - totalInvested;

        setResult({
            totalInvested: Math.round(totalInvested),
            estReturns: Math.round(estReturns),
            totalValue: Math.round(totalValue),
        });
    };

    const chartData = result ? [
        { name: "Invested Amount", value: result.totalInvested },
        { name: "Estimated Returns", value: result.estReturns },
    ] : [];

    const COLORS = ["#1e293b", "#f59e0b"];

    const fmt = (val: number) => "₹" + val.toLocaleString("en-IN");

    return (
        <section id="sip-calculator" className="py-12 lg:py-20 bg-slate-900/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white">SIP <span className="gold-text">Calculator</span></h2>
                            <p className="text-slate-400 text-sm">Plan your future wealth with systematic investments</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Controls */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">Monthly Investment</label>
                                        <span className="gold-text font-bold">{fmt(monthlyInvestment)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500"
                                        max="100000"
                                        step="500"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">Expected Return Rate (p.a)</label>
                                        <span className="gold-text font-bold">{expectedReturn}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="0.5"
                                        value={expectedReturn}
                                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">Time Period (Years)</label>
                                        <span className="gold-text font-bold">{timePeriod} Yr</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="40"
                                        step="1"
                                        value={timePeriod}
                                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                    />
                                </div>
                            </div>

                            {result && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs mb-1">Total Invested</p>
                                        <p className="text-lg font-bold text-white">{fmt(result.totalInvested)}</p>
                                    </div>
                                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                                        <p className="text-slate-400 text-xs mb-1">Est. Returns</p>
                                        <p className="text-lg font-bold text-emerald-400">{fmt(result.estReturns)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Visuals */}
                        <div className="relative">
                            {result && (
                                <div className="bg-slate-800/60 border border-slate-700 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {chartData.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                                                    formatter={(value: number) => [fmt(value), ""]}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="text-center mt-6">
                                        <p className="text-slate-400 text-sm mb-1">Total Value after {timePeriod} years</p>
                                        <p className="text-4xl font-display font-bold gold-text animate-pulse">
                                            {fmt(result.totalValue)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
