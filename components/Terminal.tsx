import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { executeCommand } from '../services/TerminalCommands';

interface TerminalLine {
    type: 'input' | 'output' | 'error';
    content: string;
}

export const Terminal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to M Vivekananda Portfolio Terminal v1.0' },
        { type: 'output', content: 'Type "help" for available commands' },
        { type: 'output', content: '' },
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Toggle terminal with Ctrl+`
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        // Add input to lines
        setLines(prev => [...prev, { type: 'input', content: `$ ${input}` }]);

        // Execute command
        const result = executeCommand(input);

        if (result.output === '__CLEAR__') {
            setLines([]);
        } else {
            setLines(prev => [
                ...prev,
                { type: result.isError ? 'error' : 'output', content: result.output },
                { type: 'output', content: '' },
            ]);
        }

        // Update history
        setHistory(prev => [...prev, input]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;

            const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;

            const newIndex = Math.min(history.length - 1, historyIndex + 1);
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg transition-all group"
                title="Open Terminal (Ctrl+`)"
            >
                <TerminalIcon size={24} className="text-white" />
                <span className="absolute -top-12 right-0 bg-black/90 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Terminal (Ctrl+`)
                </span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-20 right-6 z-50 w-[600px] max-w-[90vw] h-[400px] bg-black/95 backdrop-blur-xl border border-violet-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-violet-900/30 border-b border-violet-500/30">
                <div className="flex items-center gap-2">
                    <TerminalIcon size={16} className="text-violet-400" />
                    <span className="text-sm font-mono text-violet-400">terminal</span>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Output */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap ${line.type === 'input'
                                ? 'text-cyan-400'
                                : line.type === 'error'
                                    ? 'text-red-400'
                                    : 'text-gray-300'
                            }`}
                    >
                        {line.content}
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-black/50 border-t border-violet-500/30">
                <span className="text-cyan-400 font-mono">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white font-mono outline-none"
                    autoComplete="off"
                    spellCheck={false}
                />
            </form>
        </div>
    );
};
