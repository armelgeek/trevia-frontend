"use client";

import { LabeledSection } from "./ui-section";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TestimonialProps {
  id: string;
  name: string;
  role?: string;
  location?: string;
  avatar?: string;
  rating: number;
  comment: string;
  date?: string;
  route?: string;
  verified?: boolean;
}

interface TestimonialsProps {
  testimonials: TestimonialProps[];
  variant?: "grid" | "carousel" | "simple";
  showRating?: boolean;
  showRoute?: boolean;
}

function StarRating({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, showRating = true, showRoute = true }: { 
  testimonial: TestimonialProps; 
  showRating?: boolean;
  showRoute?: boolean;
}) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="absolute top-4 right-4 text-primary/10">
          <Quote className="w-8 h-8" />
        </div>
        
        {showRating && (
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={testimonial.rating} />
            {testimonial.verified && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                Vérifié
              </Badge>
            )}
          </div>
        )}
        
        <blockquote className="text-gray-700 mb-4 leading-relaxed">
          &ldquo;{testimonial.comment}&rdquo;
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">
                {testimonial.role && testimonial.location 
                  ? `${testimonial.role} • ${testimonial.location}`
                  : testimonial.location || testimonial.role
                }
              </p>
            </div>
          </div>
          
          {showRoute && testimonial.route && (
            <Badge variant="outline" className="text-xs">
              {testimonial.route}
            </Badge>
          )}
        </div>
        
        {testimonial.date && (
          <p className="text-xs text-gray-400 mt-2">{testimonial.date}</p>
        )}
      </CardContent>
    </Card>
  );
}

function Testimonials({ testimonials, variant = "grid", showRating = true, showRoute = true }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (variant === "simple") {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />
          <StarRating rating={testimonials[0]?.rating || 5} />
        </div>
        <blockquote className="text-xl text-gray-700 mb-6 italic">
          &ldquo;{testimonials[0]?.comment}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={testimonials[0]?.avatar} alt={testimonials[0]?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {testimonials[0]?.name.split(' ').map(n => n[0]).join('') || 'A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{testimonials[0]?.name}</p>
            <p className="text-sm text-gray-500">{testimonials[0]?.location}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "carousel") {
    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <TestimonialCard testimonial={testimonial} showRating={showRating} showRoute={showRoute} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            disabled={testimonials.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            disabled={testimonials.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard 
          key={testimonial.id} 
          testimonial={testimonial} 
          showRating={showRating} 
          showRoute={showRoute} 
        />
      ))}
    </div>
  );
}

export function TestimonialsSample() {
  const sampleTestimonials: TestimonialProps[] = [
    {
      id: "1",
      name: "Marie Dubois",
      role: "Consultante",
      location: "Paris",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      comment: "Service excellent ! Le bus était confortable et ponctuel. Le personnel était très aimable et professionnel. Je recommande vivement Cosmic Transport.",
      date: "Il y a 2 jours",
      route: "Paris → Lyon",
      verified: true
    },
    {
      id: "2",
      name: "Pierre Martin",
      role: "Étudiant",
      location: "Lyon",
      rating: 4,
      comment: "Très bon rapport qualité-prix. Les sièges sont confortables et il y a du WiFi gratuit. Parfait pour mes trajets universitaires.",
      date: "Il y a 1 semaine",
      route: "Lyon → Marseille",
      verified: true
    },
    {
      id: "3",
      name: "Sophie Leroy",
      role: "Cadre",
      location: "Bordeaux",
      rating: 5,
      comment: "Ponctualité irréprochable et service client au top. J'utilise régulièrement cette compagnie pour mes déplacements professionnels.",
      date: "Il y a 3 jours",
      route: "Bordeaux → Toulouse",
      verified: true
    },
    {
      id: "4",
      name: "Jean Dupont",
      location: "Lille",
      rating: 4,
      comment: "Voyage agréable et prix abordable. Le bus était propre et le chauffeur très courtois. Merci pour cette belle expérience !",
      date: "Il y a 5 jours",
      route: "Lille → Paris",
      verified: false
    },
    {
      id: "5",
      name: "Claire Moreau",
      role: "Entrepreneur",
      location: "Nice",
      rating: 5,
      comment: "Interface de réservation très simple et voyage sans encombre. C'est ma compagnie de transport préférée !",
      date: "Il y a 1 semaine",
      route: "Nice → Montpellier",
      verified: true
    },
    {
      id: "6",
      name: "Thomas Bernard",
      role: "Retraité",
      location: "Nantes",
      rating: 4,
      comment: "Excellent service pour les seniors. Personnel attentionné et bus adapté. Je voyage en toute sérénité avec Cosmic Transport.",
      date: "Il y a 4 jours",
      route: "Nantes → Rennes",
      verified: true
    }
  ];

  return (
    <div className="space-y-8">
      <LabeledSection label="Témoignages en Grille">
        <Testimonials testimonials={sampleTestimonials} variant="grid" />
      </LabeledSection>

      <LabeledSection label="Carrousel de Témoignages">
        <Testimonials testimonials={sampleTestimonials.slice(0, 3)} variant="carousel" />
      </LabeledSection>

      <LabeledSection label="Témoignage Simple">
        <Testimonials testimonials={[sampleTestimonials[0]]} variant="simple" />
      </LabeledSection>

      <LabeledSection label="Section Témoignages Complète">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ce que disent nos voyageurs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plus de 10 000 voyageurs nous font confiance chaque mois. 
            Découvrez leurs expériences avec Cosmic Transport.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.8/5</div>
            <StarRating rating={5} />
            <p className="text-sm text-gray-600 mt-2">Note moyenne</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-sm text-gray-600">Voyageurs satisfaits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-gray-600">Recommandations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-gray-600">Support client</p>
          </div>
        </div>
        
        <Testimonials testimonials={sampleTestimonials} variant="grid" />
      </LabeledSection>
    </div>
  );
}

export { Testimonials as default } from '@/shared/components/organisms/testimonials';
