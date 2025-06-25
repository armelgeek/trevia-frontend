import { Travel } from '../config/travel.types';

// Service mockés pour les voyages
export const mockTravels: Travel[] = [
  {
    id: '1',
    title: 'Découverte de Paris - 4 jours',
    description: 'Explorez la ville lumière avec ses monuments emblématiques, ses musées d\'exception et sa gastronomie raffinée.',
    destination: 'Paris',
    country: 'France',
    duration: 4,
    price: 599,
    originalPrice: 699,
    category: 'cultural',
    difficulty: 'easy',
    rating: 4.8,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
    highlights: [
      'Visite de la Tour Eiffel',
      'Croisière sur la Seine',
      'Musée du Louvre',
      'Quartier de Montmartre'
    ],
    includes: [
      'Hébergement 3 nuits en hôtel 4*',
      'Petit-déjeuner',
      'Guide francophone',
      'Entrées aux monuments'
    ],
    excludes: [
      'Vols',
      'Repas du midi et soir',
      'Assurance voyage'
    ],
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    maxParticipants: 20,
    currentParticipants: 12,
    guide: {
      name: 'Marie Dubois',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
      rating: 4.9,
      experience: '8 ans d\'expérience'
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    title: 'Aventure en Islande - 7 jours',
    description: 'Une aventure extraordinaire à travers les paysages spectaculaires de l\'Islande : glaciers, geysers, aurores boréales.',
    destination: 'Reykjavik',
    country: 'Islande',
    duration: 7,
    price: 1299,
    category: 'adventure',
    difficulty: 'moderate',
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1539066309235-d2c0c3b94e2a?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    highlights: [
      'Cercle d\'Or',
      'Chasse aux aurores boréales',
      'Blue Lagoon',
      'Glacier Vatnajökull'
    ],
    includes: [
      'Hébergement 6 nuits',
      'Transport en minibus',
      'Guide expert',
      'Équipement de randonnée'
    ],
    excludes: [
      'Vols internationaux',
      'Repas',
      'Équipement personnel'
    ],
    startDate: '2024-04-10',
    endDate: '2024-04-16',
    maxParticipants: 12,
    currentParticipants: 8,
    guide: {
      name: 'Erik Magnusson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erik',
      rating: 4.8,
      experience: '12 ans d\'expérience'
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z'
  },
  {
    id: '3',
    title: 'Détente en Toscane - 5 jours',
    description: 'Séjour relaxant dans la campagne toscane avec dégustation de vins, spa et découverte de villages médiévaux.',
    destination: 'Florence',
    country: 'Italie',
    duration: 5,
    price: 899,
    category: 'relaxation',
    difficulty: 'easy',
    rating: 4.6,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    highlights: [
      'Dégustation de vins',
      'Spa de luxe',
      'Villages médiévaux',
      'Cours de cuisine italienne'
    ],
    includes: [
      'Hébergement 4 nuits en villa',
      'Demi-pension',
      'Activités incluses',
      'Transport local'
    ],
    excludes: [
      'Vols',
      'Boissons alcoolisées',
      'Excursions optionnelles'
    ],
    startDate: '2024-05-20',
    endDate: '2024-05-24',
    maxParticipants: 16,
    currentParticipants: 5,
    guide: {
      name: 'Giulia Rossi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia',
      rating: 4.7,
      experience: '6 ans d\'expérience'
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-19T09:30:00Z'
  },
  {
    id: '4',
    title: 'Safari Familial au Kenya - 8 jours',
    description: 'Safari adapté aux familles dans les parcs nationaux du Kenya avec observation de la faune sauvage.',
    destination: 'Nairobi',
    country: 'Kenya',
    duration: 8,
    price: 1899,
    category: 'family',
    difficulty: 'easy',
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
      'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    highlights: [
      'Parc national Masai Mara',
      'Observation des Big Five',
      'Rencontre avec les Masaï',
      'Activités enfants'
    ],
    includes: [
      'Hébergement 7 nuits',
      'Pension complète',
      'Safaris inclus',
      'Guide spécialisé famille'
    ],
    excludes: [
      'Vols internationaux',
      'Visa',
      'Vaccinations'
    ],
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    maxParticipants: 10,
    currentParticipants: 10,
    guide: {
      name: 'Joseph Kimani',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph',
      rating: 5.0,
      experience: '15 ans d\'expérience'
    },
    status: 'sold_out',
    featured: true,
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-25T16:45:00Z'
  },
  {
    id: '5',
    title: 'Circuit Business Tokyo - 3 jours',
    description: 'Voyage d\'affaires optimisé à Tokyo avec rencontres professionnelles et découverte de la culture business japonaise.',
    destination: 'Tokyo',
    country: 'Japon',
    duration: 3,
    price: 1599,
    category: 'business',
    difficulty: 'easy',
    rating: 4.4,
    reviewCount: 23,
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    highlights: [
      'Networking events',
      'Visites d\'entreprises',
      'Culture business japonaise',
      'Quartier d\'affaires'
    ],
    includes: [
      'Hôtel business 4*',
      'Transferts VIP',
      'Interprète',
      'Repas d\'affaires'
    ],
    excludes: [
      'Vols',
      'Frais de visa',
      'Communications'
    ],
    startDate: '2024-06-10',
    endDate: '2024-06-12',
    maxParticipants: 8,
    currentParticipants: 3,
    guide: {
      name: 'Takeshi Yamamoto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Takeshi',
      rating: 4.5,
      experience: '10 ans d\'expérience'
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-14T13:00:00Z',
    updatedAt: '2024-01-22T10:15:00Z'
  },
  {
    id: '6',
    title: 'Randonnée dans les Alpes - 6 jours',
    description: 'Trek challengeant dans les Alpes françaises avec vues panoramiques et refuges de montagne.',
    destination: 'Chamonix',
    country: 'France',
    duration: 6,
    price: 799,
    category: 'adventure',
    difficulty: 'hard',
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1464822759844-d150ad6d1c96?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    mainImage: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1c96?w=800',
    highlights: [
      'Tour du Mont-Blanc',
      'Refuges de montagne',
      'Faune alpine',
      'Vues panoramiques'
    ],
    includes: [
      'Guide de montagne',
      'Hébergement en refuges',
      'Matériel technique',
      'Demi-pension'
    ],
    excludes: [
      'Transport',
      'Équipement personnel',
      'Assurance montagne'
    ],
    startDate: '2024-08-05',
    endDate: '2024-08-10',
    maxParticipants: 8,
    currentParticipants: 2,
    guide: {
      name: 'Pierre Blanc',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre',
      rating: 4.9,
      experience: '20 ans d\'expérience'
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-21T14:20:00Z'
  }
];

export class TravelService {
  private travels = mockTravels;

  async getAll(filters?: {
    search?: string;
    category?: string;
    difficulty?: string;
    status?: string;
    priceRange?: { min: number; max: number };
    page?: number;
    pageSize?: number;
  }) {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredTravels = [...this.travels];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredTravels = filteredTravels.filter(travel =>
        travel.title.toLowerCase().includes(search) ||
        travel.destination.toLowerCase().includes(search) ||
        travel.country.toLowerCase().includes(search)
      );
    }
    
    if (filters?.category) {
      filteredTravels = filteredTravels.filter(travel => travel.category === filters.category);
    }
    
    if (filters?.difficulty) {
      filteredTravels = filteredTravels.filter(travel => travel.difficulty === filters.difficulty);
    }
    
    if (filters?.status) {
      filteredTravels = filteredTravels.filter(travel => travel.status === filters.status);
    }
    
    if (filters?.priceRange) {
      filteredTravels = filteredTravels.filter(travel => 
        travel.price >= filters.priceRange!.min && travel.price <= filters.priceRange!.max
      );
    }
    
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 12;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    const paginatedTravels = filteredTravels.slice(start, end);
    
    return {
      data: paginatedTravels,
      meta: {
        pagination: {
          page,
          pageSize,
          total: filteredTravels.length,
          totalPages: Math.ceil(filteredTravels.length / pageSize),
          hasNextPage: end < filteredTravels.length,
          hasPreviousPage: page > 1,
        }
      }
    };
  }

  async getById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const travel = this.travels.find(t => t.id === id);
    if (!travel) {
      throw new Error('Travel not found');
    }
    return travel;
  }

  async getFeatured() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return this.travels.filter(travel => travel.featured && travel.status === 'available');
  }

  async reserve(travelId: string, reservationData: Record<string, unknown>) {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulation de la création d'une réservation
    return {
      id: Math.random().toString(36).substr(2, 9),
      travelId,
      ...reservationData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export const travelService = new TravelService();
