import React, { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { Phone, Mail, MapPin, ShieldCheck, Heart, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-left">
          
          {/* Col 1: Club Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-green-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C10.9 2 10 2.9 10 4V7.5L5.5 12.5C5.1 12.9 5 13.5 5.3 14C5.6 14.5 6.1 14.8 6.7 14.8H17.3C17.9 14.8 18.4 14.5 18.7 14C19 13.5 18.9 12.9 18.5 12.5L14 7.5V4C14 2.9 13.1 2 12 2ZM12 16.5C10.6 16.5 9.5 17.6 9.5 19C9.5 20.4 10.6 21.5 12 21.5C13.4 21.5 14.5 20.4 14.5 19C14.5 17.6 13.4 16.5 12 16.5Z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold font-display tracking-tight text-white block leading-none">
                  TORONTO <span className="text-blue-400">SMASHERS</span>
                </span>
                <span className="text-[9px] text-green-400 font-medium tracking-widest uppercase block mt-0.5">
                  Pickering Badminton Club
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pickering's community badminton hub offering 6 BWF-standard synthetic courts, certified professional coaching, junior academy, and daily open drop-in play.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Certified BWF Standard Facilities & Equipment</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#court-booking" className="hover:text-blue-400 transition-colors">Court Booking</a></li>
              <li><a href="#gallery" className="hover:text-blue-400 transition-colors">Gallery</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-blue-400 transition-colors">Junior Training (Ages 7-15)</a></li>
              <li><a href="#programs" className="hover:text-blue-400 transition-colors">Adult Group Coaching</a></li>
              <li><a href="#programs" className="hover:text-blue-400 transition-colors">Competitive Squad</a></li>
              <li><a href="#programs" className="hover:text-blue-400 transition-colors">Open Drop-In Play</a></li>
              <li><a href="#schedule" className="hover:text-blue-400 transition-colors">Weekly Timetable</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{CLUB_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <a href={`tel:${CLUB_INFO.phone}`} className="hover:text-white">{CLUB_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${CLUB_INFO.email}`} className="hover:text-white">{CLUB_INFO.email}</a>
              </li>
              <li>
                <button
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-blue-400 hover:underline mt-1"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Credit */}
        <div className="pt-8 text-center space-y-2">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Toronto Smashers Badminton Club. All Rights Reserved. Pickering, Ontario, Canada.
          </p>

          {/* Required iWebNext Footer Credit */}
          <div className="text-slate-300 font-medium text-xs pt-1">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-2">iWebNext</a>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn text-left">
          <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-white">Privacy Policy</h3>
            <div className="space-y-3 text-xs leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                At <strong>Toronto Smashers Badminton Club</strong>, we respect your privacy and protect your personal information.
              </p>
              <p>
                <strong>Information Collection:</strong> We collect details such as your name, email address, phone number, and court booking preferences solely to facilitate program registration, court availability management, and customer service.
              </p>
              <p>
                <strong>Data Protection:</strong> We do not sell or lease your personal information to third parties. All online booking and form records are stored securely.
              </p>
              <p>
                <strong>Contact:</strong> For privacy requests, please contact Coach Gobi at gobikrishnant@gmail.com or 905-781-3074.
              </p>
            </div>

            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};
