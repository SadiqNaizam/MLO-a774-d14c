import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, MapPin } from 'lucide-react';

interface LocationSearchBarProps {
  initialSearchTerm?: string;
  placeholder?: string;
  onSearchSubmit: (query: string) => void;
  onLocationRequest?: () => void;
  className?: string;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  initialSearchTerm = '',
  placeholder = "Search restaurants, cuisines, or dishes...",
  onSearchSubmit,
  onLocationRequest,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    console.log('LocationSearchBar loaded for food delivery app');
  }, []);

  useEffect(() => {
    // Sync state if initialSearchTerm prop changes externally
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const triggerSearch = () => {
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim());
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    // If clearing should trigger an "empty" search, uncomment the line below:
    // onSearchSubmit(''); 
  };
  
  // Calculate right padding for the input field based on visible icons
  let prValue = 4; // Default: pr-4 (1rem), if no right icons
  if (onLocationRequest && searchTerm && searchTerm.length > 0) {
    prValue = 20; // Space for two icon buttons (X and MapPin): pr-20 (5rem / 80px)
  } else if (onLocationRequest || (searchTerm && searchTerm.length > 0)) {
    prValue = 10; // Space for one icon button (either X or MapPin): pr-10 (2.5rem / 40px)
  }
  const prClass = `pr-${prValue}`;

  return (
    <div className={`relative w-full ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={triggerSearch}
        aria-label="Submit search"
        className="absolute left-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground z-10"
      >
        <Search className="h-5 w-5" />
      </Button>
      
      <Input
        type="text"
        placeholder={placeholder}
        // Left padding for search icon button: pl-12 (3rem / 48px)
        // Vertical padding: py-3. Font size: text-lg.
        className={`w-full pl-12 ${prClass} py-3 text-lg rounded-full shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow duration-300 ease-in-out hover:shadow-lg`}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 z-10">
        {searchTerm && searchTerm.length > 0 && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClearSearch} 
            aria-label="Clear search term"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        {onLocationRequest && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onLocationRequest} 
            aria-label="Detect current location"
            className="text-muted-foreground hover:text-foreground h-9 w-9"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocationSearchBar;