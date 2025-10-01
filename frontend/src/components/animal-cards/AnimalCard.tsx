'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface AnimalCardProps {
  id: number;
  name: string;
  scientificName: string;
  conservationStatus?: string;
  imageUrl: string;
  onClick?: () => void;
}

const getConservationColor = (status?: string) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const colors: Record<string, string> = {
    'LEAST_CONCERN': 'bg-green-100 text-green-800',
    'NEAR_THREATENED': 'bg-yellow-100 text-yellow-800',
    'VULNERABLE': 'bg-orange-100 text-orange-800',
    'ENDANGERED': 'bg-red-100 text-red-800',
    'CRITICALLY_ENDANGERED': 'bg-red-200 text-red-900',
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatConservationStatus = (status?: string) => {
  if (!status) return '';
  return status.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
};

export const AnimalCard: React.FC<AnimalCardProps> = ({
  id,
  name,
  scientificName,
  conservationStatus,
  imageUrl,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
          relative overflow-hidden
          w-full aspect-square
          transition-all duration-700 ease-in-out
          ${isHovered 
            ? 'shadow-2xl -translate-y-2' 
            : 'shadow-lg'
          }
        `}
        style={{
          borderRadius: isHovered 
            ? '30% 60% 70% 40% / 50% 60% 30% 60%'
            : '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl || '/api/placeholder/400/400'}
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