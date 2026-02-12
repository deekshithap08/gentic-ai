import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, Building2, Layers } from 'lucide-react';

const Step2BudgetFloors: React.FC = () => {
    const { data, updateData } = useFormContext();

    return (
        <div className="space-y-12">
            {/* High-Impact Budget Entry */}
            <div className="space-y-6 relative">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Capital Allocation (Projected)</label>
                    <div className="flex items-center gap-2 text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">
                        <TrendingUp size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Dynamic Market Pricing</span>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-[3.5rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                    <div className="relative flex items-center">
                        <span className="absolute left-10 text-5xl font-black text-slate-200">₹</span>
                        <input
                            type="number"
                            value={data.budget.budget}
                            onChange={(e) => updateData('budget', { budget: Number(e.target.value) })}
                            className="w-full pl-24 pr-12 p-10 bg-white border-2 border-slate-100 rounded-[3rem] focus:border-slate-900 outline-none transition-all text-6xl font-black text-slate-900 tracking-tighter"
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Vertical Ambition */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Building2 className="text-brand-primary" size={20} />
                        <label className="text-xs font-black uppercase tracking-widest text-slate-800">Vertical Ambition</label>
                    </div>
                    <div className="flex gap-4">
                        {[1, 2, 3].map(f => (
                            <motion.button
                                key={f}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateData('budget', { floors: f })}
                                className={`flex-1 flex flex-col items-center justify-center gap-2 h-40 rounded-[2.5rem] border-2 transition-all ${data.budget.floors === f
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xl'
                                        : 'bg-white border-slate-50 text-slate-300 hover:border-slate-200'
                                    }`}
                            >
                                <span className="text-4xl font-black">{f}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{f === 1 ? 'Ground' : `Total Levels`}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Configuration Specs */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Layers className="text-brand-primary" size={20} />
                        <label className="text-xs font-black uppercase tracking-widest text-slate-800">Advanced Config</label>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 'isDuplex', label: 'Lux-Duplex Interconnect', icon: Landmark, desc: 'Adds double-height void & staircase integration.' },
                            { id: 'futureExpansion', label: 'Expansion Provisioning', icon: TrendingUp, desc: 'Optimizes foundation for future vertical growth.' }
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => updateData('budget', { [item.id]: !data.budget[item.id as keyof typeof data.budget] })}
                                className={`group flex items-start gap-6 cursor-pointer p-6 rounded-[2rem] border-2 transition-all ${data.budget[item.id as keyof typeof data.budget]
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                                        : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center ${data.budget[item.id as keyof typeof data.budget] ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                    <item.icon size={22} />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="font-black text-sm uppercase tracking-tight">{item.label}</h5>
                                    <p className={`text-[10px] font-medium leading-relaxed ${data.budget[item.id as keyof typeof data.budget] ? 'text-white/50' : 'text-slate-400'}`}>
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2BudgetFloors;
