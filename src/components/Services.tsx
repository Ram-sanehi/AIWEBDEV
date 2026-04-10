import { motion } from "framer-motion";
import {
  TrendingUp,
  PiggyBank,
  Shield,
  Building2,
  Calculator,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Strategic portfolio management with diversified investment solutions for optimal returns.",
    features: ["Equity & Debt Funds", "Portfolio Rebalancing", "Risk Assessment"],
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Comprehensive financial planning to achieve your short-term and long-term goals.",
    features: ["Goal-based Planning", "Cash Flow Analysis", "Budget Management"],
  },
  {
    icon: Building2,
    title: "Loan Services",
    description: "Access to competitive loan products for personal, home, and business needs.",
    features: ["Home Loans", "Personal Loans", "Business Financing"],
  },
  {
    icon: Shield,
    title: "Insurance & Risk Management",
    description: "Protect your family and assets with comprehensive insurance solutions.",
    features: ["Life Insurance", "Health Coverage", "General Insurance"],
  },
  {
    icon: Calculator,
    title: "Tax Mitigation Strategy",
    description: "Optimize your tax liabilities with strategic planning and ELSS investments.",
    features: ["Tax Planning", "ELSS Investments", "80C Optimization"],
  },
  {
    icon: Briefcase,
    title: "Retirement Planning",
    description: "Secure your golden years with tailored retirement and estate planning.",
    features: ["NPS & PPF", "Pension Plans", "Estate Planning"],
  },
];

export function Services() {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Comprehensive <span className="gold-text">Financial Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We offer a complete range of financial services designed to help you achieve
            your financial objectives and secure your future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-8 hover-glow transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-90">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
