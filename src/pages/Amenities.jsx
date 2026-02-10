import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Trees, Dumbbell, ShieldCheck, Car, Waves,
  Users, Fence, Lightbulb, Droplets, PlayCircle,
  Building, Church
} from "lucide-react";
import bgAmenities from '@/images/bg-amenties.jpeg';
import communityGarden from '@/images/amenities/community_garden.jpg';
import basketballCourt from '@/images/amenities/basketball_court.jpg';
import pavillion from '@/images/amenities/pavillion.jpg';

const amenities = [
  { icon: ShieldCheck, title: "24/7 Security", description: "Round-the-clock security and CCTV monitoring" },
  { icon: Fence, title: "Gated Community", description: "Controlled access for residents only" },
  { icon: Trees, title: "Parks & Greenery", description: "Landscaped parks and open spaces" },
  { icon: PlayCircle, title: "Playground", description: "Safe play areas for children" },
  { icon: Dumbbell, title: "Fitness Area", description: "Outdoor fitness stations" },
  { icon: Waves, title: "Swimming Pool", description: "Community pool for leisure" },
  { icon: Users, title: "Clubhouse", description: "Multi-purpose community hall" },
  { icon: Car, title: "Wide Roads", description: "Well-paved roads and parking" },
  { icon: Lightbulb, title: "Street Lights", description: "Well-lit streets at night" },
  { icon: Droplets, title: "Water System", description: "Reliable water supply" },
  { icon: Building, title: "Commercial Area", description: "Nearby commercial spaces" },
  { icon: Church, title: "Chapel", description: "Community chapel" },
];

const galleryImages = [
  { src: basketballCourt, label: "Basketball Court" },
  { src: communityGarden, label: "Community Garden" },
  { src: pavillion, label: "Pavillion" },
];

export default function Amenities() {
  const revealRef = useScrollReveal();
  return (
    <div className="min-h-screen bg-[#f8f6f0]" ref={revealRef}>
      {/* Header with built-in bottom fade */}
      <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <img src={bgAmenities} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium header-animate header-animate-delay-1">Community Living</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 header-animate header-animate-delay-2">
            Community <span className="italic">Amenities</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto font-light font-sans header-animate header-animate-delay-3">
            World-class amenities designed for comfort and community living
          </p>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6 header-animate header-animate-delay-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 transition-all duration-500 border border-gray-100 hover:border-[#15803d]/30 group text-center reveal reveal-up"
                style={{ animationDuration: '0.5s' }}
              >
                <div className="w-10 h-10 border border-[#15803d]/30 flex items-center justify-center mb-4 mx-auto group-hover:bg-[#15803d] group-hover:border-[#15803d] transition-all duration-500">
                  <Icon className="w-4 h-4 text-[#15803d] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-sm font-medium text-[#0a3620] mb-1">{amenity.title}</h3>
                <p className="text-gray-400 text-xs font-sans font-light">{amenity.description}</p>
              </div>
            );
          })}
        </div>

        {/* Gallery Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium reveal reveal-up" style={{ animationDuration: '0.6s' }}>Gallery</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#0a3620] reveal reveal-up" style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}>
              Community <span className="italic">Gallery</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative h-64 overflow-hidden group cursor-pointer reveal reveal-scale"
                style={{ animationDuration: '0.7s', animationDelay: `${idx * 0.15}s` }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3620]/60 via-transparent to-transparent group-hover:from-[#0a3620]/80 transition-all duration-500" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-sm font-medium font-sans tracking-wide">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a3620] py-16">
          <div className="max-w-3xl mx-auto px-4 text-center reveal reveal-up" style={{ animationDuration: '0.7s' }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium">Explore</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Ready to See Our <span className="italic">Properties</span>?
            </h2>
            <p className="text-white/50 mb-8 font-light font-sans">
              Explore our collection of quality homes designed for modern Filipino families.
            </p>
            <Link to={createPageUrl("Listings")}>
              <Button className="bg-[#15803d] hover:bg-[#116b33] rounded-none tracking-widest uppercase text-xs font-sans px-10 py-6">
                Explore Properties
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
}
