const { useState, useEffect, useRef } = React;

// --- Icons (SVG Paths) ---
const Icons = {
    Github: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>,
    Linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
    Mail: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    Layout: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>,
    Server: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>,
    Database: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    Wrench: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    ExternalLink: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
    Sun: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>,
    Moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
};

// --- Data ---
const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const SKILLS = [
    { category: 'Frontend', icon: Icons.Layout, skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', icon: Icons.Server, skills: ['Node.js', 'Express', 'Python', 'Go'] },
    { category: 'Database', icon: Icons.Database, skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
    { category: 'Tools', icon: Icons.Wrench, skills: ['Docker', 'Git', 'AWS', 'Linux'] },
];

const PROJECTS = [
    {
        title: 'E-Commerce Dashboard',
        description: 'A comprehensive analytics dashboard for online retailers, featuring real-time data visualization, inventory management, and sales reporting tools.',
        tags: ['React', 'TypeScript', 'Recharts', 'Supabase'],
        image: './project1.png',
    },
    {
        title: 'Task Management API',
        description: 'A high-performance RESTful API for team collaboration tools, supporting real-time updates via WebSockets and granular permission controls.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
        image: './project2.png',
    },
    {
        title: 'AI Content Generator',
        description: 'A SaaS platform leveraging LLMs to help marketers generate blog posts and social media copy, with a focus on SEO optimization.',
        tags: ['Next.js', 'OpenAI API', 'Tailwind', 'Stripe'],
        image: './project3.png',
    },
];

const SectionHeading = ({ children, subtitle }) => (
    <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4 transition-colors">{children}</h2>
        {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">{subtitle}</p>}
        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
);

const ParticleBackground = () => {
    useEffect(() => {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 121, 107, 0.3)'; // Increased opacity
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                particles.slice(index + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 121, 107, ${0.3 * (1 - distance / 150)})`; // Increased opacity
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="particle-canvas" className="absolute inset-0 z-0 pointer-events-none" />;
};

const UnifiedBackground = ({ mousePos, scrollY }) => {
    return (
        <div className="global-decoration-container">
            <div className="global-dots"></div>

            {/* Orb 1: Moves opposite to mouse, slow scroll */}
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) translateY(${scrollY * 0.1}px)` }}>
                <div className="global-orb g-orb-1"></div>
            </div>

            {/* Orb 2: Moves with mouse, medium scroll */}
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) translateY(${scrollY * -0.1}px)` }}>
                <div className="global-orb g-orb-2"></div>
            </div>

            {/* Orb 3: Moves opposite, fast scroll */}
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) translateY(${scrollY * 0.2}px)` }}>
                <div className="global-orb g-orb-3"></div>
            </div>

            {/* Shapes: More active movement */}
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)` }}>
                <div className="global-shape g-shape-1"></div>
            </div>
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}>
                <div className="global-shape g-shape-2"></div>
            </div>
            <div className="parallax-layer" style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}>
                <div className="global-shape g-shape-3"></div>
            </div>
        </div>
    );
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm SAHAJ. Ask me anything about SAHAJ's skills, projects, or contact info!", sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            let botText = "I'm just a simple AI, but I can tell you about SAHAJ's *skills*, *projects*, or how to *contact* him.";
            const lowerInput = userMessage.text.toLowerCase();

            if (lowerInput.includes('experience')) {
                botText = "SAHAJ is a student and hasn't done any professional work yet, but he has showcased his talent through *projects* and *skills*.";
            } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
                botText = "SAHAJ is an expert in React, Tailwind CSS, Node.js, and TypeScript. He also loves working with AI/ML technologies!";
            } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
                botText = "He has built some amazing projects like this Portfolio Website, E-commerce apps, and AI tools. Check out the 'Featured Projects' section!";
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('reach')) {
                botText = "You can get in touch via the contact form below. He's always open to new opportunities!";
            } else if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('sahaj')) {
                botText = "SAHAJ is a Full-Stack Developer and AI/ML Engineer passionate about building scalable web apps.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
                botText = "Hello there! How can I help you today?";
            }

            setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-slide-in flex flex-col max-h-[500px]">
                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-bold">SAHAJ</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 min-h-[300px]">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-600 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start mb-3">
                                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600 flex gap-1 items-center">
                                    <div className="typing-dot text-gray-500 dark:text-gray-400"></div>
                                    <div className="typing-dot text-gray-500 dark:text-gray-400"></div>
                                    <div className="typing-dot text-gray-500 dark:text-gray-400"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-primary text-white rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-primary text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
};

const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [theme, setTheme] = useState('light');

    // Interactive Background State
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    // Typewriter State
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = ["Student", "AI/ML Engineer", "Full-Stack Developer"];

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setTypedText(isDeleting
                ? fullText.substring(0, typedText.length - 1)
                : fullText.substring(0, typedText.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && typedText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, loopNum, roles, typingSpeed]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 50);
            setShowBackToTop(currentScrollY > 500);

            // Calculate scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);

            const sections = NAV_LINKS.map(link => document.getElementById(link.id));
            const scrollPosition = currentScrollY + 100;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-gray-800 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative dark:text-white transition-colors duration-300">

            <UnifiedBackground mousePos={mousePos} scrollY={scrollY} />
            <Chatbot />

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }}></div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-24 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                {Icons.ChevronDown} {/* Using ChevronDown rotated or we can add a ChevronUp icon. I'll just rotate this one for now or use it as is if it was Up. Wait, ChevronDown is down. I should add ChevronUp or rotate it. */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-180"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            {/* --- Navigation --- */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'py-4 shadow-md bg-background/90 dark:bg-gray-900/90' : 'py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => scrollToSection('home')}
                    >
                        <div className="logo-wrapper">
                            <img src="./logo_clean.png" alt="SAHAJ Logo" />
                        </div>
                        <span className="hidden sm:inline text-lg font-bold text-primary">SAHAJ</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${activeSection === link.id ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'light' ? Icons.Moon : Icons.Sun}
                        </button>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                        >
                            {theme === 'light' ? Icons.Moon : Icons.Sun}
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-gray-600 hover:text-primary dark:text-gray-300"
                        >
                            {Icons.Mail}
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <ParticleBackground />
                {/* Animated Mesh Gradient Background */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] mesh-gradient-1"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-300/20 rounded-full blur-[100px] mesh-gradient-2"></div>
                </div>

                {/* Restored Floating Bubbles for Hero - Now Interactive */}
                <div className="floating-shape shape-1" style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`, transition: 'transform 0.1s ease-out' }}></div>
                <div className="floating-shape shape-2" style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`, transition: 'transform 0.1s ease-out' }}></div>
                <div className="floating-shape shape-3" style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)`, transition: 'transform 0.1s ease-out' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-primary font-semibold tracking-wide uppercase mb-2 animate-entry delay-100">
                                Hello, I'm
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight animate-entry delay-200 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent pb-2">
                                SAHAJ
                            </h1>
                            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium mb-6 animate-entry delay-300 h-10 transition-colors">
                                {typedText}<span className="cursor-blink text-primary">|</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed animate-entry delay-400 transition-colors">
                                Building scalable, user-centric web applications with modern technologies.
                                Passionate about clean code and intuitive design.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-entry delay-500">
                                <button
                                    onClick={() => scrollToSection('projects')}
                                    className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    View Projects
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Contact Me
                                </button>
                            </div>

                            <div className="mt-12 flex items-center gap-4 text-gray-500 text-sm font-medium animate-entry delay-500 justify-center md:justify-start">
                                <span className="uppercase tracking-wider">Tech Stack |</span>
                                <div className="flex gap-4 items-center">
                                    <div className="group relative">
                                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" />
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">TypeScript</span>
                                    </div>
                                    <div className="group relative">
                                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" />
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">React</span>
                                    </div>
                                    <div className="group relative">
                                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" />
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Tailwind</span>
                                    </div>
                                    <div className="group relative">
                                        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" />
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Node.js</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Image / Placeholder */}
                        <div className="flex-1 flex justify-center md:justify-end animate-entry delay-200">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float-hero">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-[#a78bfa] rounded-full opacity-30 blur-2xl animate-pulse"></div>
                                <div className="relative w-full h-full rounded-full bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center glow-pulse">
                                    <img src="./logo_clean.png" alt="SAHAJ" className="w-full h-full object-cover object-center" />
                                </div>

                                {/* Animated Open to Work Badge */}
                                <div className="absolute bottom-4 -left-4 bg-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce hover:shadow-2xl transition-shadow cursor-pointer group border border-primary/20">
                                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                                    <span className="text-sm font-semibold bg-gradient-to-r from-primary to-[#a855f7] bg-clip-text text-transparent">Open to work</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
                    onClick={() => scrollToSection('about')}
                >
                    <div className="text-gray-400">
                        {Icons.ChevronDown}
                    </div>
                </div>
            </section>

            {/* --- About Me --- */}
            <section id="about" className="py-20 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl">
                        <SectionHeading>About Me</SectionHeading>
                        <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center space-y-6 transition-colors">
                            <p>
                                I am a dedicated Full-Stack Developer with a passion for crafting efficient, scalable, and visually appealing web applications. With a strong foundation in both frontend and backend technologies, I bridge the gap between design and functionality. My journey began with a curiosity for how things work on the web, which quickly evolved into a career focused on solving complex problems through code.
                            </p>
                            <p>
                                I specialize in the React ecosystem and modern backend frameworks, always striving to write clean, maintainable code. I believe in continuous learning and staying updated with the latest industry trends to deliver the best possible solutions. My goal is to build software that not only meets business requirements but also provides an exceptional user experience.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community. I am currently seeking new opportunities to collaborate with innovative teams and work on challenging projects that make a real impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Technical Skills --- */}
            <section id="skills" className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionHeading subtitle="My technical toolkit and areas of expertise">
                        Technical Skills
                    </SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SKILLS.map((group, index) => (
                            <div
                                key={group.category}
                                className="glass-panel p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
                            >
                                {/* Decorative gradient blob */}
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>

                                <div className="flex items-center gap-3 mb-6 text-primary relative z-10">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300 animate-float-icon">
                                        {group.icon}
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white transition-colors">{group.category}</h3>
                                </div>

                                <ul className="space-y-3 relative z-10">
                                    {group.skills.map((skill, i) => (
                                        <li key={skill} className="group/item flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-default">
                                            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover/item:bg-primary group-hover/item:scale-150 transition-all duration-300"></div>
                                            <span className="text-gray-700 dark:text-gray-200 font-medium text-sm group-hover/item:text-primary group-hover/item:translate-x-1 transition-all duration-300">{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Projects --- */}
            <section id="projects" className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionHeading subtitle="A selection of my recent work">
                        Featured Projects
                    </SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.title}
                                className="group glass-panel rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover-shine flex flex-col h-full border border-transparent hover:border-primary/20"
                            >
                                <div className="h-52 relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-500"></div>

                                    {/* Image Content (Icon) */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100">
                                            {Icons.ExternalLink}
                                        </div>
                                    </div>

                                    {/* Slide up content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">
                                            View Project
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow relative">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow text-sm leading-relaxed transition-colors">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full transition-all duration-300 hover:bg-primary hover:text-white transform group-hover:translate-x-1"
                                                style={{ transitionDelay: `${i * 50}ms` }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Contact --- */}
            <section id="contact" className="py-20 relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionHeading subtitle="Have a project in mind? Let's talk.">
                        Get In Touch
                    </SectionHeading>

                    <div className="glass-panel rounded-2xl shadow-xl p-8 md:p-12 transition-colors duration-300">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:scale-[1.01]"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:scale-[1.01]"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white focus:bg-white dark:focus:bg-gray-800 resize-none focus:scale-[1.01]"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300 transform active:scale-[0.98]"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">SAHAJ</h3>
                        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                            {Icons.Github}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                            {Icons.Linkedin}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                            {Icons.Mail}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);