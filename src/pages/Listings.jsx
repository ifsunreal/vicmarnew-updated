import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import bgListing from '@/images/bg-listing.jpeg';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../components/shared/PropertyCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";

const typeLabels = {
  duplex: "Duplex",
  triplex: "Triplex",
  rowhouse: "Rowhouse",
};

export default function Listings() {
  const revealRef = useScrollReveal();
  const urlParams = new URLSearchParams(window.location.search);

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState(urlParams.get("type") || "all");
  const [status, setStatus] = useState(urlParams.get("status") || "all");
  const [priceRange, setPriceRange] = useState([
    parseInt(urlParams.get("minPrice")) || 500000,
    parseInt(urlParams.get("maxPrice")) || 5000000
  ]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties-all"],
    queryFn: () => base44.entities.Property.list("-created_date"),
  });

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(searchLower) ||
        p.location?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    if (propertyType !== "all") {
      filtered = filtered.filter(p => p.property_type === propertyType);
    }

    if (status !== "all") {
      filtered = filtered.filter(p => p.status === status);
    }

    filtered = filtered.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    return filtered;
  }, [properties, search, propertyType, status, priceRange, sortBy]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(value);
  };

  const clearFilters = () => {
    setSearch("");
    setPropertyType("all");
    setStatus("all");
    setPriceRange([500000, 5000000]);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]" ref={revealRef}>
      {/* Header with built-in bottom fade */}
      <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <img src={bgListing} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium header-animate header-animate-delay-1">Browse Our Collection</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 header-animate header-animate-delay-2">
            Property <span className="italic">Listings</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto font-light font-sans header-animate header-animate-delay-3">
            Browse all available properties from Vicmar Homes
          </p>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6 header-animate header-animate-delay-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 p-5 mb-8 reveal reveal-up" style={{ animationDuration: '0.7s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-gray-200 font-sans text-sm"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-48 font-sans text-sm">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 font-sans text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 font-sans text-sm border-gray-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {/* View Toggle */}
              <div className="hidden md:flex border border-gray-200">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase font-sans">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={500000}
                  max={5000000}
                  step={100000}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-3 tracking-wider uppercase font-sans">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="font-sans text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Button variant="outline" onClick={clearFilters} className="gap-2 font-sans text-sm">
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 reveal reveal-fade" style={{ animationDuration: '0.5s' }}>
          <p className="text-gray-500 font-sans text-sm font-light">
            Showing <span className="font-medium text-[#0a3620]">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} reveal reveal-up`} style={{ animationDuration: '0.6s' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100">
            <p className="text-gray-400 text-lg font-light">No properties found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-6 font-sans tracking-wider uppercase text-xs">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} reveal reveal-up`} style={{ animationDuration: '0.6s' }}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
