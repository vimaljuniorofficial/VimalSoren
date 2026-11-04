import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function TarsPage() {
    const [messages, setMessages] = useState([
        {
            sender: 'tars',
            text: "Greetings. I'm TARS — Vimal Soren's interactive assistant.\n\nMy honesty parameter is set to 90% and humor to 75%. Ask me anything about Vimal's qualifications, skills, projects, or how to contact him.",
            time: 'Just now'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Cursor tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const suggestions = [
        "Who is Vimal Soren?",
        "What are his skills & certifications?",
        "Show his projects",
        "How to contact him?",
        "Humor setting: 100%"
    ];

    const generateResponse = (rawQuery) => {
        const q = rawQuery.toLowerCase();

        if (q.includes('who') || q.includes('about') || q.includes('introduce')) {
            return "Vimal Soren is an NCVT ITI Fitter & ADCA (Advanced Diploma in Computer Applications) certified professional based in Dumka, Jharkhand.\n\nHe is passionate about software, modern web development, and practical mechanical engineering.";
        }

        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('experience')) {
            return "Vimal's Skillset:\n\n• Mechanical & Technical: NCVT ITI Fitter (Precision benchwork, filing, assembly, machine operations & workshop maintenance)\n• Computer & Web Development: ADCA Certified (Computer Applications), JavaScript, React, Next.js, HTML5, CSS3, Tailwind CSS\n• Systems & Tools: Ubuntu Linux, Git, VS Code";
        }

        if (q.includes('certif') || q.includes('education') || q.includes('degree') || q.includes('qualification')) {
            return "Formal Credentials:\n\n1. NCVT ITI Certification in Fitter Trade (National Council for Vocational Training)\n2. ADCA (Advanced Diploma in Computer Applications)\n3. Hands-on experience building interactive web applications and mechanical projects.";
        }

        if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('github')) {
            return "Featured Projects on GitHub:\n\n1. Vimal Portfolio (Ubuntu Web OS simulation in Next.js & Tailwind)\n   🔗 https://github.com/vimaljuniorofficial/VimalSoren\n\n2. Vimal Photos (Photography & media gallery portfolio)\n   🔗 https://github.com/vimaljuniorofficial/VimalPhotos";
        }

        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('phone')) {
            return "Contact Vimal:\n\n• Email: vimalsorenofficial@gmail.com\n• LinkedIn: https://linkedin.com/in/vimaljunior\n• GitHub: https://github.com/vimaljuniorofficial\n• Location: Dumka, Jharkhand, India";
        }

        if (q.includes('resume') || q.includes('cv')) {
            return "Vimal's official resume is viewable directly in the 'About Vimal' application on the Ubuntu desktop, or in the public files directory (/files/Vimal-Soren-Resume.pdf).";
        }

        if (q.includes('humor') || q.includes('joke') || q.includes('funny')) {
            return "Humor parameter dialed to 100%...\n\nWhy does Vimal love both fitting and web development?\nBecause in both worlds, if the components don't fit smoothly, you just have to grab a file and iron out the bugs.";
        }

        return `Query received: "${rawQuery}".\n\nYou can ask about Vimal's qualifications (NCVT ITI Fitter & ADCA), technical skills, GitHub repositories, or direct contact links.`;
    };

    const handleSend = (textToSend) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMessages(prev => [...prev, {
            sender: 'user',
            text: query,
            time: timeString
        }]);

        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const answer = generateResponse(query);
            setMessages(prev => [...prev, {
                sender: 'tars',
                text: answer,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 500);
    };

    return (
        <div className="bg-[#fff] dark:bg-[#000] text-[#000] dark:text-[#fff] min-h-screen transition-colors duration-300 font-sans selection:bg-[#ff0059] selection:text-white relative overflow-x-hidden">
            <Head>
                <title>TARS — Vimal Soren</title>
                <meta name="description" content="Ask TARS anything about Vimal Soren" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/logos/fevicon.svg" />
                <link rel="apple-touch-icon" href="/images/logos/logo.png" />
            </Head>

            {/* Mouse Tracking Ring & Dot */}
            <div
                className="top-0 left-0 fixed will-change-transform z-[999] pointer-events-none border-2 border-black dark:border-white hidden lg:flex rounded-full duration-150"
                style={{
                    width: '32px',
                    height: '32px',
                    transform: `translate(${cursorPos.x - 16}px, ${cursorPos.y - 16}px)`,
                    opacity: cursorPos.x > 0 ? 0.75 : 0,
                    transitionProperty: 'width, height, border-radius, border-color, transform, opacity',
                    transitionTimingFunction: 'ease-out'
                }}
            ></div>
            <div
                className="fixed w-1.5 h-1.5 rounded-full bg-[#ff0059] z-[999] pointer-events-none hidden md:flex will-change-transform opacity-100"
                style={{
                    transform: `translate(${cursorPos.x - 3}px, ${cursorPos.y - 3}px)`,
                    opacity: cursorPos.x > 0 ? 1 : 0
                }}
            ></div>

            {/* Main Card Wrapper */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-12 min-h-screen flex flex-col justify-center">
                <div className="border border-black dark:border-zinc-800 rounded-lg bg-white dark:bg-[#09090b] flex flex-col h-[85vh] min-h-[550px] max-h-[840px] shadow-sm overflow-hidden">
                    
                    {/* Header (Clean header without dark/boot buttons on top, pure black TARS icon) */}
                    <div className="border-b border-black dark:border-zinc-800 p-4 flex items-center justify-between flex-shrink-0 bg-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-black bg-white flex items-center justify-center flex-shrink-0 shadow-xs">
                                <img
                                    src="/themes/Yaru/apps/tars.svg"
                                    alt="TARS"
                                    className="w-5 h-5 object-contain filter invert"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-black dark:text-white text-sm md:text-base leading-tight">TARS</p>
                                <p className="text-sm font-medium text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-transparent">
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                            {messages.map((m, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-end gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {m.sender === 'tars' && (
                                        <div className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center flex-shrink-0 mb-1 shadow-xs">
                                            <img
                                                src="/themes/Yaru/apps/tars.svg"
                                                alt="TARS"
                                                className="w-4 h-4 object-contain filter invert"
                                            />
                                        </div>
                                    )}
                                    <div className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`rounded-md px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap max-w-lg shadow-sm border ${
                                                m.sender === 'user'
                                                    ? 'bg-[#ff0059] text-white border-[#ff0059]'
                                                    : 'bg-zinc-50 dark:bg-[#141416] text-black dark:text-zinc-200 border-black dark:border-zinc-800'
                                            }`}
                                        >
                                            {m.text}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 mt-1 px-1">{m.time}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex items-center gap-2.5 justify-start">
                                    <div className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center flex-shrink-0">
                                        <img
                                            src="/themes/Yaru/apps/tars.svg"
                                            alt="TARS"
                                            className="w-4 h-4 object-contain filter invert"
                                        />
                                    </div>
                                    <div className="bg-zinc-50 dark:bg-[#141416] border border-black dark:border-zinc-800 rounded-md px-4 py-2.5 flex items-center gap-1.5 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0059] animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0059] animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0059] animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestion Chips */}
                        <div className="px-4 py-2 border-t border-black/10 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/20">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                                {suggestions.map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(s)}
                                        className="text-xs font-medium whitespace-nowrap bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-300 border border-black dark:border-zinc-800 rounded-md px-2.5 py-1 transition active:scale-95 cursor-pointer"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Form */}
                        <div className="py-2.5 px-4 flex-shrink-0 border-t border-black dark:border-zinc-800 bg-transparent">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything about Vimal..."
                                    className="flex h-9 w-full rounded-md border border-black dark:border-zinc-800 bg-transparent px-3 py-1 text-sm text-black dark:text-white shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white flex-1"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    aria-label="Send message"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-[#ff0059] text-white hover:bg-[#e0004e] shadow h-9 w-9 flex-shrink-0 disabled:opacity-50 active:scale-95 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                                        <path d="m21.854 2.147-10.94 10.939"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* Floating Dock Action Buttons */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors shadow-sm h-9 w-9 border border-black dark:border-zinc-800 bg-white dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95"
                    aria-label="Boot Ubuntu"
                    title="Boot Ubuntu"
                >
                    <img src="/themes/Yaru/status/cof_orange_hex.svg" alt="Ubuntu" className="h-6 w-6" />
                </Link>
                <button
                    onClick={() => {
                        handleSend("Who is Vimal Soren?");
                    }}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors shadow-sm h-9 w-9 border border-black dark:border-zinc-800 bg-white hover:bg-zinc-100 active:scale-95 cursor-pointer"
                    aria-label="Open Tars chat"
                    title="Ask TARS"
                >
                    <img
                        src="/themes/Yaru/apps/tars.svg"
                        alt="TARS"
                        className="h-5 w-5 object-contain filter invert"
                    />
                </button>
            </div>
        </div>
    );
}
