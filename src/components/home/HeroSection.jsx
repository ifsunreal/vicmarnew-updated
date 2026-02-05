import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, Home, MapPin } from "lucide-react";
import heroVideo from "@/videos/real estate.mp4";
import vicmarLogo from "@/images/logos/transparent-vicmar-logo.png";

export default function HeroSection() {
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [propertyType, setPropertyType] = useState("any");
  const [status, setStatus] = useState("any");

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      maximumFractionDigits: 0 
    }).format(value);
  };

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (priceRange[0] > 500000) params.set("minPrice", priceRange[0]);
    if (priceRange[1] < 10000000) params.set("maxPrice", priceRange[1]);
    if (propertyType !== "any") params.set("type", propertyType);
    if (status !== "any") params.set("status", status);
    return createPageUrl("Listings") + (params.toString() ? "?" + params.toString() : "");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#166534]/70 to-[#166534]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={vicmarLogo} 
            alt="Vicmar Homes" 
            className="h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-2xl"
          />
        </div>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-4 font-light tracking-wide">
          Sustainable Living in Batangas City
        </p>
        <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Discover quality homes designed for modern Filipino families with eco-friendly features and community-focused living.
        </p>

        {/* Search Filter Box */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-[#166534]" />
            <h3 className="text-lg font-semibold text-[#166534]">Find Your Dream Home</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Price Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 text-left mb-3">Price Range</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={500000}
                max={10000000}
                step={100000}
                className="mb-3"
              />
              <p className="text-sm text-[#166534] font-medium text-left">
                {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
              </p>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left mb-3">Property Type</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="border-gray-200 focus:border-[#22c55e] focus:ring-[#22c55e]">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="single_attached_unit_deluxe">Single Attached Deluxe</SelectItem>
                  <SelectItem value="single_attached_unit_standard">Single Attached Standard</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="lot_only">Lot Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Button */}
            <div>
              <Link to={buildSearchUrl()}>
                <Button className="w-full bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-2 text-white/80">
            <Home className="w-5 h-5 text-[#86efac]" />
            <span className="text-sm">8+ Property Models</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-5 h-5 text-[#86efac]" />
            <span className="text-sm">San Jose Sico, Batangas City</span>
          </div>
        </div>
      </div>
    </section>
  );
}
