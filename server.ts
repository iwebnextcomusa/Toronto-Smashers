import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily / safely
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-Memory Court Bookings Database
interface InMemBooking {
  id: string;
  courtId: number;
  courtName: string;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  racketRental: boolean;
  totalPrice: number;
  createdAt: string;
}

const mockBookings: InMemBooking[] = [
  {
    id: 'TS-BK-101',
    courtId: 1,
    courtName: 'Court 1 - Championship Mat',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '18:00 - 19:00',
    userName: 'David Miller',
    userEmail: 'david@example.com',
    userPhone: '905-555-0123',
    racketRental: false,
    totalPrice: 35,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TS-BK-102',
    courtId: 3,
    courtName: 'Court 3 - BWF Synthetic',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '19:00 - 20:00',
    userName: 'Samantha Ray',
    userEmail: 'samantha@example.com',
    userPhone: '905-555-0199',
    racketRental: true,
    totalPrice: 40,
    createdAt: new Date().toISOString(),
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', club: 'Toronto Smashers Badminton Club' });
});

// GET Bookings & Availability
app.get('/api/bookings', (req, res) => {
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
  const courtId = req.query.courtId ? parseInt(req.query.courtId as string) : null;

  let filtered = mockBookings.filter(b => b.date === date);
  if (courtId) {
    filtered = filtered.filter(b => b.courtId === courtId);
  }

  res.json({
    date,
    bookings: filtered,
    totalBookingsCount: mockBookings.length
  });
});

// POST New Court Booking
app.post('/api/bookings', (req, res) => {
  const { courtId, courtName, date, timeSlot, userName, userEmail, userPhone, racketRental, totalPrice } = req.body;

  if (!courtId || !date || !timeSlot || !userName || !userEmail) {
    return res.status(400).json({ error: 'Missing required booking fields (courtId, date, timeSlot, userName, userEmail).' });
  }

  // Check collision
  const existing = mockBookings.find(b => b.courtId === courtId && b.date === date && b.timeSlot === timeSlot);
  if (existing) {
    return res.status(409).json({ error: 'This time slot is already reserved for the selected court.' });
  }

  const newBooking: InMemBooking = {
    id: `TS-BK-${Math.floor(1000 + Math.random() * 9000)}`,
    courtId: Number(courtId),
    courtName: courtName || `Court ${courtId}`,
    date,
    timeSlot,
    userName,
    userEmail,
    userPhone: userPhone || '',
    racketRental: Boolean(racketRental),
    totalPrice: Number(totalPrice) || 25,
    createdAt: new Date().toISOString()
  };

  mockBookings.push(newBooking);

  res.status(201).json({
    message: 'Court reserved successfully!',
    booking: newBooking
  });
});

// POST Contact / Inquiry Form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, program, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  res.json({
    success: true,
    message: `Thank you, ${name}! Your message regarding ${program || 'Toronto Smashers Club'} has been received. Our team will contact you at ${email} shortly.`
  });
});

// POST Chatbot AI Endpoint (Gemini 3.6 Flash)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const ai = getGeminiAI();
    const systemPrompt = `You are SmashBot, the official friendly AI assistant for Toronto Smashers Badminton Club located in Pickering, Ontario, Canada.
Key Information:
- Location: Pickering, Ontario (1867 Valley Farm Rd, Pickering, ON L1V 6L7)
- Contact: Phone 905-781-3074, Email gobikrishnant@gmail.com
- Hours: Mon-Fri 7:00 AM - 10:30 PM, Sat-Sun 8:00 AM - 10:00 PM
- Facility: 6 BWF-standard synthetic mat courts with anti-glare LED lighting, pro shop, locker rooms.
- Programs:
  1. Junior Training Academy (Ages 7-15) - $120/mo
  2. Adult Group Coaching (Beginner, Intermediate, Advanced) - $140/mo
  3. Competitive High Performance Squad - $180/mo
  4. Open Drop-In Play - $15/visit
- Memberships: Monthly ($65/mo), Family ($150/mo), Student ($45/mo), Drop-in ($15).
- Court Rentals: Online booking available for Courts 1 to 6 ($25-$35/hr). Racket rental $5/visit.

Tone: Enthusiastic, helpful, friendly, knowledgeable about badminton technique and Pickering club details.
Rules:
- Keep responses concise (2-4 bullet points or short paragraphs).
- Encourage users to check out the online court booking or programs section on the site.
- If asked about booking, guide them to use the interactive Court Booking dashboard on the page!`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach(h => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents.length === 1 ? message : contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Hello! I am SmashBot from Toronto Smashers Badminton Club in Pickering. How can I help you today?";

    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      reply: "I am having a quick timeout on the court right now! You can contact Toronto Smashers directly at 905-781-3074 or gobikrishnant@gmail.com, or check our Schedule and Booking sections on this page."
    });
  }
});

// Start Express Server with Vite middleware in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Toronto Smashers server running on http://localhost:${PORT}`);
  });
}

startServer();
