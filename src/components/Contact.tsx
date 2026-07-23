import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Share2, Facebook, Instagram, Youtube } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'General Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in required fields (Name, Email, Message).');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || 'Thank you! Your inquiry has been sent to Toronto Smashers.');
        setFormData({ name: '', email: '', phone: '', program: 'General Inquiry', message: '' });
      } else {
        setErrorMsg(data.error || 'Failed to submit form. Please try calling 905-781-3074.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Contact <span className="text-blue-400">Toronto Smashers</span>
          </h2>
          <p className="text-slate-400 text-base">
            Have questions about coaching, memberships, or court bookings? Reach out to our Pickering team!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left items-start">
          
          {/* Left Column: Business Info & Google Maps */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Club Info Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-bold font-display text-white">Toronto Smashers</h3>
                <p className="text-xs text-green-400 font-semibold tracking-wider uppercase mt-1">
                  Badminton Club • Pickering, Ontario
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Location</span>
                    <span>{CLUB_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Phone</span>
                    <a href={`tel:${CLUB_INFO.phone}`} className="hover:text-green-400 font-semibold transition-colors">
                      {CLUB_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Email</span>
                    <a href={`mailto:${CLUB_INFO.email}`} className="hover:text-amber-400 font-semibold transition-colors">
                      {CLUB_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Facility Hours</span>
                    <span>Mon - Fri: {CLUB_INFO.hours.weekdays}</span><br />
                    <span>Sat - Sun: {CLUB_INFO.hours.weekends}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Follow Toronto Smashers:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={CLUB_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={CLUB_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-pink-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={CLUB_INFO.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-red-600 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Google Maps Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2 overflow-hidden shadow-xl">
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-800">
                <iframe
                  title="Toronto Smashers Pickering Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.802319028045!2d-79.0889886844962!3d43.83839997911545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d8fc286e7a2b%3A0x6e78bc0f7b03b1e2!2sPickering%2C%20ON!5e0!3m2!1sen!2sca!4v1650000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold font-display text-white">Send Us a Message</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the form below for training program registration, trial sessions, or membership inquiries.
              </p>
            </div>

            {successMsg ? (
              <div className="p-6 rounded-2xl bg-green-950/40 border border-green-800 text-green-200 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <h4 className="text-lg font-bold text-white font-display">Message Sent Successfully!</h4>
                <p className="text-xs">{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg('')}
                  className="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="905-781-3074"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                      Interest / Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Junior Academy (7-15)">Junior Academy (7-15)</option>
                      <option value="Adult Group Coaching">Adult Group Coaching</option>
                      <option value="Competitive Squad">Competitive Squad</option>
                      <option value="Monthly Membership">Monthly Membership</option>
                      <option value="Court Rentals & Booking">Court Rentals & Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your experience level or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to Coach Gobi</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
