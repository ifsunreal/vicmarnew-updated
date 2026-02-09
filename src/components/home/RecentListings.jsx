import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import PropertyCard from "../shared/PropertyCard";
import { ArrowRight } from "lucide-react";

export default function RecentListings({ properties = [], isLoading }) {
  if (isLoading) {
    return (
      <section className="py-24 bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#22c55e] mb-4 font-sans font-medium">Latest Homes</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#14532d]">
              Recent <span className="italic">Listings</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.3em] uppercase text-[#22c55e] mb-4 font-sans font-medium">Latest Homes</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#14532d]">
              Recent <span className="italic">Listings</span>
            </h2>
          </div>
          <Link
            to={createPageUrl("Listings")}
            className="hidden md:flex items-center gap-2 text-[#14532d] hover:text-[#22c55e] font-sans text-sm tracking-wider uppercase font-medium transition-colors mt-4 md:mt-0"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-light font-sans">
            No properties available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.slice(0, 9).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link
            to={createPageUrl("Listings")}
            className="inline-flex items-center gap-2 text-[#14532d] hover:text-[#22c55e] font-sans text-sm tracking-wider uppercase font-medium transition-colors"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
