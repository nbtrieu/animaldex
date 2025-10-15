'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Award, TrendingUp, AlertCircle, Lightbulb, CheckCircle, ExternalLink, Users, Target, Brain, Loader } from 'lucide-react';
import { ConservationEffort, Solution } from '@/types';

export default function ConservationActionCenter() {
  const [conservationEfforts, setConservationEfforts] = useState<ConservationEffort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEffort, setSelectedEffort] = useState<ConservationEffort | null>(null);
  const [activeTab, setActiveTab] = useState<'cases' | 'local'>('cases');
  const [selectedSolutions, setSelectedSolutions] = useState<number[]>([]);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  useEffect(() => {
    fetchConservationEfforts();
  }, []);

  const fetchConservationEfforts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/conservation-efforts');
      if (!response.ok) throw new Error('Failed to fetch conservation efforts');
      const data = await response.json();
      setConservationEfforts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching conservation efforts:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateSolutions = (effort: ConservationEffort): Solution[] => {
    if (effort.title.includes('Reef')) {
      return [
        {
          id: 1,
          name: "Marine Protected Areas Expansion",
          approach: "Conservation",
          effectiveness: 7,
          cost: "High",
          timeframe: "Long-term",
          pros: ["Protects biodiversity", "Natural resilience", "Tourism benefits"],
          cons: ["Expensive monitoring", "Fishing restrictions", "Slow recovery"]
        },
        {
          id: 2,
          name: "Coral Restoration & Replanting",
          approach: "Active Restoration",
          effectiveness: 8,
          cost: "Medium",
          timeframe: "Medium-term",
          pros: ["Direct impact", "Community involvement", "Research opportunities"],
          cons: ["Labor intensive", "Limited scale", "Survival uncertainty"]
        },
        {
          id: 3,
          name: "Climate Action & Emissions Reduction",
          approach: "Systemic Change",
          effectiveness: 9,
          cost: "Very High",
          timeframe: "Long-term",
          pros: ["Addresses root cause", "Global benefits", "Multiple ecosystems"],
          cons: ["Political challenges", "Delayed results", "International cooperation needed"]
        }
      ];
    } else if (effort.title.includes('Wolf')) {
      return [
        {
          id: 1,
          name: "Apex Predator Reintroduction",
          approach: "Ecosystem Restoration",
          effectiveness: 9,
          cost: "Medium",
          timeframe: "Medium-term",
          pros: ["Restores natural balance", "Reduces overgrazing", "Trophic cascade benefits"],
          cons: ["Livestock conflicts", "Public opposition", "Requires monitoring"]
        },
        {
          id: 2,
          name: "Community Education Programs",
          approach: "Social Change",
          effectiveness: 7,
          cost: "Low",
          timeframe: "Long-term",
          pros: ["Builds support", "Reduces conflicts", "Sustainable"],
          cons: ["Slow results", "Ongoing effort needed", "Variable success"]
        },
        {
          id: 3,
          name: "Livestock Guardian Programs",
          approach: "Conflict Mitigation",
          effectiveness: 8,
          cost: "Medium",
          timeframe: "Short-term",
          pros: ["Protects livestock", "Reduces wolf killings", "Proven effective"],
          cons: ["Ongoing costs", "Training needed", "Not addressing all conflicts"]
        }
      ];
    }
    return [
      {
        id: 1,
        name: "Habitat Protection",
        approach: "Conservation",
        effectiveness: 8,
        cost: "Medium",
        timeframe: "Long-term",
        pros: ["Preserves ecosystems", "Multiple species benefit", "Sustainable"],
        cons: ["Land use conflicts", "Enforcement needed", "Political challenges"]
      },
      {
        id: 2,
        name: "Community Engagement",
        approach: "Social Change",
        effectiveness: 7,
        cost: "Low",
        timeframe: "Medium-term",
        pros: ["Local ownership", "Cultural respect", "Economic benefits"],
        cons: ["Time intensive", "Variable success", "Training required"]
      }
    ];
  };

  const userActions = {
    petitionsSigned: 7,
    organizationsConnected: 3,
    casesExplored: 12,
    solutionsCompared: 24
  };

  const localOrganizations = [
    {
      name: "Irvine Ranch Conservancy",
      focus: "Habitat Restoration",
      distance: "2.3 miles",
      website: "https://irvineopenspace.org"
    },
    {
      name: "Sea & Sage Audubon",
      focus: "Bird Conservation",
      distance: "4.1 miles",
      website: "https://www.seaandsageaudubon.org"
    },
    {
      name: "Orange County Coastkeeper",
      focus: "Marine Protection",
      distance: "8.7 miles",
      website: "https://www.coastkeeper.org"
    }
  ];

  const toggleSolutionSelection = (solutionId: number) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId) 
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const getStatusColor = (status: string): string => {
    if (status?.toLowerCase().includes('success')) {
      return 'text-green-600 bg-green-50';
    } else if (status?.toLowerCase().includes('active')) {
      return 'text-blue-600 bg-blue-50';
    } else if (status?.toLowerCase().includes('critical')) {
      return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const AIAnalysisPanel = ({ effort }: { effort: ConservationEffort }) => {
    const getAIPrompt = () => {
      if (effort.title.includes('Reef')) {
        return "Generate solutions for protecting coral reefs from bleaching";
      } else if (effort.title.includes('Wolf')) {
        return "What are effective ways to restore ecosystem balance after removing apex predators?";
      }
      return `How can we address ${effort.conservation_problem}?`;
    };

    const getAIResponse = () => {
      if (effort.title.includes('Reef')) {
        return "To protect coral reefs from bleaching, we should: 1) Create more marine protected areas, 2) Restore damaged reefs through coral replanting, 3) Reduce carbon emissions globally.";
      } else if (effort.title.includes('Wolf')) {
        return "To restore ecosystem balance: 1) Reintroduce apex predators like wolves, 2) Educate local communities about benefits, 3) Implement livestock protection programs.";
      }
      return "Focus on habitat protection, community engagement, and policy enforcement.";
    };

    return (
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mt-6">
        <div className="flex items-start gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Literacy: Reverse Prompting Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Let&apos;s analyze how this AI-generated solution was created and identify potential biases.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Original AI Prompt:</p>
            <p className="text-sm text-gray-600 italic">&quot;{getAIPrompt()}&quot;</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">AI Response:</p>
            <p className="text-sm text-gray-600">{getAIResponse()}</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Critical Analysis Questions:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">What perspectives might be missing?</p>
                  <p className="text-xs text-gray-600 mt-1">Consider: Indigenous voices, local communities, economic impacts, historical context</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">What assumptions does the AI make?</p>
                  <p className="text-xs text-gray-600 mt-1">Look for: Western-centric solutions, technology focus, cost considerations</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">How could this prompt be improved?</p>
                  <p className="text-xs text-gray-600 mt-1">Consider adding: local context, stakeholder perspectives, resource constraints</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">What&apos;s the environmental cost of this AI query?</p>
                  <p className="text-xs text-gray-600 mt-1">AI models use energy - was this query necessary? Could we consult experts instead?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">💡 Improved Prompt Example:</p>
            <p className="text-sm text-gray-700 italic">&quot;What conservation solutions for {effort.title.toLowerCase()} prioritize local community involvement, consider economic sustainability, and respect indigenous knowledge? Include both immediate and long-term strategies with specific examples from similar successful projects.&quot;</p>
          </div>

          {effort.title.includes('Wolf') && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">🎯 Real-World Chain of Thought Example</p>
              <p className="text-sm text-gray-700 mb-2">The Yellowstone wolf reintroduction demonstrates ecological chain reactions:</p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Wolves hunt elk → Elk populations decrease</li>
                <li>Fewer elk → Less overgrazing on willows and aspen</li>
                <li>Vegetation recovers → Riverbanks stabilize</li>
                <li>Stable banks → Beaver habitat improves</li>
                <li>Beaver dams → More wetlands created</li>
                <li>Wetlands → Biodiversity increases across ecosystem</li>
              </ol>
              <p className="text-xs text-gray-600 mt-2 italic">This is a trophic cascade - use AI to predict similar chain reactions in other ecosystems!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading conservation efforts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Error Loading Data</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button 
            onClick={fetchConservationEfforts}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Conservation Action Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore real conservation challenges, compare solutions, and take action to protect wildlife and ecosystems
          </p>

          {/* Action Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm font-semibold text-gray-700">Petitions Signed</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{userActions.petitionsSigned}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-semibold text-gray-700">Organizations</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{userActions.organizationsConnected}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <p className="text-sm font-semibold text-gray-700">Cases Explored</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{userActions.casesExplored}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                <p className="text-sm font-semibold text-gray-700">Solutions Compared</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{userActions.solutionsCompared}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 font-semibold transition-colors relative ${
              activeTab === 'cases' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Conservation Efforts
            {activeTab === 'cases' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`px-4 py-2 font-semibold transition-colors relative ${
              activeTab === 'local' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Local Organizations
            {activeTab === 'local' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></span>
            )}
          </button>
        </div>

        {/* Conservation Efforts Tab */}
        {activeTab === 'cases' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Effort List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Conservation Efforts</h2>
              {conservationEfforts.map((effort) => (
                <div
                  key={effort.id}
                  onClick={() => {
                    setSelectedEffort(effort);
                    setSelectedSolutions([]);
                    setShowAIAnalysis(false);
                  }}
                  className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedEffort?.id === effort.id ? 'border-green-500 shadow-md' : 'border-gray-200'
                  }`}
                >
                  {effort.image_url && (
                    <img src={effort.image_url} alt={effort.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{effort.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getStatusColor(effort.current_status)}`}>
                        {effort.current_status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {effort.location}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-2">{effort.description}</p>
                    {effort.conservation_problem && (
                      <div className="flex items-start gap-2 text-sm text-gray-600 bg-red-50 rounded p-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                        <span>{effort.conservation_problem}</span>
                      </div>
                    )}
                    {effort.organization_name && (
                      <p className="text-xs text-gray-500 mt-2">
                        By: {effort.organization_name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Effort Detail & Solutions */}
            <div>
              {selectedEffort ? (
                <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEffort.title}</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Compare different approaches to addressing this conservation challenge.
                  </p>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200">
                    {selectedEffort.website_url && (
                      <a
                        href={selectedEffort.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-sm"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {selectedEffort.volunteer_url && (
                      <a
                        href={selectedEffort.volunteer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
                      >
                        Volunteer
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {selectedEffort.donation_url && (
                      <a
                        href={selectedEffort.donation_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors text-sm"
                      >
                        Donate
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {selectedEffort.petition_url && (
                      <a
                        href={selectedEffort.petition_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition-colors text-sm"
                      >
                        Sign Petition
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4">Solution Approaches</h3>
                  <div className="space-y-3 mb-6">
                    {generateSolutions(selectedEffort).map((solution) => (
                      <div
                        key={solution.id}
                        onClick={() => toggleSolutionSelection(solution.id)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedSolutions.includes(solution.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{solution.name}</h4>
                          {selectedSolutions.includes(solution.id) && (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">
                            {solution.approach}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                            {solution.timeframe}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Effectiveness: {solution.effectiveness}/10</span>
                          <span>•</span>
                          <span>Cost: {solution.cost}</span>
                        </div>
                        
                        {selectedSolutions.includes(solution.id) && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-green-700 mb-2">Pros</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {solution.pros.map((pro, idx) => (
                                    <li key={idx}>• {pro}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-red-700 mb-2">Cons</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {solution.cons.map((con, idx) => (
                                    <li key={idx}>• {con}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* AI Analysis Button */}
                  <button
                    onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                    className="w-full bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    {showAIAnalysis ? 'Hide' : 'Analyze'} AI-Generated Solutions
                  </button>

                  {showAIAnalysis && <AIAnalysisPanel effort={selectedEffort} />}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center sticky top-24">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Select a conservation effort to explore solutions</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Local Organizations Tab */}
        {activeTab === 'local' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Wildlife Organizations Near You</h2>
            <p className="text-gray-600 mb-8">Connect with organizations in Irvine, California working to protect local wildlife and habitats.</p>
            
            <div className="space-y-4">
              {localOrganizations.map((org, idx) => (
                <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-green-500 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{org.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{org.focus}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {org.distance} away
                      </div>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                      Connect & Track
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">🌍 Why Local Action Matters</h3>
              <p className="text-sm text-gray-600 mb-3">
                While global conservation issues are important, local organizations need volunteers and support. Your nearby actions create real, measurable impact in your community&apos;s ecosystems.
              </p>
              <p className="text-sm text-gray-600">
                Track your connections to see your growing conservation network and the collective impact you&apos;re part of!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}