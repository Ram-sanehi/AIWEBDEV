import { motion } from "framer-motion";

const partners = [
    { name: "HDFC Bank", category: "Banking Partner" },
    { name: "ICICI Bank", category: "Banking Partner" },
    { name: "SBI Mutual Fund", category: "AMC Partner" },
    { name: "LIC", category: "Insurance Partner" },
    { name: "TATA AIA", category: "Insurance Partner" },
    { name: "Nippon India", category: "AMC Partner" },
];

export function Partners() {
    return (
        <section className="py-12 bg-card/50 border-y border-border overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                        Our Institutional Partners
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 contrast-0 hover:contrast-100 hover:opacity-100 transition-all duration-700">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 0.8, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground/80">
                                {partner.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                {partner.category}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
