import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getBlogPosts } from "@/api/blog";
import { SEO } from "@/components/SEO";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    image: string;
    published_at: string;
}

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await getBlogPosts();
            setPosts(data);
        } catch (error) {
            // Fallback mock data if API fails
            setPosts([
                {
                    id: "1",
                    title: "Mastering Your Personal Finances in 2024",
                    excerpt: "Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future in the current economic landscape.",
                    category: "Financial Planning",
                    author: "Rajesh Sharma",
                    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-15"
                },
                {
                    id: "2",
                    title: "Why SIP is the Best Way to Create Wealth",
                    excerpt: "Learn how Systematic Investment Plans (SIP) leverage the power of compounding and rupee cost averaging to grow your wealth over time.",
                    category: "Investment",
                    author: "Priya Gupta",
                    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-10"
                },
                {
                    id: "3",
                    title: "Tax Saving Strategies for High Earners",
                    excerpt: "Explore advanced tax planning techniques to optimize your returns and stay compliant with the latest regulatory changes.",
                    category: "Tax Planning",
                    author: "Amit Patel",
                    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-05"
                }
            ]);
        }
        setLoading(false);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Blog & Insights"
                description="Stay updated with the latest financial insights, market updates, and investment strategies from Alpha Investment Management."
            />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 hero-gradient">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Insights & <span className="gold-text">Market Updates</span>
                    </motion.h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        Stay informed with the latest financial news, investment strategies, and expertise from our team.
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search articles or categories..."
                            className="pl-10 bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] bg-card rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded">
                                            {post.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.published_at).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {post.author}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:gold-text transition-colors duration-300 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 gold-text font-semibold text-sm group/btn">
                                            Read More <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No articles found matching your search.</p>
                            <Button variant="link" onClick={() => setSearchTerm("")} className="gold-text">
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
