import { PlanType } from 'chikrice-types';

export const plan: PlanType = {
  consumedMacros: {
    cal: 511,
    carb: 56.400000000000006,
    pro: 30.700000000000003,
    fat: 11.9,
  },
  number: 15,
  mealsCount: 3,
  snacksCount: 2,
  name: 'Wednesday',
  date: new Date('2025-09-17T00:00:00.000Z'),
  targetMacros: {
    cal: 2345,
    carb: 264,
    pro: 205,
    fat: 52,
  },
  meals: [
    {
      ingredients: {
        carb: [
          {
            name: {
              en: 'Oats',
              ar: 'شوفان',
              fa: 'جو دوسر',
            },
            icon: '🌾',
            isAiGenerated: false,
            macros: {
              cal: 307,
              carb: 54,
              pro: 3.3,
              fat: 1.5,
            },
            serving: {
              weightInGrams: 80,
              breakpoint: 0.25,
              singleLabel: {
                en: 'cup',
                ar: 'كوب',
                fa: 'پیاله',
              },
              multipleLabel: {
                en: 'cups',
                ar: 'أكواب',
                fa: 'پیاله',
              },
              nutrientFacts: {
                carb: 54,
                pro: 3.3,
                fat: 1.5,
                cal: 307,
              },
            },
            portion: {
              qty: 1,
              label: {
                en: 'cup',
                ar: 'كوب',
                fa: 'پیاله',
              },
              weightInGrams: 80,
            },
            ingredientId: '66d6af604f7ec45d29a500b8',
            macroType: 'carb',
            id: '68cadfbf87b05e002284c683',
          },
        ],
        pro: [
          {
            name: {
              en: 'Egg',
              ar: 'بيض',
              fa: 'تخم مرغ',
            },
            icon: '🍳',
            isAiGenerated: false,
            macros: {
              cal: 136,
              carb: 1.2,
              pro: 13,
              fat: 10,
            },
            serving: {
              weightInGrams: 50,
              breakpoint: 1,
              singleLabel: {
                en: 'medium egg',
                ar: 'بيضة متوسطة',
                fa: 'تخم مرغ',
              },
              multipleLabel: {
                en: 'medium eggs',
                ar: 'بیضات متوسطات',
                fa: 'تخم مرغ',
              },
              nutrientFacts: {
                carb: 0.6,
                pro: 6.5,
                fat: 5,
                cal: 68,
              },
            },
            portion: {
              qty: 2,
              label: {
                en: 'medium eggs',
                ar: 'بیضات متوسطات',
                fa: 'تخم مرغ',
              },
              weightInGrams: 100,
            },
            ingredientId: '66d6acde385fe8536e6e6c7e',
            macroType: 'pro',
            id: '68cadfbf87b05e002284c685',
          },
          {
            name: {
              en: 'Egg White',
              ar: 'بياض البيض',
              fa: 'سفیده تخم مرغ',
            },
            icon: '🥚',
            isAiGenerated: false,
            macros: {
              cal: 68,
              carb: 1.2,
              pro: 14.4,
              fat: 0.4,
            },
            serving: {
              weightInGrams: 33,
              breakpoint: 1,
              singleLabel: {
                en: 'egg',
                ar: 'بيضة',
                fa: 'سفیده تخم مرغ',
              },
              multipleLabel: {
                en: 'eggs',
                ar: 'بياضات',
                fa: 'سفیده تخم مرغ',
              },
              nutrientFacts: {
                carb: 0.3,
                pro: 3.6,
                fat: 0.1,
                cal: 17,
              },
            },
            portion: {
              qty: 4,
              label: {
                en: 'eggs',
                ar: 'بياضات',
                fa: 'سفیده تخم مرغ',
              },
              weightInGrams: 132,
            },
            ingredientId: '66d6aeea4f7ec45d29a500b5',
            macroType: 'pro',
            id: '68cadfbf87b05e002284c684',
          },
        ],
        fat: [],
        custom: [],
        free: [],
      },
      macros: {
        cal: 511,
        carb: 56.400000000000006,
        pro: 30.700000000000003,
        fat: 11.9,
      },
      mode: 'view',
      type: 'meal',
      number: 1,
      recommendedMacros: {
        cal: 469,
        carb: 53,
        pro: 41,
        fat: 10,
      },
      id: '68cadfbf87b05e002284c682',
    },
  ],
  id: '68b7ceb22d222f0029ee258e',
};
