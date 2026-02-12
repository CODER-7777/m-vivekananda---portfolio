import React, { useState } from 'react';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
import { soundManager } from '../services/SoundManager';

export const SoundControls: React.FC = () => {
    const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled());
    const [musicEnabled, setMusicEnabled] = useState(soundManager.isMusicEnabled());
    const [volume, setVolume] = useState(soundManager.getVolume());

    const toggleSound = () => {
        const enabled = soundManager.toggleSound();
        setSoundEnabled(enabled);
        if (enabled) {
            soundManager.play('success');
        }
    };

    const toggleMusic = () => {
        const enabled = soundManager.toggleMusic();
        setMusicEnabled(enabled);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        soundManager.setVolume(newVolume);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-xl">
            <div className="flex flex-col gap-3">
                {/* Sound Toggle */}
                <button
                    onClick={toggleSound}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    title="Toggle Sound Effects"
                >
                    {soundEnabled ? (
                        <Volume2 size={20} className="text-cyan-400" />
                    ) : (
                        <VolumeX size={20} className="text-gray-500" />
                    )}
                    <span className="text-white text-sm">SFX</span>
                </button>

                {/* Music Toggle */}
                <button
                    onClick={toggleMusic}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    title="Toggle Background Music"
                >
                    {musicEnabled ? (
                        <Music size={20} className="text-violet-400" />
                    ) : (
                        <MicOff size={20} className="text-gray-500" />
                    )}
                    <span className="text-white text-sm">Music</span>
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
