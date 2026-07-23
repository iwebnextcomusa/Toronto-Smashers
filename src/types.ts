export interface Program {
  id: string;
  title: string;
  ageGroup: string;
  level: string;
  description: string;
  schedule: string;
  price: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
}

export interface ScheduleItem {
  id: string;
  day: string; // 'Monday' | 'Tuesday' etc
  time: string;
  title: string;
  category: 'Junior' | 'Adult' | 'Open Play' | 'Competitive';
  court: string;
  coach?: string;
  level: string;
}

export interface CourtSlot {
  courtId: number;
  courtName: string;
  timeSlot: string; // e.g. "09:00 - 10:00"
  date: string; // YYYY-MM-DD
  status: 'available' | 'reserved' | 'selected';
  price: number;
}

export interface Booking {
  id: string;
  courtId: number;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  racketRental: boolean;
  totalPrice: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
