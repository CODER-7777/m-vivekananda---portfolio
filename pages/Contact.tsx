import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 max-w-5xl mx-auto flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-12">
                <Link to="/" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
                    Get in Touch
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                    <p className="text-gray-400 text-lg">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <Mail className="w-5 h-5 text-pink-500" />
                            </div>
                            <span>your.email@example.com</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <Phone className="w-5 h-5 text-purple-500" />
                            </div>
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <MapPin className="w-5 h-5 text-cyan-500" />
                            </div>
                            <span>Hyderabad, India</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Subject</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="button" // Change to submit when connected
                            className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                        >
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
