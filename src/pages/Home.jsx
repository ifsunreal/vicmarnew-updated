import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import PropertyTypes from "../components/home/PropertyTypes";
import ServicesSection from "../components/home/ServicesSection";

export default function Home() {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => base44.entities.Property.list("-created_date", 9),
  });

  // Count properties by type
  const propertyCounts = properties.reduce((acc, prop) => {
    acc[prop.property_type] = (acc[prop.property_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <HeroSection />
      <PropertyTypes propertyCounts={propertyCounts} />
      <ServicesSection />
    </div>
  );
}
