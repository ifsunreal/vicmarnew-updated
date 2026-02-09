import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const typeLabels = {
  single_attached_unit_deluxe: "Single Attached Deluxe",
  single_attached_unit_standard: "Single Attached Standard",
  duplex: "Duplex",
  townhouse: "Townhouse",
  bungalow: "Bungalow",
  lot_only: "Lot Only",
};

const statusColors = {
  available: "bg-[#15803d]",
  sold: "bg-red-500",
  reserved: "bg-amber-500",
};

export default function PropertyCard({ property }) {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Link
      to={createPageUrl("PropertyDetail") + `?id=${property.id}`}
      className="group bg-white overflow-hidden transition-all duration-500 border border-gray-100 hover:border-[#15803d]/30 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.main_image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status Badge */}
        <Badge className={`absolute top-4 left-4 ${statusColors[property.status]} text-white border-0 capitalize text-xs tracking-wider font-sans`}>
          {property.status === "available" ? "For Sale" : property.status}
        </Badge>

        {/* Property Type */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-white/90 text-xs font-medium bg-[#0a3620]/70 backdrop-blur-sm px-3 py-1.5 tracking-wider uppercase font-sans">
            {typeLabels[property.property_type] || property.property_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg text-[#0a3620] mb-2 line-clamp-1 group-hover:text-[#15803d] transition-colors">
          {property.title}
        </h3>

        {property.location && (
          <p className="text-gray-400 text-sm mb-4 flex items-center gap-1 font-sans font-light">
            <MapPin className="w-3.5 h-3.5" />
            {property.location}
          </p>
        )}

        {/* Price */}
        <p className="text-[#15803d] font-semibold text-xl mb-5 font-sans">
          {formatPrice(property.price)}
        </p>

        {/* Features */}
        <div className="flex items-center gap-5 text-gray-400 text-sm border-t border-gray-100 pt-5 font-sans font-light">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#15803d]/60" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#15803d]/60" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.floor_area && (
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-[#15803d]/60" />
              <span>{property.floor_area} sqm</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
