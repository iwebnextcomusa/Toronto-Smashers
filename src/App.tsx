import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Programs } from './components/Programs';
import { Membership } from './components/Membership';
import { Schedule } from './components/Schedule';
import { CourtBooking } from './components/CourtBooking';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { RegistrationModal } from './components/RegistrationModal';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerTitle, setRegisterTitle] = useState('Toronto Smashers Club');

  const handleOpenRegister = (title?: string) => {
    setRegisterTitle(title || 'Toronto Smashers Club');
    setRegisterModalOpen(true);
  };

  const handleOpenBooking = () => {
    const bookingSection = document.getElementById('court-booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenRegister={() => handleOpenRegister('General Membership')}
        />

        {/* About Club Section */}
        <About />

        {/* Why Choose Toronto Smashers */}
        <WhyChooseUs />

        {/* Programs & Academy */}
        <Programs
          onOpenRegister={(programTitle) => handleOpenRegister(programTitle)}
        />

        {/* Membership Rates */}
        <Membership
          onOpenRegister={(planName) => handleOpenRegister(planName)}
        />

        {/* Weekly Schedule Timetable */}
        <Schedule onOpenBooking={handleOpenBooking} />

        {/* Real-Time Court Availability Dashboard & Booking System */}
        <CourtBooking />

        {/* Photo Gallery with Lightbox */}
        <Gallery />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Contact & Map Location */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Chatbot Assistant */}
      <AIChatbot />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Shared Program / Membership Registration Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        initialTitle={registerTitle}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}

