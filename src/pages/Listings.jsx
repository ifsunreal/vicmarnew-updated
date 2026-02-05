import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
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

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(searchLower) ||
        p.location?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (propertyType !== "all") {
      filtered = filtered.filter(p => p.property_type === propertyType);
    }

    // Status filter
    if (status !== "all") {
      filtered = filtered.filter(p => p.status === status);
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#166534] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Property Listings
          </h1>
          <p className="text-gray-300 text-lg">
            Browse all available properties from Vicmar Homes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-48">
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
                <SelectTrigger className="w-40">
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
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {/* View Toggle */}
              <div className="hidden md:flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
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
                <Button variant="outline" onClick={clearFilters} className="gap-2">
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#166534]">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        {isLoading ? (
          <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
