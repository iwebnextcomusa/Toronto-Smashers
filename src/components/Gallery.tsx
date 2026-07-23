import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/clubData';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Competitive', 'Junior', 'Facility', 'Social', 'Coaching'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;

    setLightboxItem(filteredItems[nextIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Toronto Smashers Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Club Action <span className="text-blue-600">Photo Gallery</span>
          </h2>
          <p className="text-slate-600 text-base">
            Moments captured from our Pickering facility, junior academy drills, adult drop-ins, and club tournaments.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 h-72 text-left"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Hover Badge */}
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-600/30 px-2.5 py-0.5 rounded-md border border-blue-400/30 mb-1 inline-block">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold font-display text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev/Next Buttons */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white z-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white z-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl border border-slate-800">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-white space-y-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                {lightboxItem.category}
              </span>
              <h3 className="text-xl font-bold font-display">{lightboxItem.title}</h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
