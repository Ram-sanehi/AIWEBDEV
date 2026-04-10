import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CTA } from "@/components/CTA";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  Medal,
  Star
} from "lucide-react";

const milestones = [
  { year: "2014", title: "Founded", description: "Started with a vision to democratize wealth management" },
  { year: "2017", title: "SEBI Registration", description: "Became a registered investment advisor with SEBI" },
  { year: "2020", title: "1000 Clients", description: "Milestone of serving 1000+ happy clients" },
  { year: "2023", title: "₹100 Cr AUM", description: "Crossed ₹100 Crores in assets under management" },
  { year: "2025", title: "Digital Transformation", description: "Launched our digital advisory platform" },
  { year: "current", title: "3000+ Clients & ₹300 Cr AUM", description: "Growing family of satisfied investors" },
];

const values = [
  { icon: Shield, title: "Integrity", description: "We maintain the highest ethical standards in all our dealings" },
  { icon: Users, title: "Client-First", description: "Your financial success is our primary goal" },
  { icon: Lightbulb, title: "Innovation", description: "Continuously evolving with market dynamics" },
  { icon: Heart, title: "Trust", description: "Building long-term relationships based on transparency" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SEO
        title="About Us"
        description="Learn about Alpha Investment Management's journey, our values, and our commitment to securing your financial future since 2014."
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
              Your Trusted Partner in{" "}
              <span className="gold-text">Wealth Building</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              For over 10+ years, Alpha Investment Management has been helping individuals
              and families achieve their financial dreams through expert guidance and
              personalized investment strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Building <span className="gold-text">Financial Futures</span> Since 2014
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Alpha Investment Management was founded with a simple yet powerful vision:
                  to make professional wealth management accessible to everyone, not just the ultra-wealthy.
                </p>
                <p>
                  Our founder, with decades of experience in the financial industry, recognized
                  that many individuals lacked access to quality financial advice. This gap
                  inspired the creation of a firm that prioritizes client education and
                  transparent practices.
                </p>
                <p>
                  Today, we proudly serve over 3,000 clients across India, managing assets
                  worth more than ₹300 crores. Our team of certified financial planners
                  and investment advisors work tirelessly to help you achieve your
                  financial goals.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-card rounded-xl p-6 text-center hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all">
                <TrendingUp className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gold-text">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center translate-y-8 hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gold-text">3000+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all">
                <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gold-text">₹300Cr+</div>
                <div className="text-sm text-muted-foreground">Assets Managed</div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center translate-y-8 hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all">
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold gold-text">100%</div>
                <div className="text-sm text-muted-foreground">Compliance</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Meet Our <span className="gold-text">Leadership Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Our experienced team of financial experts is dedicated to helping you achieve your financial goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nageshwar Prasad",
                role: "Founder & Business Head",
                qualifications: [
                  "SEBI Registered Investment Advisor & Portfolio Manager",
                  "CFA Level II Candidate",
                  "Master's in Finance – Henley Business School, London, UK",
                  "AMFI & IRDA Approved Mutual Fund and Insurance Distributor",
                  "10+ Years of Experience in Investment Management & Broking Industry",
                ],
              },
              {
                name: "Sonali Malhotra",
                role: "Head of Risk Management",
                qualifications: [
                  "M.Com",
                  "CA",
                  "NISM Certified",
                  "7+ Years of Experience in Insurance & Risk Management",
                ],
              },
              {
                name: "Rahul Jain",
                role: "Relationship Manager",
                qualifications: [
                  "M.Com",
                  "CA",
                  "NISM Certified",
                  "Expertise in Client Relationship & Financial Advisory Services",
                ],
              },
              {
                name: "Advocate Rajat Diwan",
                role: "Compliance Officer",
                qualifications: [
                  "MA",
                  "LLB",
                  "Legal & Regulatory Compliance Specialist",
                ],
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold mb-2 gold-text">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <ul className="space-y-2 text-left">
                  {member.qualifications.map((qual, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary shrink-0">•</span>
                      <span className="text-xs text-muted-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals and families with the knowledge, tools, and
                strategies they need to achieve financial independence. We are committed
                to providing transparent, ethical, and personalized financial solutions
                that create lasting value for our clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8 hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted wealth management partner, recognized for
                our commitment to client success, innovation in financial planning,
                and unwavering dedication to the highest standards of service and
                integrity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Milestones That <span className="gold-text">Define Us</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-card rounded-xl p-6 inline-block hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all">
                      <div className="text-2xl font-bold gold-text mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full gold-gradient relative z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              What We <span className="gold-text">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Accreditations */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Recognitions & <span className="gold-text">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Our commitment to excellence has been recognized by industry leaders and regulatory bodies.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Best Investment Advisor", year: "2023", issuer: "Financial Excellence Awards", icon: Award },
              { title: "Top Portfolio Manager", year: "2022", issuer: "Wealth Management Summit", icon: Star },
              { title: "Client Trust Seal", year: "2024", issuer: "Global Trust Metrics", icon: Medal },
              { title: "Certified Planner", year: "2014-24", issuer: "NISM / SEBI", icon: Shield },
            ].map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/10 group-hover:border-primary/30">
                  <award.icon className="h-10 w-10 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground group-hover:gold-text transition-colors">{award.title}</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{award.issuer}</p>
                <span className="text-xs gold-text font-medium mt-1">{award.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default About;
