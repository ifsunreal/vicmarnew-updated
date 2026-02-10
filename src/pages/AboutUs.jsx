import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Award, Users, Building, Leaf, Heart, Target
} from "lucide-react";
import bgContact from '@/images/bg-contact.jpeg';
import communityGarden from '@/images/amenities/community_garden.jpg';
import pavillion from '@/images/amenities/pavillion.jpg';

const stats = [
  { value: "500+", label: "Happy Families", icon: Users },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "15+", label: "Projects Completed", icon: Building },
  { value: "100%", label: "Sustainable Design", icon: Leaf },
];

const values = [
  {
    icon: Leaf,
    title: "Environmentally Conscious",
    description: "Reduced concrete footprint, porous sidewalks, and rain water seepage systems to replenish ground water and preserve natural resources."
  },
  {
    icon: Heart,
    title: "Health Conscious",
    description: "Backyard vermiculture, medicinal herb gardens, and organic food production reduce living costs and promote healthier lifestyles."
  },
  {
    icon: Target,
    title: "Financially Conscious",
    description: "Gardens for food & herbs, reduced energy requirements, and sustainable features lower household expenditures for homeowners."
  },
];

export default function AboutUs() {
  const revealRef = useScrollReveal();
  return (
    <div className="min-h-screen bg-[#f8f6f0]" ref={revealRef}>
      {/* Header with built-in bottom fade */}
      <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <img src={bgContact} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium header-animate header-animate-delay-1">Our Story</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 header-animate header-animate-delay-2">
            About <span className="italic">Vicmar Homes</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto font-light font-sans header-animate header-animate-delay-3">
            An integrated and sustainable concept for affordable housing in Batangas City
          </p>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6 header-animate header-animate-delay-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10 mb-20 stagger-children">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-8 text-center border border-gray-100 hover:border-[#15803d]/30 transition-all duration-300 shadow-sm reveal reveal-up" style={{ animationDuration: '0.5s' }}>
                <div className="w-10 h-10 border border-[#15803d]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-[#15803d]" />
                </div>
                <p className="text-3xl font-light text-[#0a3620]">{stat.value}</p>
                <p className="text-gray-400 text-xs tracking-wider uppercase mt-1 font-sans">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal reveal-left" style={{ animationDuration: '0.7s' }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium">Our Vision</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#0a3620] mb-6">
              Building a <span className="italic">Sustainable</span> Future
            </h2>
            <p className="text-gray-500 leading-relaxed font-sans font-light mb-5">
              Each home is provided enough garden space for food & herb production. The duplex and single attached models provide savings on shared wall construction, while allowing for a more spacious community with reduced concrete footprint.
            </p>
            <p className="text-gray-500 leading-relaxed font-sans font-light">
              The village distributes parks and playgrounds into garden 'greenways' behind each home, serving as social interaction spaces while allowing for communal food gardens and sustainable living.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 reveal reveal-right" style={{ animationDuration: '0.7s', animationDelay: '0.15s' }}>
            <img src={communityGarden} alt="Community Garden" className="h-56 object-cover w-full" />
            <img src={pavillion} alt="Pavillion" className="h-56 object-cover w-full mt-8" />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium reveal reveal-up" style={{ animationDuration: '0.6s' }}>Our Core Values</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#0a3620] reveal reveal-up" style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}>
              What We <span className="italic">Stand</span> For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white p-10 text-center border border-gray-100 hover:border-[#15803d]/30 transition-all duration-300 reveal reveal-up" style={{ animationDuration: '0.6s' }}>
                  <div className="w-12 h-12 border border-[#15803d]/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-5 h-5 text-[#15803d]" />
                  </div>
                  <h3 className="text-lg text-[#0a3620] mb-3">{value.title}</h3>
                  <p className="text-gray-500 text-sm font-sans font-light">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a3620] py-16">
          <div className="max-w-3xl mx-auto px-4 text-center reveal reveal-up" style={{ animationDuration: '0.7s' }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium">Let's Talk</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Ready to Find Your <span className="italic">Dream Home</span>?
            </h2>
            <p className="text-white/50 mb-8 font-light font-sans">
              Contact our team and let us help you find the perfect property.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button className="bg-[#15803d] hover:bg-[#116b33] rounded-none tracking-widest uppercase text-xs font-sans px-10 py-6">
                Contact Us Today
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
}
