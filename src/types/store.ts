import type { MacrosRatio, PlanReference, RoadmapType, UserClient } from 'chikrice-types';

// ============================================
// AUTH TYPES
// ============================================
export interface Credentials {
  email: string;
  password: string;
}

export interface UserInputs {
  age: number;
  height: number;
  startWeight: number;
  currentWeight: number;
  gender: 'male' | 'female';
  activityLevel: 1 | 2 | 3 | 4 | 5;
  isWeightLifting: boolean;
  targetWeight: number;
  goalAchievementSpeed: 'slow' | 'recommended' | 'fast';
}

export interface GoogleCredentials {
  role: 'user';
  authAuthorization: string;
  userInputs: UserInputs;
}

export interface Tokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface AuthState {
  user: UserClient;
  tokens: Tokens | null;
  authError: unknown | null;
  isAuthLoading: boolean;
  isFirstLogin: boolean;
  method: 'jwt';
  authenticated: boolean;
}

export interface AuthActions {
  bootstrap: () => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: Credentials, userInputs: UserInputs) => Promise<void>;
  googleAuth: (googleCredentials: GoogleCredentials) => Promise<UserClient>;
  refreshTokens: () => Promise<Tokens>;
  refreshUserInfo: (id: string) => Promise<void>;
}

// ============================================
// PLAN TYPES
// ============================================

export interface PlanState {
  roadmap: RoadmapType | object;
  plans: PlanReference[] | [];
  todayPlan: PlanReference | object;
  totalDays: number;
  roadmapLoading: boolean;
  roadmapError: unknown | null;
}

export interface CreateRoadmapInputs extends UserInputs {
  userId: string;
}

export interface GetPlansParams {
  roadmapId: string;
  milestoneId: string;
}

export interface CreatePlansData {
  roadmapId: string;
  milestoneId: string;
  startDate: Date;
  endDate: Date;
  macrosRatio: MacrosRatio;
  targetCalories: number;
}

export interface PlanActions {
  createUserJourney: (userInputs: CreateRoadmapInputs) => Promise<void>;
  loadUserJourney: (roadmapId: string) => Promise<void>;
  createRoadmap: (createRoadmapInputs: CreateRoadmapInputs) => Promise<RoadmapType>;
  getRoadmap: (roadmapId: string) => Promise<RoadmapType>;
  createPlans: (roadmap: RoadmapType, month: number) => Promise<PlanReference[]>;
  getPlans: (params: GetPlansParams) => Promise<PlanReference[]>;
  setTodayPlan: (plans: PlanReference[]) => void;
  transformRoadmapToPlanData: (roadmap: RoadmapType, month: number) => CreatePlansData;
}

// ============================================
// STORE TYPE
// ============================================
export interface StoreState extends AuthState, PlanState {}
export interface StoreActions extends AuthActions, PlanActions {}
export type Store = StoreState & StoreActions;
