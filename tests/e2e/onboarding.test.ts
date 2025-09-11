import { test, expect, Page } from '@playwright/test';

async function completeOnboardingSteps(page: Page) {
  // Start
  await page.goto('/');
  await page.getByRole('button', { name: 'Start for free' }).first().click();
  await expect(page).toHaveURL('/steps?role=user');

  // Gender
  await page.getByText('female').click();

  // Body details
  await page.getByLabel('Height').fill('165');
  await page.getByLabel('Weight').fill('60');
  await page.getByLabel('Age').fill('25');
  await page.getByRole('button', { name: 'Next' }).click();

  // Activity level
  await page.getByText('Moderately active').click();

  // Weight lifting
  await page.getByText('No').click();

  // Bmi
  await page.getByLabel('Target Weight').fill('58');
  await page.getByRole('button', { name: 'Next' }).click();

  // Speed
  await page.getByText('Recommended').click();
  await expect(page).toHaveURL('/auth/register?role=user');
}

async function registerWithEmail(page: Page) {
  await page.getByRole('button', { name: 'Email' }).click();

  await page.getByLabel('Name').fill('Khaled');
  await page.getByLabel('Email').fill(`playwright-test-${Date.now()}@example.com`);
  await page.getByLabel('Password', { exact: true }).fill('password1');
  await page.getByLabel('Confirm Password', { exact: true }).fill('password1');

  await page.getByRole('button', { name: 'Create An Account' }).click();
  await expect(page).toHaveURL('/progress');
}

async function joyrideTutorial(page: Page) {
  await expect(
    page.getByText(
      "🎉 Congratulations! Your plan is ready! Let's take a quick tour to get you started on your journey."
    )
  ).toBeVisible();

  await page.getByRole('button', { name: 'start' }).click();

  await expect(
    page.getByText(
      'Your goal is divided into smaller milestones, making it easier to achieve and keeping you motivated'
    )
  ).toBeVisible();

  await page.getByRole('button', { name: 'Next (Step 1 of 3)' }).click();

  await expect(
    page.getByText(
      "This is our current target. You don't need to focus on anything else just one step at a time."
    )
  ).toBeVisible();

  await page.getByRole('button', { name: 'Next (Step 2 of 3)' }).click();

  await expect(
    page.getByText(
      'The streak table reinforce your good habits. The longer you maintain your streak, the stronger those habits grow.'
    )
  ).toBeVisible();

  await page.getByRole('button', { name: 'last' }).click();

  await expect(page.getByText('progress')).toHaveCount(2);

  // Verify all static text elements are visible
  await expect(page.getByText('Start Weight')).toHaveCount(2);
  await expect(page.getByText('Target Weight')).toHaveCount(2);
  await expect(page.getByText('Months number')).toBeVisible();
  await expect(page.getByText('Month1')).toBeVisible();
  await expect(page.getByText('Base calories')).toBeVisible();
  await expect(page.getByText('Target calories')).toBeVisible();
  await expect(page.getByText('Calorie deficit/day')).toBeVisible();
  await expect(page.getByText('Streaks')).toBeVisible();
}

test.describe('User Onboarding Flow', () => {
  test('complete user journey from landing to progress', async ({ page }) => {
    await completeOnboardingSteps(page);
    await registerWithEmail(page);
    await joyrideTutorial(page);
  });
});
