import React, { useState } from 'react';
import { FAQS } from '../data/clubData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>('f1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about joining Toronto Smashers Badminton Club in Pickering, ON.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-6" />
            <input
              type="text"
              placeholder="Search questions (e.g., equipment, trial, register)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 text-xs pl-10 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 text-left">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found. Contact us directly at 905-781-3074 or ask our AI chatbot!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold font-display text-slate-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-lg bg-slate-100 text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
