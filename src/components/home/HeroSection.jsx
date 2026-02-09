import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, ChevronDown } from "lucide-react";
import heroVideo from "@/videos/real estate.mp4";

export default function HeroSection() {
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [propertyType, setPropertyType] = useState("any");

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
    return createPageUrl("Listings") + (params.toString() ? "?" + params.toString() : "");
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/70 via-[#0a3620]/40 to-[#0a3620]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative line */}
        <div className="w-16 h-[1px] bg-[#4ade80] mx-auto mb-8" />

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#4ade80] mb-6 tracking-[0.3em] uppercase font-light font-sans">
          Sustainable Living in Batangas City
        </p>

        {/* Main heading - Primland-style dramatic serif */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4">
          <span className="italic text-[#4ade80]">Discover</span> Your
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8">
          Dream Home
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed font-sans">
          Quality homes designed for modern Filipino families with eco-friendly features and community-focused living.
        </p>

        {/* Search Filter Box - refined */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Price Range */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-white/70 text-left mb-3 tracking-wider uppercase font-sans">Property Type</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="border-white/20 bg-white/10 text-white focus:border-[#15803d] focus:ring-[#15803d] [&>span]:text-white">
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

            {/* Price Range */}
            <div>
              <label className="block text-xs font-medium text-white/70 text-left mb-3 tracking-wider uppercase font-sans">Price Range</label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={500000}
                max={10000000}
                step={100000}
                className="mb-2"
              />
              <p className="text-xs text-[#4ade80] font-medium text-left font-sans">
                {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
              </p>
            </div>

            {/* Search Button */}
            <div>
              <Link to={buildSearchUrl()}>
                <Button className="w-full bg-[#15803d] hover:bg-[#116b33] text-white font-semibold py-6 rounded-none tracking-widest uppercase text-xs shadow-lg hover:shadow-xl transition-all duration-300 font-sans">
                  <Search className="w-4 h-4 mr-2" />
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
