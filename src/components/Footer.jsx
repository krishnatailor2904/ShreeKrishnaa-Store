import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Shree Krishnaa" className="h-11 w-11 rounded-full" />
            <span className="font-display italic text-2xl text-ivory">Shree Krishnaa</span>
          </div>
          <p className="text-sm leading-relaxed text-ivory/60">
            Handcrafted police accessories and custom name plates — acrylic &amp; metal,
            English &amp; Gujarati, gold &amp; silver finishes. Trusted engraving, built to last.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:bg-brass hover:border-brass transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:bg-brass hover:border-brass transition-colors">
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-badge uppercase text-sm tracking-widest text-brass-light mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-badge uppercase text-sm tracking-widest text-brass-light mb-4">Categories</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop?category=acrylic-name-plates" className="hover:text-white transition-colors">Acrylic Name Plates</Link></li>
            <li><Link to="/shop?category=metal-name-plates" className="hover:text-white transition-colors">Metal Name Plates</Link></li>
            <li><Link to="/shop?category=hotel-staff-badges" className="hover:text-white transition-colors">Hotel Staff Badges</Link></li>
            <li><Link to="/shop?category=doctor-name-plates" className="hover:text-white transition-colors">Doctor Name Plates</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-badge uppercase text-sm tracking-widest text-brass-light mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brass-light" /> +91 94082 22280</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brass-light" /> hello@shreekrishnaa.com</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-brass-light mt-0.5" /> Gujarat, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} Shree Krishnaa. All rights reserved.
      </div>
    </footer>
  );
}
