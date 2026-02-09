import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronUp } from "lucide-react";
import vicmarLogo from "@/images/logos/transparent-vicmar-logo.png";
import vicmarLogoFooter from "@/images/logos/vicmar-logo-footer.png";
import bgFooter from "@/images/bg-footer.png";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isHomePage = currentPageName === "Home";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", page: "Home" },
    { name: "Listings", page: "Listings" },
    { name: "Properties", page: "Properties" },
    { name: "Amenities", page: "Amenities" },
    { name: "Vicinity Map", page: "VicinityMap" },
    { name: "About Us", page: "AboutUs" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        :root {
          --primary-green: #0f4c2d;
          --primary-dark-green: #0a3620;
          --primary-light-green: #15803d;
          --primary-light-green-hover: #116b33;
          --cream: #f8f6f0;
          --warm-gray: #f5f3ee;
        }
      `}</style>

      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHomePage && !scrolled
          ? "bg-transparent"
          : "bg-[#0a3620]/95 backdrop-blur-md shadow-lg"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - original colors, no filter */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img src={vicmarLogo} alt="Vicmar Homes" className="h-14 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 border-b-2 ${
                    currentPageName === link.page
                      ? "text-[#4ade80] border-[#4ade80]"
                      : "text-white/80 border-transparent hover:text-white hover:border-white/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to={createPageUrl("Contact")}
                className="bg-[#15803d] hover:bg-[#116b33] text-white px-7 py-2.5 rounded-none text-sm font-semibold tracking-widest uppercase transition-all duration-300 border border-[#15803d] hover:border-[#116b33]"
              >
                Inquire
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a3620]/98 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                    currentPageName === link.page
                      ? "text-[#4ade80] bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={createPageUrl("Contact")}
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-[#15803d] hover:bg-[#116b33] text-white px-4 py-3 text-sm font-semibold tracking-widest uppercase text-center mt-4"
              >
                Inquire
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={bgFooter} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0a3620]/95" />
        </div>
        {/* Top accent line */}
        <div className="relative h-1 bg-gradient-to-r from-[#0f4c2d] via-[#15803d] to-[#0f4c2d]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div className="md:col-span-1">
              <img src={vicmarLogoFooter} alt="Vicmar Homes" className="h-12 w-auto" />
              <p className="mt-6 text-green-200/70 text-sm leading-relaxed font-light">
                Your trusted partner in finding the perfect home. Quality living starts with Vicmar Homes.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-green-200/70 hover:text-white hover:border-[#15803d] hover:bg-[#15803d]/20 transition-all duration-300">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-green-200/70 hover:text-white hover:border-[#15803d] hover:bg-[#15803d]/20 transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-green-200/70 hover:text-white hover:border-[#15803d] hover:bg-[#15803d]/20 transition-all duration-300">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-base mb-6 tracking-wider uppercase text-white/90 font-sans">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link
                      to={createPageUrl(link.page)}
                      className="text-green-200/60 hover:text-[#4ade80] transition-colors text-sm font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-base mb-6 tracking-wider uppercase text-white/90 font-sans">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4ade80] flex-shrink-0 mt-1" />
                  <span className="text-green-200/60 font-light">San Jose Sico, Batangas City</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#4ade80] flex-shrink-0" />
                  <span className="text-green-200/60 font-light">(043) 233-2050</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#4ade80] flex-shrink-0" />
                  <span className="text-green-200/60 font-light">info@vicmarhomes.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-base mb-6 tracking-wider uppercase text-white/90 font-sans">Stay Updated</h4>
              <p className="text-green-200/60 text-sm mb-4 font-light">Subscribe for the latest property updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-green-200/40 text-sm focus:outline-none focus:border-[#15803d] transition-colors"
                />
                <button className="px-5 py-3 bg-[#15803d] hover:bg-[#116b33] text-sm font-semibold tracking-wider uppercase transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-200/40 text-xs tracking-wider font-light">
              &copy; {new Date().getFullYear()} Vicmar Homes. All rights reserved.
            </p>
            <p className="text-green-200/40 text-xs tracking-wider font-light">
              Sustainable Living in Batangas City
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#0f4c2d] hover:bg-[#15803d] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
