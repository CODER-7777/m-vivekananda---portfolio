import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { PORTFOLIO_DATA } from '../constants';

export const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id_here') {
            setLoading(false);
            setStatus('error');
            setErrorMessage('EmailJS is not configured. Please add your keys to the .env file.');
            console.error('EmailJS keys missing');
            return;
        }

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );
            setStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
                        {Array.isArray(PORTFOLIO_DATA.socials.email) ? (
                            PORTFOLIO_DATA.socials.email.map((email) => (
                                <div key={email} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                        <Mail className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <a href={`mailto:${email}`} className="hover:text-pink-400 transition-colors">{email}</a>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <Mail className="w-5 h-5 text-pink-500" />
                                </div>
                                <a href={`mailto:${PORTFOLIO_DATA.socials.email}`} className="hover:text-pink-400 transition-colors">{PORTFOLIO_DATA.socials.email}</a>
                            </div>
                        )}

                        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <Phone className="w-5 h-5 text-purple-500" />
                            </div>
                            <span>{PORTFOLIO_DATA.socials.phone}</span>
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
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group
                                ${loading ? 'bg-gray-600 cursor-not-allowed' :
                                    status === 'success' ? 'bg-green-600 hover:bg-green-700' :
                                        status === 'error' ? 'bg-red-600 hover:bg-red-700' :
                                            'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-90'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Message Sent!
                                </>
                            ) : status === 'error' ? (
                                <>
                                    <AlertCircle className="w-4 h-4" />
                                    Failed to Send
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {status === 'error' && errorMessage && (
                            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                        )}
                        {status === 'success' && (
                            <p className="text-green-400 text-sm text-center">Success! I'll get back to you soon.</p>
                        )}
                        <p className="text-gray-500 text-xs text-center mt-4 italic">
                            (Yes, this form actually works now! No carrier pigeons involved. 🐦)
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
