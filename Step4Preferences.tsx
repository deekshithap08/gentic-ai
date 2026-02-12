import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { motion } from 'framer-motion';
import { Palette, Car, ShieldCheck, Umbrella } from 'lucide-react';

const Step4Preferences: React.FC = () => {
    const { data, updateData } = useFormContext();

    const BigSelect: React.FC<{ label: string, current: string, options: string[], field: string, icon: any }> = ({ label, current, options, field, icon: Icon }) => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 ml-2">
                <Icon className="text-brand-primary" size={18} />
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{label}</label>
            </div>
            <div className="flex flex-wrap gap-3">
                {options.map(opt => (
                    <motion.button
                        key={opt}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateData('preferences', { [field]: opt })}
                        className={`px-8 py-5 rounded-[2rem] border-2 font-black text-sm transition-all shadow-sm ${current === opt
                                ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200'
                                : 'bg-white/40 backdrop-blur-md border-slate-100 text-slate-300 hover:border-slate-200 hover:text-slate-500'
                            }`}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
                <BigSelect
                    label="Metaphysical (Vastu)"
                    current={data.preferences.vastuCompliance}
                    options={['Off', 'Basic', 'Strict']}
                    field="vastuCompliance"
                    icon={ShieldCheck}
                />

                <BigSelect
                    label="Transit (Parking)"
                    current={data.preferences.parking}
                    options={['None', '2W', '4W', 'Both']}
                    field="parking"
                    icon={Car}
                />
            </div>

            <div className="space-y-12">
                <BigSelect
                    label="Stylistic DNA"
                    current={data.preferences.style}
                    options={['Modern', 'Traditional', 'Contemporary']}
                    field="style"
                    icon={Palette}
                />

                <BigSelect
                    label="Open Spaces"
                    current={data.preferences.balcony}
                    options={['None', 'Standard', 'Luxury']}
                    field="balcony"
                    icon={Umbrella}
                />
            </div>
        </div>
    );
};

export default Step4Preferences;
