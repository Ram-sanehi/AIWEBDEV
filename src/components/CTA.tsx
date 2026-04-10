import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gold-gradient opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Start Your{" "}
            <span className="gold-text">Investment Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards financial freedom. Our expert advisors are ready
            to create a personalized investment strategy tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-90 text-lg px-8">
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8">
              <a href="tel:+919607509586">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
