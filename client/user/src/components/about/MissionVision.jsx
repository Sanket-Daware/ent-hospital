import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
    // Mission Video State & Ref
    const missionVideoRef = useRef(null);
    const [isMissionPlaying, setIsMissionPlaying] = useState(false);

    // Vision Video State & Ref
    const visionVideoRef = useRef(null);
    const [isVisionPlaying, setIsVisionPlaying] = useState(false);

    const toggleMissionPlay = () => {
        if (missionVideoRef.current) {
            if (isMissionPlaying) {
                missionVideoRef.current.pause();
            } else {
                missionVideoRef.current.play();
            }
            setIsMissionPlaying(!isMissionPlaying);
        }
    };

    const toggleVisionPlay = () => {
        if (visionVideoRef.current) {
            if (isVisionPlaying) {
                visionVideoRef.current.pause();
            } else {
                visionVideoRef.current.play();
            }
            setIsVisionPlaying(!isVisionPlaying);
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                    {/* Left: Our Mission (Portrait Procedure Video) */}
                    <div className="flex flex-col items-center space-y-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            variants={sectionVariants}
                            className="flex items-center gap-3 w-full max-w-[340px]"
                        >
                            <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center text-mint-dark">
                                <Target size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group cursor-pointer aspect-[9/16] w-full max-w-[340px] max-h-[600px] bg-white flex-shrink-0"
                            onClick={toggleMissionPlay}
                        >
                            <video 
                                ref={missionVideoRef}
                                className="w-full h-full object-cover"
                                onEnded={() => setIsMissionPlaying(false)}
                                playsInline
                            >
                                <source src="https://res.cloudinary.com/dgzxmhgtl/video/upload/v1775211527/Doctor_Treats_Patient_s_Ear_Video_v05fyz.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            
                            {!isMissionPlaying && (
                                <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center group-hover:bg-slate-900/30 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl pl-1 hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-rose-500 border-b-[8px] border-b-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-10 left-0 right-0 text-center px-4">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 py-2 px-4 rounded-xl inline-block shadow-lg">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Medical Procedure</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right: Our Vision (Portrait Happy Patient Video) */}
                    <div className="flex flex-col items-center space-y-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            variants={sectionVariants}
                            className="flex items-center gap-3 w-full max-w-[340px]"
                        >
                            <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center text-sky-dark">
                                <Eye size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group cursor-pointer aspect-[9/16] w-full max-w-[340px] max-h-[600px] bg-white flex-shrink-0"
                            onClick={toggleVisionPlay}
                        >
                            <video 
                                ref={visionVideoRef}
                                className="w-full h-full object-cover"
                                onEnded={() => setIsVisionPlaying(false)}
                                playsInline
                            >
                                <source src="https://res.cloudinary.com/dgzxmhgtl/video/upload/v1775212886/Happy_Patient_After_Nose_Treatment_lratlf.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            
                            {!isVisionPlaying && (
                                <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center group-hover:bg-slate-900/30 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl pl-1 hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-rose-500 border-b-[8px] border-b-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-10 left-0 right-0 text-center px-4">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 py-2 px-4 rounded-xl inline-block shadow-lg">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Happy Patient Story</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
