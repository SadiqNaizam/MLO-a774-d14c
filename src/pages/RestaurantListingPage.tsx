import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Inbox } from 'lucide-react'; // Icons

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string; // e.g., "20-30 min"
  promotionalTag?: string;
}

// Placeholder for restaurant skeleton card
const RestaurantSkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
    <Skeleton className="w-full h-[180px] sm:h-[150px]" /> {/* Image placeholder */}
    <div className="p-3 sm:p-4 space-y-3">
      <Skeleton className="h-6 w-3/4 rounded" /> {/* Title */}
      <Skeleton className="h-4 w-1/2 rounded" /> {/* Cuisine type / Short description */}
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-4 w-1/4 rounded" /> {/* Rating */}
        <Skeleton className="h-4 w-1/3 rounded" /> {/* Delivery time / Price */}
      </div>
    </div>
  </div>
);

const sampleRestaurantsData: Restaurant[] = [
  { id: '1', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-35 min', promotionalTag: '15% OFF' },
  { id: '2', name: 'Sushi Heaven', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, deliveryTime: '30-40 min' },
  { id: '3', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['American', 'Burgers', 'Fast Food'], rating: 4.2, deliveryTime: '20-30 min', promotionalTag: 'Free Fries' },
  { id: '4', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a0588976be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, deliveryTime: '35-45 min' },
  { id: '5', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, deliveryTime: '20-30 min', promotionalTag: 'Taco Tuesday Deals' },
  { id: '6', name: 'Pasta Paradise', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e32636d2090e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhc3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Italian', 'Pasta'], rating: 4.7, deliveryTime: '30-40 min' },
  { id: '7', name: 'Healthy Bites', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Healthy', 'Salads', 'Wraps'], rating: 4.9, deliveryTime: '15-25 min', promotionalTag: 'New User Discount' },
  { id: '8', name: 'Sweet Treats Cafe', imageUrl: 'https://images.unsplash.com/photo-1567692094296-521f80705c35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Desserts', 'Cafe', 'Bakery'], rating: 4.4, deliveryTime: '25-35 min' },
];

const RestaurantListingPage: React.FC = () => {
  console.log('RestaurantListingPage loaded');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('relevance'); // 'relevance', 'rating', 'delivery_time'

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setRestaurants(sampleRestaurantsData);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedRestaurants = useMemo(() => {
    let items = [...restaurants];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      items = items.filter(r =>
        r.name.toLowerCase().includes(lowerSearchTerm) ||
        r.cuisineTypes.some(c => c.toLowerCase().includes(lowerSearchTerm))
      );
    }

    if (sortOption === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'delivery_time') {
      const parseDeliveryTime = (timeStr: string) => parseInt(timeStr.split('-')[0], 10) || 999;
      items.sort((a, b) => parseDeliveryTime(a.deliveryTime) - parseDeliveryTime(b.deliveryTime));
    }
    // 'relevance' means original order or backend-defined order, so no client-side sort here.

    return items;
  }, [restaurants, searchTerm, sortOption]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Discover Restaurants" showBackButton={true} className="z-40" />

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto pt-16 pb-16"> {/* Account for fixed Header and Footer */}
        
        {/* Search and Filter Bar - Sticky */}
        <section className="sticky top-0 bg-white z-30 p-3 sm:p-4 border-b shadow-sm">
          <div className="max-w-screen-md mx-auto flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full text-base py-2.5"
                aria-label="Search restaurants and cuisines"
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-auto sm:min-w-[180px] text-base py-2.5 h-auto">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort: Relevance</SelectItem>
                <SelectItem value="rating">Sort: Rating (High to Low)</SelectItem>
                <SelectItem value="delivery_time">Sort: Delivery Time (Fastest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Restaurant List Content */}
        <main className="p-3 sm:p-4 max-w-screen-xl mx-auto w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <RestaurantSkeletonCard key={index} />
              ))}
            </div>
          ) : filteredAndSortedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSortedRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center">
              <Inbox className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">No Restaurants Found</h3>
              <p className="mt-2 text-sm text-gray-600 max-w-md">
                {searchTerm 
                  ? `We couldn't find restaurants matching "${searchTerm}". Try a different search or clear your search term.`
                  : "No restaurants available at the moment. Please check back later!"}
              </p>
            </div>
          )}
        </main>
      </div> {/* End of scrollable area */}

      <Footer />
    </div>
  );
};

export default RestaurantListingPage;