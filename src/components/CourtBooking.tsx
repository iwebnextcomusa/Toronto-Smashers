import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Sparkles, User, Mail, Phone, RefreshCw, Ticket, Zap, Copy, Check, Printer, X, ExternalLink } from 'lucide-react';
import { CourtSlot, Booking } from '../types';

export const CourtBooking: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedCourtId, setSelectedCourtId] = useState<number>(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('18:00 - 19:00');
  const [racketRental, setRacketRental] = useState<boolean>(false);

  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Toast Feedback State
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastData, setToastData] = useState<Booking | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Form states
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');

  const courts = [
    { id: 1, name: 'Court 1 (Championship Mat)', spec: 'BWF Grade 1 • Premier Lighting' },
    { id: 2, name: 'Court 2 (Pro Green Mat)', spec: 'Shock Absorbing Subfloor' },
    { id: 3, name: 'Court 3 (Speed Court)', spec: 'Anti-Glare LED Array' },
    { id: 4, name: 'Court 4 (Center Court)', spec: 'Umpire Chair & Seating' },
    { id: 5, name: 'Court 5 (Training Court)', spec: 'BWF Approved Surface' },
    { id: 6, name: 'Court 6 (Practice Court)', spec: 'Multi-shuttle Compatible' },
  ];

  const timeSlots = [
    '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
    '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'
  ];

  // Fetch live bookings for the selected date
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?date=${selectedDate}`);
      if (res.ok) {
        const data = await res.json();
        setExistingBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch court bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  // Auto-dismiss toast after 8 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCopyId = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  // Calculate pricing
  const isPeakHour = (slot: string) => {
    const startHour = parseInt(slot.split(':')[0]);
    return startHour >= 17; // Peak starts at 5:00 PM
  };

  const basePrice = isPeakHour(selectedTimeSlot) ? 35 : 25;
  const totalPrice = basePrice + (racketRental ? 5 : 0);

  // Check if slot is reserved
  const isReserved = (courtId: number, slot: string) => {
    return existingBookings.some(b => b.courtId === courtId && b.timeSlot === slot);
  };

  // Handle Booking Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }

    if (isReserved(selectedCourtId, selectedTimeSlot)) {
      setErrorMsg('Selected court slot is already booked. Please choose another slot or court.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const courtObj = courts.find(c => c.id === selectedCourtId);
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courtId: selectedCourtId,
          courtName: courtObj?.name || `Court ${selectedCourtId}`,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          userName,
          userEmail,
          userPhone,
          racketRental,
          totalPrice
        }),
      });

      const data = await res.json();

      if (res.ok && data.booking) {
        setBookingSuccess(data.booking);
        setToastData(data.booking);
        setShowToast(true);
        fetchBookings();
      } else {
        setErrorMsg(data.error || 'Failed to complete court booking.');
      }
    } catch (err) {
      setErrorMsg('Network error submitting booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="court-booking" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Online Court Booking System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Real-Time <span className="text-blue-400">Court Availability</span> Dashboard
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your preferred date, court, and time slot to instantly reserve your play time at Pickering's top badminton facility.
          </p>
        </div>

        {/* Top Control Bar: Date Selector & Legend */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-md flex flex-wrap items-center justify-between gap-6">
          
          {/* Date Selector Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Select Date:</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              min={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            
            {/* Refresh Button */}
            <button
              onClick={fetchBookings}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Court Status"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>

          {/* Status Color Legend */}
          <div className="flex items-center gap-5 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30"></span>
              <span className="text-slate-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-500/30"></span>
              <span className="text-slate-300">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-500/30"></span>
              <span className="text-slate-400">Reserved</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Court & Time Slot Picker */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Court Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>1. Choose Court (Pickering Facility)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => setSelectedCourtId(court.id)}
                    className={`p-4 rounded-xl border transition-all text-left relative overflow-hidden ${
                      selectedCourtId === court.id
                        ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50 text-white'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm font-display text-white">{court.name}</span>
                      {selectedCourtId === court.id && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{court.spec}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Time Slot Grid Visualizer */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>2. Select Time Slot</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Peak Rate ($35/hr) applies after 5:00 PM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {timeSlots.map((slot) => {
                  const reserved = isReserved(selectedCourtId, slot);
                  const isSelected = selectedTimeSlot === slot;
                  const peak = isPeakHour(slot);

                  return (
                    <button
                      key={slot}
                      disabled={reserved}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all flex flex-col justify-center items-center gap-1 relative ${
                        reserved
                          ? 'bg-red-950/20 border-red-900/50 text-red-400/60 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>{slot}</span>
                      <span className={`text-[10px] ${reserved ? 'text-red-500/60' : isSelected ? 'text-blue-200' : peak ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {reserved ? 'Reserved' : peak ? '$35 Peak' : '$25 Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Reservation Checkout & Form Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl sticky top-28 space-y-6">
              
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold font-display text-white">Booking Summary</h3>
                <p className="text-xs text-slate-400 mt-0.5">Instant online reservation confirmation</p>
              </div>

              {/* Selected Slot Summary Box */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Court:</span>
                  <span className="font-bold text-white">Court {selectedCourtId}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Date:</span>
                  <span className="font-bold text-white">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Time Slot:</span>
                  <span className="font-bold text-white">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Court Rate:</span>
                  <span className="font-bold text-green-400">${basePrice} / hr</span>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Add-On Options:
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors">
                  <input
                    type="checkbox"
                    checked={racketRental}
                    onChange={(e) => setRacketRental(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white block">Yonex Racket Rental (+$5)</span>
                    <span className="text-slate-400">Includes 1 graphite racket rental</span>
                  </div>
                </label>
              </div>

              {/* Total Price Display */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-blue-300">Total Price:</span>
                <span className="text-2xl font-extrabold font-display text-white">${totalPrice} CAD</span>
              </div>

              {/* Error Message if any */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* User Details Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Robinson"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="905-123-4567"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Reserve Court Now (${totalPrice})</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      {showToast && toastData && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900/95 border border-green-500/50 shadow-2xl rounded-2xl p-4 backdrop-blur-lg text-left space-y-3 transition-all animate-slideUp">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/40 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Court Booking Success!</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {toastData.courtName} • {toastData.date} ({toastData.timeSlot})
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => {
                setBookingSuccess(toastData);
                setShowToast(false);
              }}
              className="font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>View Full Ticket</span>
            </button>
            <button
              onClick={() => handleCopyId(toastData.id)}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId ? 'Copied' : `ID: ${toastData.id.slice(0, 8)}...`}</span>
            </button>
          </div>

          {/* Auto-dismiss progress bar animation */}
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-full w-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Ticket */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            
            <button
              onClick={() => setBookingSuccess(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 pt-1">
              <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/40 shadow-lg shadow-green-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">Court Reservation Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Thank you, <span className="font-semibold text-white">{bookingSuccess.userName}</span>! Confirmation sent to <span className="text-blue-300">{bookingSuccess.userEmail}</span>.
              </p>
            </div>

            {/* Ticket Details */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2.5">
                <span className="text-slate-400">Booking Ticket ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-blue-400">{bookingSuccess.id}</span>
                  <button
                    onClick={() => handleCopyId(bookingSuccess.id)}
                    className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                    title="Copy Ticket ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Court Assigned:</span>
                <span className="font-bold text-white">{bookingSuccess.courtName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-white">{bookingSuccess.date} ({bookingSuccess.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Facility Location:</span>
                <span className="font-bold text-white">Toronto Smashers, Pickering ON</span>
              </div>
              {bookingSuccess.racketRental && (
                <div className="flex justify-between text-amber-300">
                  <span>Add-on:</span>
                  <span className="font-semibold">Yonex Racket Rental Included</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-slate-700 pt-2.5">
                <span className="text-slate-400">Total Paid/Due:</span>
                <span className="font-bold text-green-400 text-base">${bookingSuccess.totalPrice} CAD</span>
              </div>
            </div>

            {/* QR Code Check-in Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <div className="w-24 h-24 bg-white p-2 rounded-lg mx-auto flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-slate-900 rounded grid grid-cols-4 gap-1 p-1">
                  <div className="bg-white"></div><div className="bg-transparent"></div><div className="bg-white"></div><div className="bg-white"></div>
                  <div className="bg-transparent"></div><div className="bg-white"></div><div className="bg-transparent"></div><div className="bg-white"></div>
                  <div className="bg-white"></div><div className="bg-white"></div><div className="bg-transparent"></div><div className="bg-transparent"></div>
                  <div className="bg-white"></div><div className="bg-transparent"></div><div className="bg-white"></div><div className="bg-white"></div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Show QR Code or ID at Pickering court check-in desk</p>
            </div>

            {/* Actions: Print Receipt / Add to Calendar / Close */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handlePrintReceipt}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 font-semibold text-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Badminton Court Booking at Toronto Smashers')}&details=${encodeURIComponent(`Court: ${bookingSuccess.courtName}\nTicket ID: ${bookingSuccess.id}`)}&location=${encodeURIComponent('Toronto Smashers, Pickering ON')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 font-semibold text-blue-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>
            </div>

            <button
              onClick={() => setBookingSuccess(null)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 font-bold text-sm text-white rounded-xl shadow-lg transition-all"
            >
              Done / Reserve Another Slot
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
