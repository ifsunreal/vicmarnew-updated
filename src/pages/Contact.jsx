import React, { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import bgContact from '@/images/bg-contact.jpeg';

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

export default function Contact() {
  const revealRef = useScrollReveal();
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

  return (
    <div ref={revealRef} className="min-h-screen bg-[#f8f6f0]">
      {/* Header with built-in bottom fade */}
      <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
        <div className="absolute inset-0">
          <img src={bgContact} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="header-animate header-animate-delay-1 text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium" style={{ animationDuration: '0.6s' }}>Connect With Us</p>
          <h1 className="header-animate header-animate-delay-2 text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4" style={{ animationDuration: '0.6s' }}>
            Get In <span className="italic">Touch</span>
          </h1>
          <p className="header-animate header-animate-delay-3 text-white/50 text-base max-w-xl mx-auto font-light font-sans" style={{ animationDuration: '0.6s' }}>
            Have questions? We're here to help you find your dream home
          </p>
          <div className="header-animate header-animate-delay-4 w-16 h-[1px] bg-[#15803d] mx-auto mt-6" style={{ animationDuration: '0.6s' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="reveal reveal-left bg-white p-8 md:p-10 border border-gray-100" style={{ animationDuration: '0.7s' }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-2 font-sans font-medium">Send a Message</p>
            <h3 className="text-2xl text-[#0a3620] mb-6">Ask a Question</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                value={contactForm.inquiryType}
                onValueChange={(value) => setContactForm({ ...contactForm, inquiryType: value })}
              >
                <SelectTrigger className="w-full font-sans text-sm">
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
                className="font-sans text-sm"
              />
              <Input
                type="tel"
                placeholder="Contact Number *"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                required
                className="font-sans text-sm"
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                className="font-sans text-sm"
              />
              <Textarea
                placeholder="Your Message *"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                required
                className="font-sans text-sm"
              />
              <Button
                type="submit"
                className="w-full bg-[#15803d] hover:bg-[#116b33] rounded-none tracking-widest uppercase text-xs font-sans py-6"
                disabled={createInquiry.isPending}
              >
                {createInquiry.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="reveal reveal-right space-y-6" style={{ animationDuration: '0.7s', animationDelay: '0.15s' }}>
            <div className="bg-white p-8 md:p-10 border border-gray-100">
              <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium">Contact Info</p>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Call Us", info: "(043) 233-2050" },
                  { icon: MapPin, title: "Visit Our Office", info: "San Jose Sico, Batangas City" },
                  { icon: Mail, title: "Email Us", info: "info@vicmarhomes.com" },
                  { icon: Clock, title: "Office Hours", info: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-[#15803d]/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#15803d]" />
                      </div>
                      <div>
                        <h4 className="font-sans font-medium text-[#0a3620] text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm font-sans font-light whitespace-pre-line">{item.info}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ inline */}
            <div className="bg-white p-8 md:p-10 border border-gray-100">
              <p className="text-xs tracking-[0.3em] uppercase text-[#15803d] mb-4 font-sans font-medium">FAQ</p>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left text-[#0a3620] font-sans font-medium text-sm hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 font-sans font-light text-sm">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
