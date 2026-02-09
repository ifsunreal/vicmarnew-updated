import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Building, Building2, Home, ArrowRight } from "lucide-react";

// Import property images
import duplexImg from '@/images/properties/Duplex Deluxe.png';
import triplexImg from '@/images/properties/Triplex.png';
import rowhouseImg from '@/images/properties/Rowhouse Economic.png';
import bgProperties from '@/images/bg-properties.jpeg';

const propertyTypes = [
  {
    type: "duplex",
    label: "Duplex Units",
    icon: Building,
    description: "Premium duplex homes featuring modern architecture with 3 bedrooms and 2 bathrooms. Perfect for growing families who want quality living spaces with spacious layouts and premium finishes.",
    image: duplexImg
  },
  {
    type: "triplex",
    label: "Triplex Units",
    icon: Building2,
    description: "Affordable triplex homes available in End Unit and Center Unit configurations. Features 3 bedrooms and 2 bathrooms with practical layouts ideal for families.",
    image: triplexImg
  },
  {
    type: "rowhouse",
    label: "Rowhouse Units",
    icon: Home,
    description: "Budget-friendly rowhouse units including Economic, Compound, and Socialized options. Perfect for first-time homebuyers and those looking for affordable housing solutions.",
    image: rowhouseImg
  },
];

export default function Properties() {
  const { data: allProperties = [] } = useQuery({
    queryKey: ["properties-count"],
    queryFn: () => base44.entities.Property.list(),
  });

  const getTypeCount = (type) => allProperties.filter(p => p.property_type === type).length;
  const getTypePriceRange = (type) => {
    const props = allProperties.filter(p => p.property_type === type);
    if (props.length === 0) return null;
    const prices = props.map(p => p.price).filter(Boolean);
    if (prices.length === 0) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const format = (v) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(v);
    return min === max ? format(min) : `${format(min)} - ${format(max)}`;
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      {/* Header with built-in bottom fade */}
      <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <img src={bgProperties} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium">Our Residences</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
            Our <span className="italic">Properties</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto font-light font-sans">
            Explore our diverse range of quality homes designed to meet every lifestyle and budget
          </p>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Property Types */}
        <div className="space-y-24">
          {propertyTypes.map((item, index) => {
            const Icon = item.icon;
            const count = getTypeCount(item.type);
            const priceRange = getTypePriceRange(item.type);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.type}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a3620]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 border border-white/40 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-light text-lg">{item.label}</p>
                          <p className="text-white/60 text-xs tracking-wider uppercase font-sans">{count} Properties Available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] font-sans font-medium">Residence Type</p>
                  <h2 className="text-3xl md:text-4xl font-light text-[#0a3620]">{item.label}</h2>
                  <p className="text-gray-500 text-base leading-relaxed font-light font-sans">{item.description}</p>

                  {priceRange && (
                    <div className="border-l-2 border-[#15803d] pl-4 py-2">
                      <p className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-sans">Starting Price</p>
                      <p className="text-xl font-semibold text-[#15803d] font-sans">{priceRange}</p>
                    </div>
                  )}

                  <Link to={createPageUrl("Listings") + `?type=${item.type}`}>
                    <Button className="bg-[#0a3620] hover:bg-[#0f4c2d] gap-2 rounded-none tracking-widest uppercase text-xs font-sans px-8 py-6 mt-2">
                      View {item.label}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a3620] py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Can't Find What You're <span className="italic">Looking</span> For?
            </h2>
            <p className="text-white/50 mb-8 font-light font-sans">
              Contact us and let us help you find the perfect property that matches your needs and budget.
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
