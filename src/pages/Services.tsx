import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CTA } from "@/components/CTA";
import {
  TrendingUp,
  PiggyBank,
  Shield,
  Building2,
  Calculator,
  Briefcase,
  ChevronDown,
  Check
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Strategic portfolio management with diversified investment solutions designed to maximize returns while managing risk effectively.",
    keyBenefits: [
      "Customized portfolio aligned with your goals",
      "Regular rebalancing to optimize returns",
      "Access to diverse investment options",
      "Professional risk management",
      "Tax-efficient investment strategies",
    ],
    process: [
      "Risk Assessment - Understanding your risk tolerance and investment horizon",
      "Goal Setting - Defining clear financial objectives",
      "Strategy Design - Creating a personalized investment plan",
      "Implementation - Executing the investment strategy",
      "Monitoring - Continuous portfolio tracking and adjustments",
    ],
    instruments: [
      "Equity Instruments",
      "Debt Instruments",
      "Derivatives",
      "Mutual Funds",
      "Foreign Exchange Instruments",
      "Money Market Instruments",
      "Government Saving Schemes",
      "Real Estate & Commodities",
      "Cash Equivalents",
    ],
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Comprehensive financial planning to help you achieve your short-term and long-term financial goals with confidence.",
    keyBenefits: [
      "Clear roadmap to financial success",
      "Budget optimization strategies",
      "Emergency fund planning",
      "Education funding solutions",
      "Marriage and major life event planning",
    ],
    process: [
      "Financial Assessment - Analyzing your current financial position",
      "Goal Identification - Understanding your aspirations",
      "Plan Development - Creating actionable financial strategies",
      "Implementation Support - Helping you execute the plan",
      "Regular Reviews - Adjusting the plan as life changes",
    ],
    offerings: [
      "Personal Financial Planning",
      "Family Wealth Planning",
      "Education Planning",
      "Marriage Planning",
      "Business Planning",
      "Succession Planning",
    ],
  },
  {
    icon: Building2,
    title: "Loan Services",
    description: "Access competitive loan products for all your needs - from home loans to business financing, with the best rates and terms.",
    keyBenefits: [
      "Competitive interest rates",
      "Quick approval process",
      "Flexible repayment options",
      "Minimal documentation",
      "Expert guidance throughout",
    ],
    process: [
      "Requirement Analysis - Understanding your loan needs",
      "Product Comparison - Finding the best loan options",
      "Documentation - Preparing required documents",
      "Application - Submitting to selected lenders",
      "Disbursement - Ensuring smooth fund transfer",
    ],
    offerings: [
      "Personal Loan",
      "Home Loan",
      "New & Used Vehicle Loans",
      "Loan Against Property",
      "Loan for Buying Plot/Land",
      "Loan for Renovation",
    ],
  },
  {
    icon: Shield,
    title: "Insurance & Risk Management",
    description: "Protect your family and assets with comprehensive insurance solutions tailored to your specific needs and circumstances.",
    keyBenefits: [
      "Comprehensive coverage analysis",
      "Best-in-class insurance products",
      "Claims assistance support",
      "Regular policy reviews",
      "Family protection planning",
    ],
    process: [
      "Need Assessment - Evaluating your protection requirements",
      "Gap Analysis - Identifying coverage gaps",
      "Product Selection - Choosing appropriate insurance products",
      "Policy Procurement - Securing optimal coverage",
      "Claim Support - Assisting during claims",
    ],
    offerings: [
      "Two & Four Wheeler Insurance",
      "Commercial Vehicle Insurance",
      "Health Insurance",
      "Term Insurance",
      "Life Insurance",
      "Pension Schemes",
      "Travel Insurance",
      "Home & Shop Insurance",
      "Industrial Insurance",
    ],
  },
  {
    icon: Calculator,
    title: "Tax Mitigation Strategy",
    description: "Optimize your tax liabilities through strategic planning, ELSS investments, and efficient use of available deductions.",
    keyBenefits: [
      "Maximize tax savings legally",
      "ELSS and 80C optimization",
      "Tax-efficient investment planning",
      "Capital gains management",
      "Comprehensive tax reporting",
    ],
    process: [
      "Tax Review - Analyzing your current tax situation",
      "Deduction Mapping - Identifying all available deductions",
      "Strategy Formulation - Creating tax-efficient plans",
      "Investment Selection - Choosing tax-saving instruments",
      "Documentation - Maintaining proper records",
    ],
    offerings: [
      "Section 80C Deductions (LIC, PPF, ELSS, FD)",
      "Section 80D Health Insurance Premium",
      "Section 24 Home Loan Interest",
      "Section 80E Education Loan Interest",
      "Capital Gains Planning",
      "Business Loss Optimization",
    ],
  },
  {
    icon: Briefcase,
    title: "Retirement Planning",
    description: "Secure your golden years with tailored retirement and estate planning strategies that ensure financial independence.",
    keyBenefits: [
      "Corpus calculation based on lifestyle needs",
      "Multiple income stream creation",
      "Inflation-adjusted planning",
      "Healthcare cost coverage",
      "Legacy and estate planning",
    ],
    process: [
      "Lifestyle Analysis - Understanding retirement expectations",
      "Corpus Calculation - Determining required savings",
      "Investment Strategy - Building retirement portfolio",
      "Income Planning - Creating post-retirement income",
      "Estate Planning - Ensuring smooth wealth transfer",
    ],
    offerings: [
      "SWP (Systematic Withdrawal Plan)",
      "Senior Citizen Investment Instruments",
      "Pension Plans",
      "Government Schemes",
    ],
  },
];

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEO
        title="Our Services"
        description="Explore our range of financial services including investment management, retirement planning, tax saving, and more."
      />
      <Navbar />
      <StockTicker />

      {/* Hero Section */}
      <section className="py-12 lg:py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Comprehensive{" "}
              <span className="gold-text">Financial Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We offer a complete range of financial services designed to help you
              achieve your financial objectives and secure your future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover-glow hover:border-primary/50 hover:scale-[1.01] hover:shadow-xl transition-all duration-300"
              >
                {/* Service Header */}
                <button
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                  className="w-full p-8 flex items-center gap-6 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-primary transition-transform ${expandedService === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 grid md:grid-cols-3 gap-8 border-t border-border pt-8">
                        {/* Key Benefits */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </span>
                            Key Benefits
                          </h4>
                          <ul className="space-y-3">
                            {service.keyBenefits.map((benefit, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3"
                              >
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-muted-foreground text-sm">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Our Process */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Our Process</h4>
                          <ol className="space-y-3">
                            {service.process.map((step, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <span className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-xs text-primary-foreground font-semibold shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-muted-foreground text-sm">{step}</span>
                              </motion.li>
                            ))}
                          </ol>
                        </div>

                        {/* Offerings/Instruments */}
                        {(service.offerings || service.instruments) && (
                          <div>
                            <h4 className="text-lg font-semibold mb-4">
                              {service.instruments ? "Investment Instruments" : "Our Offerings"}
                            </h4>
                            <ul className="space-y-3">
                              {(service.offerings || service.instruments)?.map((offering, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="text-muted-foreground text-sm">{offering}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />

      <div className="bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default ServicesPage;
