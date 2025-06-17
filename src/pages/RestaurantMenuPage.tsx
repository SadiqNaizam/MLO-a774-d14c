import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard'; // Assuming DishCard handles its own "Add to Cart" toast

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // May not be directly used if actions are in DishCard/Header

// Icons
import { Star, Clock } from 'lucide-react';

// Types for placeholder data
interface Dish {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  dietaryTags?: string[];
  isPopular?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  dishes: Dish[];
}

interface RestaurantData {
  id: string;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  address: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  cuisineTypes: string[];
  menu: MenuCategory[];
}

// Placeholder restaurant data
const sampleRestaurant: RestaurantData = {
  id: 'default123',
  name: "Luigi's Pizzeria Deluxe",
  logoUrl: 'https://images.unsplash.com/photo-1593504049358-7dc2418a983e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80', // Placeholder logo
  bannerUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80', // Placeholder banner
  address: '123 Pizza Street, Flavor Town, USA',
  rating: 4.7,
  reviewsCount: 385,
  deliveryTime: '25-35 min',
  cuisineTypes: ['Italian', 'Pizza', 'Pasta', 'Calzones'],
  menu: [
    {
      id: 'cat1_appetizers',
      name: 'Appetizers',
      dishes: [
        { id: 'd1', name: 'Garlic Knots Supreme', price: 7.99, imageUrl: 'https://images.unsplash.com/photo-1627042632214-142f71a5e490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Warm, buttery garlic knots served with marinara sauce.', dietaryTags: ['Vegetarian'], isPopular: true },
        { id: 'd2', name: 'Caprese Skewers', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1579887829096-3e8eb4c6a4f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Cherry tomatoes, mozzarella, and basil drizzled with balsamic glaze.', dietaryTags: ['Vegetarian', 'Gluten-Free'] },
      ],
    },
    {
      id: 'cat2_main_courses',
      name: 'Main Courses',
      dishes: [
        { id: 'd3', name: 'Margherita Classic Pizza', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'The timeless classic with fresh mozzarella, San Marzano tomatoes, and basil.', dietaryTags: ['Vegetarian'], isPopular: true },
        { id: 'd4', name: 'Spicy Pepperoni Feast Pizza', price: 17.00, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Loaded with spicy pepperoni, mozzarella, and a hint of chili flakes.' },
        { id: 'd5', name: 'Creamy Carbonara Pasta', price: 16.00, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508066ea65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Spaghetti with a rich sauce of egg, Pecorino Romano, pancetta, and black pepper.' },
      ],
    },
    {
      id: 'cat3_desserts',
      name: 'Desserts',
      dishes: [
        { id: 'd6', name: 'Molten Chocolate Lava Cake', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1586985289497-450cf000d06c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', isPopular: true },
      ],
    },
    {
      id: 'cat4_drinks',
      name: 'Drinks',
      dishes: [
        { id: 'd7', name: 'San Pellegrino', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1551800566-766c6ddf9d10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'Sparkling natural mineral water.' },
        { id: 'd8', name: 'Fresh Lemonade', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1513558161927-2c03 AFF6028b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80', description: 'House-made with fresh lemons.' },
      ],
    },
  ],
};

const RestaurantMenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('id');
  const [restaurantData, setRestaurantData] = useState<RestaurantData>(sampleRestaurant);

  useEffect(() => {
    console.log('RestaurantMenuPage loaded');
    // In a real app, you would fetch restaurant data based on restaurantId
    // For now, we use sample data, but we can log the ID.
    if (restaurantId) {
      console.log('Restaurant ID from URL:', restaurantId);
      // Example: fetchRestaurantData(restaurantId).then(data => setRestaurantData(data));
      // If you had multiple sample restaurants, you could select one here based on ID.
      // For this example, we'll just use the single sampleRestaurant or update its name.
      setRestaurantData(prevData => ({
        ...prevData,
        name: restaurantId ? `Menu for Restaurant ${restaurantId}` : prevData.name,
        id: restaurantId || prevData.id
      }));
    }
  }, [restaurantId]);

  const handleAddToCart = (dishName: string) => {
    console.log(`"${dishName}" action triggered from RestaurantMenuPage. DishCard handles its own toast.`);
    // Actual add to cart logic would be here or managed by a global state/context.
    // The DishCard component itself calls useToast for immediate feedback on its button click.
  };

  if (!restaurantData) {
    // Could show a loading spinner or a "Restaurant not found" message
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Loading..." showBackButton={true} />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading restaurant details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={restaurantData.name} showBackButton={true} />
      
      <ScrollArea className="flex-1 pb-20"> {/* pb-20 to avoid overlap with fixed Footer (h-16 + extra space) */}
        {/* Restaurant Banner */}
        <div className="relative">
          <img 
            src={restaurantData.bannerUrl} 
            alt={`${restaurantData.name} banner`} 
            className="w-full h-40 sm:h-48 md:h-56 object-cover" 
          />
          {/* Optional: Add a semi-transparent overlay for better text readability if text is on banner */}
        </div>

        {/* Restaurant Info Card */}
        <Card className="mx-2 sm:mx-4 my-4 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-white shadow-md">
                <AvatarImage src={restaurantData.logoUrl} alt={`${restaurantData.name} logo`} />
                <AvatarFallback>{restaurantData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">{restaurantData.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{restaurantData.address}</CardDescription>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-700">
                  <span className="flex items-center">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-yellow-400 fill-yellow-400" /> 
                    {restaurantData.rating.toFixed(1)} ({restaurantData.reviewsCount} reviews)
                  </span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" /> 
                    {restaurantData.deliveryTime}
                  </span>
                </div>
                {restaurantData.cuisineTypes.length > 0 && (
                  <div className="mt-2 sm:mt-2.5 flex flex-wrap gap-1.5">
                    {restaurantData.cuisineTypes.map(cuisine => (
                      <Badge key={cuisine} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Menu Tabs */}
        {restaurantData.menu && restaurantData.menu.length > 0 ? (
          <Tabs defaultValue={restaurantData.menu[0].id} className="px-2 sm:px-4 pb-4">
            <TabsList className="w-full justify-start overflow-x-auto py-1 h-auto no-scrollbar border-b sticky top-16 bg-gray-50 z-30">
              {/* Header height is h-16 (4rem/64px). Sticky top should be below header. */}
              {restaurantData.menu.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap data-[state=active]:shadow-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {restaurantData.menu.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <div className="space-y-3 sm:space-y-4">
                  {category.dishes.length > 0 ? (
                    category.dishes.map(dish => (
                      <DishCard
                        key={dish.id}
                        id={dish.id}
                        name={dish.name}
                        price={dish.price}
                        imageUrl={dish.imageUrl}
                        description={dish.description}
                        dietaryTags={dish.dietaryTags}
                        isPopular={dish.isPopular}
                        onAddToCart={() => handleAddToCart(dish.name)}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No dishes in this category yet.</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <p className="text-center text-gray-500 py-8">Menu information is currently unavailable.</p>
        )}
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;

// CSS for no-scrollbar (add to your global CSS if needed, or keep here if specific)
// This is a utility class one might have. For now, it's just a comment.
/*
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
*/