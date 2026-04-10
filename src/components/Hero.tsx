import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  const rotatingWords = ["Financial", "Investment", "Retirement", "Insurance", "Wealth", "Tax"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let animationId: number;

    const updateGlow = () => {
      glowX += (mouseX - glowX) * 0.05; // Smooth interpolation
      glowY += (mouseY - glowY) * 0.05;
      glow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
      animationId = requestAnimationFrame(updateGlow);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    // Check if not mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      hero.addEventListener('mousemove', handleMouseMove);
      updateGlow();
    }

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 lg:pt-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.png"
          alt="Financial Advisory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] animate-morph-blob opacity-60"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 40%, rgba(6, 182, 212, 0.05) 70%, transparent 100%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] animate-morph-blob-delayed opacity-50"
          style={{
            background: 'radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(59, 130, 246, 0.04) 80%, transparent 100%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          ref={glowRef}
          className="absolute pointer-events-none z-5"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, rgba(218, 165, 32, 0.04) 50%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(218, 165, 32, 0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(218, 165, 32, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">SEBI Registered Investment Advisor</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              Secure Your{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="gold-text inline-block min-w-[200px]"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
              {" "}Future With Expert Guidance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              We provide comprehensive wealth management solutions tailored to your unique
              financial goals. Our expert team helps you navigate the complexities of
              investment planning with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-90 text-lg px-8">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8">
                <Link to="/services">What We Offer</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: TrendingUp, title: "Investment Growth", desc: "Strategic portfolio management for optimal returns" },
              { icon: Shield, title: "Risk Protection", desc: "Comprehensive insurance and risk mitigation" },
              { icon: Users, title: "Expert Advisory", desc: "Personalized guidance from certified professionals" },
              { icon: TrendingUp, title: "Wealth Planning", desc: "Long-term financial security for your family" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`glass-card rounded-xl p-6 hover-glow hover:border-primary/50 group cursor-pointer ${index === 1 || index === 2 ? "translate-y-8" : ""
                  }`}
              >
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
