import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, GitFork } from 'lucide-react';
import { fetchGitHubStats } from '../services/GithubAPI';

interface Stats {
    repos: number;
    stars: number;
    followers: number;
    totalCommits: number;
}

export const GitHubStats: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ repos: 0, stars: 0, followers: 0, totalCommits: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGitHubStats()
            .then(data => {
                setStats({
                    repos: data.repos,
                    stars: data.stars,
                    followers: data.followers,
                    totalCommits: data.totalCommits,
                });
            })
            .finally(() => setLoading(false));
    }, []);

    const statItems = [
        { icon: GitFork, label: 'Repositories', value: stats.repos, color: 'text-violet-400' },
        { icon: Star, label: 'Stars', value: stats.stars, color: 'text-yellow-400' },
        { icon: Users, label: 'Followers', value: stats.followers, color: 'text-cyan-400' },
    ];

    return (
        <section className="py-12 bg-[#030014] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Github className="text-violet-400" />
                        GitHub Activity
                    </h2>
                    <p className="text-gray-400">Live statistics from github.com/CODER-7777</p>
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-400">Fetching live data from GitHub...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {statItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-violet-500/50 transition-all group"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-all">
                                        <item.icon size={32} className={item.color} />
                                    </div>
                                    <div className="text-center">
                                        <motion.div
                                            className={`text-4xl font-bold ${item.color}`}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            {item.value}
                                        </motion.div>
                                        <div className="text-gray-400 text-sm mt-2">{item.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Total contributions counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-full border border-violet-500/30">
                        <span className="text-gray-400">Estimated Contributions:</span>
                        <CountUp end={stats.totalCommits} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Animated counter component
const CountUp: React.FC<{ end: number }> = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const increment = Math.ceil(end / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [end]);

    return <span className="text-violet-400 font-bold text-xl">{count.toLocaleString()}</span>;
};
