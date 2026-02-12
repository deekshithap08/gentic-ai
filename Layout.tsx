import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, HelpCircle, Shield, Sparkles } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-primary selection:text-white">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                {/* Blueprint lines */}
                <div className="absolute top-20 left-10 w-px h-40 bg-slate-200" />
                <div className="absolute top-20 left-10 w-40 h-px bg-slate-200" />
                <div className="absolute bottom-20 right-10 w-px h-40 bg-slate-200" />
                <div className="absolute bottom-20 right-10 w-40 h-px bg-slate-200" />
            </div>

            {/* Header - Advanced Glassmorphism */}
            <header className="fixed top-0 w-full z-50 transition-all duration-300">
                <div className="max-w-[1440px] mx-auto px-6 h-24 flex justify-between items-center">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent" />
                            <span className="text-white font-black text-2xl relative z-10 italic">B</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                                BUILDWISE
                            </h1>
                            <span className="text-[10px] font-black tracking-[0.3em] text-brand-primary uppercase mt-1">
                                Generative Urbanism
                            </span>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-10">
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Workspace</a>
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Collections</a>
                        <div className="w-px h-4 bg-slate-200" />
                        <button className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                            <Sparkles size={14} className="text-brand-primary" /> Platinum Plan
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-12">

                    {/* Left Decorative Column (Filling space) */}
                    <div className="hidden xl:flex col-span-2 flex-col gap-12 pt-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Info size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Platform Meta</span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">Uptime Service</p>
                                    <p className="text-xs font-black text-slate-600">99.98% Active</p>
                                </div>
                                <div className="h-px bg-slate-100" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">Region Code</p>
                                    <p className="text-xs font-black text-slate-600">Global Blueprints</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900/5 rounded-[2rem] space-y-4 border border-slate-900/5">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">AI Readiness</h4>
                            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    className="bg-brand-primary h-full"
                                />
                            </div>
                            <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                                Our neural synthesis engine is ready for complex structural constraints.
                            </p>
                        </div>
                    </div>

                    {/* Central Stage */}
                    <div className="col-span-12 xl:col-span-8">
                        {title && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-12"
                            >
                                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tightest mb-4">
                                    {title}
                                </h2>
                                {subtitle && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-px bg-brand-primary" />
                                        <p className="text-slate-400 text-lg font-medium italic">
                                            {subtitle}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Decorative Column (Filling space) */}
                    <div className="hidden xl:flex col-span-2 flex-col gap-12 pt-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Shield size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                All generated layouts adhere to ISO:ARCHITECTURE-2026 standards for residential safety.
                            </p>
                        </div>

                        <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm transform rotate-3">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4">
                                <HelpCircle size={20} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Need Guidance?</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                                Our consultants are available for personalized design review.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100 px-6">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 grayscale opacity-40">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white italic font-black">
                            B
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase">Buildwise Neural Architect</span>
                    </div>
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <a href="#" className="hover:text-slate-900">Terms</a>
                        <a href="#" className="hover:text-slate-900">Privacy</a>
                        <a href="#" className="hover:text-slate-900">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
