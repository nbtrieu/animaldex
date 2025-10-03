'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import type { ConservationStatus } from "@/types"
import { getConservationColor, formatConservationStatus } from '@/lib/utils';

interface AnimalCardProps {
  id: number;
  name: string;
  scientificName: string;
  conservationStatus?: ConservationStatus;
  imageUrl: string;
  hoverImageUrl: string;
  onClick?: () => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  id,
  name,
  scientificName,
  conservationStatus,
  imageUrl,
  hoverImageUrl,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage = isHovered && hoverImageUrl ? hoverImageUrl : imageUrl;

  // Generate unique blob shapes for this card
  const blobShapes = useMemo(() => {
    const randomShape = () => {
      // Generate more varied values to avoid square-ish shapes
      const values = Array.from({length: 8}, (_, i) => {
        // Alternate between higher and lower values for more organic shapes
        const base = i % 2 === 0 ? 40 : 60;
        const variance = Math.floor(Math.random() * 30 - 15); // -15 to +15
        return Math.max(25, Math.min(75, base + variance)); // Clamp between 25-75%
      });
      return `${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${values[6]}% ${values[7]}%`;
    };
    
    return {
      default: randomShape(),
      hover: randomShape()
    };
  }, [id]); // Regenerate only if id changes

  return (
    <div
      className="animal-card-wrapper cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Blob Image Container */}
      <div
        className={`
          relative overflow-hidden w-full aspect-square
          transition-all duration-700 ease-in-out
          ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'}
        `}
        style={{
          borderRadius: isHovered ? blobShapes.hover : blobShapes.default
        }}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={displayImage || '/api/placeholder/400/400'}
            alt={name}
            className={`
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Hover Indicator - center */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Text Content Below Blob */}
      <div className="mt-4 space-y-2">
        <h3 className={`
          font-bold text-xl text-gray-900
          transition-all duration-300
          ${isHovered ? 'text-blue-600' : ''}
        `}>
          {name}
        </h3>
        
        <p className={`
          text-sm text-gray-600 italic
          transition-all duration-300
          ${isHovered ? 'text-gray-900' : ''}
        `}>
          {scientificName}
        </p>

        {conservationStatus && (
          <Badge 
            className={`${getConservationColor(conservationStatus)} text-xs inline-block`}
          >
            {formatConservationStatus(conservationStatus)}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;