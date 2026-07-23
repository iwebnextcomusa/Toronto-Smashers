import { Program, MembershipPlan, ScheduleItem, GalleryItem, Testimonial, FAQItem } from '../types';

export const CLUB_INFO = {
  name: 'Toronto Smashers',
  tagline: 'Smash Hard. Play Smart. Join Toronto Smashers.',
  description: 'Pickering\'s welcoming badminton community for beginners, intermediate, and competitive players.',
  location: 'Pickering, Ontario, Canada',
  address: '1867 Valley Farm Rd, Pickering, ON L1V 6L7',
  phone: '905-781-3074',
  email: 'gobikrishnant@gmail.com',
  hours: {
    weekdays: '7:00 AM - 10:30 PM',
    weekends: '8:00 AM - 10:00 PM'
  },
  socials: {
    facebook: 'https://facebook.com/torontosmashers',
    instagram: 'https://instagram.com/torontosmashers',
    youtube: 'https://youtube.com/torontosmashers'
  }
};

export const PROGRAMS: Program[] = [
  {
    id: 'junior-training',
    title: 'Junior Training Academy',
    ageGroup: 'Ages 7–15',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive badminton fundamentals focusing on correct grips, essential footwork patterns, stroke mechanics, speed agility, and sport etiquette in a fun environment.',
    schedule: 'Tue & Thu: 4:30 PM - 6:00 PM | Sat: 9:00 AM - 11:00 AM',
    price: '$120 / month',
    features: [
      'BWF certified youth coaches',
      'Footwork & shuttle control drills',
      'Equipment guidance & physical conditioning',
      'Quarterly intra-club friendly matches'
    ],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'adult-coaching',
    title: 'Adult Group Coaching',
    ageGroup: 'Adults (16+)',
    level: 'Beginner, Intermediate & Advanced',
    description: 'Tailored group sessions structured by skill level. Refine your smash technique, drop shots, net play precision, and tactical court positioning.',
    schedule: 'Mon & Wed: 7:00 PM - 8:30 PM | Sun: 10:00 AM - 12:00 PM',
    price: '$140 / month',
    features: [
      'Small group ratio (max 6 players per coach)',
      'Video analysis & stroke correction',
      'Doubles communication & rotations',
      'Physical endurance & court stamina'
    ],
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2efa2a3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'competitive-training',
    title: 'Competitive High Performance',
    ageGroup: 'All Ages (Selective)',
    level: 'Advanced & Tournament Players',
    description: 'Intense training regime designed for tournament competitors. Focuses on advanced match strategy, deceptive shots, high-tempo multi-shuttle drills, and peak athletic condition.',
    schedule: 'Tue & Fri: 6:30 PM - 9:00 PM | Sat: 1:00 PM - 4:00 PM',
    price: '$180 / month',
    features: [
      'Provincial & national level coaching team',
      'Customized tournament prep plans',
      'High-speed multi-shuttle feeding drills',
      'Mental toughness & match pressure simulation'
    ],
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drop-in-sessions',
    title: 'Open Drop-In Sessions',
    ageGroup: 'All Ages',
    level: 'Open for All Skill Levels',
    description: 'Enjoy casual, fun, or competitive games with fellow Pickering badminton enthusiasts! Simply drop in, queue up on court boards, and start playing doubles or singles.',
    schedule: 'Daily: Morning (7:00 AM - 12:00 PM) & Evening (8:00 PM - 10:30 PM)',
    price: '$15 / drop-in visit',
    features: [
      'Fair pegboard rotation system',
      'Feather shuttlecocks option',
      'Locker room & shower access',
      'Free social community events'
    ],
    image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=800&q=80'
  }
];

export const MEMBERSHIPS: MembershipPlan[] = [
  {
    id: 'monthly-individual',
    name: 'Monthly Membership',
    price: '$65',
    period: 'per month',
    description: 'Ideal for regular players wanting unlimited open court access and member discounts.',
    features: [
      'Unlimited Drop-In session access',
      '7-day advance court booking privilege',
      '15% discount on coaching programs',
      'Free racket stringing labor (1x/month)',
      'Member guest pass (1 free per month)'
    ],
    recommended: true,
    ctaText: 'Join Monthly'
  },
  {
    id: 'family-plan',
    name: 'Family Membership',
    price: '$150',
    period: 'per month (Up to 4 family members)',
    description: 'Great value for active families playing together or enrolling juniors in training.',
    features: [
      'Unlimited court access for up to 4 family members',
      '10-day advance court booking privilege',
      '20% discount on Junior & Adult Coaching',
      'Free racket rentals for family members',
      'Priority access to club tournaments'
    ],
    ctaText: 'Join as Family'
  },
  {
    id: 'student-plan',
    name: 'Student Membership',
    price: '$45',
    period: 'per month (Valid Student ID)',
    description: 'Special discounted rate for high school and university badminton players.',
    features: [
      'Full access to all off-peak & evening drop-ins',
      '5-day advance court booking privilege',
      '10% discount on pro-shop gear & shuttlecocks',
      'Access to student league matches'
    ],
    ctaText: 'Join Student'
  },
  {
    id: 'drop-in-pass',
    name: 'Drop-In Day Pass',
    price: '$15',
    period: 'single visit pass',
    description: 'Flexible option for casual players and visitors looking for a quick hit.',
    features: [
      'Single day entry to any open play session',
      'Access to pegboard court queue system',
      'Locker room & shower access',
      'Equipment rental available at pro-shop'
    ],
    ctaText: 'Get Pass'
  }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { id: '1', day: 'Monday', time: '07:00 AM - 10:00 AM', title: 'Early Bird Open Play', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' },
  { id: '2', day: 'Monday', time: '04:30 PM - 06:30 PM', title: 'Junior Fundamentals', category: 'Junior', court: 'Courts 1-3', coach: 'Coach David', level: 'Beginner' },
  { id: '3', day: 'Monday', time: '07:00 PM - 08:30 PM', title: 'Adult Beginner & Intermediate', category: 'Adult', court: 'Courts 1-4', coach: 'Coach Sarah', level: 'Beg/Int' },
  { id: '4', day: 'Monday', time: '08:30 PM - 10:30 PM', title: 'Night Smashing Open Play', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' },

  { id: '5', day: 'Tuesday', time: '07:00 AM - 10:00 AM', title: 'Morning Fitness & Drills', category: 'Adult', court: 'Courts 1-2', coach: 'Coach Alex', level: 'Intermediate' },
  { id: '6', day: 'Tuesday', time: '04:30 PM - 06:00 PM', title: 'Junior Academy (Ages 7-12)', category: 'Junior', court: 'Courts 1-4', coach: 'Coach David', level: 'Int' },
  { id: '7', day: 'Tuesday', time: '06:30 PM - 09:00 PM', title: 'Competitive Squad Practice', category: 'Competitive', court: 'Courts 3-6', coach: 'Coach Michael', level: 'Advanced' },

  { id: '8', day: 'Wednesday', time: '07:00 AM - 12:00 PM', title: 'Seniors & Open Play', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' },
  { id: '9', day: 'Wednesday', time: '05:00 PM - 07:00 PM', title: 'Teen Smashers (13-17)', category: 'Junior', court: 'Courts 1-3', coach: 'Coach Sarah', level: 'Beg/Int' },
  { id: '10', day: 'Wednesday', time: '07:00 PM - 08:30 PM', title: 'Adult Advanced Footwork & Strategy', category: 'Adult', court: 'Courts 4-6', coach: 'Coach Alex', level: 'Advanced' },

  { id: '11', day: 'Thursday', time: '04:30 PM - 06:00 PM', title: 'Junior Skills & Games', category: 'Junior', court: 'Courts 1-4', coach: 'Coach David', level: 'All Junior' },
  { id: '12', day: 'Thursday', time: '06:30 PM - 08:30 PM', title: 'Doubles Tactics Clinic', category: 'Adult', court: 'Courts 1-3', coach: 'Coach Michael', level: 'Int/Adv' },
  { id: '13', day: 'Thursday', time: '08:30 PM - 10:30 PM', title: 'Open Doubles Challenge', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' },

  { id: '14', day: 'Friday', time: '05:00 PM - 06:30 PM', title: 'Junior High Performance', category: 'Junior', court: 'Courts 1-3', coach: 'Coach Michael', level: 'Comp Junior' },
  { id: '15', day: 'Friday', time: '06:30 PM - 09:00 PM', title: 'Competitive Match Play Night', category: 'Competitive', court: 'Courts 1-6', coach: 'Coach Alex', level: 'Advanced' },

  { id: '16', day: 'Saturday', time: '09:00 AM - 11:00 AM', title: 'Weekend Junior Academy', category: 'Junior', court: 'Courts 1-6', coach: 'Coaching Team', level: 'All Levels' },
  { id: '17', day: 'Saturday', time: '01:00 PM - 04:00 PM', title: 'High Performance Tournament Prep', category: 'Competitive', court: 'Courts 1-4', coach: 'Coach Michael', level: 'Provincial' },
  { id: '18', day: 'Saturday', time: '04:00 PM - 10:00 PM', title: 'Weekend Open Social Play', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' },

  { id: '19', day: 'Sunday', time: '10:00 AM - 12:00 PM', title: 'Sunday Adult Masterclass', category: 'Adult', court: 'Courts 1-3', coach: 'Coach Sarah', level: 'Beg/Int' },
  { id: '20', day: 'Sunday', time: '01:00 PM - 04:00 PM', title: 'Family & Junior Open Court', category: 'Junior', court: 'Courts 1-6', level: 'Family' },
  { id: '21', day: 'Sunday', time: '05:00 PM - 09:30 PM', title: 'Sunday League & Drop-In', category: 'Open Play', court: 'Courts 1-6', level: 'All Levels' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'High-Impact Jump Smash',
    category: 'Competitive',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    caption: 'Player executing a high speed jump smash during the Toronto Smashers Pickering Open.'
  },
  {
    id: 'g2',
    title: 'Junior Academy Footwork Drill',
    category: 'Junior',
    imageUrl: 'https://images.unsplash.com/photo-1521537634581-0dced2efa2a3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Our certified coaches guiding junior players through proper 6-point court footwork.'
  },
  {
    id: 'g3',
    title: 'Pickering Facility BWF Courts',
    category: 'Facility',
    imageUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80',
    caption: 'Six BWF-standard synthetic mat courts equipped with anti-glare professional LED lighting.'
  },
  {
    id: 'g4',
    title: 'Adult Doubles Match Night',
    category: 'Social',
    imageUrl: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1200&q=80',
    caption: 'Energetic evening doubles rally during Wednesday night social drop-in session.'
  },
  {
    id: 'g5',
    title: 'Net Precision Control',
    category: 'Coaching',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80',
    caption: 'Demonstrating delicate net tumbling spin control during adult intermediate coaching.'
  },
  {
    id: 'g6',
    title: 'Pickering Annual Trophy Ceremony',
    category: 'Tournaments',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    caption: 'Celebrating our Toronto Smashers winners and sportsmanship award recipients.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Intermediate Club Member (Pickering, ON)',
    content: 'Joining Toronto Smashers was the best sports decision I made this year! The lighting and synthetic courts are top-notch, and the coaching team helped me eliminate bad habits in my smash and backhand clear within 3 weeks.',
    rating: 5,
    initials: 'MV'
  },
  {
    id: 't2',
    name: 'Priya Patel',
    role: 'Parent of Junior Student (Ages 10 & 12)',
    content: 'Both my daughter and son look forward to Junior Academy every Tuesday and Saturday. Coach David keeps the kids active, disciplined, and genuinely excited. The community in Pickering is super warm and welcoming!',
    rating: 5,
    initials: 'PP'
  },
  {
    id: 't3',
    name: 'Jason Cheng',
    role: 'Competitive Player',
    content: 'The high-performance competitive squad drills are intense! Multi-shuttle feeding, match strategy, and fitness sessions are on par with national academies. Plus, the court booking system is fast and effortless.',
    rating: 5,
    initials: 'JC'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'General',
    question: 'Who can join Toronto Smashers Badminton Club?',
    answer: 'Everyone! We welcome players of all ages and abilities, from absolute beginners picking up a racket for the first time to experienced competitive tournament players. We have dedicated junior, adult, family, and high-performance programs.'
  },
  {
    id: 'f2',
    category: 'General',
    question: 'Do I need prior badminton experience before attending?',
    answer: 'No prior experience is necessary! Our Adult Beginner Coaching and Junior Fundamentals programs start with basic rules, racket holding, and footwork drills. Our coaches guide you step-by-step.'
  },
  {
    id: 'f3',
    category: 'Equipment',
    question: 'What equipment and footwear are required?',
    answer: 'All players must wear non-marking indoor court shoes to preserve our BWF synthetic mats. You will need comfortable athletic clothing. Rackets and feather shuttlecocks are available at our pro-shop, and racket rentals are available for $5/visit.'
  },
  {
    id: 'f4',
    category: 'Programs',
    question: 'Are trial classes or single guest passes available?',
    answer: 'Yes! We offer single Drop-In Passes for $15/visit so you can experience our courts and atmosphere before committing to a monthly membership or full coaching term.'
  },
  {
    id: 'f5',
    category: 'Registration',
    question: 'How do I register for programs or book a court?',
    answer: 'You can book courts directly using our interactive online Real-Time Court Booking dashboard on this website! To register for coaching programs or memberships, click "Join Now" or send us a message via the Contact section or AI assistant.'
  },
  {
    id: 'f6',
    category: 'Booking',
    question: 'What is the court booking cancellation policy?',
    answer: 'Court reservations can be rescheduled or cancelled up to 12 hours prior to your booked slot with a full refund or credit applied to your Toronto Smashers account.'
  }
];
