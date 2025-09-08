import type {
  IngredientType,
  MacrosRatio,
  Meal,
  MealIngredient,
  PlanReference,
  PlanType,
  RoadmapType,
  UserClient,
} from 'chikrice-types';

// ============================================
// AUTH TYPES
// ============================================
export interface Token {
  token: string;
  expires: string;
}

export interface Tokens {
  access: Token;
  refresh: Token;
}

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
  Authorization: string;
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
  refreshUserInfo: (id: string) => Promise<void>;
  updateUser: (userInputs: Partial<UserClient>) => Promise<void>;
}

// ============================================
// ROADMAP TYPES
// ============================================

export interface RoadmapState {
  roadmap: RoadmapType | null;
  plans: PlanReference[];
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

export interface RoadmapActions {
  createUserJourney: (userInputs: CreateRoadmapInputs) => Promise<void>;
  loadUserJourney: (roadmapId: string) => Promise<void>;
  createRoadmap: (createRoadmapInputs: CreateRoadmapInputs) => Promise<RoadmapType>;
  getRoadmap: (roadmapId: string) => Promise<RoadmapType>;
  createPlans: (roadmap: RoadmapType, month: number) => Promise<PlanReference[]>;
  getPlans: (params: GetPlansParams) => Promise<PlanReference[]>;
  transformRoadmapToPlanData: (roadmap: RoadmapType, month: number) => CreatePlansData;
  updateActivtyLog: (plan: PlanType) => Promise<void>;
}

// ============================================
// PLAN TYPES
// ============================================
export interface PlanState {
  day: number;
  plan: PlanType | null;
  planLoading: boolean;
  planError: unknown | null;
}

export interface PlanActions {
  initializePlan: (plans: PlanReference[]) => Promise<void>;
  updateDay: (day: number) => Promise<void>;
  createMeal: (mealIndex: number) => void;
  getPlan: (planId: string) => Promise<void>;
  updatePlan: (planId: string) => Promise<void>;
  toggleIngredient: (ingrediet: IngredientType, mealIndex: number) => void;
  incrementIngredient: (mealIndex: number, ingredient: MealIngredient) => void;
  decrementIngredient: (mealIndex: number, ingredient: MealIngredient) => void;
  toggleMealMode: (mealIndex: number, mode: 'view' | 'edit') => void;
  updateUserPreferences: (meal: Meal, isPortion: boolean, count: 1 | -1 | 0) => Promise<void>;
}

// ============================================
// STORE TYPE
// ============================================
export interface StoreState extends AuthState, RoadmapState, PlanState {}
export interface StoreActions extends AuthActions, RoadmapActions, PlanActions {}
export type Store = StoreState & StoreActions;
