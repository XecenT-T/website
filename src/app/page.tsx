"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const rooms = [
  {
    name: "Deluxe Room",
    desc: "Spacious and elegantly designed with a king-size bed, premium bedding, AC, high-speed WiFi, and modern amenities. Perfect for couples and solo travellers.",
    price: "₹3,499",
    img: "/room-deluxe.png",
    badge: "Most Popular",
    amenities: ["King Bed", "AC", "WiFi", "TV"],
  },
  {
    name: "Premium Suite",
    desc: "An opulent suite featuring designer interiors with floral accents, plush bedding, and all modern comforts. The ultimate indulgence for discerning guests.",
    price: "₹5,999",
    img: "/room-premium.png",
    badge: "Best Value",
    amenities: ["King Bed", "Balcony", "Mini Bar", "Bathtub"],
  },
  {
    name: "Banquet Hall",
    desc: "Our grand banquet hall with crystal chandeliers, premium seating for 50 to 200 guests, and full catering services. Ideal for weddings and corporate events.",
    price: "₹45,000",
    img: "/banquet-hall.png",
    badge: "Events",
    amenities: ["50-200 Pax", "Catering", "Sound System", "Valet"],
  },
];

const amenities = [
  { title: "47 Premium Rooms", desc: "Elegantly furnished rooms with king-size beds, premium linens, and modern comforts for a perfect night's rest." },
  { title: "Fine Dining", desc: "Multi-cuisine restaurant serving authentic Indian, Chinese, and Continental dishes. Also available on Swiggy & Zomato." },
  { title: "Banquet & Events", desc: "Grand banquet hall for 50-200 guests and terrace for 50-100 guests. Perfect for weddings, receptions, and celebrations." },
  { title: "Conference Hall", desc: "State-of-the-art conference hall with AV equipment, high-speed WiFi, and professional setup for corporate meetings." },
];

const highlights = [
  { text: "47 Premium Rooms" },
  { text: "Banquet Hall\n50-200 Pax" },
  { text: "Terrace Venue\n50-100 Pax" },
  { text: "Conference Hall" },
  { text: "Available on\nSwiggy & Zomato" },
  { text: "A Unit of Gill &\nGrewal's Hospitality" },
];

const testimonials = [
  {
    text: "Absolutely stunning hotel! The rooms are immaculate and the staff went above and beyond for our anniversary celebration. The banquet hall was breathtaking for our event.",
    author: "Rahul & Priya Mehta",
    role: "Anniversary Celebration",
    stars: 5,
  },
  {
    text: "Best hotel experience in the city. The deluxe room was spacious and beautifully decorated. The restaurant serves incredible food. Will definitely return!",
    author: "Ananya Krishnan",
    role: "Business Traveller",
    stars: 5,
  },
  {
    text: "We hosted our daughter's wedding at Silver Saffron and it was magical. The team handled everything flawlessly. The banquet hall looked like a palace. Highly recommended!",
    author: "Mr. & Mrs. Sharma",
    role: "Wedding Reception",
    stars: 5,
  },
  {
    text: "The premium suite exceeded all expectations. Luxurious interiors, impeccable room service, and the location is perfect. This is our go-to hotel now for every visit.",
    author: "Vikram Singh",
    role: "Frequent Guest",
    stars: 5,
  },
  {
    text: "Hosted our company's annual conference here. Professional setup, excellent AV equipment, and the catering was top-notch. The team coordinated everything perfectly.",
    author: "Sneha Patel",
    role: "Corporate Event",
    stars: 5,
  },
  {
    text: "From check-in to check-out, everything was seamless. The staff remembers your preferences and the attention to detail is remarkable. A true luxury experience.",
    author: "Arjun Kapoor",
    role: "Premium Suite Guest",
    stars: 5,
  },
];

const galleryItems = [
  { img: "/banquet-hall.png", label: "Grand Banquet Hall" },
  { img: "/room-deluxe.png", label: "Deluxe Room" },
  { img: "/room-premium.png", label: "Premium Room" },
  { img: "/hotel-lobby.png", label: "Hotel Lobby" },
  { img: "/hotel-restaurant.png", label: "Fine Dining" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const parallaxRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const setParallaxRef = useCallback((el: HTMLElement | null, index: number) => {
    parallaxRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      parallaxRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const speed = 0.3;
        const yPos = -(rect.top * speed);
        const bg = el.querySelector(".parallax-bg") as HTMLElement;
        if (bg) bg.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const curtainTimer = setTimeout(() => setCurtainDone(true), 2200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(curtainTimer);
    };
  }, []);

  return (
    <>
      {/* ===== CURTAIN ===== */}
      {!curtainDone && (
        <div className="page-curtain">
          <div className="page-curtain-logo" />
          <p className="curtain-title">Hotel Silver Saffron</p>
          <p className="curtain-subtitle">A Unit of Gill & Grewal&apos;s Hospitality</p>
        </div>
      )}

      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <a href="/" className="nav-brand">

            <div className="nav-brand-group">
              <span className="nav-brand-text">Silver Saffron</span>
              <span className="nav-brand-sub">A Unit of Gill & Grewal&apos;s Hospitality</span>
            </div>
          </a>
        </div>
        <ul className="nav-links">
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#query">Contact</a></li>
          <li>
            <button className="nav-book-btn" onClick={() => setShowBookingModal(true)}>
              Book Now
            </button>
          </li>
        </ul>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-pattern" />
          <svg className="hero-pattern-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[200, 300, 400].map((r, i) => (
              <circle key={i} cx="400" cy="400" r={r} fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity={0.3 - i * 0.08} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return <line key={`l-${i}`} x1="400" y1="400" x2={400 + 400 * Math.cos(a)} y2={400 + 400 * Math.sin(a)} stroke="#c9a84c" strokeWidth="0.3" opacity="0.15" />;
            })}
          </svg>
          <div className="corner-br" />
          <motion.div className="hero-text" style={{ y: heroY }}>
            <p className="hero-tagline">Welcome to</p>
            <h1 className="hero-headline">
              Hotel<br /><span>Silver Saffron</span>
            </h1>
            <p className="hero-unit">A Unit of Gill & Grewal&apos;s Hospitality</p>
            <p className="hero-subtext">Luxury, Comfort & Unforgettable Experiences</p>
            <div className="hero-cta-group">
              <button className="btn-book" onClick={() => setShowBookingModal(true)}>
                Book Your Stay <span className="btn-arrow">→</span>
              </button>
              <a href="#rooms" className="btn-explore">
                Explore Rooms <span className="btn-arrow">→</span>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="hero-right">
          <div className="hero-ring" />
          <div className="hero-ring-inner" />
          <motion.div
            className="hero-3d-container"
            whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image src="/room-deluxe.png" alt="Hotel Silver Saffron - Luxury Room" fill priority sizes="50vw" quality={90} style={{ objectFit: "cover", objectPosition: "center" }} />
          </motion.div>
          <div className="hero-image-overlay" />
          <div className="hero-glow" />
        </div>
      </section>

      {/* ===== QUICK BOOKING STRIP ===== */}
      <motion.section
        className="booking-strip"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
          <div className="booking-field">
            <label>Check-in</label>
            <input type="date" />
          </div>
          <div className="booking-field">
            <label>Check-out</label>
            <input type="date" />
          </div>
          <div className="booking-field">
            <label>Guests</label>
            <select>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
          <div className="booking-field">
            <label>Room Type</label>
            <select>
              <option>Deluxe Room</option>
              <option>Premium Suite</option>
              <option>Family Room</option>
            </select>
          </div>
          <button type="submit" className="booking-submit" onClick={() => setShowBookingModal(true)}>
            Check Availability
          </button>
        </form>
      </motion.section>

      {/* ===== AMENITIES / WHY US ===== */}
      <motion.section
        className="why-section"
        id="amenities"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">Our Offerings</span>
          <h2 className="section-title">World-Class Amenities</h2>
        </div>
        <div className="why-grid">
          {amenities.map((item, i) => (
            <motion.div
              className="why-item"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >

              <div className="why-number">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== PARALLAX QUOTE ===== */}
      <section className="parallax-banner" ref={(el) => setParallaxRef(el, 0)}>
        <div className="parallax-bg">
          <Image src="/banquet-hall.png" alt="Hotel Silver Saffron Banquet" fill sizes="100vw" quality={85} style={{ objectFit: "cover" }} />
        </div>
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <p className="parallax-quote">
            &ldquo;Where every stay becomes a cherished memory and every guest is treated like royalty.&rdquo;
          </p>
          <span className="parallax-author">&mdash; The Silver Saffron Promise</span>
        </div>
      </section>

      {/* ===== ROOMS ===== */}
      <motion.section
        className="featured-section"
        id="rooms"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">Accommodations</span>
          <h2 className="section-title">Our Rooms & Venues</h2>
        </div>
        <div className="featured-grid">
          {rooms.map((item, i) => (
            <motion.div
              className="featured-item"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{
                y: -12,
                rotateY: 3,
                rotateX: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              style={{ perspective: 1000 }}
            >
              <div className="featured-img-wrap">
                <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="featured-img-shine" />
                {item.badge && <span className="featured-badge">{item.badge}</span>}
              </div>
              <div className="featured-body">
                <h3 className="featured-name">{item.name}</h3>
                <p className="featured-desc">{item.desc}</p>
                <div className="featured-amenities">
                  {item.amenities.map((a, j) => (
                    <span className="amenity-tag" key={j}>{a}</span>
                  ))}
                </div>
                <div className="featured-footer">
                  <div>
                    <span className="featured-price">{item.price}</span>
                    <span className="featured-price-label">per night</span>
                  </div>
                  <button className="btn-order" onClick={() => setShowBookingModal(true)}>Book Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== HOTEL FEATURES SHOWCASE ===== */}
      <motion.section
        className="features-showcase"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Hotel Silver Saffron at a Glance</h2>
        </div>
        <div className="features-grid">
          {highlights.map((h, i) => (
            <motion.div
              className="feature-card"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="feature-card-number">{String(i + 1).padStart(2, "0")}</div>
              <p className="feature-card-text" style={{ whiteSpace: 'pre-line' }}>{h.text}</p>
              <div className="feature-card-line" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== ABOUT / STORY ===== */}
      <motion.section
        className="story-banner"
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="story-content">
          <span className="story-tag">Our Legacy</span>
          <h2 className="story-title">A Tradition of Unmatched Hospitality</h2>
          <p className="story-text">
            Hotel Silver Saffron stands as a beacon of luxury and warmth in the heart of the city. With thoughtfully designed rooms, world-class dining, and a team dedicated to creating unforgettable experiences, we transform every stay into a celebration. Whether you&apos;re here for business, a family getaway, or a grand celebration, Silver Saffron is your home away from home.
          </p>
          <div className="story-stats">
            <div className="stat-item"><span className="stat-number">47</span><span className="stat-label">Premium Rooms</span></div>
            <div className="stat-item"><span className="stat-number">200</span><span className="stat-label">Banquet Capacity</span></div>
            <div className="stat-item"><span className="stat-number">4.8</span><span className="stat-label">Star Rating</span></div>
            <div className="stat-item"><span className="stat-number">10K+</span><span className="stat-label">Happy Guests</span></div>
          </div>
        </div>
      </motion.section>

      {/* ===== PARALLAX 2 ===== */}
      <section className="parallax-banner" ref={(el) => setParallaxRef(el, 1)}>
        <div className="parallax-bg">
          <Image src="/room-premium.png" alt="Hotel Silver Saffron Premium Room" fill sizes="100vw" quality={85} style={{ objectFit: "cover" }} />
        </div>
        <div className="parallax-overlay" />
        <div className="parallax-content">
          <p className="parallax-quote">
            &ldquo;Savour exquisite flavours at our multi-cuisine restaurant — where every meal is an experience.&rdquo;
          </p>
          <span className="parallax-author">&mdash; The Saffron Kitchen</span>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <motion.section
        className="gallery-section"
        id="gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">Visual Tour</span>
          <h2 className="section-title">Explore Hotel Silver Saffron</h2>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <motion.div
              className="gallery-item"
              key={i}
              whileHover={{ scale: 1.04, rotateZ: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image src={item.img} alt={item.label} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: "cover" }} />
              <div className="gallery-item-overlay">
                <span>{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== TESTIMONIALS ===== */}
      <motion.section
        className="testimonials-section"
        id="reviews"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">Guest Reviews</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              className="testimonial-item"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span className="testimonial-star" key={j}>&#9733;</span>
                ))}
              </div>
              <div className="testimonial-quote-mark">&ldquo;</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author-wrap">
                <p className="testimonial-author">{t.author}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== QUERY SECTION ===== */}
      <motion.section
        className="query-section"
        id="query"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Send Us a Query</h2>
        </div>
        <div className="query-container">
          <form className="query-form" onSubmit={(e) => e.preventDefault()}>
            <div className="query-field">
              <label>Full Name</label>
              <input type="text" placeholder="Your full name" />
            </div>
            <div className="query-field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="query-field">
              <label>Phone</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="query-field">
              <label>Query Type</label>
              <select>
                <option>Room Booking</option>
                <option>Banquet Inquiry</option>
                <option>Corporate Event</option>
                <option>Wedding Package</option>
                <option>Dining Reservation</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="query-field full-width">
              <label>Your Message</label>
              <textarea rows={5} placeholder="Tell us about your requirements, preferred dates, number of guests, or any special requests..." />
            </div>
            <div className="query-field full-width">
              <button type="submit" className="query-submit">Send Query</button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* ===== CTA / NEWSLETTER ===== */}
      <motion.section
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="cta-content">
          <h2 className="cta-title">Exclusive Offers Await</h2>
          <p className="cta-text">
            Subscribe to receive special rates, seasonal packages, and exclusive member-only deals. Be the first to know about our luxury experiences.
          </p>
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="cta-input" placeholder="Enter your email" />
            <button type="submit" className="cta-btn">Subscribe</button>
          </form>
        </div>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-brand-name">Hotel Silver Saffron</span>
            <span className="footer-brand-unit">A Unit of Gill & Grewal&apos;s Hospitality</span>
            <p>Where luxury meets comfort. Experience 47 premium rooms, grand banquet halls, terrace venues, and unforgettable celebrations.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#rooms">Our Rooms</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#reviews">Guest Reviews</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#rooms">Room Booking</a></li>
              <li><a href="#query">Banquet Inquiry</a></li>
              <li><a href="#query">Corporate Events</a></li>
              <li><a href="#query">Wedding Packages</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="tel:+911234567890">+91 123 456 7890</a></li>
              <li><a href="mailto:info@silversaffron.com">info@silversaffron.com</a></li>
              <li><a href="#query">Send a Query</a></li>
              <li><a href="#">Directions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Hotel Silver Saffron. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>
      </footer>

      {/* ===== BOOKING MODAL ===== */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowBookingModal(false)}>✕</button>
              <h3 className="modal-title">Book Your Stay</h3>
              <p className="modal-subtitle">Fill in your details and we&apos;ll confirm your reservation shortly.</p>
              <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setShowBookingModal(false); }}>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your name" />
                  </div>
                  <div className="modal-field">
                    <label>Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="modal-field">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Check-in</label>
                    <input type="date" />
                  </div>
                  <div className="modal-field">
                    <label>Check-out</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Room Type</label>
                    <select>
                      <option>Deluxe Room - ₹3,499/night</option>
                      <option>Premium Suite - ₹5,999/night</option>
                      <option>Family Room - ₹4,499/night</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Guests</label>
                    <select>
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                </div>
                <div className="modal-field">
                  <label>Special Requests</label>
                  <textarea rows={3} placeholder="Any special requirements..." />
                </div>
                <button type="submit" className="modal-submit">Confirm Booking</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
