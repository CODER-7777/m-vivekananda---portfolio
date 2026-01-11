import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, excerpt, date, author, category }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-colors duration-300"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-cyan-400 rounded-full border border-cyan-500/30">
                    {category}
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {date}
                </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 transition-all duration-300">
                {title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {excerpt}
            </p>

            <div className="flex items-center pt-4 border-t border-white/5">
                <div className="flex items-center text-xs text-gray-300">
                    <User className="w-3 h-3 mr-1" />
                    {author}
                </div>
                <button className="ml-auto text-xs text-pink-400 font-medium group-hover:text-pink-300 transition-colors">
                    Read More →
                </button>
            </div>
        </div>
    </motion.div>
);

export const Blog: React.FC = () => {
    const posts = [
        {
            title: "The Future of AI in Web Development",
            excerpt: "Exploring how generative AI is reshaping the way we build and interact with web applications. From code generation to dynamic UI systems.",
            date: "Oct 15, 2025",
            author: "M Vivekananda",
            category: "Tech"
        },
        {
            title: "Mastering Tailwind CSS Gradients",
            excerpt: "A deep dive into creating stunning visual effects using Tailwind's utility classes. Learn how to build neon glows and complex backgrounds.",
            date: "Sep 28, 2025",
            author: "M Vivekananda",
            category: "Design"
        },
        {
            title: "Building Scalable React Applications",
            excerpt: "Key principles for architecting large-scale React apps. State management, performance optimization, and project structure best practices.",
            date: "Aug 10, 2025",
            author: "M Vivekananda",
            category: "Engineering"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <Link to="/" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text">
                    Latest Insights
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <BlogCard key={index} {...post} />
                ))}
            </div>
        </div>
    );
};
