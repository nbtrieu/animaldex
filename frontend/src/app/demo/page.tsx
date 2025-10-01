'use client';

import AnimalCard from '@/components/animal-cards/AnimalCard';

const sampleAnimals = [
  {
    id: 1,
    name: "Arctic Fox",
    scientificName: "Vulpes lagopus",
    conservationStatus: "LEAST_CONCERN",
    imageUrl: "https://images.unsplash.com/photo-1470093851219-69951fcbb533"
  },
  {
    id: 2,
    name: "African Elephant",
    scientificName: "Loxodonta africana",
    conservationStatus: "ENDANGERED",
    imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44"
  },
  {
    id: 3,
    name: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    conservationStatus: "VULNERABLE",
    imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7"
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          AnimalDex Card Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              {...animal}
              onClick={() => console.log(`Clicked ${animal.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}