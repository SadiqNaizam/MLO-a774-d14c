import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, ChefHat, Truck, PartyPopper, Zap } from 'lucide-react';

// Define the structure for each step
interface OrderStep {
  id: string;
  name: string;
  icon: React.ElementType; // For Lucide icons
}

// Define the standard steps for an order
const STEPS: OrderStep[] = [
  { id: 'confirmed', name: 'Order Confirmed', icon: CheckCircle },
  { id: 'preparing', name: 'Preparing Food', icon: ChefHat },
  { id: 'on-the-way', name: 'Out for Delivery', icon: Truck },
  { id: 'delivered', name: 'Delivered', icon: PartyPopper },
];

interface OrderTrackerProps {
  currentStatusId: string; // e.g., 'preparing'
  orderNumber?: string;
  estimatedDeliveryTime?: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  currentStatusId,
  orderNumber,
  estimatedDeliveryTime,
}) => {
  console.log('OrderTracker loaded. Current status:', currentStatusId);

  const currentStepIndex = STEPS.findIndex(step => step.id === currentStatusId);
  // If statusId is not found, default to the first step or handle as an error/unknown state.
  // For simplicity, assuming currentStatusId will always be valid and found.
  // If currentStepIndex is -1 (not found), all steps will appear as pending.

  return (
    <Card className="w-full shadow-lg">
      {(orderNumber || estimatedDeliveryTime) && (
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Order Progress</CardTitle>
          {orderNumber && (
            <CardDescription className="text-sm">
              Order # {orderNumber}
            </CardDescription>
          )}
          {estimatedDeliveryTime && (
            <CardDescription className="text-sm pt-1">
              Estimated Delivery: {estimatedDeliveryTime}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="pt-6 pb-8">
        <div className="flex items-start justify-between space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto pb-2">
          {STEPS.map((step, index) => {
            const isCompleted = currentStepIndex > -1 && index < currentStepIndex;
            const isCurrent = currentStepIndex > -1 && index === currentStepIndex;
            // const isPending = currentStepIndex === -1 || index > currentStepIndex; // Implicitly handled by default styles

            let iconClasses = "text-gray-400"; // Default: Pending
            let textClasses = "text-gray-500";
            let ringClasses = "ring-gray-300";
            // Line color is for the line *after* this step.
            let outgoingLineClasses = "bg-gray-300"; 

            if (isCompleted) {
              iconClasses = "text-green-500";
              textClasses = "text-green-600 font-medium";
              ringClasses = "ring-green-500";
              outgoingLineClasses = "bg-green-500";
            } else if (isCurrent) {
              iconClasses = "text-blue-500"; // Pulsing animation handled by Zap icon presence potentially
              textClasses = "text-blue-600 font-semibold";
              ringClasses = "ring-blue-500 ring-offset-background ring-offset-2 ring-2";
              // Outgoing line from current step is still gray/pending
            }

            const StepIconComponent = step.icon;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[80px] md:min-w-[100px]">
                  <div className={`relative mb-2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ring-1 ${ringClasses} bg-background transition-all duration-300`}>
                    <StepIconComponent className={`w-5 h-5 md:w-6 md:h-6 ${iconClasses} transition-all duration-300`} />
                    {isCurrent && (
                      <div className="absolute -top-1.5 -right-1.5 p-0.5 bg-background rounded-full">
                         <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  <p className={`text-xs md:text-sm ${textClasses} transition-all duration-300 line-clamp-2`}>{step.name}</p>
                </div>

                {/* Connector Line - not rendered after the last step */}
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-1.5 self-start mt-5 md:mt-[22px] rounded-full ${outgoingLineClasses} transition-colors duration-500 ease-in-out`}>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {currentStepIndex === -1 && (
            <p className="text-center text-sm text-red-500 mt-4">
                Order status is currently unavailable or unknown.
            </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracker;