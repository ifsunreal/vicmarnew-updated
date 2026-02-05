import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Home, Building, Building2, Warehouse, LandPlot, Castle } from "lucide-react";

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
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#166534] mb-12">
          Find Your Property
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {propertyTypes.map((item) => {
            const Icon = item.icon;
            const count = propertyCounts[item.type] || 0;
            
            return (
              <Link
                key={item.type}
                to={createPageUrl("Listings") + `?type=${item.type}`}
                className="group bg-gray-50 hover:bg-[#166534] rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white group-hover:bg-[#22c55e]/20 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h3 className="font-semibold text-[#166534] group-hover:text-white transition-colors text-sm">
                  {item.label}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-300 text-xs mt-1 transition-colors">
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
