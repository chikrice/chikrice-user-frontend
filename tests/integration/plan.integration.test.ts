import { updateIngredientInMeal } from 'src/store/plan/helpers';

describe('Plan Integration tests', () => {
  describe('updateIngredientInMeal', () => {
    const mockIngredient = {
      ingredientId: 'ingredient-1',
      name: 'Chicken Breast',
      icon: 'chicken-icon',
      macroType: 'pro' as const,
      serving: {
        weightInGrams: 100,
        breakpoint: 1,
        singleLabel: 'piece',
        multipleLabel: 'pieces',
        nutrientFacts: { cal: 165, carb: 0, pro: 31, fat: 3.6 },
      },
      isAiGenerated: false,
      portion: {
        qty: 1,
        label: 'piece',
        weightInGrams: 100,
      },
      macros: {
        cal: 165,
        carb: 0,
        pro: 31,
        fat: 3.6,
      },
    } as any;

    const mockPlan = {
      id: 'plan-1',
      number: 1,
      date: '2024-01-01',
      name: 'Day 1 Plan',
      mealsCount: 3,
      snacksCount: 2,
      targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
      consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
      meals: [
        {
          id: 'meal-1',
          name: 'Breakfast',
          timeSlot: '06:00-09:00',
          macros: { cal: 0, carb: 0, pro: 0, fat: 0 },
          ingredients: {
            carb: [],
            pro: [mockIngredient],
            fat: [],
            free: [],
            custom: [],
          },
        },
        {
          id: 'meal-2',
          name: 'Lunch',
          timeSlot: '12:00-15:00',
          macros: { cal: 0, carb: 0, pro: 0, fat: 0 },
          ingredients: {
            carb: [],
            pro: [],
            fat: [],
            free: [],
            custom: [],
          },
        },
      ],
    } as any;

    it('Should increment ingredient quantity and recalculate macros', () => {
      const result = updateIngredientInMeal(mockPlan, 0, mockIngredient, 1);

      // Verify ingredient quantity was incremented
      const updatedIngredient = result.meals[0].ingredients.pro[0];
      expect(updatedIngredient.portion.qty).toBe(2);
      expect(updatedIngredient.portion.label).toBe('pieces');
      expect(updatedIngredient.portion.weightInGrams).toBe(200);

      // Verify ingredient macros were recalculated
      expect(updatedIngredient.macros).toEqual({
        cal: 330, // 165 * 2
        carb: 0,
        pro: 62, // 31 * 2
        fat: 7.2, // 3.6 * 2
      });

      // Verify meal macros were recalculated
      expect(result.meals[0].macros).toEqual({
        cal: 330,
        carb: 0,
        pro: 62,
        fat: 7.2,
      });

      // Verify plan consumed macros were recalculated
      expect(result.consumedMacros).toEqual({
        cal: 330,
        carb: 0,
        pro: 62,
        fat: 7.2,
      });
    });

    it('Should decrement ingredient quantity and recalculate macros', () => {
      // First increment to have quantity > 1
      const planWithMoreIngredient = updateIngredientInMeal(mockPlan, 0, mockIngredient, 2);

      // Then decrement
      const result = updateIngredientInMeal(planWithMoreIngredient, 0, mockIngredient, -1);

      // Verify ingredient quantity was decremented
      const updatedIngredient = result.meals[0].ingredients.pro[0];
      expect(updatedIngredient.portion.qty).toBe(2);
      expect(updatedIngredient.portion.label).toBe('pieces');

      // Verify ingredient macros were recalculated
      expect(updatedIngredient.macros).toEqual({
        cal: 330, // 165 * 2
        carb: 0,
        pro: 62, // 31 * 2
        fat: 7.2, // 3.6 * 2
      });

      // Verify meal macros were recalculated
      expect(result.meals[0].macros).toEqual({
        cal: 330,
        carb: 0,
        pro: 62,
        fat: 7.2,
      });

      // Verify plan consumed macros were recalculated
      expect(result.consumedMacros).toEqual({
        cal: 330,
        carb: 0,
        pro: 62,
        fat: 7.2,
      });
    });

    it('Should remove ingredient when quantity reaches 0', () => {
      const result = updateIngredientInMeal(mockPlan, 0, mockIngredient, -1);

      // Verify ingredient was removed from the meal
      expect(result.meals[0].ingredients.pro).toHaveLength(0);

      // Verify meal macros were recalculated to 0
      expect(result.meals[0].macros).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });

      // Verify plan consumed macros were recalculated to 0
      expect(result.consumedMacros).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('Should handle negative quantity changes that would result in negative quantity', () => {
      const result = updateIngredientInMeal(mockPlan, 0, mockIngredient, -5);

      // Verify ingredient was removed (quantity can't go below 0)
      expect(result.meals[0].ingredients.pro).toHaveLength(0);

      // Verify meal macros were recalculated to 0
      expect(result.meals[0].macros).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });

      // Verify plan consumed macros were recalculated to 0
      expect(result.consumedMacros).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });
    });

    it('Should handle multiple ingredients in the same meal', () => {
      const secondIngredient = {
        ...mockIngredient,
        ingredientId: 'ingredient-2',
        name: 'Salmon',
        macros: { cal: 200, carb: 0, pro: 25, fat: 12 },
        serving: {
          ...mockIngredient.serving,
          nutrientFacts: { cal: 200, carb: 0, pro: 25, fat: 12 },
        },
      } as any;

      // Add second ingredient to the meal
      const planWithTwoIngredients = {
        ...mockPlan,
        meals: [
          {
            ...mockPlan.meals[0],
            ingredients: {
              ...mockPlan.meals[0].ingredients,
              pro: [mockIngredient, secondIngredient],
            },
          },
          ...mockPlan.meals.slice(1),
        ],
      };

      // Update first ingredient
      const result = updateIngredientInMeal(planWithTwoIngredients, 0, mockIngredient, 1);

      // Verify first ingredient was updated
      const firstIngredient = result.meals[0].ingredients.pro[0];
      expect(firstIngredient.portion.qty).toBe(2);
      expect(firstIngredient.macros.cal).toBe(330);

      // Verify second ingredient was not affected
      const secondIngredientResult = result.meals[0].ingredients.pro[1];
      expect(secondIngredientResult.portion.qty).toBe(1);
      expect(secondIngredientResult.macros.cal).toBe(200);

      // Verify meal macros include both ingredients
      expect(result.meals[0].macros).toEqual({
        cal: 530, // 330 + 200
        carb: 0,
        pro: 87, // 62 + 25
        fat: 19.2, // 7.2 + 12
      });

      // Verify plan consumed macros include both ingredients
      expect(result.consumedMacros).toEqual({
        cal: 530,
        carb: 0,
        pro: 87,
        fat: 19.2,
      });
    });

    it('Should handle ingredients in different macro types', () => {
      const carbIngredient = {
        ...mockIngredient,
        ingredientId: 'ingredient-carb',
        name: 'Rice',
        macroType: 'carb' as const,
        macros: { cal: 130, carb: 28, pro: 2.7, fat: 0.3 },
        serving: {
          ...mockIngredient.serving,
          nutrientFacts: { cal: 130, carb: 28, pro: 2.7, fat: 0.3 },
        },
      } as any;

      const planWithCarbIngredient = {
        ...mockPlan,
        meals: [
          {
            ...mockPlan.meals[0],
            ingredients: {
              ...mockPlan.meals[0].ingredients,
              carb: [carbIngredient],
            },
          },
          ...mockPlan.meals.slice(1),
        ],
      };

      // Update carb ingredient
      const result = updateIngredientInMeal(planWithCarbIngredient, 0, carbIngredient, 1);

      // Verify carb ingredient was updated
      const updatedCarbIngredient = result.meals[0].ingredients.carb[0];
      expect(updatedCarbIngredient.portion.qty).toBe(2);
      expect(updatedCarbIngredient.macros.cal).toBe(260);

      // Verify pro ingredient was not affected
      const proIngredient = result.meals[0].ingredients.pro[0];
      expect(proIngredient.portion.qty).toBe(1);
      expect(proIngredient.macros.cal).toBe(165);

      // Verify meal macros include both macro types
      expect(result.meals[0].macros).toEqual({
        cal: 425, // 165 + 260
        carb: 56, // 28 * 2
        pro: 36.4, // 31 + 5.4 (2.7 * 2)
        fat: 4.2, // 3.6 + 0.6 (0.3 * 2)
      });
    });

    it('Should not modify the original plan object', () => {
      const result = updateIngredientInMeal(mockPlan, 0, mockIngredient, 1);

      // Verify original plan was not modified
      expect(mockPlan.meals[0].ingredients.pro[0].portion.qty).toBe(1);
      expect(mockPlan.meals[0].macros.cal).toBe(0);
      expect(mockPlan.consumedMacros.cal).toBe(0);

      // Verify result is a new object
      expect(result).not.toBe(mockPlan);
      expect(result.meals[0]).not.toBe(mockPlan.meals[0]);
      expect(result.meals[0].ingredients.pro[0]).not.toBe(mockPlan.meals[0].ingredients.pro[0]);
    });

    it('Should handle meal with no ingredients gracefully', () => {
      const emptyMealPlan = {
        ...mockPlan,
        meals: [
          {
            ...mockPlan.meals[1], // Use the empty meal
            ingredients: {
              carb: [],
              pro: [],
              fat: [],
              free: [],
              custom: [],
            },
          },
        ],
      };

      // The function should handle the case where the ingredient doesn't exist
      // and return the plan unchanged without throwing an error
      const result = updateIngredientInMeal(emptyMealPlan, 0, mockIngredient, 1);

      // Verify the meal remains unchanged
      expect(result.meals[0].ingredients.pro).toHaveLength(0);
      expect(result.meals[0].macros).toEqual({
        cal: 0,
        carb: 0,
        pro: 0,
        fat: 0,
      });

      // Verify the plan is returned unchanged
      expect(result).toEqual(emptyMealPlan);
    });
  });
});
