import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Home, TrendingUp, Shield, FileCheck } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Quality Homes",
    description: "Expertly designed and constructed homes that meet the highest standards of quality and comfort for Filipino families.",
    link: "Listings"
  },
  {
    icon: TrendingUp,
    title: "Investment Value",
    description: "Strategic locations and quality construction ensure your property investment grows in value over time.",
    link: "Properties"
  },
  {
    icon: Shield,
    title: "Secure Ownership",
    description: "Complete documentation and transparent transactions for a worry-free home buying experience.",
    link: "AboutUs"
  },
  {
    icon: FileCheck,
    title: "Flexible Financing",
    description: "Various payment schemes including bank financing, Pag-IBIG, and in-house financing options available.",
    link: "AboutUs"
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#166534] mb-4 text-center">
          How can Vicmar Homes help you?
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We're committed to making your dream of owning a home a reality
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={createPageUrl(service.link)}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#22c55e]/10 group-hover:bg-[#22c55e]/20 rounded-lg flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-7 h-7 text-[#22c55e]" />
                </div>
                <h3 className="font-bold text-lg text-[#166534] mb-3 group-hover:text-[#22c55e] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
