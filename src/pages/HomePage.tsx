import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import LocationSearchBar from '@/components/LocationSearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"; // For carousel items

// Icons
import { ShoppingCart } from 'lucide-react';

// Placeholder Data
const promotions = [
  { id: 'promo1', title: 'Weekend Feast Offer', imageUrl: 'https://placehold.co/800x400/FFF0F5/FF69B4?text=Weekend+Feast&font=lora', description: 'Get 25% off on orders above $50' },
  { id: 'promo2', title: 'Lunch Special', imageUrl: 'https://placehold.co/800x400/E6E6FA/483D8B?text=Lunch+Special&font=lora', description: 'Flat $10 off on all lunch combos' },
  { id: 'promo3', title: 'New User Discount', imageUrl: 'https://placehold.co/800x400/F0FFF0/2E8B57?text=Welcome+Offer&font=lora', description: 'First order? Enjoy 30% off!' },
];

const cuisineCategories = [
  { name: 'Pizza', slug: 'pizza', imageUrl: 'https://placehold.co/100x100/FFDAB9/FF8C00?text=Pizza&font=montserrat' },
  { name: 'Burgers', slug: 'burgers', imageUrl: 'https://placehold.co/100x100/FFE4B5/D2691E?text=Burgers&font=montserrat' },
  { name: 'Sushi', slug: 'sushi', imageUrl: 'https://placehold.co/100x100/ADD8E6/4682B4?text=Sushi&font=montserrat' },
  { name: 'Italian', slug: 'italian', imageUrl: 'https://placehold.co/100x100/F0E68C/B8860B?text=Italian&font=montserrat' },
  { name: 'Chinese', slug: 'chinese', imageUrl: 'https://placehold.co/100x100/FFC0CB/DC143C?text=Chinese&font=montserrat' },
  { name: 'Mexican', slug: 'mexican', imageUrl: 'https://placehold.co/100x100/98FB98/228B22?text=Mexican&font=montserrat' },
  { name: 'Indian', slug: 'indian', imageUrl: 'https://placehold.co/100x100/FFA07A/FF4500?text=Indian&font=montserrat' },
  { name: 'Desserts', slug: 'desserts', imageUrl: 'https://placehold.co/100x100/D8BFD8/8A2BE2?text=Desserts&font=montserrat' },
];

const featuredRestaurants = [
  { id: '1', name: 'Luigi\'s Pizza Palace', imageUrl: 'https://placehold.co/400x225/FFCCCB/C0392B?text=Luigi%27s+Pizza', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-35 min', promotionalTag: '20% OFF' },
  { id: '2', name: 'Burger Queen', imageUrl: 'https://placehold.co/400x225/DAF7A6/FFC300?text=Burger+Queen', cuisineTypes: ['Burgers', 'Fast Food'], rating: 4.2, deliveryTime: '20-30 min' },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://placehold.co/400x225/AECCD1/4A6C6F?text=Sushi+Central', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, deliveryTime: '30-40 min', promotionalTag: 'Free Miso' },
  { id: '4', name: 'Taco Tuesday Everyday', imageUrl: 'https://placehold.co/400x225/F9E79F/F39C12?text=Taco+Fiesta', cuisineTypes: ['Mexican'], rating: 4.3, deliveryTime: '20-30 min' },
  { id: '5', name: 'Curry House', imageUrl: 'https://placehold.co/400x225/D7BDE2/8E44AD?text=Curry+House', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, deliveryTime: '35-45 min', promotionalTag: 'Family Deal' },
  { id: '6', name: 'Sweet Dreams Bakery', imageUrl: 'https://placehold.co/400x225/A9DFBF/27AE60?text=Sweet+Dreams', cuisineTypes: ['Desserts', 'Bakery'], rating: 4.9, deliveryTime: '15-25 min' },
];

const HomePage = () => {
  const navigate = useNavigate();
  console.log('HomePage loaded');

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted from HomePage:", query);
    navigate(`/restaurant-listing?search=${encodeURIComponent(query)}`);
  };

  const handleLocationRequest = () => {
    console.log("Requesting current location from HomePage...");
    // Placeholder: In a real app, this would trigger geolocation API
    alert("Location detection feature not implemented yet.");
  };
  
  const handleLocationChangePress = () => {
    console.log("Change location pressed on HomePage Header...");
    // Placeholder: This could open a modal or navigate to a location selection page
    alert("Change location feature not implemented yet.");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        showLocationInfo={true}
        locationLabel="DELIVER TO"
        currentLocation="123 Main St, Anytown"
        onLocationPress={handleLocationChangePress}
        rightElement={
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        }
      />

      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-6 space-y-8 pb-24"> {/* pb-24 for footer clearance */}
          <section aria-labelledby="search-section-title" className="md:pt-4">
            <h2 id="search-section-title" className="sr-only">Search for food and restaurants</h2>
            <LocationSearchBar
              placeholder="Search restaurants or cuisines..."
              onSearchSubmit={handleSearchSubmit}
              onLocationRequest={handleLocationRequest}
              className="max-w-2xl mx-auto"
            />
          </section>

          <section aria-labelledby="promotions-section-title">
            <h2 id="promotions-section-title" className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              Today's Offers
            </h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {promotions.map((promo) => (
                  <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover" />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12 sm:ml-16" /> {/* Adjusted for better visibility with padding */}
              <CarouselNext className="mr-12 sm:mr-16" /> {/* Adjusted for better visibility with padding */}
            </Carousel>
          </section>

          <section aria-labelledby="cuisines-section-title">
            <h2 id="cuisines-section-title" className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              Explore Cuisines
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cuisineCategories.map((cuisine) => (
                <Link key={cuisine.slug} to={`/restaurant-listing?cuisine=${encodeURIComponent(cuisine.slug)}`} className="block group">
                  <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow duration-200">
                    <img src={cuisine.imageUrl} alt={cuisine.name} className="w-full h-24 object-cover" />
                    <CardContent className="p-3">
                      <p className="text-sm font-medium group-hover:text-primary">{cuisine.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
          
          <section aria-labelledby="featured-restaurants-section-title">
            <div className="flex justify-between items-center mb-4">
              <h2 id="featured-restaurants-section-title" className="text-2xl font-bold tracking-tight text-gray-900">
                Popular Near You
              </h2>
              <Link to="/restaurant-listing">
                <Button variant="link" className="text-primary">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                  promotionalTag={restaurant.promotionalTag}
                />
              ))}
            </div>
          </section>
        </main>
      </ScrollArea>

      <Footer />
    </div>
  );
};

export default HomePage;