import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { 
  Phone, Mail, MapPin, Clock, Award, Users, 
  Building, Target, Heart, Shield, CheckCircle, Leaf, Droplets, Sun, HelpCircle
} from "lucide-react";

const faqItems = [
  {
    question: "What payment methods are available?",
    answer: "We offer flexible payment options including bank financing, Pag-IBIG financing, in-house financing, and spot cash payments with discounts. Our sales team can help you find the best payment plan that suits your budget."
  },
  {
    question: "What amenities are included in the community?",
    answer: "Vicmar Homes features communal greenways with food gardens, vermicompost areas, playgrounds, and open spaces. Each home includes garden space for food and herb production, with options for vertical gardens, aquaponics, and rainwater tanks."
  },
  {
    question: "How does the purchase process work?",
    answer: "The process starts with a site visit and property selection. After choosing your home, you'll complete reservation with a minimal fee, submit requirements for financing, and upon approval, sign the contract to sell. Our team guides you through every step."
  },
  {
    question: "Are there maintenance fees?",
    answer: "Yes, there are association dues for the upkeep of common areas including the greenways, communal gardens, and shared facilities. These fees ensure the sustainable features of the community are properly maintained for all residents."
  },
];

const stats = [
  { value: "500+", label: "Happy Families", icon: Users },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "15+", label: "Projects Completed", icon: Building },
  { value: "100%", label: "Sustainable Design", icon: Leaf },
];

const values = [
  {
    icon: Leaf,
    title: "Environmentally Conscious",
    description: "Reduced concrete footprint, porous sidewalks, and rain water seepage systems to replenish ground water and preserve natural resources."
  },
  {
    icon: Heart,
    title: "Health Conscious",
    description: "Backyard vermiculture, medicinal herb gardens, and organic food production reduce living costs and promote healthier lifestyles."
  },
  {
    icon: Target,
    title: "Financially Conscious",
    description: "Gardens for food & herbs, reduced energy requirements, and sustainable features lower household expenditures for homeowners."
  },
];

export default function AboutUs() {
  const urlParams = new URLSearchParams(window.location.search);
  const showContactInitially = urlParams.get("contact") === "true";

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const createInquiry = useMutation({
    mutationFn: (data) => base44.entities.Inquiry.create(data),
    onSuccess: () => {
      toast.success("Message sent successfully! We'll contact you soon.");
      setContactForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createInquiry.mutate(contactForm);
  };

  useEffect(() => {
    if (showContactInitially) {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showContactInitially]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="relative py-24 px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#166534]/85" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Vicmar Homes
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            An integrated and sustainable concept for affordable housing in Batangas City
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-24 relative z-10 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Icon className="w-8 h-8 text-[#22c55e] mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#166534]">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#166534] mb-6">Our Vision</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Each home is provided enough home garden space to allow for food & herb production. The design using mostly the single attached model, or duplex model, provides savings on the shared wall construction, while allowing for a more spacious community.
              </p>
              <p>
                This also allows for a reduced concrete footprint over the entire land to allow for rain water seepage for the replenishment of the ground water, while also allowing more of the garden to be reached by the sun.
              </p>
              <p>
                The village is designed to allow for common parks and playgrounds to be used for "food gardens." This is done by distributing its parks and playgrounds into garden 'greenways' behind each home, such that it also serves as social interaction spaces for kids and adults.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80"
              alt="About 1"
              className="rounded-xl h-48 object-cover w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&q=80"
              alt="About 2"
              className="rounded-xl h-48 object-cover w-full mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80"
              alt="About 3"
              className="rounded-xl h-48 object-cover w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80"
              alt="About 4"
              className="rounded-xl h-48 object-cover w-full mt-8"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#166534] mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm text-center">
                  <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#166534] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Design */}
        <div className="mb-20 bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-[#166534] mb-8 text-center">Our Sustainable Community</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <h3 className="text-xl font-bold text-[#166534]">Greenways & Food Gardens</h3>
              <p>
                Parks and playgrounds are constantly irrigated by gray water used by each house, thereby continuously irrigating these common areas. These 'greenways' are provided with vermicompost bins, where daily organic trash can be fed to earthworms to produce vermicast - an organic fertilizer for the community's agricultural use.
              </p>
              <p>
                Backyard vermiculture allows organic farming for food and herbs. As some herbs and plants are medicinal in nature, this allows for reduction in medical care costs for homeowners. Not only does the village reduce food costs, medicinal costs and waste production, it also reduces energy requirement for waste management.
              </p>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <h3 className="text-xl font-bold text-[#166534]">Water Conservation</h3>
              <p>
                The village encourages water resource preservation by providing the option for rain water tanks for each home, used for irrigation of farm-garden areas. Sidewalks and catch basins along subdivision roads are designed to be porous, allowing water to seep through the soil to replenish the water table.
              </p>
              <h3 className="text-xl font-bold text-[#166534] mt-6">Energy Efficient Design</h3>
              <p>
                Houses are designed with reduced energy requirements. Each house is designed such that wind can naturally ventilate efficiently. High windows allow hot air to be released immediately, while also allowing natural sunlight to disinfect homes daily.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#166534] rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Sustainable Living Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Home garden space for food & herb production",
              "Gray water irrigation for common greenways",
              "Vermicompost bins for organic fertilizer",
              "Rain water tanks for garden irrigation",
              "Porous sidewalks for ground water replenishment",
              "Natural ventilation with high windows for hot air release",
              "Options for vertical gardens & aquaponics",
              "Car port designed for future growth",
              "Reduced energy requirements through smart design",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#22c55e] flex-shrink-0" />
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Houses Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#166534] mb-8 text-center">Customizable Home Gardens</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Model houses are designed to accommodate different variations on how the garden of each home can be. Each household has options to suit their preferences and reduce household expenditures.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Vertical Herbal Gardens", desc: "Space-saving herb production" },
              { label: "Aquaponics Tanks", desc: "Fish & vegetable cultivation" },
              { label: "Chicken or Rabbit Cages", desc: "Backyard livestock options" },
              { label: "Vegetable Patches", desc: "Traditional garden plots" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-[#22c55e]" />
                </div>
                <h4 className="font-semibold text-[#166534] mb-2">{item.label}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#166534] mb-2 text-center">Get In Touch</h2>
          <p className="text-gray-600 text-center mb-8">Have questions? We're here to help you find your dream home.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#166534] mb-6">Ask a Question</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                  value={contactForm.inquiryType}
                  onValueChange={(value) => setContactForm({ ...contactForm, inquiryType: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property-inquiry">Property Inquiry</SelectItem>
                    <SelectItem value="booking">Site Visit Booking</SelectItem>
                    <SelectItem value="payment">Payment & Financing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Your Name *"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Contact Number *"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message *"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a]"
                  disabled={createInquiry.isPending}
                >
                  {createInquiry.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#166534] mb-1">Call Us</h4>
                    <p className="text-gray-600">(043) 233-2050</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#166534] mb-1">Visit Our Office</h4>
                    <p className="text-gray-600">San Jose Sico, Batangas City</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#166534] mb-1">Email Us</h4>
                    <p className="text-gray-600">info@vicmarhomes.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#166534] mb-1">Office Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-[#22c55e]" />
            <h2 className="text-3xl font-bold text-[#166534]">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-[#166534] font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
