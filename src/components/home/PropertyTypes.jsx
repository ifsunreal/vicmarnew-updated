import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Home, Building, Building2, Warehouse, LandPlot, Castle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const propertyTypes = [
  {
    type: "single_attached_unit_deluxe",
    label: "Single Attached Deluxe",
    icon: Castle,
    description: "Premium spacious homes"
  },
  {
    type: "single_attached_unit_standard",
    label: "Single Attached Standard",
    icon: Home,
    description: "Quality family homes"
  },
  {
    type: "duplex",
    label: "Duplex",
    icon: Building,
    description: "Shared wall convenience"
  },
  {
    type: "townhouse",
    label: "Townhouse",
    icon: Building2,
    description: "Modern urban living"
  },
  {
    type: "bungalow",
    label: "Bungalow",
    icon: Warehouse,
    description: "Single-story comfort"
  },
  {
    type: "lot_only",
    label: "Lot Only",
    icon: LandPlot,
    description: "Build your dream"
  },
];

export default function PropertyTypes({ propertyCounts = {} }) {
  const revealRef = useScrollReveal();

  return (
    <section ref={revealRef} className="snap-section min-h-screen py-24 bg-[#f8f6f0] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium reveal reveal-up" style={{ animationDuration: '0.6s' }}>Our Collection</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0a3620] mb-4 reveal reveal-up" style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}>
            Find Your <span className="italic">Property</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6 reveal reveal-scale" style={{ animationDuration: '0.6s', animationDelay: '0.2s' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 stagger-children">
          {propertyTypes.map((item) => {
            const Icon = item.icon;
            const count = propertyCounts[item.type] || 0;

            return (
              <Link
                key={item.type}
                to={createPageUrl("Listings") + `?type=${item.type}`}
                className="reveal reveal-up group bg-white hover:bg-[#0a3620] p-6 md:p-8 text-center transition-all duration-500 border border-gray-100 hover:border-[#0a3620]"
                style={{ animationDuration: '0.6s' }}
              >
                <div className="w-14 h-14 mx-auto mb-5 border border-[#15803d]/30 group-hover:border-white/30 flex items-center justify-center transition-colors duration-500">
                  <Icon className="w-6 h-6 text-[#15803d] group-hover:text-[#4ade80] transition-colors duration-500" />
                </div>
                <h3 className="font-sans font-semibold text-[#0a3620] group-hover:text-white transition-colors duration-500 text-sm tracking-wide">
                  {item.label}
                </h3>
                <p className="text-gray-400 group-hover:text-white/50 text-xs mt-2 transition-colors duration-500 font-sans font-light">
                  {item.description}
                </p>
                <p className="text-[#15803d] group-hover:text-[#4ade80] text-xs mt-2 transition-colors duration-500 font-sans">
                  ({count})
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
