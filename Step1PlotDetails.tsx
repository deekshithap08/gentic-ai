import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { motion } from 'framer-motion';
import { Map, Compass, Maximize2, Move } from 'lucide-react';

const Step1PlotDetails: React.FC = () => {
    const { data, updateData } = useFormContext();

    return (
        <div className="space-y-12">
            {/* Massive Dimension Entry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="group relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-brand-primary/20 pointer-events-none group-hover:border-brand-primary/50 transition-colors" />
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block ml-2">Plot Length Axis</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={data.plot.length}
                            onChange={(e) => updateData('plot', { length: Number(e.target.value) })}
                            className="w-full p-8 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-[2.5rem] focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all text-5xl font-black text-slate-900"
                            placeholder="00"
                        />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-200 uppercase tracking-tighter">ft</span>
                    </div>
                </div>

                <div className="group relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-brand-primary/20 pointer-events-none group-hover:border-brand-primary/50 transition-colors" />
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block ml-2">Plot Width Axis</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={data.plot.width}
                            onChange={(e) => updateData('plot', { width: Number(e.target.value) })}
                            className="w-full p-8 bg-white/50 backdrop-blur-sm border-2 border-slate-100 rounded-[2.5rem] focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all text-5xl font-black text-slate-900"
                            placeholder="00"
                        />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-200 uppercase tracking-tighter">ft</span>
                    </div>
                </div>
            </div>

            {/* Context Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Compass className="text-brand-primary" size={20} />
                        <label className="text-xs font-black uppercase tracking-widest text-slate-800">Celestial Facing</label>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {['N', 'S', 'E', 'W'].map(facing => (
                            <motion.button
                                key={facing}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateData('plot', { facing: facing as any })}
                                className={`h-20 rounded-2xl border-2 font-black text-xl transition-all ${data.plot.facing === facing
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xl'
                                        : 'bg-white border-slate-100 text-slate-300 hover:border-slate-300'
                                    }`}
                            >
                                {facing}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Map className="text-brand-primary" size={20} />
                        <label className="text-xs font-black uppercase tracking-widest text-slate-800">Geospatial Context</label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.plot.location}
                            onChange={(e) => updateData('plot', { location: e.target.value })}
                            className="w-full p-6 bg-white/50 border-2 border-slate-100 rounded-3xl focus:border-brand-primary outline-none transition-all text-lg font-bold text-slate-700 placeholder:text-slate-200"
                            placeholder="Identify City / District"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-xl">
                            <Move size={16} className="text-slate-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Decorative Tip */}
            <div className="p-8 bg-brand-primary/5 rounded-[3rem] border border-brand-primary/10 flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-brand-primary">
                    <Maximize2 size={24} />
                </div>
                <div className="space-y-1">
                    <h5 className="font-black text-slate-900 text-sm uppercase tracking-tight">Adaptive Plot Recognition</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Our AI calculates setbacks and local zoning laws automatically based on these coordinates. Large dimensions allow for grand lobbies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Step1PlotDetails;
