import type { UserInputs } from 'src/types';

export const areUserInputsValid = (inputs: UserInputs): boolean => {
  if (!inputs) return false;

  const age = inputs.age;
  const startWeight = inputs.startWeight;
  const height = inputs.height;
  const activityLevel = inputs.activityLevel;
  const gender = inputs.gender;
  const targetWeight = inputs.targetWeight;
  const goalAchievementSpeed = inputs.goalAchievementSpeed;

  return Boolean(
    age && startWeight && height && activityLevel && gender && targetWeight && goalAchievementSpeed
  );
};
