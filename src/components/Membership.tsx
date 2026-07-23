import React from 'react';
import { MEMBERSHIPS } from '../data/clubData';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface MembershipProps {
  onOpenRegister: (planName: string) => void;
}

export const Membership: React.FC<MembershipProps> = ({ onOpenRegister }) => {
  return (
    <section id="membership" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Membership Plans & Passes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Affordable Rates for <span className="text-blue-600">Every Player</span>
          </h2>
          <p className="text-slate-600 text-base">
            No long-term contracts. Enjoy priority court booking, coaching discounts, and open drop-ins at Pickering.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIPS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 relative group text-left ${
                plan.recommended
                  ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-xl scale-105 z-10'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Most Recommended</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500 min-h-[36px]">{plan.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-display text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-semibold">CAD</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium block mt-0.5">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Plan Benefits:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onOpenRegister(plan.name)}
                  className={`w-full py-3 px-4 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Family & Corporate Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold font-display text-white">Looking for Corporate or Group Bookings?</h4>
            <p className="text-xs text-blue-200 mt-1">
              We offer special corporate team-building events, private court rentals, and customized group rates in Pickering.
            </p>
          </div>
          <button
            onClick={() => onOpenRegister('Corporate & Group Inquiry')}
            className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shrink-0 transition-colors"
          >
            Inquire Group Rates
          </button>
        </div>

      </div>
    </section>
  );
};
