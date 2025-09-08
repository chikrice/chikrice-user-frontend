import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { userInputsInitialState } from 'src/sections/steps/user/user-inputs';

import { createTestStore } from '../config/vitest.setup';

const store = createTestStore();

describe('Roadmap Integration tests', () => {
  let mockGetRoadmap: any;
  let mockGetPlans: any;
  let mockCreatePlans: any;
  let mockInitializePlan: any;

  const mockUserInputs = {
    userId: 'test-user-id',
    age: 25,
    height: 170,
    startWeight: 80,
    currentWeight: 75,
    gender: 'male' as const,
    activityLevel: 3 as const,
    isWeightLifting: true,
    targetWeight: 70,
    goalAchievementSpeed: 'recommended' as const,
  };

  beforeEach(() => {
    localStorage.clear();

    store.setState({
      roadmap: null,
      plans: [],
      totalDays: 30,
      roadmapLoading: false,
      roadmapError: null,
    });

    mockGetRoadmap = vi.fn();
    mockGetPlans = vi.fn();
    mockCreatePlans = vi.fn().mockResolvedValue([]);
    mockInitializePlan = vi.fn().mockResolvedValue(undefined);

    store.getState().getRoadmap = mockGetRoadmap;
    store.getState().getPlans = mockGetPlans;
    store.getState().createPlans = mockCreatePlans;
    store.getState().initializePlan = mockInitializePlan;
  });

  describe('createUserJourney', () => {
    it('Should creates a roadmap, plans, and initialize them in the store successfuly', async () => {
      setStorage('accessToken', {
        token: 'valid-access-token',
        expires: '2026-12-31T23:00:00',
      });

      setStorage('user-inputs', mockUserInputs);

      await store.getState().createUserJourney(mockUserInputs);
      const roadmap = store.getState().roadmap;
      expect(roadmap).toEqual({
        id: 'new-roadmap-123',
        userId: 'test-user-id',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null,
          },
        ],
        onGoingMonth: 1,
      });

      expect(mockCreatePlans).toBeCalledWith(roadmap, 1);
      expect(getStorage('user-inputs')).toEqual(userInputsInitialState);
      expect(mockInitializePlan).toBeCalledWith([]);
    });

    it('Should return 401 error when access token is missing', async () => {
      // Don't set any access token
      await store.getState().createUserJourney(mockUserInputs);

      const roadmapError = store.getState().roadmapError;
      expect(roadmapError).toBe('Invalid credentials');
    });
  });

  describe('loadUserJourney', () => {
    it('Should successfully load user journey when milestone has existing plans', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: ['plan-1', 'plan-2'], // Existing plans
          },
        ],
        onGoingMonth: 1,
      };

      const mockPlans = [
        {
          id: 'plan-1',
          number: 1,
          date: '2024-01-01',
          targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
          consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
          meals: [],
        },
      ];

      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockGetPlans.mockResolvedValue(mockPlans);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockGetPlans).toHaveBeenCalledWith({
        roadmapId: 'roadmap-123',
        milestoneId: 'milestone-1',
      });

      expect(mockInitializePlan).toHaveBeenCalledWith(mockPlans);

      expect(mockCreatePlans).not.toHaveBeenCalled();
    });

    it('Should create new plans when milestone has no existing plans', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null, // No existing plans
          },
        ],
        onGoingMonth: 1,
      };

      const mockCreatedPlans = [
        {
          id: 'plan-1',
          number: 1,
          date: '2024-01-01',
          targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
          consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
          meals: [],
        },
      ];

      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockCreatePlans.mockResolvedValue(mockCreatedPlans);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockCreatePlans).toHaveBeenCalledWith(mockRoadmap, 1);

      expect(mockGetPlans).not.toHaveBeenCalled();

      expect(mockInitializePlan).toHaveBeenCalledWith(mockCreatedPlans);
    });

    it('Should handle roadmap not found error', async () => {
      const error = new Error('Roadmap not found');
      mockGetRoadmap.mockRejectedValue(error);

      await store.getState().loadUserJourney('non-existent-roadmap');

      expect(mockGetRoadmap).toHaveBeenCalledWith('non-existent-roadmap');

      expect(mockCreatePlans).not.toHaveBeenCalled();
      expect(mockGetPlans).not.toHaveBeenCalled();
      expect(mockInitializePlan).not.toHaveBeenCalled();
    });

    it('Should handle network error during roadmap loading', async () => {
      const error = new Error('Network error');
      mockGetRoadmap.mockRejectedValue(error);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockCreatePlans).not.toHaveBeenCalled();
      expect(mockGetPlans).not.toHaveBeenCalled();
      expect(mockInitializePlan).not.toHaveBeenCalled();
      expect(store.getState().roadmapError).toBe('Network error');
    });

    it('Should handle error when creating plans fails', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null,
          },
        ],
        onGoingMonth: 1,
      };

      const error = new Error('Failed to create plans');
      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockCreatePlans.mockRejectedValue(error);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockCreatePlans).toHaveBeenCalledWith(mockRoadmap, 1);

      expect(mockGetPlans).not.toHaveBeenCalled();

      expect(mockInitializePlan).not.toHaveBeenCalled();

      expect(store.getState().roadmapError).toBe('Failed to create plans');
    });

    it('Should handle error when fetching existing plans fails', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: ['plan-1', 'plan-2'],
          },
        ],
        onGoingMonth: 1,
      };

      const error = new Error('Failed to fetch plans');
      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockGetPlans.mockRejectedValue(error);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockGetPlans).toHaveBeenCalledWith({
        roadmapId: 'roadmap-123',
        milestoneId: 'milestone-1',
      });

      expect(mockCreatePlans).not.toHaveBeenCalled();

      expect(mockInitializePlan).not.toHaveBeenCalled();

      expect(store.getState().roadmapError).toBe('Failed to fetch plans');
    });

    it('Should call functions in correct sequence during successful load', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null,
          },
        ],
        onGoingMonth: 1,
      };

      const mockPlans = [
        {
          id: 'plan-1',
          number: 1,
          date: '2024-01-01',
          targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
          consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
          meals: [],
        },
      ];

      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockCreatePlans.mockResolvedValue(mockPlans);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');
      expect(mockCreatePlans).toHaveBeenCalledWith(mockRoadmap, 1);
      expect(mockInitializePlan).toHaveBeenCalledWith(mockPlans);

      expect(mockGetPlans).not.toHaveBeenCalled();
    });

    it('Should handle roadmap with multiple milestones and load correct milestone', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null,
          },
          {
            id: 'milestone-2',
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            macrosRatio: { protein: 35, carbs: 35, fat: 30 },
            targetCalories: 1800,
            plans: ['plan-3', 'plan-4'],
          },
        ],
        onGoingMonth: 2,
      };

      const mockPlans = [
        {
          id: 'plan-3',
          number: 1,
          date: '2024-02-01',
          targetMacros: { cal: 1800, protein: 158, carbs: 158, fat: 60 },
          consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
          meals: [],
        },
      ];

      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockGetPlans.mockResolvedValue(mockPlans);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockGetPlans).toHaveBeenCalledWith({
        roadmapId: 'roadmap-123',
        milestoneId: 'milestone-2',
      });

      expect(mockInitializePlan).toHaveBeenCalledWith(mockPlans);

      expect(mockCreatePlans).not.toHaveBeenCalled();
    });

    it('Should create plans for milestone 2 when it has no existing plans', async () => {
      const mockRoadmap = {
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: ['plan-1', 'plan-2'],
          },
          {
            id: 'milestone-2',
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            macrosRatio: { protein: 35, carbs: 35, fat: 30 },
            targetCalories: 1800,
            plans: null, // No existing plans for milestone 2
          },
        ],
        onGoingMonth: 2,
      };

      const mockCreatedPlans = [
        {
          id: 'plan-3',
          number: 1,
          date: '2024-02-01',
          targetMacros: { cal: 1800, protein: 158, carbs: 158, fat: 60 },
          consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
          meals: [],
        },
      ];

      mockGetRoadmap.mockResolvedValue(mockRoadmap);
      mockCreatePlans.mockResolvedValue(mockCreatedPlans);

      await store.getState().loadUserJourney('roadmap-123');

      expect(mockGetRoadmap).toHaveBeenCalledWith('roadmap-123');

      expect(mockCreatePlans).toHaveBeenCalledWith(mockRoadmap, 2);

      expect(mockGetPlans).not.toHaveBeenCalled();

      expect(mockInitializePlan).toHaveBeenCalledWith(mockCreatedPlans);
    });
  });
});
