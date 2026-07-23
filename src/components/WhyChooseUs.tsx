import React from 'react';
import { Award, Users, Shield, DollarSign, Trophy, Clock, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Professional Coaching',
      description: 'BWF certified head coaches with proven provincial and national tournament coaching records.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: Users,
      title: 'Friendly Community',
      description: 'A warm, inclusive atmosphere where beginners and seasoned smashers encourage each other.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: Shield,
      title: 'Modern Facilities',
      description: '6 Olympic-spec synthetic courts with anti-glare LED illumination and shock-absorbing subfloors.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      icon: DollarSign,
      title: 'Affordable Membership',
      description: 'Flexible monthly, student, family, and single drop-in pass options without hidden fees.',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      icon: Trophy,
      title: 'Tournaments',
      description: 'Regular intra-club leagues, seasonal Pickering Open championships, and ranking matches.',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      description: 'Open 7 days a week from 7:00 AM to 10:30 PM for morning birds and late-night court lovers.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 text-rose-600 border-rose-200'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Toronto Smashers Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">Toronto Smashers</span>?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We combine high-performance badminton standards with an inviting social environment in Pickering, Ontario.
          </p>
        </div>

        {/* Features 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bgColor} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Subtle Hover Gradient Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
