export interface Travel {
  id: string;
  title: string;
  description: string;
  destination: string;
  country: string;
  duration: number; // en jours
  price: number;
  originalPrice?: number; // pour les promotions
  category: 'cultural' | 'adventure' | 'relaxation' | 'family' | 'business';
  difficulty: 'easy' | 'moderate' | 'hard';
  rating: number; // sur 5
  reviewCount: number;
  images: string[];
  mainImage: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  guide: {
    name: string;
    avatar: string;
    rating: number;
    experience: string;
  };
  status: 'available' | 'sold_out' | 'cancelled' | 'coming_soon';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TravelReservation {
  id: string;
  travelId: string;
  userId: string;
  participants: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TravelFilters {
  category?: string;
  difficulty?: string;
  priceRange?: { min: number; max: number };
  duration?: { min: number; max: number };
  destination?: string;
  startDate?: string;
  endDate?: string;
  rating?: number;
  status?: string;
}

export type TravelPayload = Omit<Travel, 'id' | 'createdAt' | 'updatedAt'>;
export type ReservationPayload = Omit<TravelReservation, 'id' | 'createdAt' | 'updatedAt'>;
