import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
    const missionVideoRef = useRef(null);
    const [isMissionPlaying, setIsMissionPlaying] = useState(false);
    const visionVideoRef = useRef(null);
    const [isVisionPlaying, setIsVisionPlaying] = useState(false);

    const toggleMissionPlay = () => {
        if (missionVideoRef.current) {
            if (isMissionPlaying) missionVideoRef.current.pause();
            else missionVideoRef.current.play();
            setIsMissionPlaying(!isMissionPlaying);
        }
    };

    const toggleVisionPlay = () => {
        if (visionVideoRef.current) {
            if (isVisionPlaying) visionVideoRef.current.pause();
            else visionVideoRef.current.play();
            setIsVisionPlaying(!isVisionPlaying);
        }
    };

    return (
        <>
            {/* Part 1: Mission Card (Persisting Warm Background) */}
            <section className="relative bg-[#FFF5F0] pb-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Floating Mission Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative -mt-3 z-20 bg-white p-10 md:p-16 shadow-xl text-center max-w-5xl mx-auto border border-slate-100 rounded-none"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-tight">
                        Our mission is to make it simple to <br className="hidden md:block" /> connect and do business.
                    </h3>
                    <p className="text-slate-600 font-sans leading-relaxed max-w-3xl mx-auto text-[12px] md:text-[13px] font-normal">
                        We make traditional medical consultations obsolete by transforming how our patients 
                        manage their health journeys, creating efficiencies and freeing our patients to live their 
                        lives to the fullest.
                    </p>
                </motion.div>
            </div>
        </section>

        {/* Part 2: Zig-Zag Sections (Background Image) */}
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background image overlay with 10% opacity */}
            <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: "url('/images/bg2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} 
            />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="space-y-32">
                    {/* Row 1: Mission (Solving a big problem) */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:max-w-xl w-full"
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">
                                Solving a big problem
                            </h3>
                            <div className="space-y-4 text-slate-900 font-sans leading-relaxed text-[12px] font-medium">
                                <p>
                                    Recent research shows that over 85% of patients seeking specialized ENT care experience delays due to fragmented healthcare systems, manual appointment scheduling, and disconnected medical histories.
                                </p>
                                <p>
                                    Issues like long waiting cycles, missing information on vital diagnostic reports, and lack of direct communication with specialists are the leading cause of treatment delays and missed checkups. For chronic conditions like sinusitis or hearing loss, this is a time-consuming, inefficient, and costly way to heal.
                                </p>
                                <p>
                                    Without a centralized system, patients often find themselves repeating tests or navigating confusing referral networks, heavily increasing their anxiety and financial burden during critical health moments.
                                </p>
                                <p>
                                    We have been helping patients streamline their medical workflow by providing a deeply integrated platform. From instantly booking specialist consultations to generating, processing, and accessing auditory and sinus reports, we ensure every step of the patient journey is trackable and transparent.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-[325px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl relative cursor-pointer group shrink-0"
                            onClick={toggleMissionPlay}
                        >
                            <video ref={missionVideoRef} className="w-full h-full object-cover" onEnded={() => setIsMissionPlaying(false)} playsInline>
                                <source src="https://res.cloudinary.com/dgzxmhgtl/video/upload/v1775211527/Doctor_Treats_Patient_s_Ear_Video_v05fyz.mp4" type="video/mp4" />
                            </video>
                            {!isMissionPlaying && (
                                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-rose-500 border-b-[10px] border-b-transparent"></div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Row 2: Vision (Helping families succeed faster) */}
                    <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20">
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:max-w-xl w-full"
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">
                                Helping families succeed faster
                            </h3>
                            <div className="space-y-4 text-slate-900 font-sans leading-relaxed text-[12px] font-medium">
                                <p>
                                    We believe that world-class healthcare should be instantly accessible. We free our patients from outdated medical processes and simplify their lives with a modern, patient-first solution that is:
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-2 shrink-0" />
                                        <span><strong>Automated and efficient tracking:</strong> Suvidha automates manual documentation, helping families continuously record symptom progression, vital signs, and post-operative recovery timelines automatically.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-2 shrink-0" />
                                        <span><strong>Unified and integrated records:</strong> We keep all your complex ENT imaging, audiograms, and surgical notes in one hyper-secure location, instantly accessible by multidisciplinary specialists across our entire network.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-2 shrink-0" />
                                        <span><strong>Seamless continuity of care:</strong> Ensure uninterrupted recovery protocols with smart notifications for upcoming follow-ups, medication reminders, and direct tele-health integration right from your home.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-2 shrink-0" />
                                        <span><strong>Transparent clinical coordination:</strong> Empowering families with complete visibility into treatment plans and multidisciplinary discussions to ensure you always make informed decisions.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-[325px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl relative cursor-pointer group shrink-0"
                            onClick={toggleVisionPlay}
                        >
                            <video ref={visionVideoRef} className="w-full h-full object-cover" onEnded={() => setIsVisionPlaying(false)} playsInline>
                                <source src="https://res.cloudinary.com/dgzxmhgtl/video/upload/v1775212886/Happy_Patient_After_Nose_Treatment_lratlf.mp4" type="video/mp4" />
                            </video>
                            {!isVisionPlaying && (
                                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-rose-500 border-b-[10px] border-b-transparent"></div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default MissionVision;
