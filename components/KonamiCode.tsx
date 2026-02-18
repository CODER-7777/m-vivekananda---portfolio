import React, { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

interface KonamiCodeProps {
    onActivate: () => void;
}

export const KonamiCode: React.FC<KonamiCodeProps> = ({ onActivate }) => {
    const [keys, setKeys] = useState<string[]>([]);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase(); // Case insensitive
            // Map arrow keys to standard format just in case
            const normalizedKey = key === 'arrowup' ? 'ArrowUp' :
                key === 'arrowdown' ? 'ArrowDown' :
                    key === 'arrowleft' ? 'ArrowLeft' :
                        key === 'arrowright' ? 'ArrowRight' :
                            key;

            console.log('Key pressed:', normalizedKey); // Debugging

            setKeys(prev => {
                const newKeys = [...prev, normalizedKey];

                // Keep only last 10 keys
                if (newKeys.length > 10) {
                    newKeys.shift();
                }

                // Check if we have enough keys to match
                if (newKeys.length === 10) {
                    const match = KONAMI_CODE.every((k, i) => k.toLowerCase() === newKeys[i].toLowerCase());

                    if (match && !activated) {
                        console.log('Konami Code Activated!');
                        setActivated(true);
                        onActivate();
                        // ... notification logic ...

                        // Show achievement notification
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-8 py-4 rounded-lg shadow-2xl animate-bounce';
                        notification.innerHTML = `
                            <div class="text-center">
                              <div class="text-2xl font-bold mb-2"> KONAMI CODE ACTIVATED! Less Gooo !! </div>
                              <div class="text-sm">Retro mode unlocked!</div>
                            </div>
                        `;
                        document.body.appendChild(notification);

                        setTimeout(() => {
                            notification.remove();
                        }, 3000);

                        return []; // Reset keys after activation
                    }
                }
                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activated, onActivate]);

    return null;
};
