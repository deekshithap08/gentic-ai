import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { motion } from 'framer-motion';
import { Bed, Bath, ChefHat, Plus, Minus, Check } from 'lucide-react';

const Step3RoomReqs: React.FC = () => {
    const { data, updateData } = useFormContext();

    const Counter: React.FC<{ label: string; value: number; onUpdate: (val: number) => void; icon: any }> = ({ label, value, onUpdate, icon: Icon }) => (
        <div className="p-8 bg-white/40 backdrop-blur-md border border-slate-100 rounded-[2.5rem] flex justify-between items-center transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100 group">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Icon size={28} />
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</span>
                    <h5 className="text-xl font-bold text-slate-800">{label}</h5>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onUpdate(Math.max(1, value - 1))}
                    className="w-12 h-12 rounded-2xl border-2 border-slate-100 flex items-center justify-center font-bold text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all font-mono"
                >
                    <Minus size={20} />
                </motion.button>
                <motion.span
                    key={value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-black text-slate-900 w-10 text-center"
                >
                    {value}
                </motion.span>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onUpdate(value + 1)}
                    className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-900 hover:bg-slate-200 transition-all"
                >
                    <Plus size={20} />
                </motion.button>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Counter label="Bedrooms" icon={Bed} value={data.rooms.bedrooms} onUpdate={(v) => updateData('rooms', { bedrooms: v })} />
                <Counter label="Bathrooms" icon={Bath} value={data.rooms.bathrooms} onUpdate={(v) => updateData('rooms', { bathrooms: v })} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Kitchen Logic */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-4 ml-2">
                        <ChefHat className="text-brand-primary" size={20} />
                        <label className="text-xs font-black uppercase tracking-widest text-slate-800">Culinary Layout</label>
                    </div>
                    <div className="flex p-2 bg-slate-900/5 rounded-3xl gap-2 h-20">
                        {['Open', 'Closed'].map((type) => (
                            <button
                                key={type}
                                onClick={() => updateData('rooms', { kitchenType: type as any })}
                                className={`flex-1 rounded-2xl font-black transition-all ${data.rooms.kitchenType === type
                                    ? 'bg-white text-slate-900 shadow-xl'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ancillary Grid (Filling space) */}
                <div className="lg:col-span-7 space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 block mb-6">Specified Utility Zones</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { id: 'studyRoom', label: 'Study' },
                            { id: 'poojaRoom', label: 'Pooja' },
                            { id: 'utilityRoom', label: 'Utility' },
                            { id: 'storeRoom', label: 'Store' }
                        ].map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ y: -4 }}
                                onClick={() => updateData('rooms', { [item.id]: !data.rooms[item.id as keyof typeof data.rooms] })}
                                className={`h-24 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${data.rooms[item.id as keyof typeof data.rooms]
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl'
                                    : 'bg-white/50 border-slate-50 text-slate-300 hover:border-slate-200'
                                    }`}
                            >
                                {data.rooms[item.id as keyof typeof data.rooms] && <Check size={14} className="text-brand-primary" />}
                                <span className="font-black text-[11px] uppercase tracking-tighter">{item.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3RoomReqs;
