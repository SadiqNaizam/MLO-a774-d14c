import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string; // Unique identifier for the restaurant
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5 (out of 5)
  deliveryTime: string; // e.g., "20-30 min"
  promotionalTag?: string; // e.g., "20% OFF"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  promotionalTag,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  return (
    <Link to={`/restaurant-menu?id=${id}`} className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:border-primary/50 flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {promotionalTag && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 z-10 text-xs px-2 py-1"
            >
              {promotionalTag}
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3">
             <div className="flex items-center space-x-2">
                <div className="flex items-center text-white text-sm font-semibold">
                  <Star size={16} className="mr-1 fill-yellow-400 text-yellow-400" />
                  {rating.toFixed(1)}
                </div>
                <span className="text-gray-300 text-xs">•</span>
                <div className="flex items-center text-white text-sm font-semibold">
                  <Clock size={16} className="mr-1" />
                  {deliveryTime}
                </div>
              </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2 flex-grow flex flex-col justify-between">
          <div>
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary">
              {name}
            </CardTitle>
            {cuisineTypes && cuisineTypes.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {cuisineTypes.slice(0, 3).map((cuisine, index) => ( // Show max 3 cuisine types
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
                {cuisineTypes.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{cuisineTypes.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;