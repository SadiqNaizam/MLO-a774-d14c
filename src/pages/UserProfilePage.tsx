import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { User, MapPin, CreditCard, History, Settings, HelpCircle, LogOut, Edit, Trash2, PlusCircle, ChevronRight, Bell, Shield, Palette, Globe } from 'lucide-react';

// Sample Data
const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '555-123-4567',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexjohnson',
};

const savedAddresses = [
  { id: '1', type: 'Home', line1: '123 Willow Creek Dr', city: 'Springfield', zip: '62704', isDefault: true },
  { id: '2', type: 'Work', line1: '456 Oak Avenue, Suite 300', city: 'Springfield', zip: '62702', isDefault: false },
];

const paymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'MasterCard', last4: '5555', expiry: '08/26', isDefault: false },
];

const orderHistory = [
  { id: 'ORD78901', date: '2024-07-15', total: 25.99, status: 'Delivered', items: 3 },
  { id: 'ORD78902', date: '2024-07-20', total: 18.50, status: 'Processing', items: 2 },
  { id: 'ORD78903', date: '2024-07-22', total: 32.75, status: 'Out for Delivery', items: 4 },
];

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);

  console.log('UserProfilePage loaded');

  const handleLogout = () => {
    console.log('User logging out...');
    // Add any actual logout logic here (e.g., clearing tokens)
    navigate('/'); // Navigate to HomePage after logout, as per App.tsx
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving changes:', { name, email, phone });
    // Add API call to save changes here
    // Potentially show a toast notification on success/failure
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="My Profile" showBackButton={true} />

      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-6 pb-24"> {/* pb-24 for footer and logout button */}
          <Tabs defaultValue="personal-info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="personal-info"><User className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Info</TabsTrigger>
              <TabsTrigger value="addresses"><MapPin className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Addresses</TabsTrigger>
              <TabsTrigger value="payment"><CreditCard className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Payment</TabsTrigger>
              <TabsTrigger value="orders"><History className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Orders</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Settings</TabsTrigger>
              <TabsTrigger value="help"><HelpCircle className="w-4 h-4 mr-2 sm:hidden md:inline-block" />Help</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal-info">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                      <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                    <CardDescription>{userProfile.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveChanges} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map((addr) => (
                    <Card key={addr.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{addr.type} {addr.isDefault && <span className="text-xs text-green-600">(Default)</span>}</p>
                        <p className="text-sm text-gray-600">{addr.line1}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.zip}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="icon" aria-label="Edit address"><Edit className="w-4 h-4" /></Button>
                        <Button variant="destructive" size="icon" aria-label="Delete address"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </Card>
                  ))}
                  <Button className="w-full mt-4"><PlusCircle className="w-4 h-4 mr-2" />Add New Address</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((pm) => (
                    <Card key={pm.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{pm.type} ending in {pm.last4} {pm.isDefault && <span className="text-xs text-green-600">(Default)</span>}</p>
                        <p className="text-sm text-gray-600">Expires: {pm.expiry}</p>
                      </div>
                       <div className="space-x-2">
                        <Button variant="outline" size="icon" aria-label="Edit payment method"><Edit className="w-4 h-4" /></Button>
                        <Button variant="destructive" size="icon" aria-label="Delete payment method"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </Card>
                  ))}
                  <Button className="w-full mt-4"><PlusCircle className="w-4 h-4 mr-2" />Add New Payment Method</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>Review your past orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.length > 0 ? orderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="link" size="sm">
                              <Link to="/order-tracking">View Details</Link> {/* Link to general OrderTrackingPage as per App.tsx */}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">No orders yet.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>App Settings</CardTitle>
                  <CardDescription>Customize your app experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="notifications">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center"><Bell className="w-5 h-5 mr-3 text-primary" /> Notification Preferences</div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <Label htmlFor="email-notifications" className="flex-grow">Email Notifications</Label>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <Label htmlFor="push-notifications" className="flex-grow">Push Notifications</Label>
                          <Switch id="push-notifications" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg border">
                          <Label htmlFor="sms-notifications" className="flex-grow">SMS Notifications</Label>
                          <Switch id="sms-notifications" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="appearance">
                      <AccordionTrigger className="text-base">
                         <div className="flex items-center"><Palette className="w-5 h-5 mr-3 text-primary" /> Appearance</div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-4">
                        <Label>Theme</Label>
                        <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                          <div><RadioGroupItem value="light" id="theme-light" className="peer sr-only" /><Label htmlFor="theme-light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Light</Label></div>
                          <div><RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" /><Label htmlFor="theme-dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Dark</Label></div>
                          <div><RadioGroupItem value="system" id="theme-system" className="peer sr-only" /><Label htmlFor="theme-system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">System</Label></div>
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="language">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center"><Globe className="w-5 h-5 mr-3 text-primary" /> Language & Region</div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-4">
                        <p className="text-sm text-muted-foreground">Language selection (placeholder).</p>
                        {/* Future: <Select> component for language selection */}
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="privacy">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center"><Shield className="w-5 h-5 mr-3 text-primary" /> Privacy & Security</div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-4">
                         <Button variant="outline" className="w-full justify-start">Change Password</Button>
                         <Button variant="outline" className="w-full justify-start">Manage Data</Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Help & Support Tab */}
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Find answers and get assistance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Frequently Asked Questions (FAQ)', icon: <HelpCircle className="w-4 h-4 mr-2"/>, action: () => console.log('Navigate to FAQ') },
                    { label: 'Contact Support', icon: <User className="w-4 h-4 mr-2"/>, action: () => console.log('Navigate to Contact Support') },
                    { label: 'Terms of Service', icon: <FileTextIcon className="w-4 h-4 mr-2"/>, action: () => console.log('Navigate to Terms') },
                    { label: 'Privacy Policy', icon: <Shield className="w-4 h-4 mr-2"/>, action: () => console.log('Navigate to Privacy Policy') },
                  ].map(item => (
                    <Button key={item.label} variant="ghost" className="w-full justify-start p-4 text-base h-auto" onClick={item.action}>
                      {item.icon}
                      {item.label}
                      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full text-lg py-6">
                <LogOut className="w-5 h-5 mr-2" /> Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be returned to the home screen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </main>
      </ScrollArea>

      <Footer />
    </div>
  );
};

// Placeholder for FileTextIcon if not available in lucide-react easily or to avoid too many imports.
// You'd typically import this from lucide-react if it exists.
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);


export default UserProfilePage;