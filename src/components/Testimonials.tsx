import React from 'react';
import { TESTIMONIALS } from '../data/clubData';
import { Star, Quote, MessageSquareQuote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Pickering Member Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            What Our <span className="text-blue-600">Smashers Say</span>
          </h2>
          <p className="text-slate-600 text-base">
            Read real stories from players, parents, and tournament competitors in Pickering, Ontario.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group text-left"
            >
              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-blue-200" />

                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center gap-4 mt-6">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold font-display flex items-center justify-center shrink-0 shadow-md">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 font-display text-base leading-tight">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
