import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StockTicker } from "@/components/StockTicker";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <StockTicker />

      {/* Hero Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
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
              Privacy <span className="gold-text">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We are committed to protecting your privacy and ensuring transparency in how we handle your data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 prose prose-invert max-w-none"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services ("we," "our," or "us") operates the website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 ml-6">
                <li>• <strong>Personal Data:</strong> Name, email address, phone number, mailing address</li>
                <li>• <strong>Financial Information:</strong> Investment preferences, portfolio details (when provided)</li>
                <li>• <strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li>• <strong>Usage Information:</strong> Pages visited, time spent, links clicked</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 ml-6">
                <li>• Process your transactions and send related information</li>
                <li>• Email you regarding your account or order</li>
                <li>• Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
                <li>• Generate a personal profile about you</li>
                <li>• Increase the efficiency and operation of the Site</li>
                <li>• Monitor and analyze usage and trends to improve your experience with the Site</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with third parties in the following circumstances:
              </p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 ml-6 mt-4">
                <li>• By Law or to protect rights: If we believe the release of information is necessary</li>
                <li>• Service Providers: To vendors, consultants, and service providers</li>
                <li>• Business Transfers: In connection with a merger, bankruptcy, or asset sale</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Security of Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:<br />
                <strong>Email:</strong> info@alphaaim.in<br />
                <strong>Phone:</strong> +91 9607509586<br />
                <strong>Address:</strong> 1st Floor (Above Subhedar Biryani), Mahalungeker Complex, Mahalunge Kaman, Chakan-Talegaon Highway, Chakan, Pune 410501
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Last Updated: January 28, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
