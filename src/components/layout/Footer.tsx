import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/restaurant-listing', label: 'Discover', icon: Search },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/order-tracking', label: 'Orders', icon: Package },
  { path: '/user-profile', label: 'Profile', icon: User },
];

const Footer: React.FC = () => {
  const location = useLocation();
  console.log('Footer component loaded, current path:', location.pathname);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-t-md">
      <nav className="flex justify-around items-center h-16 max-w-screen-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/restaurant-listing" && location.pathname.startsWith("/restaurant")); // Highlight "Discover" for related restaurant pages
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 p-2 text-gray-600 hover:text-primary transition-colors duration-200',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              <IconComponent className={cn('h-6 w-6 mb-0.5', isActive ? 'text-primary' : '')} />
              <span className={cn('text-xs font-medium', isActive ? 'text-primary' : '')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;