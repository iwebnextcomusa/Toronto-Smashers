import React, { useState } from 'react';
import { SCHEDULE_ITEMS } from '../data/clubData';
import { Calendar, Clock, User, Award, Shield, ChevronRight } from 'lucide-react';

interface ScheduleProps {
  onOpenBooking: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onOpenBooking }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Junior', 'Adult', 'Open Play', 'Competitive'];

  const filteredSchedule = SCHEDULE_ITEMS.filter((item) => {
    const matchesDay = item.day === activeDay;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesDay && matchesCat;
  });

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Junior':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Adult':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Competitive':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Open Play':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <section id="schedule" className="py-20 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-100 text-purple-800 font-semibold text-xs uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pickering Facility Timetable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Weekly <span className="text-blue-600">Badminton Schedule</span>
          </h2>
          <p className="text-slate-600 text-base">
            Check program session times, open drop-in hours, and court allocations across the week.
          </p>
        </div>

        {/* Days Tab Strip */}
        <div className="flex overflow-x-auto pb-3 gap-2 no-scrollbar border-b border-slate-200 mb-6 justify-start sm:justify-center">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeDay === day
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-400 mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenBooking}
            className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1"
          >
            <span>Need a custom court slot? Book Online →</span>
          </button>
        </div>

        {/* Timetable List */}
        {filteredSchedule.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm">
            No scheduled group sessions in this category on {activeDay}. Courts are available for open booking!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold font-mono shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.time}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">• {item.court}</span>
                    </div>

                    <h4 className="text-base font-bold font-display text-slate-900">{item.title}</h4>
                    
                    {item.coach && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-blue-600" />
                        <span>Lead: {item.coach}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                    {item.level}
                  </span>

                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Slot</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
