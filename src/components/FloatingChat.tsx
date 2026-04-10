import { MessageCircle, X, Send, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  message: string;
}

const quickActions: QuickAction[] = [
  { id: "1", label: "Pricing", message: "Tell me about your pricing plans" },
  { id: "2", label: "Services", message: "What services do you offer?" },
  { id: "3", label: "Empanelment", message: "How do I get empaneled with you?" },
  { id: "4", label: "Contact Team", message: "I want to speak with someone" },
  { id: "5", label: "Portfolio Simulator", message: "How do I simulate my portfolio?" },
  { id: "6", label: "Investment Advice", message: "Where should I invest my money?" },
  { id: "7", label: "Risk Profile", message: "How do I check my risk profile?" },
];

const botResponses: Record<string, string> = {
  greeting: "Hello! 👋 I'm Alpha's AI Assistant. How can I help you today?\n\nYou can ask me about our services, tools, or investment topics!",
  pricing: "We offer flexible pricing plans tailored to your needs.\n\n→ Basic consultation starts at ₹5,000/month\n→ Comprehensive empanelment packages available\n\nWould you like details on a specific plan?",
  services: "We provide:\n• Financial Consulting\n• Empanelment Services\n• Advisory Services\n• Wealth Management\n• Corporate Training\n\nWe also have free online tools — Portfolio Simulator, Risk Analyzer, and Investment Suggestions. Would you like to try one?",
  empanelment: "Our empanelment process is straightforward:\n1. Submit your basic details\n2. Initial screening (1–3 days)\n3. Submit documents\n4. Final approval\n\nWould you like to start the application now?",
  contact: "Great choice! I'm connecting you with a real team member right away.\nA specialist should join you within 1–3 minutes. Feel free to keep chatting here meanwhile 😊",
  fallback: "Hmm, I'm not 100% sure I understood that.\nCould you tell me a bit more? Or choose a quick option below — I can guide you to our Portfolio Simulator, Risk Analyzer, or connect you with our team!",
  help: "I'm here to help! You can ask about:\n• Pricing & plans\n• Our services\n• Empanelment process\n• Portfolio Simulator 📊\n• Investment Suggestions 💡\n• Risk Analyzer 🎯\n• Price Alerts 🔔\n• SIP & market info\n\nWhat would you like to know?",

  // New feature intents
  portfolio: "📊 Our Portfolio Simulator lets you:\n\n1. Select a stock (Reliance, TCS, HDFC, etc.)\n2. Enter the amount you invested\n3. Enter your buy date and price\n\nIt instantly calculates your profit or loss and saves the history!\n\n👉 Go to the 'Tools' page to try it.",
  investment: "💡 Not sure where to invest? Use our Investment Suggestion tool!\n\nJust tell us:\n• Your budget (₹)\n• Your risk appetite (Low / Medium / High)\n\nWe'll give you tailored recommendations — FDs, mutual funds, stocks, and more.\n\n👉 Scroll to the bottom of our Services page!",
  alert: "🔔 You can set Price Alerts for any stock!\n\n• Choose a stock (e.g. RELIANCE, TCS)\n• Set your target price\n• Choose 'above' or 'below'\n• Enter your email\n\nWe check prices every 30 seconds and notify you instantly!\n\n👉 Visit our Tools page to set an alert.",
  risk: "🎯 Our Risk Analyzer helps you understand your investment personality:\n\n1. Enter your monthly income & savings\n2. Select your investment goal (Retirement, Education, Wealth, Emergency)\n\nYou'll get a Conservative / Moderate / Aggressive profile with a customised asset allocation chart!\n\n👉 Try it on the Services page.",
  sip: "📅 SIP (Systematic Investment Plan) is one of the best ways to invest!\n\n• Start with as low as ₹500/month\n• Rupee cost averaging reduces risk\n• Best for 5+ year goals\n• Ideal for index funds and mutual funds\n\nWould you like us to suggest the right SIP for your budget?",
  market: "🕐 Indian Stock Market Hours:\n\n• NSE / BSE: 9:15 AM – 3:30 PM IST\n• Monday to Friday (excluding holidays)\n\nOur live stock ticker at the bottom shows real-time data during market hours.",
};

function getBotResponse(text: string): { response: string; shouldConnect?: boolean } {
  const lower = text.toLowerCase();

  // Greetings first (short messages only)
  if (/^(hi|hello|hey|greetings|namaste)[!. ]*$/i.test(lower.trim())) {
    return { response: botResponses.greeting };
  }

  // Feature intents – checked before generic ones
  if (/portfolio|simulate|profit|loss|return|investment calculator/i.test(lower)) {
    return { response: botResponses.portfolio };
  }
  if (/where.*invest|suggest.*invest|investment advice|budget.*invest|invest.*budget|what.*invest/i.test(lower)) {
    return { response: botResponses.investment };
  }
  if (/alert|notify|watchlist|price alert|price notification/i.test(lower)) {
    return { response: botResponses.alert };
  }
  if (/risk|risk profile|risk analysi|conservative|aggressive|moderate investor/i.test(lower)) {
    return { response: botResponses.risk };
  }
  if (/sip|systematic investment|monthly invest/i.test(lower)) {
    return { response: botResponses.sip };
  }
  if (/market.*open|market.*hours?|nse|bse|trading.*time|market.*time/i.test(lower)) {
    return { response: botResponses.market };
  }

  // Existing intents
  if (/price|cost|plan|pricing|subscription|fee/i.test(lower)) {
    return { response: botResponses.pricing };
  }
  if (/service|offer|provide|what do you do/i.test(lower)) {
    return { response: botResponses.services };
  }
  if (/empanel|empanelment|join|apply|registration|enroll/i.test(lower)) {
    return { response: botResponses.empanelment };
  }
  if (/contact|team|speak|talk|human|person|executive|consultant|call|phone/i.test(lower)) {
    return { response: botResponses.contact, shouldConnect: true };
  }
  if (/help|can you|what can you do|what do you know/i.test(lower)) {
    return { response: botResponses.help };
  }

  return { response: botResponses.fallback };
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: botResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWithTeam, setConnectedWithTeam] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const addBotMessage = (text: string) => {
    const botMsg: Message = {
      id: Date.now().toString() + "-bot",
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleConnectWithTeam = () => {
    if (connectedWithTeam) return;

    setConnectedWithTeam(true);
    addBotMessage(botResponses.contact);
    toast.success("Connected with support team!", { duration: 5000 });
  };

  const processUserMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setHasInteracted(true);
    setIsLoading(true);

    setTimeout(() => {
      const { response, shouldConnect } = getBotResponse(text);

      if (shouldConnect) {
        setTimeout(() => {
          handleConnectWithTeam();
          setIsLoading(false);
        }, 800);
      } else {
        addBotMessage(response);
        setIsLoading(false);
      }
    }, 700); // realistic delay
  };

  const handleQuickAction = (action: QuickAction) => {
    processUserMessage(action.message);

    // Special case for Contact Team quick action
    if (action.label.toLowerCase().includes("contact")) {
      // already handled inside processUserMessage → getBotResponse
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    processUserMessage(inputValue.trim());
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 sm:bottom-32 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 h-[min(80vh,560px)] bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-700/80"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-sm">
              <div>
                <h3 className="font-semibold text-lg">AI Assistant</h3>
                <p className="text-xs opacity-90 mt-0.5">Always here to help</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-yellow-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === "user"
                        ? "bg-yellow-500 text-slate-900 rounded-br-none font-medium"
                        : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60"
                      }`}
                  >
                    {msg.text}
                    <div className="text-xs opacity-50 mt-1.5 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700/60">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce" />
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick actions – only at beginning */}
              {!hasInteracted && messages.length <= 2 && (
                <div className="mt-6 space-y-2.5 px-1">
                  <p className="text-xs text-slate-400 px-2">Quick options</p>
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700/80 active:bg-yellow-600/30 text-slate-100 rounded-xl transition-colors text-sm font-medium border border-slate-700/40 disabled:opacity-50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Connect with team button – only when not yet connected */}
            {!connectedWithTeam && (
              <div className="px-4 py-3 bg-slate-900 border-t border-slate-700">
                <button
                  onClick={handleConnectWithTeam}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  Talk to a Human
                </button>
              </div>
            )}

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-700 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/40 transition-all text-sm disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 p-3 rounded-xl transition-colors flex items-center justify-center min-w-[52px]"
                >
                  <Send className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-xl flex items-center justify-center z-50 text-white hover:shadow-2xl transition-shadow"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </motion.button>
    </>
  );
}