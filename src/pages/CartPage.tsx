import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast"; // For promo code feedback

// Lucide Icons
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const DELIVERY_FEE = 5.00;
const TAX_RATE = 0.10; // 10%

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const { toast } = useToast();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Margherita Pizza Deluxe', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60' },
    { id: '2', name: 'Classic Coca-Cola Can (330ml)', price: 1.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1554866585-CD94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29kYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60' },
    { id: '3', name: 'Crispy Garlic Bread Sticks (4 Pcs)', price: 4.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60' },
  ]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const taxes = useMemo(() => {
    return (subtotal - promoDiscount) * TAX_RATE;
  }, [subtotal, promoDiscount]);

  const total = useMemo(() => {
    const amountAfterDiscount = subtotal - promoDiscount;
    return amountAfterDiscount > 0 ? amountAfterDiscount + DELIVERY_FEE + taxes : 0;
  }, [subtotal, promoDiscount, taxes]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Minimum quantity is 1
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({ title: "Item Removed", description: "The item has been removed from your cart." });
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoDiscount(subtotal * 0.10); // 10% discount
      toast({ title: "Promo Code Applied", description: "10% discount has been applied to your order." });
    } else if (promoCode.toUpperCase() === 'FREEBIE') {
        setPromoDiscount(5.00); // $5 flat discount
        toast({ title: "Promo Code Applied", description: "$5.00 discount has been applied." });
    } else {
      setPromoDiscount(0);
      toast({ title: "Invalid Promo Code", description: "The promo code you entered is not valid.", variant: "destructive" });
    }
  };
  
  useEffect(() => {
    // Recalculate promo discount if subtotal changes after promo code was applied
    if (promoDiscount > 0 && promoCode.toUpperCase() === 'SAVE10') {
        setPromoDiscount(subtotal * 0.10);
    }
    // Add other promo logic here if needed
  }, [subtotal, promoCode, promoDiscount]);


  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="Your Cart" showBackButton={true} />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/restaurant-listing">Start Shopping</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Your Cart" showBackButton={true} />
      <ScrollArea className="flex-grow">
        <main className="max-w-3xl mx-auto p-4 pb-24 md:pb-28"> {/* Increased padding-bottom for footer */}
          {/* Cart Items Section */}
          <section aria-labelledby="cart-items-heading" className="mb-6">
            <h2 id="cart-items-heading" className="text-2xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="flex items-center p-3 sm:p-4 space-x-3 sm:space-x-4 shadow-sm">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate" title={item.name}>{item.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button variant="outline" size="icon" className="w-7 h-7 sm:w-8 sm:h-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                    <Input
                      type="number"
                      className="w-10 h-7 sm:w-12 sm:h-8 text-center px-0.5 sm:px-1 hide-arrows [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <Button variant="outline" size="icon" className="w-7 h-7 sm:w-8 sm:h-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  <p className="font-semibold text-sm sm:text-base w-14 sm:w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 w-7 h-7 sm:w-8 sm:h-8" onClick={() => handleRemoveItem(item.id)} aria-label={`Remove ${item.name}`}>
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          {/* Special Instructions Section */}
          <section aria-labelledby="special-instructions-heading" className="mb-6">
            <h2 id="special-instructions-heading" className="text-xl font-semibold mb-2">Special Instructions</h2>
            <Textarea 
              placeholder="Add any special requests for the restaurant (e.g., extra spicy, no onions)..." 
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </section>

          <Separator className="my-6" />

          {/* Promo Code Section */}
          <section aria-labelledby="promo-code-heading" className="mb-6">
            <h2 id="promo-code-heading" className="text-xl font-semibold mb-2">Promo Code</h2>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleApplyPromoCode} className="whitespace-nowrap">Apply Code</Button>
            </div>
            {promoDiscount > 0 && (
              <p className="text-sm text-green-600 mt-2">
                Promo discount of ${promoDiscount.toFixed(2)} applied!
              </p>
            )}
          </section>

          <Separator className="my-6" />

          {/* Order Summary Section */}
          <section aria-labelledby="order-summary-heading">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>-${promoDiscount.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between"><span>Delivery Fee</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes ({(TAX_RATE * 100).toFixed(0)}%)</span><span>${taxes.toFixed(2)}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg sm:text-xl"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </CardContent>
            </Card>
          </section>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/restaurant-listing">Continue Shopping</Link>
            </Button>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </main>
      </ScrollArea>
      <Footer />
      {/* CSS to hide number input spinners */}
      <style>{`
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default CartPage;