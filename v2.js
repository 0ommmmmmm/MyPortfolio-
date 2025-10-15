import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components & Icons ---
// Using inline SVGs for icons to keep it all in one file and avoid external dependencies.

const CrystalLoader = () => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-[100]">
    <div className="relative w-24 h-28 animate-pulse">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[48px] border-l-transparent border-r-[48px] border-r-transparent border-b-[32px] border-b-purple-300 opacity-80"></div>
      <div className="absolute top-8 left-0 w-0 h-0 border-b-[32px] border-b-transparent border-t-[32px] border-t-transparent border-r-[48px] border-r-indigo-300 opacity-80"></div>
      <div className="absolute top-8 right-0 w-0 h-0 border-b-[32px] border-b-transparent border-t-[32px] border-t-transparent border-l-[48px] border-l-teal-300 opacity-80"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[48px] border-l-transparent border-r-[48px] border-r-transparent border-t-[32px] border-t-purple-400 opacity-80"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white font-semibold text-sm">G</div>
    </div>
  </div>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LaptopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


// --- Main App Component ---
export default function App() {
    const [loading, setLoading] = useState(true);

    // Refs for smooth scrolling
    const sections = {
        home: useRef(null),
        about: useRef(null),
        plans: useRef(null),
        schedule: useRef(null),
        register: useRef(null),
        contact: useRef(null),
    };

    // Pre-loader effect
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Smooth scroll functionality
    const scrollToSection = (sectionRef) => {
        window.scrollTo({
            top: sectionRef.current.offsetTop - 80, // Adjust for sticky header
            behavior: 'smooth',
        });
    };

    // Intersection Observer for fade-in animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        Object.values(sections).forEach((sectionRef) => {
            if (sectionRef.current) {
                observer.observe(sectionRef.current);
            }
        });

        // Observe other elements with the .fade-in class
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, [loading]); // Re-run after loading is complete

    if (loading) {
        return <CrystalLoader />;
    }

    // Main component structure
    return (
        <div className="bg-stone-100 text-gray-800 font-outfit scroll-smooth">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap');
                
                body {
                  font-family: 'Outfit', sans-serif;
                }
                
                .glass-card {
                  background: rgba(255, 255, 255, 0.5);
                  backdrop-filter: blur(12px);
                  -webkit-backdrop-filter: blur(12px);
                  border: 1px solid rgba(0, 0, 0, 0.08);
                  transition: all 0.3s ease;
                }
                
                .glass-card:hover {
                  background: rgba(255, 255, 255, 0.7);
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  transform: translateY(-8px);
                }

                .glowing-text {
                    color: #5b21b6; /* Equivalent to Tailwind's violet-700 */
                    text-shadow: 0 2px 20px rgba(139, 92, 246, 0.2);
                }

                .glow-button {
                    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
                }
                 .glow-button:hover {
                    box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
                }
                
                .fade-in {
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }

                .fade-in-visible {
                  opacity: 1;
                  transform: translateY(0);
                }
                
                .crystal-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    z-index: -1;
                    background: linear-gradient(45deg, #f5f3ff, #faf7f2, #f3e8ff, #fdfcfa);
                    background-size: 400% 400%;
                    animation: gradient-animation 20s ease infinite;
                }
                
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
            
            <div className="crystal-bg"></div>

            <Header scrollToSection={scrollToSection} sections={sections} />
            
            <main className="pt-20">
                <HeroSection ref={sections.home} scrollToSection={() => scrollToSection(sections.register)} />
                <AboutMentor ref={sections.about} />
                <MembershipPlans ref={sections.plans} scrollToSection={() => scrollToSection(sections.register)} />
                <BatchSchedule ref={sections.schedule} />
                <StudyResources />
                <Testimonials />
                <RegistrationForm ref={sections.register} />
                <ContactSection ref={sections.contact} />
            </main>

            <Footer />
        </div>
    );
}

// --- Section Components (defined within the same file) ---

const Header = ({ scrollToSection, sections }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', ref: sections.home },
        { name: 'About', ref: sections.about },
        { name: 'Plans', ref: sections.plans },
        { name: 'Schedule', ref: sections.schedule },
        { name: 'Contact', ref: sections.contact },
    ];
    
    const handleNavClick = (ref) => {
        scrollToSection(ref);
        setIsOpen(false);
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-200/80">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-violet-700">G-Dnyasa</h1>
                <div className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                         <button key={link.name} onClick={() => scrollToSection(link.ref)} className="hover:text-violet-600 transition-colors duration-300">{link.name}</button>
                    ))}
                </div>
                 <button onClick={() => scrollToSection(sections.register)} className="hidden md:block bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-lg glow-button transition-all duration-300">Join Now</button>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}></path></svg>
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden bg-white/30 backdrop-blur-lg">
                    {navLinks.map(link => (
                        <button key={link.name} onClick={() => handleNavClick(link.ref)} className="block py-2 px-6 text-sm hover:bg-violet-100/50 w-full text-left">{link.name}</button>
                    ))}
                    <div className="p-4">
                        <button onClick={() => handleNavClick(sections.register)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-lg glow-button w-full transition-all duration-300">Join Now</button>
                    </div>
                </div>
            )}
        </header>
    );
};

const HeroSection = React.forwardRef(({ scrollToSection }, ref) => (
    <section ref={ref} className="min-h-[calc(100vh-80px)] container mx-auto px-6 flex items-center justify-center text-center">
        <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold glowing-text mb-4">Geology Mentorship</h1>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 mb-6">Get Set Ready to Rock the World!</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Guiding UG/PG Geology students for CSIR-NET, GATE, IIT JAM & more.</p>
            <button onClick={scrollToSection} className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg text-lg glow-button transition-all duration-300 transform hover:scale-105">Join Now</button>
        </div>
    </section>
));

const AboutMentor = React.forwardRef((props, ref) => (
    <section ref={ref} className="py-20 fade-in">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">Meet Your Mentor</h2>
            <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                 <div className="w-40 h-40 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-1 shadow-lg">
                    {/* Placeholder for an avatar image */}
                    <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-violet-700">Ms. Apoorva Pimprikar</h3>
                    <p className="text-indigo-600 font-medium mt-1">MSc Applied Geology | GATE GG 2024, 2025</p>
                    <p className="mt-4 text-gray-700 max-w-xl">Passionate geology educator helping students master complex concepts with clarity and confidence. My goal is to make learning geology an intuitive and exciting journey for everyone.</p>
                </div>
            </div>
        </div>
    </section>
));

const PlanCard = ({ plan, scrollToSection }) => (
    <div className="glass-card rounded-2xl p-8 flex flex-col text-center border-2 border-transparent hover:border-violet-400/50">
        <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
        <p className="text-4xl font-bold mb-4 text-gray-900">{plan.price}</p>
        <ul className="text-gray-600 space-y-3 mb-6 flex-grow">
            {plan.features.map(feature => <li key={feature}>{feature}</li>)}
        </ul>
        <p className="text-xs text-gray-500 italic mb-6">{plan.continuation}</p>
        <button onClick={scrollToSection} className="mt-auto bg-violet-600/80 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-lg glow-button transition-all duration-300">Enroll Now</button>
    </div>
);

const MembershipPlans = React.forwardRef(({ scrollToSection }, ref) => {
    const plans = [
        { name: 'Quartz (Basic)', price: '₹800', features: ['4 live sessions', '4 mock tests', 'Study materials'], continuation: '(₹500 for next 2 months if continued)', color: 'text-gray-700' },
        { name: 'Garnet (Silver)', price: '₹1200', features: ['8 live sessions', '4 mock tests', 'Study materials'], continuation: '(₹1000 for next 2 months if continued)', color: 'text-red-600' },
        { name: 'Diamond (Gold)', price: '₹1600', features: ['8 live sessions', '4 mock tests', 'Study materials', 'Resume review', 'One Mega Test Series'], continuation: '(₹1500 for next 2 months if continued)', color: 'text-blue-600' },
    ];
    return (
        <section ref={ref} className="py-20 fade-in">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">Membership Plans</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map(plan => <PlanCard key={plan.name} plan={plan} scrollToSection={scrollToSection} />)}
                </div>
                <div className="text-center mt-8">
                    <div className="inline-block glass-card rounded-lg px-4 py-2 text-sm text-gray-500 italic">
                        Trial packs do not include recorded classes, entrance exam guidance, or one-to-one sessions.
                    </div>
                </div>
            </div>
        </section>
    );
});

const BatchSchedule = React.forwardRef((props, ref) => (
    <section ref={ref} className="py-20 fade-in">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">Batch Schedule</h2>
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center p-4 rounded-lg transition hover:scale-105">
                        <CalendarIcon />
                        <h3 className="font-bold text-lg mt-4">New Batch Starts</h3>
                        <p className="text-2xl text-violet-600 font-bold">8 Oct 2025</p>
                        <p className="text-sm text-gray-500">Registration closes: 6 Oct 2025</p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg transition hover:scale-105">
                        <ClockIcon />
                        <h3 className="font-bold text-lg mt-4">Timings</h3>
                        <p className="text-2xl text-violet-600 font-bold">7–9 PM</p>
                        <p className="text-sm text-gray-500">Wednesday & Thursday</p>
                    </div>
                     <div className="flex flex-col items-center p-4 rounded-lg transition hover:scale-105">
                        <LaptopIcon />
                        <h3 className="font-bold text-lg mt-4">Mode</h3>
                        <p className="text-2xl text-violet-600 font-bold">Online</p>
                        <p className="text-sm text-gray-500">Zoom / Google Meet</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
));

const StudyResources = () => {
    const resources = ['Mock Test', 'Study Material', 'Exam Strategy'];
    return (
        <section className="py-20 fade-in">
            <div className="container mx-auto px-6">
                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">Study Resources</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {resources.map(res => (
                        <div key={res} className="glass-card rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-bold">{res}</h3>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const testimonials = [
        { quote: "This mentorship helped me finally understand structural geology!", author: "Aditi, GATE 2025 Aspirant" },
        { quote: "Apoorva ma'am's teaching style is crystal clear. Highly recommended for CSIR-NET.", author: "Rohan, CSIR-NET Aspirant" },
        { quote: "The mock tests were a game-changer for my IIT JAM preparation. Thank you!", author: "Priya, IIT JAM 2025" },
    ];
    const [current, setCurrent] = useState(0);

    const nextTestimonial = () => setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    const prevTestimonial = () => setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    
     useEffect(() => {
        const slideInterval = setInterval(nextTestimonial, 5000);
        return () => clearInterval(slideInterval);
    }, [current]);

    return (
        <section className="py-20 fade-in">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">What Students Say</h2>
                <div className="relative glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto min-h-[250px] flex items-center justify-center border-2 border-violet-500/20 shadow-lg shadow-violet-500/20">
                   <button onClick={prevTestimonial} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/5 hover:bg-black/10 transition">
                       &#8592;
                   </button>
                    <div className="text-center">
                        <p className="text-xl italic text-gray-700">"{testimonials[current].quote}"</p>
                        <p className="mt-4 font-bold text-violet-600">— {testimonials[current].author}</p>
                    </div>
                   <button onClick={nextTestimonial} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/5 hover:bg-black/10 transition">
                       &#8594;
                   </button>
                </div>
            </div>
        </section>
    );
};

const RegistrationForm = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', plan: 'Quartz', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // --- Google Sheets Integration ---
        // 1. Create a Google Sheet with columns: Timestamp, Name, Email, Phone, Plan, Message
        // 2. Go to Extensions > Apps Script.
        // 3. Paste the script content from the comment below.
        // 4. Deploy > New Deployment > Select Type: Web App.
        // 5. Configure: Execute as "Me", Who has access: "Anyone".
        // 6. Copy the Web App URL and paste it below.
        
        /*
        --- Google Apps Script Code (script.gs) ---
        function doPost(e) {
          try {
            var doc = SpreadsheetApp.getActiveSpreadsheet();
            var sheet = doc.getSheetByName('Registrations'); // Make sure sheet name is 'Registrations' or change it here
            if (!sheet) {
                sheet = doc.insertSheet('Registrations');
                sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Plan", "Message"]);
            }
            
            var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            var nextRow = sheet.getLastRow() + 1;
            
            var newRow = headers.map(function(header) {
              return header === 'Timestamp' ? new Date() : JSON.parse(e.postData.contents)[header.toLowerCase()];
            });
            
            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
            
            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
              .setMimeType(ContentService.MimeType.JSON);
          } catch (e) {
            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
        */

        const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; // IMPORTANT: Replace with your actual URL

        try {
            if(SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"){
                console.warn("Google Apps Script URL not set. Simulating submission.");
                 // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                 setSubmitStatus({ success: true, message: "Form submitted successfully! (Simulation)" });
            } else {
                 const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Important for this type of request
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                setSubmitStatus({ success: true, message: "Thank you! We've received your registration." });
            }
            setFormData({ name: '', email: '', phone: '', plan: 'Quartz', message: '' }); // Reset form
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus({ success: false, message: "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <section ref={ref} className="py-20 fade-in">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glowing-text">Register Now</h2>
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" placeholder="Full Name" required className="bg-white/60 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-gray-500" value={formData.name} onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email Address" required className="bg-white/60 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-gray-500" value={formData.email} onChange={handleChange} />
                            <input type="tel" name="phone" placeholder="Phone Number" required className="bg-white/60 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-gray-500" value={formData.phone} onChange={handleChange} />
                             <select name="plan" className="bg-white/60 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500" value={formData.plan} onChange={handleChange}>
                                <option>Quartz (Basic)</option>
                                <option>Garnet (Silver)</option>
                                <option>Diamond (Gold)</option>
                            </select>
                        </div>
                        <textarea name="message" placeholder="Your Message (Optional)" rows="4" className="w-full bg-white/60 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-gray-500 mb-6" value={formData.message} onChange={handleChange}></textarea>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-lg text-lg glow-button transition-all duration-300 disabled:bg-violet-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Submitting...' : 'Submit & Pay'}
                        </button>
                    </form>
                    {submitStatus && (
                        <p className={`mt-4 text-center ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                            {submitStatus.message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
});

const ContactSection = React.forwardRef((props, ref) => (
    <section ref={ref} className="py-20 fade-in">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 glowing-text">Get In Touch</h2>
             <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                <p className="mb-8">Have questions? Feel free to reach out directly.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a href="https://wa.me/917378719142" target="_blank" rel="noopener noreferrer" className="glass-card rounded-lg px-6 py-3 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232z"/></svg>
                        7378719142
                    </a>
                    <a href="mailto:geology.apoorva95@gmail.com" className="glass-card rounded-lg px-6 py-3 flex items-center gap-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm2.47-1.47L16 4.697v7.104l-5.803-3.558z"/></svg>
                        geology.apoorva95@gmail.com
                    </a>
                </div>
            </div>
        </div>
    </section>
));

const Footer = () => (
    <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200/80 bg-white/20">
        <p>© {new Date().getFullYear()} G-Dnyasa Mentorship | Designed with ❤️ for Geology Students 💎</p>
    </footer>
);

