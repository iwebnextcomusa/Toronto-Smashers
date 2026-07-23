import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Award, ChevronRight } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenRegister: (title?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Membership', href: '#membership' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-3 border-b border-slate-800/60'
          : 'bg-slate-950/70 backdrop-blur-sm py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              {/* Shuttlecock stylized icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C10.9 2 10 2.9 10 4V7.5L5.5 12.5C5.1 12.9 5 13.5 5.3 14C5.6 14.5 6.1 14.8 6.7 14.8H17.3C17.9 14.8 18.4 14.5 18.7 14C19 13.5 18.9 12.9 18.5 12.5L14 7.5V4C14 2.9 13.1 2 12 2ZM12 16.5C10.6 16.5 9.5 17.6 9.5 19C9.5 20.4 10.6 21.5 12 21.5C13.4 21.5 14.5 20.4 14.5 19C14.5 17.6 13.4 16.5 12 16.5Z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-white block leading-none">
                TORONTO <span className="text-blue-400">SMASHERS</span>
              </span>
              <span className="text-[10px] text-green-400 font-medium tracking-widest uppercase block mt-0.5">
                Pickering Badminton Club
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white hover:text-blue-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CLUB_INFO.phone}`}
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60 hover:bg-slate-700/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-green-400" />
              <span>{CLUB_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Court</span>
            </button>

            <button
              onClick={() => onOpenRegister('Membership')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg shadow-md shadow-green-600/20 transition-all flex items-center gap-1 active:scale-95"
            >
              <span>Join Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Court Online</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister('General Join');
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Join Toronto Smashers</span>
            </button>
            <a
              href={`tel:${CLUB_INFO.phone}`}
              className="text-center text-xs text-slate-400 py-2 hover:text-green-400"
            >
              📞 Call Club: {CLUB_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
