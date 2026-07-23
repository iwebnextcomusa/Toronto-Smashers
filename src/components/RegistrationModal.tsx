import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Calendar, Award, Shield } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  initialTitle?: string;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  initialTitle = 'General Registration',
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ageGroup: 'Adult (16+)',
    selectedProgram: initialTitle,
    experienceLevel: 'Beginner',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn text-left">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>Toronto Smashers Registration</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Join {initialTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out your details to secure your spot at our Pickering facility.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="marcus@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="905-781-3074"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">Category / Age</label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Junior (Ages 7-12)">Junior (Ages 7-12)</option>
                    <option value="Teen (Ages 13-15)">Teen (Ages 13-15)</option>
                    <option value="Adult (16+)">Adult (16+)</option>
                    <option value="Senior (50+)">Senior (50+)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner (New to sport)</option>
                    <option value="Intermediate">Intermediate (Regular play)</option>
                    <option value="Advanced">Advanced (Competitive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">Special Notes or Questions</label>
                <textarea
                  rows={2}
                  placeholder="Any medical notes, equipment needs, or preferred days..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95"
              >
                Complete Registration
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">Registration Submitted!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>! We have received your registration for <strong>{initialTitle}</strong>. Coach Gobi and the Pickering team will reach out at <strong>{formData.email}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white rounded-xl shadow-md transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
