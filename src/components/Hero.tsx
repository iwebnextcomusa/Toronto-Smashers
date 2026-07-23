import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Users, Trophy, MapPin } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenRegister }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center bg-slate-950 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_badminton_smash_1784825336219.jpg"
          alt="Badminton Smash Action at Toronto Smashers Pickering"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 text-left">
          {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Pickering, Ontario, Canada</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
              Smash Hard. <br className="hidden sm:block" />
              Play Smart. <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-green-400 bg-clip-text text-transparent">
                Join Toronto Smashers.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              {CLUB_INFO.description} Experience 6 BWF-standard synthetic courts, certified professional coaching, and vibrant open drop-in games.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRegister}
                className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-slate-100 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-green-400" />
                <span>Book Court</span>
              </button>

              <a
                href="#schedule"
                className="px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Schedule</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-white">6 Courts</div>
                  <div className="text-xs text-slate-400">BWF Synthetic</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-white">350+</div>
                  <div className="text-xs text-slate-400">Active Members</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-white">8 Coaches</div>
                  <div className="text-xs text-slate-400">BWF Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};
