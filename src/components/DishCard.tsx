import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Star } from 'lucide-react';

interface DishCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  dietaryTags?: string[];
  isPopular?: boolean;
  onAddToCart: () => void; // Callback for when "Add to Cart" is clicked
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  dietaryTags = [],
  isPopular = false,
  onAddToCart,
}) => {
  const { toast } = useToast();
  console.log(`DishCard loaded for: ${name} (ID: ${id})`);

  const handleAddToCartClick = () => {
    onAddToCart(); // Call the parent-provided callback
    toast({
      title: "Action Initiated", // Generic title as parent handles actual cart logic
      description: `${name} action processed.`, // Parent might show more specific toast/sonner
    });
  };

  return (
    <Card className="flex p-3 sm:p-4 space-x-3 sm:space-x-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex-shrink-0">
        <img
          src={imageUrl || 'https://via.placeholder.com/100x100?text=Dish'}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0"> {/* min-w-0 helps with truncation inside flex */}
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight truncate" title={name}>
              {name}
            </h3>
            {isPopular && (
              <Badge variant="default" className="ml-2 flex-shrink-0 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-amber-500 text-white">
                <Star className="w-3 h-3 mr-1 sm:w-3.5 sm:h-3.5 fill-white" /> Popular
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-2" title={description}>
            {description}
          </p>
          {dietaryTags.length > 0 && (
            <div className="mt-1 sm:mt-1.5 flex flex-wrap gap-1">
              {dietaryTags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between mt-1.5 sm:mt-2 pt-1">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            ${price.toFixed(2)}
          </p>
          <Button 
            size="sm" 
            onClick={handleAddToCartClick} 
            className="text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-1.5 whitespace-nowrap"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1 sm:w-4 sm:h-4" /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DishCard;