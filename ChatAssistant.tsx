import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I'm your AI architect. How can I help you with your layout?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: getMockResponse(input),
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const getMockResponse = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('vastu')) return "Variant 1 is fully Vastu compliant. The kitchen is in the South-East and the Master Bedroom is in the South-West.";
        if (lower.includes('cost')) return "The cost breakdown shows that 60% of the budget goes to the primary structure. We can reduce costs by choosing ceramic tiles instead of marble.";
        if (lower.includes('room')) return "You can adjust room sizes in the previous step, or keep this layout which prioritizes a large living area.";
        return "That's an interesting point! I've optimized this layout for maximum natural light and space efficiency.";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 mb-4 overflow-hidden flex flex-col h-96"
                    >
                        {/* Header */}
                        <div className="bg-pastel-skyblue p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <Bot size={20} />
                                <span className="font-semibold">Architect AI</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-gray-800 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your design..."
                                className="flex-1 bg-gray-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pastel-skyblue outline-none"
                            />
                            <button onClick={handleSend} className="bg-pastel-skyblue text-white p-2 rounded-lg hover:bg-opacity-90 transition">
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 text-white p-4 rounded-full shadow-xl hover:scale-110 transition active:scale-95"
            >
                {isOpen ? <X /> : <MessageSquare />}
            </button>
        </div>
    );
};

export default ChatAssistant;
