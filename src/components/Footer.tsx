import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Investment Management",
  "Financial Planning",
  "Loan Services",
  "Insurance Solutions",
  "Tax Planning",
  "Retirement Planning",
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    // Simulate subscription delay
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      toast({
        title: "Thank you for subscribing us!",
        description: "You'll receive the latest financial insights in your inbox.",
      });
    }, 800);
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-primary/20">
                <img src="/logo-circular1.png" alt="Alpha Investment Management" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-s font-display font-bold gold-text">Alpha Investment Management</h3>
                {/* <p className="text-xs text-muted-foreground">Management Services</p> */}
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for comprehensive wealth management and financial planning.
              Building secure financial futures since 2014.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  1st Floor (Above Subhedar Biryani),<br />
                  Mahalungeker Complex, Mahalunge Kaman,<br />
                  Chakan-Talegaon Highway, Chakan,<br />
                  Pune 410501
                </span>
              </li>
              <li>
                <a href="tel:+919607509586" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm">+91 9607509586</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@alphaaim.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm">info@alphaaim.in</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground text-sm">Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-6">
              Get the latest financial insights and market updates delivered to your inbox.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
              />
              <Button type="submit" className="gold-gradient text-primary-foreground hover:opacity-90" disabled={isSubscribing}>
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p>© 2026 Alpha Investment Management Services. All rights reserved.</p>
              <p className="mt-2 text-xs opacity-75">
                SEBI Registered Investment Advisor: <span className="gold-text font-medium">INA000012345</span> |
                Corporate Identity Number: <span className="gold-text font-medium">U67190PN2014PTC123456</span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider opacity-60">
                Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
