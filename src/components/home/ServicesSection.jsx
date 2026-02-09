import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Home, TrendingUp, Shield, FileCheck, ArrowRight } from "lucide-react";

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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium">Our Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0a3620] mb-4">
            How Can We <span className="italic">Help</span> You?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light font-sans mt-4">
            We're committed to making your dream of owning a home a reality
          </p>
          <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={createPageUrl(service.link)}
                className="group p-8 md:p-10 transition-all duration-500 border border-gray-100 hover:border-[#15803d]/30 bg-white hover:bg-[#f8f6f0]"
              >
                <div className="w-12 h-12 border border-[#15803d]/30 flex items-center justify-center mb-8 group-hover:bg-[#15803d] group-hover:border-[#15803d] transition-all duration-500">
                  <Icon className="w-5 h-5 text-[#15803d] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-semibold text-lg text-[#0a3620] mb-3 group-hover:text-[#0f4c2d] transition-colors font-sans">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light font-sans">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#15803d] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
