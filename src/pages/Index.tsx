import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StockTicker } from "@/components/StockTicker";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Partners } from "@/components/Partners";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SEO
        title="Home"
        description="Alpha Investment Management offers comprehensive wealth management, financial planning, and investment advisory services with 15+ years of excellence."
      />
      <Navbar />
      <Hero />
      <Partners />
      <Stats />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
      <StockTicker />
    </div>
  );
};

export default Index;
