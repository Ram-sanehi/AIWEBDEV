import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StockTicker } from "@/components/StockTicker";

const Disclaimer = () => {
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
              <span className="gold-text">Disclaimer</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Important information about the use of our website and services.
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
            <div className="bg-secondary/50 border border-primary/20 rounded-lg p-6 mb-8">
              <p className="text-primary font-semibold">
                IMPORTANT: Please read this disclaimer carefully before using our website and services. By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by all the terms and disclaimers contained herein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">1. General Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided on this website is for informational purposes only and should not be construed as professional financial advice. Alpha Investment Management Services does not provide personalized financial advice without a direct consultation. The information, products, and services provided on this website are not intended for distribution to or use by any person in any country where such distribution would be contrary to local laws or regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Investment Risk Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All investments involve risk, including the potential loss of principal. Past performance is not indicative of future results. The value of investments and the income from them may fluctuate. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment or strategy will be suitable or profitable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Before making any investment decisions, you should consult with a qualified financial advisor who can assess your individual financial situation, goals, and risk tolerance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. No Representation of Expertise</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, Alpha Investment Management Services makes no representation or warranty as to the accuracy, completeness, or current nature of the information provided. The information on this website may be subject to change without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Market and Economic Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The market data, statistics, and economic information provided on this website are obtained from sources believed to be reliable but are not guaranteed for accuracy or completeness. All market information is subject to change and may have a time delay.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website may contain links to third-party websites. Alpha Investment Management Services is not responsible for the content, accuracy, or practices of these external websites. Your use of third-party websites is at your own risk and subject to their terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. No Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Alpha Investment Management Services, its officers, directors, employees, or agents be liable for any damages whatsoever (including, without limitation, direct, indirect, incidental, special, consequential, or punitive damages) arising out of or in connection with your use of this website or the information contained therein.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Regulatory Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services is committed to complying with all applicable laws, regulations, and industry standards. However, we cannot guarantee that all content on this website will always comply with all current and future regulations. Users are responsible for ensuring that their use of this website and services complies with all applicable laws in their jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Changes to Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services reserves the right to modify this disclaimer at any time without notice. Your continued use of this website following any changes constitutes your acceptance of the modified disclaimer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Regulatory Bodies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services operates in accordance with applicable financial regulations in India. For more information about our regulatory status and compliance, please contact us directly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">10. Questions or Concerns</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions or concerns regarding this disclaimer, please contact us at:<br />
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

export default Disclaimer;
