import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AppointmentModal from './components/AppointmentModal';
import ProblemsSection from './components/ProblemsSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import DoctorSection from './components/DoctorSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import AboutPage from './pages/AboutPage';
import HappyPatientsPage from './pages/HappyPatientsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

// Admin Imports
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import Inquiries from './pages/admin/Inquiries';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import BlogsAdmin from './pages/admin/BlogsAdmin';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';

import { Navigate } from 'react-router-dom';

// Scroll to top on navigation component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Admin Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-sky/20 border-t-sky rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

const AdminSettings = () => (
  <div className="py-20 text-center text-slate-300 italic font-sans bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white">
      General hospital settings coming soon.
  </div>
);

const Home = ({ onOpenAppointment }) => (
  <main>
    <HeroSlider />
    <ProblemsSection />
    <DoctorSection onOpenAppointment={onOpenAppointment} />
    <GallerySection />
    <SpecialtiesSection />
    <ReviewsSection />
    <ContactSection />
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
      <AuthProvider>
        <ScrollToTop />
        <AppContent onOpenModal={handleOpenModal} modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
      </AuthProvider>
    </Router>
  );
};

const AppContent = ({ onOpenModal, modalOpen, handleCloseModal }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className={`relative font-sans bg-white selection:bg-mint-dark selection:text-white ${isAdminPath ? 'bg-slate-50' : ''}`}>
      {!isAdminPath && <Navbar onOpenAppointment={onOpenModal} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home onOpenAppointment={onOpenModal} />} />
        <Route path="/about" element={<AboutPage onOpenAppointment={onOpenModal} />} />
        <Route path="/happy-patients" element={<HappyPatientsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        
        {/* Detail Pages */}
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
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/appointments" element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/inquiries" element={
          <ProtectedRoute>
            <Inquiries />
          </ProtectedRoute>
        } />

        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <GalleryAdmin />
          </ProtectedRoute>
        } />

        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <BlogsAdmin />
          </ProtectedRoute>
        } />

        <Route path="/admin/testimonials" element={
          <ProtectedRoute>
            <TestimonialsAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        } />

        <Route path="*" element={isAdminPath ? <Navigate to="/admin" replace /> : <Home onOpenAppointment={onOpenModal} />} />
      </Routes>

      {!isAdminPath && (
        <>
          <Footer onOpenAppointment={onOpenModal} />
          <AppointmentModal isOpen={modalOpen} onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
};

export default App;
