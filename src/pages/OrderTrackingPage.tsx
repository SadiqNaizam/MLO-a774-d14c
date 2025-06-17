import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Receipt, MapPin } from 'lucide-react'; // Added MapPin for map placeholder

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  // Placeholder for Map Component
  const MapComponentPlaceholder = () => (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Delivery Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 h-64 md:h-80 flex items-center justify-center rounded-md border border-dashed">
          <p className="text-gray-500 text-center px-4">
            Live map view will be displayed here.
            <br />
            (Map integration placeholder)
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Order Tracking" showBackButton={true} />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 space-y-6 pb-20 md:pb-24"> {/* Added padding-bottom for fixed footer */}
        <OrderTracker
          currentStatusId="preparing" // Example: Can be 'confirmed', 'preparing', 'on-the-way', 'delivered'
          orderNumber="FOODAPP-67890"
          estimatedDeliveryTime="30-40 minutes"
        />

        <MapComponentPlaceholder />

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">
              If you have any questions about your order, please reach out to our support team or the restaurant directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto flex-1 sm:flex-none">
                <Phone className="mr-2 h-4 w-4" /> Contact Support
              </Button>
              <Button variant="outline" className="w-full sm:w-auto flex-1 sm:flex-none">
                <Receipt className="mr-2 h-4 w-4" /> View Order Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage;