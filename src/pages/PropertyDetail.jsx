import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Bed, Bath, Square, MapPin, ArrowLeft, Phone, Mail, 
  ChevronLeft, ChevronRight, Check, Maximize, X, Eye, FileText
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PanoramaViewer from "@/components/shared/PanoramaViewer";

// Fix leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const typeLabels = {
  duplex: "Duplex",
  triplex: "Triplex",
  rowhouse: "Rowhouse",
};

export default function PropertyDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", message: "" });

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: async () => {
      const properties = await base44.entities.Property.filter({ id: propertyId });
      return properties[0];
    },
    enabled: !!propertyId,
  });

  const createInquiry = useMutation({
    mutationFn: (data) => base44.entities.Inquiry.create(data),
    onSuccess: () => {
      toast.success("Inquiry sent successfully! We'll contact you soon.");
      setInquiryForm({ name: "", email: "", phone: "", message: "" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#22c55e] border-t-transparent" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
        <Link to={createPageUrl("Listings")}>
          <Button>Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const allImages = [property.main_image, ...(property.gallery_images || [])].filter(Boolean);
  if (allImages.length === 0) {
    allImages.push("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80");
  }

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      maximumFractionDigits: 0 
    }).format(value);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    createInquiry.mutate({
      ...inquiryForm,
      property_id: property.id,
      property_title: property.title,
    });
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={createPageUrl("Listings")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={allImages[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Status Badge */}
                <Badge className={`absolute top-4 left-4 ${
                  property.status === "available" ? "bg-green-500" :
                  property.status === "reserved" ? "bg-yellow-500" : "bg-red-500"
                } text-white border-0 capitalize`}>
                  {property.status === "available" ? "For Sale" : property.status}
                </Badge>

                {/* Expand Button */}
                <button
                  onClick={() => setShowGallery(true)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-all flex items-center gap-2"
                >
                  <Maximize className="w-5 h-5" />
                  <span className="text-sm font-medium">View All Photos</span>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? "border-[#22c55e]" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              {property.panorama_image && (
                <Button
                  onClick={() => setShowVirtualTour(true)}
                  className="bg-[#166534] hover:bg-[#166534]/90 gap-2"
                >
                  <Eye className="w-5 h-5" />
                  360° Virtual Tour
                </Button>
              )}
              {property.floor_plans && (
                <Button
                  onClick={() => {
                    const firstPlan = property.floor_plans.groundFloor || property.floor_plans.secondFloor;
                    if (firstPlan) {
                      setSelectedFloorPlan(firstPlan);
                      setShowFloorPlan(true);
                    }
                  }}
                  variant="outline"
                  className="gap-2"
                >
                  <FileText className="w-5 h-5" />
                  View Floor Plans
                </Button>
              )}
            </div>

            {/* Floor Plans Section */}
            {property.floor_plans && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#166534] mb-4">Floor Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.floor_plans.groundFloor && (
                    <div 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedFloorPlan(property.floor_plans.groundFloor);
                        setShowFloorPlan(true);
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-[#22c55e] transition-colors">
                        <img 
                          src={property.floor_plans.groundFloor.image} 
                          alt="Ground Floor Plan" 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Maximize className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="mt-2 text-center font-medium text-gray-700">
                        {property.floor_plans.groundFloor.label || "Ground Floor"}
                      </p>
                    </div>
                  )}
                  {property.floor_plans.secondFloor && (
                    <div 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedFloorPlan(property.floor_plans.secondFloor);
                        setShowFloorPlan(true);
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-[#22c55e] transition-colors">
                        <img 
                          src={property.floor_plans.secondFloor.image} 
                          alt="Second Floor Plan" 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Maximize className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="mt-2 text-center font-medium text-gray-700">
                        {property.floor_plans.secondFloor.label || "Second Floor"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Property Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {typeLabels[property.property_type] || property.property_type}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#166534]">{property.title}</h1>
                  {property.location && (
                    <p className="text-gray-500 flex items-center gap-2 mt-2">
                      <MapPin className="w-5 h-5" />
                      {property.location}
                    </p>
                  )}
                </div>
                <p className="text-3xl font-bold text-[#22c55e]">
                  {formatPrice(property.price)}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-[#22c55e]" />
                    <p className="font-semibold">{property.bedrooms}</p>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-[#22c55e]" />
                    <p className="font-semibold">{property.bathrooms}</p>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                  </div>
                )}
                {property.floor_area && (
                  <div className="text-center">
                    <Square className="w-6 h-6 mx-auto mb-2 text-[#22c55e]" />
                    <p className="font-semibold">{property.floor_area} sqm</p>
                    <p className="text-sm text-gray-500">Floor Area</p>
                  </div>
                )}
                {property.lot_area && (
                  <div className="text-center">
                    <Square className="w-6 h-6 mx-auto mb-2 text-[#22c55e]" />
                    <p className="font-semibold">{property.lot_area} sqm</p>
                    <p className="text-sm text-gray-500">Lot Area</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#166534] mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
              )}

              {/* Features */}
              {property.features?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#166534] mb-3">Features & Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            {property.latitude && property.longitude && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#166534] mb-4">Location</h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[property.latitude, property.longitude]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[property.latitude, property.longitude]}>
                      <Popup>{property.title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold text-[#166534] mb-4">Interested in this property?</h2>
              <p className="text-gray-600 text-sm mb-6">Fill out the form below and we'll get back to you shortly.</p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <Input
                  placeholder="Your Name *"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email *"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                />
                <Textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a]"
                  disabled={createInquiry.isPending}
                >
                  {createInquiry.isPending ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t space-y-3">
                <a
                  href="tel:+63432332050"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#22c55e] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (043) 233-2050
                </a>
                <a
                  href="mailto:info@vicmarhomes.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-[#22c55e] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  info@vicmarhomes.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Photo Gallery</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
              src={allImages[currentImageIndex]}
              alt=""
              className="w-full max-h-[70vh] object-contain"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pt-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 ${
                  idx === currentImageIndex ? "border-[#22c55e]" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Virtual Tour Modal */}
      <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
        <DialogContent className="max-w-6xl w-[95vw] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>360° Virtual Tour - {property?.title}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[70vh]">
            {property?.panorama_image && (
              <PanoramaViewer 
                src={property.panorama_image} 
                alt={`360° view of ${property.title}`} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floor Plan Modal */}
      <Dialog open={showFloorPlan} onOpenChange={setShowFloorPlan}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedFloorPlan?.label || "Floor Plan"}</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">
            <img
              src={selectedFloorPlan?.image}
              alt="Floor Plan"
              className="w-full max-h-[70vh] object-contain"
            />
          </div>
          {property?.floor_plans && Object.keys(property.floor_plans).length > 1 && (
            <div className="flex gap-4 pt-4 border-t">
              {property.floor_plans.groundFloor && (
                <Button
                  variant={selectedFloorPlan === property.floor_plans.groundFloor ? "default" : "outline"}
                  onClick={() => setSelectedFloorPlan(property.floor_plans.groundFloor)}
                  className="flex-1"
                >
                  {property.floor_plans.groundFloor.label || "Ground Floor"}
                </Button>
              )}
              {property.floor_plans.secondFloor && (
                <Button
                  variant={selectedFloorPlan === property.floor_plans.secondFloor ? "default" : "outline"}
                  onClick={() => setSelectedFloorPlan(property.floor_plans.secondFloor)}
                  className="flex-1"
                >
                  {property.floor_plans.secondFloor.label || "Second Floor"}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
