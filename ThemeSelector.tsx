import React from 'react';
import { useInteriorTheme, INTERIOR_THEMES } from '../../context/ThemeContext';

const ThemeSelector: React.FC = () => {
    const { currentTheme, setTheme } = useInteriorTheme();

    return (
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Style & Theme</h3>
            <div className="grid grid-cols-1 gap-2">
                {(Object.keys(INTERIOR_THEMES) as Array<keyof typeof INTERIOR_THEMES>).map((themeName) => (
                    <button
                        key={themeName}
                        onClick={() => setTheme(themeName)}
                        className={`text-left px-4 py-3 rounded-xl border transition-all ${currentTheme.name === themeName
                            ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}
                    >
                        <div className="text-xs font-bold">{themeName}</div>
                        <div className={`text-[10px] opacity-60 mt-0.5 ${currentTheme.name === themeName ? 'text-white' : 'text-slate-400'}`}>
                            {INTERIOR_THEMES[themeName].ceilingStyle} Style
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
