'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, BookOpen, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Animal, ConservationStatus } from '@/types';
import { getConservationColor, formatConservationStatus } from '@/lib/utils';

type PromptMode = 'role' | 'few-shot' | null;

export default function AnimalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiMode, setAiMode] = useState<PromptMode>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/animals/${params.id}`);
        if (!response.ok) throw new Error('Animal not found');
        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAnimal();
    }
  }, [params.id]);

  const promptTemplates = {
    role: {
      title: 'Role Assignment',
      icon: <Brain className="w-4 h-4" />,
      description: 'Ask AI to take on an expert role',
      example: animal ? `You are a wildlife biologist specializing in ${animal.name}. Explain their hunting strategies in detail.` : ''
    },
    'few-shot': {
      title: 'Few-Shot Learning',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Give AI examples, then ask for similar info',
      example: animal ? `Here are examples of adaptations:\n- Polar bears have thick fur for insulation\n- Camels store water in humps\n\nNow explain how ${animal.name} adapts to its environment.` : ''
    }
  };

  const simulateAIResponse = () => {
    // Placeholder - integrate real AI API here later
    setAiResponse(`This is a simulated AI response about ${animal?.name}. In production, this would call an actual AI API with your prompt.`);
    setShowVerification(false);
  };

  const verifyResponse = () => {
    setShowVerification(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading animal details...</div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Animal not found</div>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Animals
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{animal.name}</h1>
                  <p className="text-lg md:text-xl text-gray-600 italic">{animal.scientific_name}</p>
                </div>
                <Badge className={getConservationColor(animal.conservation_status)}>
                  {formatConservationStatus(animal.conservation_status)}
                </Badge>
              </div>

              {/* Main Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <img
                  src={animal.image_urls[0] || '/api/placeholder/400/300'}
                  alt={`${animal.name} - view 1`}
                  className="w-full h-64 md:h-80 object-cover rounded-xl"
                />
                {animal.image_urls[1] && (
                  <img
                    src={animal.image_urls[1]}
                    alt={`${animal.name} - view 2`}
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{animal.description}</p>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-600">Diet:</span>
                    <p className="font-semibold">{animal.diet}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Lifespan:</span>
                    <p className="font-semibold">{animal.lifespan}</p>
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Fun Facts</h3>
                <ul className="space-y-3">
                  {animal.fun_facts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                      <span className="text-gray-700 flex-1">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Research Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg lg:sticky lg:top-8">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold">AI Research Assistant</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">AI Literacy Goal</p>
                    <p className="text-yellow-700">Practice prompt engineering techniques</p>
                  </div>
                </div>
              </div>

              {/* Technique Selection */}
              {!aiMode && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-3">Choose a prompt technique:</p>
                  {Object.entries(promptTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setAiMode(key as PromptMode)}
                      className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {template.icon}
                        <span className="font-medium text-sm">{template.title}</span>
                      </div>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Prompt Interface */}
              {aiMode && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Example:</p>
                    <p className="text-xs text-gray-600 italic whitespace-pre-line">
                      {promptTemplates[aiMode].example}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your prompt:
                    </label>
                    <textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Type your prompt here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={simulateAIResponse}
                    disabled={!userPrompt.trim()}
                    className="w-full"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Ask AI Assistant
                  </Button>

                  {aiResponse && (
                    <>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">AI Response:</h4>
                        <p className="text-sm text-purple-800 mb-3">{aiResponse}</p>
                        <div className="flex items-center text-xs text-purple-600">
                          <Zap className="w-3 h-3 mr-1" />
                          Energy used: ~0.01 kWh
                        </div>
                      </div>

                      {!showVerification && (
                        <Button 
                          onClick={verifyResponse}
                          variant="outline"
                          className="w-full"
                        >
                          Verify Against Database Facts
                        </Button>
                      )}

                      {showVerification && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Fact Check:</h4>
                          <p className="text-sm text-green-800 mb-2">
                            Compare the AI response with verified facts from our database.
                          </p>
                          <ul className="text-xs text-green-700 space-y-1">
                            {animal.fun_facts.slice(0, 2).map((fact, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">✓</span>
                                <span>{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAiMode(null);
                      setUserPrompt('');
                      setAiResponse('');
                      setShowVerification(false);
                    }}
                    className="w-full"
                  >
                    Try Different Technique
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}