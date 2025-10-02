// frontend/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimalCard from '@/components/animal-cards/AnimalCard';
import type { AnimalSummary } from '@/types';

export default function HomePage() {
  const [animals, setAnimals] = useState<AnimalSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/animals/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading animals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AnimalDex
          </h1>
          <p className="text-gray-600">
            Discover animals, explore ecosystems, and take conservation action
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animals.map((animal) => (
            <Link key={animal.id} href={`/animals/${animal.id}`}>
              <AnimalCard
                id={animal.id}
                name={animal.name}
                scientificName={animal.scientific_name}
                conservationStatus={animal.conservation_status}
                imageUrl={animal.image_urls[0] || '/api/placeholder/400/400'}
                hoverImageUrl={animal.image_urls[1]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}