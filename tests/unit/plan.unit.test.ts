import {
  calcMealMacros,
  calcPlanConsumedMacros,
  getCurrentTimeSlot,
  getMealRecommendedMacros,
  getUserPortionPreference,
  isMealEmpty,
} from 'src/store/plan/helpers';

describe('Plan Helpers', () => {
  describe('getCurrentTimeSlot function', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return 00:00-06:00 for early morning hours (0-5)', () => {
      const localDate = new Date(2024, 0, 1, 2, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();

      expect(result).toBe('00:00-06:00');
    });

    it('should return 06:00-09:00 for morning hours (6-8)', () => {
      const localDate = new Date(2024, 0, 1, 7, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();

      expect(result).toBe('06:00-09:00');
    });

    it('should return 09:00-12:00 for late morning hours (9-11)', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('09:00-12:00');
    });

    it('should return 12:00-15:00 for afternoon hours (12-14)', () => {
      const localDate = new Date(2024, 0, 1, 13, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('12:00-15:00');
    });

    it('should return 15:00-18:00 for late afternoon hours (15-17)', () => {
      const localDate = new Date(2024, 0, 1, 16, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('15:00-18:00');
    });

    it('should return 18:00-21:00 for evening hours (18-19)', () => {
      const localDate = new Date(2024, 0, 1, 19, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('18:00-21:00');
    });

    it('should return 21:00-24:00 for night hours (21-23)', () => {
      const localDate = new Date(2024, 0, 1, 22, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('21:00-24:00');
    });

    it('should handle edge cases at slot boundaries', () => {
      const localDate6AM = new Date(2024, 0, 1, 6, 0, 0);
      vi.setSystemTime(localDate6AM);
      let result = getCurrentTimeSlot();
      expect(result).toBe('06:00-09:00');

      const localDate9AM = new Date(2024, 0, 1, 9, 0, 0);
      vi.setSystemTime(localDate9AM);
      result = getCurrentTimeSlot();
      expect(result).toBe('09:00-12:00');
    });

    it('should handle midnight (0:00) correctly', () => {
      const localDate = new Date(2024, 0, 1, 0, 0, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('00:00-06:00');
    });

    it('should handle 11:59 PM correctly', () => {
      const localDate = new Date(2024, 0, 1, 23, 59, 0);
      vi.setSystemTime(localDate);

      const result = getCurrentTimeSlot();
      expect(result).toBe('21:00-24:00');
    });
  });

  describe('getMealRecommendedMacros', () => {
    it('should calculate correct macros per meal when both meals and snacks are present', () => {
      const mockPlan = {
        mealsCount: 3,
        snacksCount: 2,
        targetMacros: { cal: 2000, carb: 200, pro: 180, fat: 70 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 3 + 2 = 5
      expect(result).toEqual({
        cal: 400, // 2000 / 5
        carb: 40, // 200 / 5
        pro: 36, // 180 / 5
        fat: 14, // 70 / 5
      });
    });

    it('should handle only meals without snacks', () => {
      const mockPlan = {
        mealsCount: 3,
        snacksCount: 0,
        targetMacros: { cal: 1500, carb: 150, pro: 120, fat: 60 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 3 + 0 = 3
      expect(result).toEqual({
        cal: 500, // 1500 / 3
        carb: 50, // 150 / 3
        pro: 40, // 120 / 3
        fat: 20, // 60 / 3
      });
    });

    it('should handle only snacks without meals', () => {
      const mockPlan = {
        mealsCount: 0,
        snacksCount: 4,
        targetMacros: { cal: 800, carb: 80, pro: 60, fat: 30 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 0 + 4 = 4
      expect(result).toEqual({
        cal: 200, // 800 / 4
        carb: 20, // 80 / 4
        pro: 15, // 60 / 4
        fat: 8, // 30 / 4
      });
    });

    it('should return zeros when total meals count is 0', () => {
      const mockPlan = {
        mealsCount: 0,
        snacksCount: 0,
        targetMacros: { cal: 2000, carb: 200, pro: 180, fat: 70 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      expect(result).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('should round macro values correctly', () => {
      const mockPlan = {
        mealsCount: 3,
        snacksCount: 0,
        targetMacros: { cal: 1000, carb: 100, pro: 80, fat: 35 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 3 + 0 = 3
      // 1000/3 = 333.33... -> rounds to 333
      // 100/3 = 33.33... -> rounds to 33
      // 80/3 = 26.66... -> rounds to 27
      // 35/3 = 11.66... -> rounds to 12
      expect(result).toEqual({
        cal: 333,
        carb: 33,
        pro: 27,
        fat: 12,
      });
    });

    it('should handle missing or undefined meal counts', () => {
      const mockPlan = {
        mealsCount: undefined,
        snacksCount: 2,
        targetMacros: { cal: 1000, carb: 100, pro: 80, fat: 35 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // undefined + 2 = NaN, which is falsy, so should return zeros
      expect(result).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('should handle edge case with single meal', () => {
      const mockPlan = {
        mealsCount: 1,
        snacksCount: 0,
        targetMacros: { cal: 2000, carb: 200, pro: 180, fat: 70 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 1 + 0 = 1
      expect(result).toEqual({
        cal: 2000, // 2000 / 1
        carb: 200, // 200 / 1
        pro: 180, // 180 / 1
        fat: 70, // 70 / 1
      });
    });

    it('should handle large numbers correctly', () => {
      const mockPlan = {
        mealsCount: 6,
        snacksCount: 4,
        targetMacros: { cal: 5000, carb: 500, pro: 400, fat: 200 },
      };

      const result = getMealRecommendedMacros(mockPlan);

      // Total meals = 6 + 4 = 10
      expect(result).toEqual({
        cal: 500, // 5000 / 10
        carb: 50, // 500 / 10
        pro: 40, // 400 / 10
        fat: 20, // 200 / 10
      });
    });
  });

  describe('calcMealMacros', () => {
    it('should calculate macros correctly for a meal with multiple ingredients', () => {
      const mockMeal = {
        ingredients: {
          carb: [
            { macros: { cal: 200, carb: 50, pro: 5, fat: 2 } },
            { macros: { cal: 150, carb: 35, pro: 3, fat: 1 } },
          ],
          pro: [{ macros: { cal: 300, carb: 0, pro: 60, fat: 5 } }],
          fat: [{ macros: { cal: 180, carb: 2, pro: 2, fat: 18 } }],
          free: [{ macros: { cal: 50, carb: 10, pro: 2, fat: 0 } }],
          custom: [],
        },
      } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 880, // 200 + 150 + 300 + 180 + 50
        carb: 97, // 50 + 35 + 0 + 2 + 10
        pro: 72, // 5 + 3 + 60 + 2 + 2
        fat: 26, // 2 + 1 + 5 + 18 + 0
      });
    });

    it('should handle empty ingredients arrays', () => {
      const mockMeal = {
        ingredients: {
          carb: [],
          pro: [],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('should handle ingredients with missing or undefined macros', () => {
      const mockMeal = {
        ingredients: {
          carb: [
            {
              macros: { cal: 100, carb: 20, pro: 5, fat: 1 },
            },
            {
              macros: undefined,
            },
            {
              macros: null,
            },
          ],
          pro: [
            {
              macros: { cal: undefined, carb: null, pro: 30, fat: 3 },
            },
          ],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 100, // Only first ingredient contributes
        carb: 20,
        pro: 35, // 5 + 30
        fat: 4, // 1 + 3
      });
    });

    it('should handle ingredients with zero macro values', () => {
      const mockMeal = {
        ingredients: {
          carb: [
            {
              macros: { cal: 0, carb: 0, pro: 0, fat: 0 },
            },
            {
              macros: { cal: 100, carb: 20, pro: 5, fat: 1 },
            },
          ],
          pro: [],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 100,
        carb: 20,
        pro: 5,
        fat: 1,
      });
    });

    it('should handle missing ingredients property', () => {
      const mockMeal = { ingredients: undefined } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('should handle custom macro type ingredients', () => {
      const mockMeal = {
        ingredients: {
          carb: [],
          pro: [],
          fat: [],
          free: [],
          custom: [
            {
              macros: { cal: 250, carb: 15, pro: 8, fat: 12 },
            },
            {
              macros: { cal: 75, carb: 5, pro: 2, fat: 3 },
            },
          ],
        },
      } as any;

      const result = calcMealMacros(mockMeal);

      expect(result).toEqual({
        cal: 325,
        carb: 20,
        pro: 10,
        fat: 15,
      });
    });
  });

  describe('calcPlanConsumedMacros', () => {
    it('should calculate total macros correctly for multiple meals', () => {
      const mockMeals = [
        { macros: { cal: 500, carb: 60, pro: 25, fat: 15 } },
        { macros: { cal: 300, carb: 40, pro: 20, fat: 10 } },
        { macros: { cal: 400, carb: 50, pro: 30, fat: 12 } },
      ] as any[];

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 1200, // 500 + 300 + 400
        carb: 150, // 60 + 40 + 50
        pro: 75, // 25 + 20 + 30
        fat: 37, // 15 + 10 + 12
      });
    });

    it('should handle empty meals array', () => {
      const mockMeals: any[] = [];

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('should handle meals with missing or undefined macros', () => {
      const mockMeals = [
        {
          macros: { cal: 300, carb: 40, pro: 20, fat: 10 },
        },
        {
          macros: undefined,
        },
        {
          macros: null,
        },
        {
          macros: { cal: 200, carb: 25, pro: 15, fat: 8 },
        },
      ] as any;

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 500, // 300 + 0 + 0 + 200
        carb: 65, // 40 + 0 + 0 + 25
        pro: 35, // 20 + 0 + 0 + 15
        fat: 18, // 10 + 0 + 0 + 8
      });
    });

    it('should handle meals with partial macro data', () => {
      const mockMeals = [
        {
          macros: { cal: undefined, carb: 30, pro: 15, fat: null },
        },
        {
          macros: { cal: 250, carb: null, pro: undefined, fat: 12 },
        },
        {
          macros: { cal: 180, carb: 20, pro: 10, fat: 6 },
        },
      ] as any;

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 430, // 0 + 250 + 180
        carb: 50, // 30 + 0 + 20
        pro: 25, // 15 + 0 + 10
        fat: 18, // 0 + 12 + 6
      });
    });

    it('should handle single meal', () => {
      const mockMeals = [
        {
          macros: { cal: 600, carb: 75, pro: 40, fat: 20 },
        },
      ] as any;

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 600,
        carb: 75,
        pro: 40,
        fat: 20,
      });
    });

    it('should handle meals with zero macro values', () => {
      const mockMeals = [
        {
          macros: { cal: 0, carb: 0, pro: 0, fat: 0 },
        },
        {
          macros: { cal: 300, carb: 40, pro: 20, fat: 10 },
        },
        {
          macros: { cal: 0, carb: 0, pro: 0, fat: 0 },
        },
      ] as any;

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 300,
        carb: 40,
        pro: 20,
        fat: 10,
      });
    });

    it('should handle large numbers correctly', () => {
      const mockMeals = [
        {
          macros: { cal: 2500, carb: 300, pro: 150, fat: 80 },
        },
        {
          macros: { cal: 1800, carb: 200, pro: 120, fat: 60 },
        },
        {
          macros: { cal: 3200, carb: 400, pro: 180, fat: 100 },
        },
        {
          macros: { cal: 1500, carb: 150, pro: 100, fat: 50 },
        },
      ] as any;

      const result = calcPlanConsumedMacros(mockMeals);

      expect(result).toEqual({
        cal: 9000, // 2500 + 1800 + 3200 + 1500
        carb: 1050, // 300 + 200 + 400 + 150
        pro: 550, // 150 + 120 + 180 + 100
        fat: 290, // 80 + 60 + 100 + 50
      });
    });
  });

  describe('getUserPortionPreference', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return portion size when user has preference for specific ingredient', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0); // 10 AM - '09:00-12:00'
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '09:00-12:00': {
            carb: {
              'ingredient-123': { portionSize: 2.5 },
            },
          },
        },
      } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(2.5);
    });

    it('should return null when user has no preferences', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const mockUser = {} as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });

    it('should return null when user has no meal preferences', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const mockUser = { mealPreferences: null } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });

    it('should return null when user has no preference for current time slot', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0); // 10 AM
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '12:00-15:00': { // Different time slot
            carb: {
              'ingredient-123': { portionSize: 2.5 },
            },
          },
        },
      } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });

    it('should return null when user has no preference for specific macro type', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '09:00-12:00': {
            pro: { // Different macro type
              'ingredient-123': { portionSize: 2.5 },
            },
          },
        },
      } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });

    it('should return null when user has no preference for specific ingredient', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '09:00-12:00': {
            carb: {
              'different-ingredient': { portionSize: 2.5 },
            },
          },
        },
      } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });

    it('should handle multiple macro types and ingredients', () => {
      const localDate = new Date(2024, 0, 1, 16, 0, 0); // 4 PM - '15:00-18:00'
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '15:00-18:00': {
            carb: {
              'rice-123': { portionSize: 1.5 },
              'bread-456': { portionSize: 2.0 },
            },
            pro: {
              'chicken-789': { portionSize: 3.0 },
            },
            fat: {
              'olive-oil-101': { portionSize: 0.5 },
            },
          },
        },
      } as any;

      expect(getUserPortionPreference('rice-123', 'carb', mockUser)).toBe(1.5);
      expect(getUserPortionPreference('bread-456', 'carb', mockUser)).toBe(2.0);
      expect(getUserPortionPreference('chicken-789', 'pro', mockUser)).toBe(3.0);
      expect(getUserPortionPreference('olive-oil-101', 'fat', mockUser)).toBe(0.5);
    });

    it('should return null when portion size is undefined', () => {
      const localDate = new Date(2024, 0, 1, 10, 0, 0);
      vi.setSystemTime(localDate);

      const mockUser = {
        mealPreferences: {
          '09:00-12:00': {
            carb: {
              'ingredient-123': { portionSize: undefined },
            },
          },
        },
      } as any;

      const result = getUserPortionPreference('ingredient-123', 'carb', mockUser);

      expect(result).toBe(null);
    });
  });

  describe('isMealEmpty', () => {
    it('should return true when all ingredient arrays are empty', () => {
      const mockMeal = {
        ingredients: {
          carb: [],
          pro: [],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(true);
    });

    it('should return false when any ingredient array has items', () => {
      const mockMeal = {
        ingredients: {
          carb: [{ id: 'ingredient-1' }],
          pro: [],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(false);
    });

    it('should return false when multiple ingredient arrays have items', () => {
      const mockMeal = {
        ingredients: {
          carb: [{ id: 'ingredient-1' }],
          pro: [{ id: 'ingredient-2' }],
          fat: [],
          free: [{ id: 'ingredient-3' }],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(false);
    });

    it('should return false when only custom ingredients have items', () => {
      const mockMeal = {
        ingredients: {
          carb: [],
          pro: [],
          fat: [],
          free: [],
          custom: [{ id: 'custom-ingredient' }],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(false);
    });

    it('should return false when only free ingredients have items', () => {
      const mockMeal = {
        ingredients: {
          carb: [],
          pro: [],
          fat: [],
          free: [{ id: 'free-ingredient' }],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(false);
    });

    it('should handle missing ingredients property', () => {
      const mockMeal = { ingredients: undefined } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(true);
    });

    it('should handle ingredients with null values', () => {
      const mockMeal = {
        ingredients: {
          carb: null,
          pro: undefined,
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(true);
    });

    it('should return false when ingredients contain null/undefined items but array has length', () => {
      const mockMeal = {
        ingredients: {
          carb: [null, undefined],
          pro: [],
          fat: [],
          free: [],
          custom: [],
        },
      } as any;

      const result = isMealEmpty(mockMeal);

      expect(result).toBe(false); // Array has length, even with null/undefined items
    });
  });
});
