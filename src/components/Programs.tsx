import React, { useState } from 'react';
import { PROGRAMS } from '../data/clubData';
import { Check, Clock, User, Award, ArrowRight } from 'lucide-react';

interface ProgramsProps {
  onOpenRegister: (programTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPrograms = selectedCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.id.includes(selectedCategory));

  return (
    <section id="programs" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-800 font-semibold text-xs uppercase tracking-wider">
            Badminton Development & Play
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Our Featured <span className="text-blue-600">Badminton Programs</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Structured training pathways for every age, goal, and skill level in Pickering, Ontario.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'junior', label: 'Junior Academy (7-15)' },
              { id: 'adult', label: 'Adult Coaching' },
              { id: 'competitive', label: 'Competitive Squad' },
              { id: 'drop-in', label: 'Open Drop-In' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group text-left"
            >
              {/* Program Image Header */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {program.popular && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    ★ Most Popular
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{program.ageGroup} • {program.level}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">{program.title}</h3>
                </div>
              </div>

              {/* Program Body Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 text-xs text-slate-700">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-900">Training Schedule:</span>
                      <span>{program.schedule}</span>
                    </div>
                  </div>

                  {/* Features checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Program Highlights:
                    </span>
                    {program.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Register Button */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase block font-semibold">Tuition</span>
                    <span className="text-xl font-extrabold font-display text-slate-900">{program.price}</span>
                  </div>

                  <button
                    onClick={() => onOpenRegister(program.title)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Register Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
