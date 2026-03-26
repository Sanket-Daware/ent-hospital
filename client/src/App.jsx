import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AppointmentModal from './components/AppointmentModal';
import ProblemsSection from './components/ProblemsSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import PromoSection from './components/PromoSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

// Scroll to top on navigation component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = ({ onOpenAppointment }) => (
  <main>
    <HeroSlider />
    <ProblemsSection />
    <PromoSection onOpenAppointment={onOpenAppointment} />
    <GallerySection />
    <SpecialtiesSection />
  </main>
);

// Placeholder Detail Page Component
const DetailPage = ({ title, description, symptoms }) => (
  <div className="pt-32 pb-24 min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-bold text-slate-800 mb-8">{title}</h1>
      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 mb-12 shadow-inner flex items-center justify-center">
        <p className="text-slate-400 font-accent text-3xl italic">Detailed medical information coming soon</p>
      </div>
      <p className="text-xl text-slate-600 font-sans leading-relaxed mb-12">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-sky rounded-3xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Common Symptoms</h3>
          <ul className="space-y-3 font-sans text-slate-600">
            {symptoms.map((s, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-sky-dark mt-2 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 bg-mint rounded-3xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Treatment Options</h3>
          <p className="font-sans text-slate-600 leading-relaxed mb-6">
            We offer advanced diagnostic procedures and tailored treatment plans for {title.toLowerCase()}.
          </p>
          <button className="w-full py-3 bg-white text-slate-800 rounded-xl font-bold shadow-sm hover:shadow-md transition-shadow">
            Consult a Specialist
          </button>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [modalOpen, setModalOpen] = useState(true); // Open on load
  const [hasShownInitialModal, setHasShownInitialModal] = useState(false);

  // Use session storage to track if modal was already shown in this session
  useEffect(() => {
    const shown = sessionStorage.getItem('ent_modal_shown');
    if (!shown) {
      setModalOpen(true);
      // We'll set the flag after the first time they interact
    } else {
      setModalOpen(false);
    }
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    sessionStorage.setItem('ent_modal_shown', 'true');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="relative font-sans bg-white selection:bg-mint-dark selection:text-white">
        <Navbar onOpenAppointment={handleOpenModal} />

        <Routes>
          <Route path="/" element={<Home onOpenAppointment={handleOpenModal} />} />
          <Route path="/ear" element={
            <DetailPage
              title="Ear Care Specialists"
              description="Our comprehensive ear care services cover everything from common ear infections to complex hearing loss issues. We use advanced audiometry and diagnostic tools to ensure optimal auditory health."
              symptoms={['Gradual or sudden hearing loss', 'Persistent ringing in ears (Tinnitus)', 'Ear pain or feeling of fullness', 'Ear infections & discharge', 'Dizziness or balance issues']}
            />
          } />
          <Route path="/nose" element={
            <DetailPage
              title="Nose & Sinus Treatments"
              description="Chronic sinusitis and nasal obstructions can significantly impact your quality of life. Our specialists provide both medical and surgical solutions for complex nasal conditions."
              symptoms={['Chronic nasal congestion', 'Frequent sinus headaches', 'Loss of sense of smell', 'Recurrent nosebleeds', 'Deviated nasal septum']}
            />
          } />
          <Route path="/throat" element={
            <DetailPage
              title="Throat & Voice Care"
              description="Voice problems, swallowing difficulties, and chronic throat infections require expert evaluation. We offer endo-laryngeal diagnostics and state-of-the-art voice therapy."
              symptoms={['Chronic hoarseness or voice changes', 'Sore throat or frequent tonsillitis', 'Difficulty swallowing (Dysphagia)', 'Lump sensation in the throat', 'Persistent cough']}
            />
          } />
          <Route path="/head-neck" element={
            <DetailPage
              title="Head & Neck Surgery"
              description="Our oncology and surgical specialists manage thyroid issues, salivary gland conditions, and tumors of the head and neck area with extreme precision and care."
              symptoms={['Swelling or lumps in the neck', 'Thyroid nodules or enlargement', 'Salivary gland stones or swelling', 'Chronic oral lesions', 'Persistent neck pain']}
            />
          } />
          <Route path="/pediatric" element={
            <DetailPage
              title="Pediatric ENT Care"
              description="Children require a gentle and specialized approach to ENT care. We handle birth defects, sleep apnea, and common pediatric conditions with a child-friendly environment."
              symptoms={['Recurrent ear infections in children', 'Enlarged tonsils or adenoids', 'Congenital ENT abnormalities', 'Pediatric hearing loss', 'Noisy breathing (Stridor)']}
            />
          } />
          <Route path="/sleep" element={
            <DetailPage
              title="Sleep & Snoring Solutions"
              description="Sleep apnea is more than just noise—it's a health risk. We provide sleep studies and comprehensive management strategies for snoring and obstructive sleep apnea."
              symptoms={['Exloud snoring at night', 'Gasping for air during sleep', 'Excessive daytime sleepiness', 'Morning headaches', 'Observed breathing pauses']}
            />
          } />
          {/* Catch-all for our Expertise, Contact, etc placeholder routes */}
          <Route path="*" element={<Home onOpenAppointment={handleOpenModal} />} />
        </Routes>

        <Footer onOpenAppointment={handleOpenModal} />
        <AppointmentModal isOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    </Router>
  );
};

export default App;
