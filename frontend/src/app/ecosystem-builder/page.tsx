// frontend/src/app/ecosystem-builder/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Network, Sparkles } from 'lucide-react';
import type { AnimalSummary, HabitatSummary, EcosystemAnimal, Relationship } from '@/types';

const EcosystemBuilder = () => {
  const [habitats, setHabitats] = useState<HabitatSummary[]>([]);
  const [animals, setAnimals] = useState<AnimalSummary[]>([]);
  const [selectedHabitat, setSelectedHabitat] = useState<number | null>(null);
  const [ecosystemAnimals, setEcosystemAnimals] = useState<EcosystemAnimal[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [relationshipMode, setRelationshipMode] = useState<string | null>(null);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [loading, setLoading] = useState(true);
  const [draggingAnimal, setDraggingAnimal] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalsRes, habitatsRes] = await Promise.all([
          fetch('http://localhost:8000/api/animals/'),
          fetch('http://localhost:8000/api/habitats/')
        ]);
        
        const animalsData = await animalsRes.json();
        const habitatsData = await habitatsRes.json();
        
        setAnimals(animalsData);
        setHabitats(habitatsData);
        
        if (habitatsData.length > 0) {
          setSelectedHabitat(habitatsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getHabitatGradient = (name: string) => {
    const gradients: Record<string, string> = {
      'Arctic Tundra': 'from-blue-100 via-cyan-50 to-white',
      'Tropical Rainforest': 'from-green-100 via-emerald-50 to-green-100',
      'Coral Reef': 'from-blue-50 via-teal-100 to-cyan-50',
      'Temperate Forest': 'from-green-50 via-yellow-50 to-orange-50',
      'Savanna': 'from-yellow-100 via-orange-50 to-amber-100',
    };
    return gradients[name] || 'from-gray-100 to-gray-200';
  };

  const relationshipTypes = [
    { id: 'predator-prey', name: 'Predator-Prey', color: '#ef4444', icon: '🦁→🦌', description: 'One organism hunts another' },
    { id: 'competition', name: 'Competition', color: '#f97316', icon: '⚔️', description: 'Both compete for resources' },
    { id: 'mutualism', name: 'Mutualism', color: '#22c55e', icon: '🤝', description: 'Both organisms benefit' },
    { id: 'commensalism', name: 'Commensalism', color: '#3b82f6', icon: '➕', description: 'One benefits, other unaffected' },
    { id: 'parasitism', name: 'Parasitism', color: '#a855f7', icon: '🦟', description: 'One benefits, other harmed' },
  ];

  const handleAddAnimal = (animal: AnimalSummary) => {
    const ecosystemId = `${animal.id}-${Date.now()}`;
    const newAnimal: EcosystemAnimal = {
      ...animal,
      ecosystemId,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
    };
    setEcosystemAnimals([...ecosystemAnimals, newAnimal]);
  };

  const handleRemoveAnimal = (ecosystemId: string) => {
    setEcosystemAnimals(ecosystemAnimals.filter(a => a.ecosystemId !== ecosystemId));
    setRelationships(relationships.filter(r => r.from !== ecosystemId && r.to !== ecosystemId));
    if (selectedAnimal === ecosystemId) {
      setSelectedAnimal(null);
    }
  };

  const handleRemoveRelationship = (relationshipId: string) => {
    setRelationships(relationships.filter(r => r.id !== relationshipId));
  };

  const handleAnimalClick = (ecosystemId: string) => {
    if (relationshipMode && selectedAnimal !== null && selectedAnimal !== ecosystemId) {
      const newRelationship: Relationship = {
        id: `${selectedAnimal}-${ecosystemId}-${Date.now()}`,
        from: selectedAnimal,
        to: ecosystemId,
        type: relationshipMode as any,
      };
      setRelationships([...relationships, newRelationship]);
      setSelectedAnimal(null);
      setRelationshipMode(null);
    } else if (relationshipMode) {
      setSelectedAnimal(ecosystemId);
    } else {
      setSelectedAnimal(selectedAnimal === ecosystemId ? null : ecosystemId);
    }
  };

  const handleDragAnimal = (ecosystemId: string, e: React.MouseEvent<HTMLDivElement>) => {
    // Don't start dragging if clicking on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    e.preventDefault();
    setDraggingAnimal(ecosystemId); // Set dragging state
    
    const canvas = e.currentTarget.parentElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      
      setEcosystemAnimals(prev =>
        prev.map(animal =>
          animal.ecosystemId === ecosystemId
            ? { ...animal, x: Math.max(5, Math.min(90, x)), y: Math.max(5, Math.min(90, y)) }
            : animal
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setDraggingAnimal(null); // Clear dragging state
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getDietEmoji = (diet?: string) => {
    if (!diet) return '🍽️';
    const lowerDiet = diet.toLowerCase();
    if (lowerDiet.includes('carnivore')) return '🥩';
    if (lowerDiet.includes('herbivore')) return '🌿';
    if (lowerDiet.includes('omnivore')) return '🍎';
    return '🍽️';
  };

  const currentHabitat = habitats.find(h => h.id === selectedHabitat);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading ecosystem data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Ecosystem Builder
          </h1>
          <p className="text-gray-600">
            Build interactive food webs and explore ecological relationships
          </p>
        </div>

        {/* Habitat Selector Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Select Habitat</h3>
          <div className="flex gap-3 flex-wrap">
            {habitats.map(habitat => (
              <button
                key={habitat.id}
                onClick={() => setSelectedHabitat(habitat.id)}
                className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg transition-all ${
                  selectedHabitat === habitat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-medium">{habitat.name}</div>
                <div className="text-xs opacity-75 mt-0.5">{habitat.climate}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Animals | Canvas | Relationships */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Add Animals */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-3">Add Animals</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {animals.map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => handleAddAnimal(animal)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <img 
                      src={animal.image_urls[0]} 
                      alt={animal.name} 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0" 
                    />
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{animal.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span>{getDietEmoji(animal.diet)}</span>
                        <span className="truncate">{animal.diet || 'Unknown'}</span>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Ecosystem Canvas */}
          <div className="lg:col-span-6">
            <div className={`bg-gradient-to-br ${currentHabitat ? getHabitatGradient(currentHabitat.name) : 'from-gray-100 to-gray-200'} rounded-xl shadow-lg p-8 min-h-[600px] relative border-2 border-gray-200 overflow-hidden`}>
              {/* Habitat Info */}
              {currentHabitat && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm max-w-xs">
                  <h3 className="font-semibold text-gray-900">{currentHabitat.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{currentHabitat.description}</p>
                </div>
              )}

              {/* Stats Bar */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Animals:</span>
                    <span className="font-semibold text-gray-900 ml-1">{ecosystemAnimals.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Relationships:</span>
                    <span className="font-semibold text-gray-900 ml-1">{relationships.length}</span>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {ecosystemAnimals.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Start Building Your Ecosystem
                    </h3>
                    <p className="text-gray-500">
                      Add animals from the left sidebar
                    </p>
                  </div>
                </div>
              )}

              {/* Relationship Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  {/* Arrow markers for different relationship types */}
                  <marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
                  </marker>
                  <marker id="arrowhead-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#f97316" />
                  </marker>
                  <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
                  </marker>
                  <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                  </marker>
                  <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
                  </marker>
                </defs>
                
                {/* Render all lines first */}
                {relationships.map(rel => {
                  const fromAnimal = ecosystemAnimals.find(a => a.ecosystemId === rel.from);
                  const toAnimal = ecosystemAnimals.find(a => a.ecosystemId === rel.to);
                  if (!fromAnimal || !toAnimal) return null;
                  
                  const relType = relationshipTypes.find(t => t.id === rel.type);
                  
                  const getLinePattern = () => {
                    switch(rel.type) {
                      case 'predator-prey':
                        return { strokeDasharray: '0', strokeWidth: '4', marker: 'url(#arrowhead-red)' };
                      case 'competition':
                        return { strokeDasharray: '10,5', strokeWidth: '3', marker: '' };
                      case 'mutualism':
                        return { strokeDasharray: '0', strokeWidth: '4', marker: 'url(#arrowhead-green)' };
                      case 'commensalism':
                        return { strokeDasharray: '15,5,5,5', strokeWidth: '3', marker: 'url(#arrowhead-blue)' };
                      case 'parasitism':
                        return { strokeDasharray: '5,5', strokeWidth: '3', marker: 'url(#arrowhead-purple)' };
                      default:
                        return { strokeDasharray: '5,5', strokeWidth: '3', marker: '' };
                    }
                  };
                  
                  const pattern = getLinePattern();
                  
                  return (
                    <g key={`line-${rel.id}`}>
                      {/* Main line */}
                      <line
                        x1={`${fromAnimal.x + 5}%`}
                        y1={`${fromAnimal.y + 5}%`}
                        x2={`${toAnimal.x + 5}%`}
                        y2={`${toAnimal.y + 5}%`}
                        stroke={relType?.color}
                        strokeWidth={pattern.strokeWidth}
                        strokeDasharray={pattern.strokeDasharray}
                        markerEnd={pattern.marker}
                        opacity="0.8"
                      />
                      
                      {/* Competition: Add opposing arrows */}
                      {rel.type === 'competition' && (
                        <line
                          x1={`${fromAnimal.x + 5}%`}
                          y1={`${fromAnimal.y + 5}%`}
                          x2={`${toAnimal.x + 5}%`}
                          y2={`${toAnimal.y + 5}%`}
                          stroke={relType?.color}
                          strokeWidth="3"
                          strokeDasharray="10,5"
                          markerStart="url(#arrowhead-orange)"
                          opacity="0.8"
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Render all icons on top */}
                {relationships.map(rel => {
                  const fromAnimal = ecosystemAnimals.find(a => a.ecosystemId === rel.from);
                  const toAnimal = ecosystemAnimals.find(a => a.ecosystemId === rel.to);
                  if (!fromAnimal || !toAnimal) return null;
                  
                  const relType = relationshipTypes.find(t => t.id === rel.type);
                  const midX = (fromAnimal.x + toAnimal.x) / 2 + 5;
                  const midY = (fromAnimal.y + toAnimal.y) / 2 + 5;
                  
                  return (
                    <g key={`icon-${rel.id}`}>
                      <foreignObject
                        x={`${midX}%`}
                        y={`${midY}%`}
                        width="1"
                        height="1"
                        style={{ overflow: 'visible', pointerEvents: 'auto' }}
                      >
                        <div style={{ 
                          transform: 'translate(-50%, -50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div className="relative group">
                            <div 
                              className="bg-white rounded-full shadow-md px-2.5 py-1 border-2 whitespace-nowrap"
                              style={{ borderColor: relType?.color, fontSize: '16px' }}
                            >
                              {relType?.icon}
                            </div>
                            {/* Delete button - shows on hover */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveRelationship(rel.id);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                              style={{ pointerEvents: 'auto' }}
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

              {/* Ecosystem Animals */}
              {ecosystemAnimals.map(animal => (
                <div
                  key={animal.ecosystemId}
                  className={`absolute cursor-move ${
                    draggingAnimal === animal.ecosystemId ? '' : 'transition-all'
                  } ${
                    selectedAnimal === animal.ecosystemId ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                  }`}
                  style={{ left: `${animal.x}%`, top: `${animal.y}%` }}
                  onMouseDown={(e) => handleDragAnimal(animal.ecosystemId, e)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnimalClick(animal.ecosystemId);
                  }}
                >
                  <div className={`relative ${
                    selectedAnimal === animal.ecosystemId 
                      ? relationshipMode 
                        ? 'ring-4 ring-purple-500 rounded-full'
                        : 'ring-4 ring-blue-500 rounded-full'
                      : ''
                  }`}>
                    <img
                      src={animal.image_urls[0]}
                      alt={animal.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAnimal(animal.ecosystemId);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-center mt-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <div className="text-xs font-medium text-gray-900 whitespace-nowrap">{animal.name}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI Helper Button */}
            <button
              onClick={() => setShowAIHelper(!showAIHelper)}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              AI Ecosystem Helper
            </button>

            {/* AI Helper Panel */}
            {showAIHelper && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">AI Ecosystem Helper - Chain of Thought</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      I'll use step-by-step reasoning to predict ecological changes in your ecosystem.
                    </p>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg transition-colors text-sm border border-purple-200">
                        💡 What would happen if I removed a top predator?
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg transition-colors text-sm border border-purple-200">
                        🔍 Analyze the energy flow in this food web
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg transition-colors text-sm border border-purple-200">
                        🎯 Show me the Yellowstone wolf case study
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Relationships */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 top-4">
              <h3 className="font-semibold text-gray-900 mb-3">Add Relationships</h3>
              <div className="space-y-2">
                {relationshipTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setRelationshipMode(relationshipMode === type.id ? null : type.id);
                      setSelectedAnimal(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      relationshipMode === type.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span className="text-sm font-medium">{type.name}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-0.5 ml-6">{type.description}</div>
                  </button>
                ))}
              </div>
              {relationshipMode && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-xs font-medium text-purple-900 mb-1">
                    Creating {relationshipTypes.find(t => t.id === relationshipMode)?.name}
                  </div>
                  <div className="text-xs text-purple-700">
                    {selectedAnimal 
                      ? '2. Click the second animal on the canvas'
                      : '1. Click the first animal on the canvas'
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemBuilder;