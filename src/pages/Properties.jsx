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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#166534] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Properties
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our diverse range of quality homes designed to meet every lifestyle and budget
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Property Types Grid */}
        <div className="space-y-16">
          {propertyTypes.map((item, index) => {
            const Icon = item.icon;
            const count = getTypeCount(item.type);
            const priceRange = getTypePriceRange(item.type);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.type}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-xl">{item.label}</p>
                          <p className="text-white/80 text-sm">{count} Properties Available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-[#166534]">{item.label}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>

                  {priceRange && (
                    <div className="bg-[#166534]/5 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Starting Price</p>
                      <p className="text-2xl font-bold text-[#22c55e]">{priceRange}</p>
                    </div>
                  )}

                  <Link to={createPageUrl("Listings") + `?type=${item.type}`}>
                    <Button className="bg-[#22c55e] hover:bg-[#16a34a] gap-2">
                      View {item.label} Properties
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-[#166534] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contact us and let us help you find the perfect property that matches your needs and budget.
          </p>
          <Link to={createPageUrl("AboutUs") + "?contact=true"}>
            <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-lg px-8 py-6">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
