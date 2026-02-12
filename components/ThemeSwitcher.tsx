import React, { useState, useEffect } from 'react';
import { Palette, Moon, Sun, Zap, Monitor } from 'lucide-react';

export type Theme = 'dark' | 'light' | 'neon' | 'cyberpunk' | 'retro';

interface ThemeSwitcherProps {
    onThemeChange?: (theme: Theme) => void;
    value?: Theme; // Controlled prop
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, value }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
    const [isOpen, setIsOpen] = useState(false);

    // Sync with external control (e.g. Konami code)
    useEffect(() => {
        if (value && value !== currentTheme) {
            applyTheme(value);
        }
    }, [value]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    }, []);

    const applyTheme = (theme: Theme) => {
        setCurrentTheme(theme);
        localStorage.setItem('portfolio-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        onThemeChange?.(theme);
    };

    const themes = [
        { name: 'dark' as Theme, label: 'Dark', icon: Moon, color: 'bg-gray-900' },
        { name: 'light' as Theme, label: 'Light', icon: Sun, color: 'bg-gray-100' },
        { name: 'neon' as Theme, label: 'Neon', icon: Zap, color: 'bg-pink-600' },
        { name: 'cyberpunk' as Theme, label: 'Cyberpunk', icon: Monitor, color: 'bg-cyan-600' },
        { name: 'retro' as Theme, label: 'Retro', icon: Palette, color: 'bg-yellow-600' },
    ];

    return (
        <div className="fixed top-6 right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg"
                aria-label="Theme Switcher"
            >
                <Palette size={24} className="text-white" />
            </button>

            {isOpen && (
                <div className="absolute top-16 right-0 bg-[#0a0a1a] backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]">
                    <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">
                        Themes
                    </h3>
                    <div className="space-y-2">
                        {themes.map(theme => {
                            const Icon = theme.icon;
                            return (
                                <button
                                    key={theme.name}
                                    onClick={() => {
                                        applyTheme(theme.name);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${currentTheme === theme.name ? 'bg-white/10 ring-2 ring-violet-500' : ''
                                        }`}
                                >
                                    <div className={`w-8 h-8 ${theme.color} rounded-full flex items-center justify-center`}>
                                        <Icon size={16} className="text-white" />
                                    </div>
                                    <span className="text-white text-sm">{theme.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
