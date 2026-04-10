import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, User, Tag, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { getBlogPost } from "@/api/blog";
import { SEO } from "@/components/SEO";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    image: string;
    published_at: string;
}

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchPost = async (postId: string) => {
        setLoading(true);
        try {
            const data = await getBlogPost(postId);
            if (data) {
                setPost(data);
            }
        } catch (error) {
            // Mock data for demonstration
            const mockPosts: Record<string, BlogPost> = {
                "1": {
                    id: "1",
                    title: "Mastering Your Personal Finances in 2024",
                    content: `
                        <p class="lead">In today's rapidly changing economic landscape, mastering your personal finances has never been more critical. This comprehensive guide will walk you through essential strategies to manage your wealth effectively.</p>

                        <h2>1. Understanding Your Financial Position</h2>
                        <p>Before you can improve your financial situation, you need to understand where you stand. Start by calculating your net worth – the difference between what you own (assets) and what you owe (liabilities).</p>

                        <h3>Key Steps:</h3>
                        <ul>
                            <li>List all your assets: savings, investments, property, vehicles</li>
                            <li>List all your liabilities: credit card debt, loans, mortgages</li>
                            <li>Calculate the difference to get your net worth</li>
                        </ul>

                        <h2>2. Creating a Budget That Works</h2>
                        <p>A budget isn't about restricting yourself – it's about making conscious decisions about how to allocate your resources toward what matters most to you.</p>

                        <h3>The 50/30/20 Rule:</h3>
                        <ul>
                            <li><strong>50%</strong> for Needs: Housing, groceries, utilities, transportation</li>
                            <li><strong>30%</strong> for Wants: Dining out, entertainment, hobbies</li>
                            <li><strong>20%</strong> for Savings & Debt Repayment: Emergency fund, retirement, extra debt payments</li>
                        </ul>

                        <h2>3. Building an Emergency Fund</h2>
                        <p>Financial experts recommend having 3-6 months' worth of living expenses saved in an easily accessible account. This fund acts as a financial safety net for unexpected events like job loss, medical emergencies, or major repairs.</p>

                        <h2>4. Strategic Debt Management</h2>
                        <p>Not all debt is created equal. High-interest debt like credit cards should be prioritized for repayment, while lower-interest debt like mortgages might be part of a long-term wealth strategy.</p>

                        <h3>Debt Repayment Strategies:</h3>
                        <ul>
                            <li><strong>Avalanche Method:</strong> Pay off highest interest rate debt first</li>
                            <li><strong>Snowball Method:</strong> Pay off smallest balances first for psychological wins</li>
                        </ul>

                        <h2>5. Investing for the Future</h2>
                        <p>Once you have your emergency fund in place and high-interest debt under control, it's time to focus on building wealth through investing. Remember, time in the market is generally more important than timing the market.</p>

                        <h2>Conclusion</h2>
                        <p>Mastering your personal finances is a journey, not a destination. Start with small, manageable steps and build momentum over time. The key is consistency and patience. Your future self will thank you for the financial foundation you build today.</p>
                    `,
                    excerpt: "Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future in the current economic landscape.",
                    category: "Financial Planning",
                    author: "Rajesh Sharma",
                    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-15"
                },
                "2": {
                    id: "2",
                    title: "Why SIP is the Best Way to Create Wealth",
                    content: `
                        <p class="lead">Systematic Investment Plans (SIPs) have revolutionized how retail investors approach wealth creation. Let's explore why SIPs are considered one of the most effective investment strategies.</p>

                        <h2>What is a Systematic Investment Plan?</h2>
                        <p>An SIP is a method of investing a fixed amount regularly (monthly, quarterly) into mutual funds. This disciplined approach to investing offers several advantages over lump-sum investments.</p>

                        <h2>The Power of Compounding</h2>
                        <p>Albert Einstein reportedly called compound interest the "eighth wonder of the world." With SIPs, your returns start generating their own returns, creating a snowball effect over time.</p>

                        <h3>Example:</h3>
                        <p>Investing ₹10,000 monthly at 12% annual return:</p>
                        <ul>
                            <li>After 10 years: ₹23.2 lakhs (invested: ₹12 lakhs)</li>
                            <li>After 20 years: ₹98.9 lakhs (invested: ₹24 lakhs)</li>
                            <li>After 30 years: ₹3.52 crores (invested: ₹36 lakhs)</li>
                        </ul>

                        <h2>Rupee Cost Averaging</h2>
                        <p>SIPs eliminate the need to time the market. When markets are high, your fixed investment buys fewer units. When markets fall, the same amount buys more units. Over time, this averages out your cost per unit.</p>

                        <h2>Key Benefits of SIPs:</h2>
                        <ul>
                            <li><strong>Disciplined Investing:</strong> Automatic deductions ensure regular investments</li>
                            <li><strong>Affordable:</strong> Start with as low as ₹500 per month</li>
                            <li><strong>Flexible:</strong> Increase, decrease, or pause as needed</li>
                            <li><strong>Convenient:</strong> Set it once and let it run automatically</li>
                            <li><strong>Long-term Wealth:</strong> Proven track record of wealth creation</li>
                        </ul>

                        <h2>Getting Started with SIP</h2>
                        <p>Starting an SIP is simple:</p>
                        <ol>
                            <li>Define your financial goals and time horizon</li>
                            <li>Assess your risk tolerance</li>
                            <li>Choose mutual funds aligned with your goals</li>
                            <li>Decide the investment amount and frequency</li>
                            <li>Complete KYC and set up auto-debit</li>
                        </ol>

                        <h2>Conclusion</h2>
                        <p>SIPs are not just an investment tool; they're a wealth-building philosophy. By combining discipline, the power of compounding, and rupee cost averaging, SIPs offer a proven path to financial success. Start your SIP journey today and let time work its magic on your investments.</p>
                    `,
                    excerpt: "Learn how Systematic Investment Plans (SIP) leverage the power of compounding and rupee cost averaging to grow your wealth over time.",
                    category: "Investment",
                    author: "Priya Gupta",
                    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-10"
                },
                "3": {
                    id: "3",
                    title: "Tax Saving Strategies for High Earners",
                    content: `
                        <p class="lead">High earners face unique tax challenges. This guide explores advanced tax planning strategies to optimize your tax liability while staying fully compliant with regulations.</p>

                        <h2>Understanding the Tax Landscape</h2>
                        <p>India's tax system offers both old and new tax regimes. High earners need to evaluate which regime benefits them more based on their investment patterns and available deductions.</p>

                        <h2>Section 80C: The Foundation</h2>
                        <p>Maximize your ₹1.5 lakh deduction under Section 80C through:</p>
                        <ul>
                            <li><strong>EPF/VPF:</strong> Employee Provident Fund and Voluntary PF</li>
                            <li><strong>PPF:</strong> Public Provident Fund with 15-year lock-in</li>
                            <li><strong>ELSS:</strong> Equity Linked Savings Schemes with shortest lock-in (3 years)</li>
                            <li><strong>Life Insurance Premiums:</strong> For policies in force</li>
                            <li><strong>Tuition Fees:</strong> For up to two children</li>
                        </ul>

                        <h2>Beyond 80C: Additional Deductions</h2>

                        <h3>Section 80D: Health Insurance</h3>
                        <ul>
                            <li>₹25,000 for self, spouse, and children</li>
                            <li>Additional ₹25,000 for parents (₹50,000 if senior citizens)</li>
                        </ul>

                        <h3>Section 80CCD(1B): NPS</h3>
                        <p>Additional ₹50,000 deduction for National Pension System contributions, over and above 80C limit.</p>

                        <h3>Section 24: Home Loan Interest</h3>
                        <p>Deduction up to ₹2 lakh for interest on home loan for self-occupied property.</p>

                        <h2>Advanced Strategies for High Earners</h2>

                        <h3>1. HUF (Hindu Undivided Family)</h3>
                        <p>Creating an HUF can effectively split income and utilize separate tax slabs for the family unit.</p>

                        <h3>2. Family Trusts</h3>
                        <p>For very high net worth individuals, family trusts can provide tax-efficient wealth transfer.</p>

                        <h3>3. Tax-Efficient Investments</h3>
                        <ul>
                            <li>Long-term capital gains on equity (over 1 year) taxed at only 10% above ₹1 lakh</li>
                            <li>Tax-free bonds and municipal bonds</li>
                            <li>Rajiv Gandhi Kisan Yojana for farmers</li>
                        </ul>

                        <h2>Capital Gains Planning</h2>
                        <p>Strategic harvesting of capital gains can minimize tax liability:</p>
                        <ul>
                            <li>Use annual LTCG exemption of ₹1 lakh</li>
                            <li>Offset gains with losses (tax loss harvesting)</li>
                            <li>Consider indexation benefits for debt funds</li>
                        </ul>

                        <h2>Retirement Planning</h2>
                        <p>Maximize contributions to:</p>
                        <ul>
                            <li>NPS (National Pension System)</li>
                            <li>Superannuation funds through employer</li>
                            <li>International retirement accounts if applicable</li>
                        </ul>

                        <h2>Conclusion</h2>
                        <p>Effective tax planning is not about evasion – it's about utilizing legitimate deductions and structuring your finances efficiently. Consult with a qualified tax advisor to create a personalized strategy that aligns with your financial goals and risk tolerance.</p>
                    `,
                    excerpt: "Explore advanced tax planning techniques to optimize your returns and stay compliant with the latest regulatory changes.",
                    category: "Tax Planning",
                    author: "Amit Patel",
                    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
                    published_at: "2024-03-05"
                }
            };

            if (id && mockPosts[id]) {
                setPost(mockPosts[id]);
            }
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 pb-20 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-96 bg-card rounded-2xl animate-pulse mb-8" />
                        <div className="h-8 bg-card rounded animate-pulse mb-4" />
                        <div className="h-4 bg-card rounded animate-pulse w-1/3 mb-8" />
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-4 bg-card rounded animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={`${post.title} | Alpha Investment Management`}
                description={post.excerpt}
            />
            <Navbar />

            {/* Article Header */}
            <section className="pt-32 pb-12 hero-gradient">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.published_at).toLocaleDateString("en-IN", { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{post.author}</p>
                                    <p className="text-xs text-muted-foreground">Financial Expert</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary/50">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary/50">
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-12 lg:py-20">
                <div className="container mx-auto px-4">
                    <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-ul:my-6 prose-li:text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>

                    {/* Article Footer */}
                    <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                            <span className="font-semibold">Related Topics:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Investment', 'Finance', 'Wealth Management', 'Financial Planning'].map(tag => (
                                <span key={tag} className="bg-card border border-border px-3 py-1 rounded-full text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogPost;
