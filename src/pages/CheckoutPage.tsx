import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header'; // Custom component from layout_info
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { CreditCard, MapPin, Package, DollarSign, ChevronLeft } from 'lucide-react';

// Define Zod schema for form validation
const addressSchema = z.object({
  street: z.string().min(5, { message: "Street address is required and should be at least 5 characters." }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Valid ZIP code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  saveAddress: z.boolean().optional(),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "paypal", "cod"], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  savePayment: z.boolean().optional(),
}).refine(data => {
  if (data.paymentMethod === "card") {
    return !!data.cardNumber && data.cardNumber.length >= 13 && data.cardNumber.length <= 19 &&
           !!data.cardExpiry && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry) &&
           !!data.cardCvc && data.cardCvc.length >= 3 && data.cardCvc.length <= 4;
  }
  return true;
}, {
  message: "Please provide valid card details if 'Credit/Debit Card' is selected.",
  path: ["cardDetails"], // This path helps to show error near card details section
});

const promoSchema = z.object({
  promoCode: z.string().optional(),
});

const checkoutFormSchema = addressSchema.merge(paymentSchema).merge(promoSchema);

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA', // Default country
      saveAddress: false,
      paymentMethod: undefined, // Initially no payment method selected
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      savePayment: false,
      promoCode: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    toast.success('Order Placed!', {
      description: 'Your order has been successfully placed. Redirecting to tracking...',
      duration: 3000,
    });
    // Simulate API call
    setTimeout(() => {
      navigate('/order-tracking', { state: { orderId: '12345XYZ' } }); // Navigate to OrderTrackingPage (from app_tsx_content)
    }, 1500);
  };

  // Placeholder order summary data
  const orderItems = [
    { id: '1', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { id: '2', name: 'Coke (2L)', quantity: 2, price: 2.50 },
  ];
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3.00;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Checkout" showBackButton={true} />
      
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Address Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <MapPin className="mr-2 h-6 w-6 text-primary" /> Delivery Address
                    </CardTitle>
                    <CardDescription>Enter your shipping details below.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apartment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apt 4B" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State / Province</FormLabel>
                            <FormControl>
                               <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP / Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="90210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USA">United States</SelectItem>
                                <SelectItem value="CAN">Canada</SelectItem>
                                <SelectItem value="MEX">Mexico</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                        control={form.control}
                        name="saveAddress"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Save this address for future orders</FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Method Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <CreditCard className="mr-2 h-6 w-6 text-primary" /> Payment Method
                    </CardTitle>
                    <CardDescription>Choose how you'd like to pay.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedPaymentMethod(value);
                              }}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="paypal" />
                                </FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cod" />
                                </FormControl>
                                <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {selectedPaymentMethod === 'card' && (
                      <Accordion type="single" collapsible className="w-full mt-4" defaultValue="item-1">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-base">Enter Card Details</AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4">
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="•••• •••• •••• ••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="cardExpiry"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry (MM/YY)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="MM/YY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="cardCvc"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                      <Input placeholder="•••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                             <FormField
                                control={form.control}
                                name="savePayment"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Save this payment method</FormLabel>
                                    </div>
                                    </FormItem>
                                )}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                     {form.formState.errors.cardDetails && (
                        <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.cardDetails.message}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20"> {/* Adjust top based on header height */}
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Package className="mr-2 h-6 w-6 text-primary" /> Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes (Est.)</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="pt-2">
                       <FormField
                          control={form.control}
                          name="promoCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Promo Code</FormLabel>
                              <div className="flex space-x-2">
                                <FormControl>
                                  <Input placeholder="Enter code" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" onClick={() => toast.info('Promo code applied (placeholder)!')}>Apply</Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3">
                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Placing Order..." : "Place Order"} 
                      <DollarSign className="ml-2 h-5 w-5"/>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/cart"> {/* Link to CartPage (from app_tsx_content) */}
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cart
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </Form>
        </main>
      </ScrollArea>
    </div>
  );
};

export default CheckoutPage;