import type { Meal } from 'chikrice-types';

export const meal: Meal = {
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
};

export const recommendedMeals: Meal[] = [
  {
    macros: {
      cal: 511,
      carb: 56.400000000000006,
      pro: 30.700000000000003,
      fat: 11.9,
    },
    mode: 'view',
    type: 'meal',
    _id: '68cadfbf87b05e002284c682',
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
          _id: '68cadfbf87b05e002284c683',
          ingredientId: '66d6af604f7ec45d29a500b8',
          macroType: 'carb',
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
          _id: '68cadfbf87b05e002284c685',
          ingredientId: '66d6acde385fe8536e6e6c7e',
          macroType: 'pro',
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
          _id: '68cadfbf87b05e002284c684',
          ingredientId: '66d6aeea4f7ec45d29a500b5',
          macroType: 'pro',
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
        },
      ],
      fat: [],
      custom: [],
      free: [],
    },
    number: 1,
    recommendedMacros: {
      cal: 469,
      carb: 53,
      pro: 41,
      fat: 10,
    },
  },
  {
    macros: {
      cal: 632,
      carb: 38.4,
      pro: 44,
      fat: 37,
    },
    mode: 'view',
    type: 'meal',
    _id: '68cbb36f87b05e002284c68a',
    number: 1,
    recommendedMacros: {
      cal: 469,
      carb: 53,
      pro: 41,
      fat: 10,
    },
    ingredients: {
      carb: [
        {
          name: {
            en: 'Protein Bread',
            ar: 'خبز البروتين',
            fa: 'نان پروتئینی',
          },
          icon: '🍞',
          isAiGenerated: false,
          macros: {
            cal: 200,
            carb: 28,
            pro: 16,
            fat: 2,
          },
          _id: '68cbb36f87b05e002284c68b',
          ingredientId: '670a8f67d87352bda6b577f7',
          macroType: 'carb',
          serving: {
            weightInGrams: 28,
            breakpoint: 0.5,
            singleLabel: {
              en: 'slice',
              ar: 'شريحة',
              fa: 'برش',
            },
            multipleLabel: {
              en: 'slices',
              ar: 'شرائح',
              fa: 'برش‌ها',
            },
            nutrientFacts: {
              carb: 14,
              pro: 8,
              fat: 1,
              cal: 100,
            },
          },
          portion: {
            qty: 2,
            label: {
              en: 'slices',
              ar: 'شرائح',
              fa: 'برش‌ها',
            },
            weightInGrams: 56,
          },
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
            cal: 272,
            carb: 2.4,
            pro: 26,
            fat: 20,
          },
          _id: '68cbb36f87b05e002284c68c',
          ingredientId: '66d6acde385fe8536e6e6c7e',
          macroType: 'pro',
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
            qty: 4,
            label: {
              en: 'medium eggs',
              ar: 'بیضات متوسطات',
              fa: 'تخم مرغ',
            },
            weightInGrams: 200,
          },
        },
      ],
      fat: [],
      free: [],
      custom: [
        {
          name: {
            en: 'avocado',
            ar: 'أفوكادو',
            fa: 'آووکادو',
          },
          icon: '🥑',
          isAiGenerated: false,
          macros: {
            cal: 160,
            carb: 8,
            pro: 2,
            fat: 15,
          },
          _id: '68cbb36f87b05e002284c68d',
          ingredientId: '68cbb36887b05e002284c689',
          macroType: 'custom',
          serving: {
            weightInGrams: 100,
            breakpoint: 0.5,
            singleLabel: {
              en: 'half',
              ar: 'نصف',
              fa: 'نیمه',
            },
            multipleLabel: {
              en: 'halves',
              ar: 'أنصاف',
              fa: 'نیمه‌ها',
            },
            nutrientFacts: {
              cal: 160,
              pro: 2,
              carb: 8,
              fat: 15,
            },
          },
          portion: {
            qty: 1,
            label: {
              en: 'half',
              ar: 'نصف',
              fa: 'نیمه',
            },
            weightInGrams: 100,
          },
        },
      ],
    },
  },
  {
    macros: {
      cal: 522,
      carb: 61,
      pro: 31.3,
      fat: 10.5,
    },
    mode: 'view',
    type: 'meal',
    _id: '68cbb3aa87b05e002284c68e',
    number: 1,
    recommendedMacros: {
      cal: 469,
      carb: 53,
      pro: 41,
      fat: 10,
    },
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
          _id: '68cbb3aa87b05e002284c68f',
          ingredientId: '66d6af604f7ec45d29a500b8',
          macroType: 'carb',
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
        },
      ],
      pro: [
        {
          name: {
            en: 'Whey Protein',
            ar: 'بروتين Whey',
            fa: 'پروتين Whey',
          },
          icon: '🧋',
          isAiGenerated: false,
          macros: {
            cal: 120,
            carb: 3,
            pro: 24,
            fat: 1,
          },
          _id: '68cbb3aa87b05e002284c690',
          ingredientId: '66db1c52d596a4e0a406305f',
          macroType: 'pro',
          serving: {
            weightInGrams: 30,
            breakpoint: 0.5,
            singleLabel: {
              en: 'scoop',
              ar: 'اسكوب',
              fa: 'اسكوپ',
            },
            multipleLabel: {
              en: 'scoops',
              ar: 'اسكوبات',
              fa: 'اسكوپ',
            },
            nutrientFacts: {
              carb: 3,
              pro: 24,
              fat: 1,
              cal: 120,
            },
          },
          portion: {
            qty: 1,
            label: {
              en: 'scoop',
              ar: 'اسكوب',
              fa: 'اسكوپ',
            },
            weightInGrams: 30,
          },
        },
      ],
      fat: [
        {
          name: {
            en: 'Peanut Butter',
            ar: 'زبدة الفول السوداني',
            fa: 'کره بادام زمینی',
          },
          icon: '🥜',
          isAiGenerated: false,
          macros: {
            cal: 95,
            carb: 4,
            pro: 4,
            fat: 8,
          },
          _id: '68cbb3aa87b05e002284c691',
          ingredientId: '66d6b1724f7ec45d29a500ca',
          macroType: 'fat',
          serving: {
            weightInGrams: 16,
            breakpoint: 0.5,
            singleLabel: {
              en: 'tablespoon',
              ar: 'ملعقة كبيرة',
              fa: 'قاشق غذاخوری',
            },
            multipleLabel: {
              en: 'tablespoons',
              ar: 'ملاعق كبيرة',
              fa: 'قاشق غذاخوری',
            },
            nutrientFacts: {
              carb: 4,
              pro: 4,
              fat: 8,
              cal: 95,
            },
          },
          portion: {
            qty: 1,
            label: {
              en: 'tablespoon',
              ar: 'ملعقة كبيرة',
              fa: 'قاشق غذاخوری',
            },
            weightInGrams: 16,
          },
        },
      ],
      free: [],
      custom: [],
    },
  },
];
