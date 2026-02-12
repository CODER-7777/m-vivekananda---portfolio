import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Smartphone, ExternalLink } from 'lucide-react';

export const ARBusinessCard: React.FC = () => {
    const arUrl = `${window.location.origin}${window.location.pathname}#/ar`;

    return (
        <section className="py-12 bg-[#050510] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Smartphone className="text-pink-400" />
                        AR Business Card
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Scan the QR code with your mobile device to experience an augmented reality view
                    </p>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 inline-block">
                        <div className="bg-white p-4 rounded-lg mb-4">
                            <QRCodeSVG
                                value={arUrl}
                                size={200}
                                level="H"
                                includeMargin
                                fgColor="#7c3aed"
                            />
                        </div>
                        <a
                            href={arUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            <ExternalLink size={16} />
                            Open AR Experience
                        </a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-sm text-gray-500"
                    >
                        <p>📱 Works best on iOS (Safari) and Android (Chrome)</p>
                        <p>Requires camera permissions and AR-compatible device</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
