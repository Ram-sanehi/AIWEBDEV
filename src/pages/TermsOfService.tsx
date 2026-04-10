import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StockTicker } from "@/components/StockTicker";

const TermsOfService = () => {
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
              Terms of <span className="gold-text">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms and conditions carefully before using our website and services.
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
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on Alpha Investment Management Services' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 ml-6">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose or for any public display</li>
                <li>• Attempt to reverse engineer any software contained on the website</li>
                <li>• Remove any copyright or other proprietary notations from the materials</li>
                <li>• Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on Alpha Investment Management Services' website are provided on an 'as is' basis. Alpha Investment Management Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Alpha Investment Management Services or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on the website could include technical, typographical, or photographic errors. Alpha Investment Management Services does not warrant that any of the materials on its website are accurate, complete, or current. Alpha Investment Management Services may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Alpha Investment Management Services of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alpha Investment Management Services may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:<br />
                <strong>Email:</strong> info@alphaaim.in<br />
                <strong>Phone:</strong> +91 9607509586<br />
                <strong>Address:</strong> Dwarka City Sector 2A, Mahalunge Ingale, Chakan, Pune, Maharashtra 410501
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

export default TermsOfService;
