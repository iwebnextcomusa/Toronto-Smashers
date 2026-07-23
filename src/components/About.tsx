import React from 'react';
import { Shield, Users, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Collage & Highlights */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="/src/assets/images/badminton_facility_court_1784825352435.jpg"
                alt="Toronto Smashers Badminton Club Pickering Facility"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold font-display text-lg">
                    6
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white font-display">BWF Standard Synthetic Courts</h4>
                    <p className="text-xs text-slate-300">Anti-glare LED lighting & high shock-absorption flooring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-4 sm:-right-6 bg-gradient-to-tr from-green-600 to-emerald-500 text-white p-5 rounded-2xl shadow-xl hidden sm:flex flex-col items-center justify-center border-2 border-white">
              <Award className="w-8 h-8 mb-1" />
              <span className="text-2xl font-extrabold font-display leading-none">100%</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">Certified Coaches</span>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-wider">
              About Toronto Smashers
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              Pickering's Premier Hub for <span className="text-blue-600">Badminton Excellence</span> & Community
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Founded with a passion for bringing high-caliber badminton to Pickering and the Greater Toronto Area, <strong>Toronto Smashers</strong> provides a world-class environment where players of all ages can learn, compete, and forge lifelong friendships.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Whether you are looking to introduce your child to badminton in our <strong>Junior Training Academy</strong>, refine your tactical game in <strong>Adult Group Coaching</strong>, or enjoy casual games during our <strong>Open Drop-In Sessions</strong>, our friendly coaches and active community support your journey every step of the way.
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Professional BWF-Certified Coaching',
                'Friendly & Welcoming Community',
                'Junior (Ages 7-15) & Adult Programs',
                'Recreational & Competitive Play',
                'Flexible Open Drop-In Timings',
                'State-of-the-art Pickering Facility'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            {/* Contact Callout Pill */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Have Questions?</div>
                <div className="text-sm font-bold text-slate-900">Call Us: {CLUB_INFO.phone}</div>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                Get in Touch
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
