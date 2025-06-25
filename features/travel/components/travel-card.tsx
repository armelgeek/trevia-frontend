'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, 
  MapPin, 
  Star, 
  Users, 
  Heart,
  Calendar,
  Plane
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { Travel } from '../config/travel.types';

interface TravelCardProps {
  travel: Travel;
  onViewDetails?: (travel: Travel) => void;
  onReserve?: (travel: Travel) => void;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

export function TravelCard({ 
  travel, 
  onViewDetails, 
  onReserve, 
  className,
  showActions = true,
  compact = false
}: TravelCardProps) {
  const isAvailable = travel.status === 'available';
  const isSoldOut = travel.status === 'sold_out';
  const hasDiscount = travel.originalPrice && travel.originalPrice > travel.price;
  const discountPercent = hasDiscount 
    ? Math.round(((travel.originalPrice! - travel.price) / travel.originalPrice!) * 100)
    : 0;

  const getCategoryColor = (category: string) => {
    const colors = {
      cultural: 'bg-purple-100 text-purple-800',
      adventure: 'bg-orange-100 text-orange-800',
      relaxation: 'bg-green-100 text-green-800',
      family: 'bg-blue-100 text-blue-800',
      business: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.cultural;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-600',
      moderate: 'text-yellow-600',
      hard: 'text-red-600',
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  const getStatusBadge = () => {
    if (isSoldOut) {
      return <Badge variant="destructive">Complet</Badge>;
    }
    if (travel.status === 'coming_soon') {
      return <Badge variant="secondary">Bientôt</Badge>;
    }
    if (travel.featured) {
      return <Badge variant="default" className="bg-yellow-500 text-white">⭐ Vedette</Badge>;
    }
    return null;
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg group",
      !isAvailable && "opacity-75",
      className
    )}>
      {/* Image header */}
      <div className="relative overflow-hidden">
        <Image
          src={travel.mainImage}
          alt={travel.title}
          width={400}
          height={compact ? 160 : 192}
          className={cn(
            "w-full object-cover group-hover:scale-105 transition-transform duration-300",
            compact ? "h-40" : "h-48"
          )}
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex gap-2">
          {getStatusBadge()}
          {hasDiscount && (
            <Badge variant="destructive">-{discountPercent}%</Badge>
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-2 py-1">
          <div className="text-right">
            {hasDiscount && (
              <div className="text-xs text-gray-500 line-through">
                {travel.originalPrice}€
              </div>
            )}
            <div className="font-bold text-lg text-gray-900">
              {travel.price}€
            </div>
          </div>
        </div>
      </div>

      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-gray-900 line-clamp-2",
              compact ? "text-base" : "text-lg"
            )}>
              {travel.title}
            </h3>
            
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">
                {travel.destination}, {travel.country}
              </span>
            </div>
          </div>
          
          <Badge className={getCategoryColor(travel.category)}>
            {travel.category}
          </Badge>
        </div>

        {!compact && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
            {travel.description}
          </p>
        )}
      </CardHeader>

      <CardContent className={cn("py-3", compact && "py-2")}>
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{travel.duration} jours</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{travel.rating}</span>
            <span className="text-gray-400">({travel.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{travel.currentParticipants}/{travel.maxParticipants}</span>
          </div>
        </div>

        {/* Difficulty & Date */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Difficulté:</span>
            <span className={cn("text-sm font-medium", getDifficultyColor(travel.difficulty))}>
              {travel.difficulty === 'easy' ? 'Facile' : 
               travel.difficulty === 'moderate' ? 'Modéré' : 'Difficile'}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(travel.startDate).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        {/* Guide info (only in full mode) */}
        {!compact && (
          <div className="flex items-center gap-2 mt-3 p-2 bg-gray-50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarImage src={travel.guide.avatar} alt={travel.guide.name} />
              <AvatarFallback>{travel.guide.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {travel.guide.name}
              </div>
              <div className="text-xs text-gray-500">
                {travel.guide.experience}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{travel.guide.rating}</span>
            </div>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="pt-3 gap-2">
          <Button
            variant="outline"
            onClick={() => onViewDetails?.(travel)}
            className="flex-1"
          >
            Voir détails
          </Button>
          
          <Button
            onClick={() => onReserve?.(travel)}
            disabled={!isAvailable}
            className="flex-1"
          >
            {isSoldOut ? 'Complet' : (
              <>
                <Plane className="h-4 w-4 mr-1" />
                Réserver
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
