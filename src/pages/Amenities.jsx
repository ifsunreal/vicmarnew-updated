import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { 
  Trees, Dumbbell, ShieldCheck, Car, Waves, 
  Users, Fence, Lightbulb, Droplets, PlayCircle,
  Building, Church
} from "lucide-react";

const amenities = [
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Round-the-clock security personnel and CCTV monitoring for your peace of mind."
  },
  {
    icon: Fence,
    title: "Gated Community",
    description: "Exclusive gated entrance with controlled access for residents only."
  },
  {
    icon: Trees,
    title: "Parks & Greenery",
    description: "Beautifully landscaped parks and open spaces for relaxation and recreation."
  },
  {
    icon: PlayCircle,
    title: "Playground",
    description: "Safe and fun playground areas designed for children of all ages."
  },
  {
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Outdoor fitness stations for health-conscious residents."
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Community swimming pool for leisure and exercise."
  },
  {
    icon: Users,
    title: "Clubhouse",
    description: "Multi-purpose clubhouse for community events and gatherings."
  },
  {
    icon: Car,
    title: "Wide Roads",
    description: "Well-paved wide roads for easy vehicle access and parking."
  },
  {
    icon: Lightbulb,
    title: "Street Lights",
    description: "Well-lit streets and common areas for safety at night."
  },
  {
    icon: Droplets,
    title: "Water System",
    description: "Reliable water supply with backup storage facilities."
  },
  {
    icon: Building,
    title: "Commercial Area",
    description: "Nearby commercial establishments for daily needs."
  },
  {
    icon: Church,
    title: "Chapel",
    description: "Community chapel for spiritual gatherings and services."
  },
];

export default function Amenities() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="relative py-24 px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#166534]/85" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Community Amenities
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enjoy a complete lifestyle with world-class amenities designed for comfort, convenience, and community living
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-[#22c55e]/10 group-hover:bg-[#22c55e]/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-bold text-[#166534] mb-3">{amenity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-64 lg:h-auto"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#166534] mb-4">
                  Live the Vicmar Lifestyle
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  At Vicmar Homes, we believe that a home is more than just four walls. It's about the community, the environment, and the lifestyle. Our carefully planned amenities are designed to bring families together and create lasting memories.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    Family-oriented community
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    Safe and secure environment
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    Well-maintained facilities
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    Active homeowner association
                  </li>
                </ul>
                <Link to={createPageUrl("Listings")}>
                  <Button className="bg-[#22c55e] hover:bg-[#16a34a] w-fit">
                    Explore Our Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#166534] mb-8 text-center">
            Community Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
              "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=500&q=80",
              "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=500&q=80",
              "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80",
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
              "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&q=80",
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
