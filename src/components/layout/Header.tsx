import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void; // Custom handler for back button, defaults to navigate(-1)

  showLocationInfo?: boolean;
  locationLabel?: string; // e.g., "DELIVERING TO"
  currentLocation?: string;
  onLocationPress?: () => void; // Action when location info is pressed

  rightElement?: React.ReactNode; // Element to render on the right (e.g., search icon button)
  
  className?: string; // Additional classes for the header root element
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  showLocationInfo = false,
  locationLabel = "LOCATION",
  currentLocation,
  onLocationPress,
  rightElement,
  className,
}) => {
  const navigate = useNavigate();
  console.log('Header component loaded. Title:', title, 'Show Location:', showLocationInfo);

  const handleBackNavigation = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // Default back navigation behavior
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 shadow-sm sm:px-6",
        className
      )}
    >
      {/* Left Section: Back button or empty space for balance */}
      <div className="flex items-center justify-start min-w-[2.5rem]"> {/* min-w-10 (40px) */}
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={handleBackNavigation} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Center Section: Title or Location Info */}
      <div className="flex-1 overflow-hidden text-center px-2">
        {showLocationInfo && currentLocation ? (
          <button
            onClick={onLocationPress}
            className={cn(
              "inline-flex flex-col items-center justify-center rounded-md px-3 py-1.5 text-sm transition-colors",
              onLocationPress ? "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" : "cursor-default"
            )}
            disabled={!onLocationPress}
            aria-label={onLocationPress ? `Current location: ${currentLocation}. Tap to change.` : `Current location: ${currentLocation}`}
          >
            {locationLabel && (
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {locationLabel}
              </span>
            )}
            <div className="flex items-center font-semibold text-primary">
              <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span className="block truncate">{currentLocation}</span>
            </div>
          </button>
        ) : title ? (
          <h1 className="truncate text-lg font-semibold" title={title}>{title}</h1>
        ) : (
          <div aria-hidden="true">&nbsp;</div> // Placeholder to maintain layout
        )}
      </div>

      {/* Right Section: Custom element or empty space for balance */}
      <div className="flex items-center justify-end min-w-[2.5rem]"> {/* min-w-10 (40px) */}
        {rightElement}
      </div>
    </header>
  );
};

export default Header;