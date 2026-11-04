// pages/tars.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Tars() {
  const [messages, setMessages] = useState([
    {
      sender: 'tars',
      text: "Greetings. I'm TARS — Vimal Soren's interactive tactical assistant. My honesty parameter is 90% and humor is 75%. What would you like to know about Vimal?",
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    'Who is Vimal?',
    'What are his skills?',
    'Show projects',
    'How to contact Vimal?',
    'Qualifications & Certifications',
  ];

  const getTarsResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('who') || q.includes('about')) {
      return "Vimal Soren is an NCVT ITI Fitter & ADCA Certified professional from Dumka, Jharkhand. He is passionate about software, Linux, and practical engineering.";
    } else if (q.includes('skill') || q.includes('tech')) {
      return "Technical & Mechanical Skills:\n• ITI Fitter (Bench work, lathe, workshop tools)\n• ADCA (Advanced Diploma in Computer Applications)\n• Web Technologies: JavaScript, React, Next.js, Tailwind CSS\n• OS: Ubuntu Linux";
    } else if (q.includes('project')) {
      return "Key Projects:\n1. Vimal Portfolio (Ubuntu Web OS simulation)\n2. Vimal Photos (Photography & media gallery)\nCheck out his GitHub: https://github.com/vimaljuniorofficial";
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      return "You can reach Vimal directly via:\n• Email: vimalsorenofficial@gmail.com\n• LinkedIn: linkedin.com/vimaljunior\n• GitHub: github.com/vimaljuniorofficial";
    } else if (q.includes('qualification') || q.includes('education') || q.includes('resume')) {
      return "Education & Credentials:\n• NCVT ITI in Fitter Trade\n• ADCA (Advanced Diploma in Computer Applications)\n• Resume available in the About Vimal section.";
    } else if (q.includes('humor') || q.includes('joke')) {
      return "Setting humor to 100%... Knock knock. Who's there? sudo. sudo who? Permission granted, ask whatever you want.";
    }
    return `Query received: "${query}". You can ask about Vimal's skills, qualifications, projects, or how to contact him.`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    const botResponse = { sender: 'tars', text: getTarsResponse(query) };

    setMessages((prev) => [...prev, userMsg, botResponse]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 flex flex-col font-['Ubuntu']">
      <Head>
        <title>TARS — Vimal Soren Assistant</title>
      </Head>

      {/* Top Bar */}
      <header className="bg-black/60 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/themes/Yaru/apps/tars.svg" alt="TARS" className="w-8 h-8" />
          <div>
            <h1 className="font-bold text-white text-lg tracking-wide">TARS</h1>
            <p className="text-xs text-green-400">● Online | Vimal Assistant</p>
          </div>
        </div>
        <Link href="/" className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition">
          ← Back to Desktop
        </Link>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 border border-white/10 text-gray-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs bg-white/5 hover:bg-white/15 border border-white/10 rounded-full px-3 py-1 text-gray-300 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask TARS anything about Vimal..."
              className="flex-1 bg-zinc-900 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}