// frontend/src/types/index.ts

export interface Animal {
  id: number;
  name: string;
  scientific_name: string;
  common_names: string[];
  conservation_status: ConservationStatus;
  description: string;
  fun_facts: string[];
  diet: string;
  lifespan: string;
  image_urls: string[];
  video_urls: string[];
  audio_urls: string[];
  classification?: Record<string, string>;
  size_info?: Record<string, string>;
}

export interface AnimalSummary {
  id: number;
  name: string;
  scientific_name: string;
  conservation_status: ConservationStatus;
  image_urls: string[];
}

export interface Habitat {
  id: number;
  name: string;
  description: string;
  climate: string;
  geography: string;
  key_characteristics: string[];
  image_url?: string;
}

export interface ConservationEffort {
  id: number;
  title: string;
  description: string;
  organization_name: string;
  website_url: string;
  location: string;
  conservation_problem: string;
  current_status: string;
  petition_url?: string;
  volunteer_url?: string;
  donation_url?: string;
}

export type ConservationStatus = 
  | 'LEAST_CONCERN'
  | 'NEAR_THREATENED'
  | 'VULNERABLE'
  | 'ENDANGERED'
  | 'CRITICALLY_ENDANGERED'
  | 'EXTINCT_WILD'
  | 'EXTINCT';

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: UserRole;
  school?: string;
  grade_level?: string;
  location?: string;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProgress {
  animals_discovered: number;
  habitats_explored: number;
  interactions_created: number;
  conservation_actions_taken: number;
  ms_ls2_2_activities: number;
  ms_ls2_5_activities: number;
  badges_earned: string[];
}