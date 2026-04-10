import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Owner",
    image: "/images/testimonials/user1.png",
    rating: 5,
    content: "Alpha Investment has transformed my financial outlook. Their personalized approach and expert guidance helped me build a diversified portfolio that has grown consistently.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "IT Professional",
    image: "/images/testimonials/user2.png",
    rating: 5,
    content: "I was completely new to investing, but the team made everything so simple. Their transparent approach built my confidence in financial planning and wealth management.",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Doctor",
    image: "/images/testimonials/user3.png",
    rating: 5,
    content: "Outstanding service! The retirement planning strategy they created for me gives me peace of mind knowing my family's future is secure. Highly recommend them.",
  },
];

export function Testimonials() {
  return (
    <section className="py-12 lg:py-20 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What Our <span className="gold-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our satisfied clients about their experience working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-8 hover-glow hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold gold-text">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground italic text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
