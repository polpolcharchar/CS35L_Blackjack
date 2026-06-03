import { test, expect } from '@playwright/test';
import crypto from 'crypto';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Blackjack/);
});
test('deal then stand 10 times', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Generate a random hex player name
  const playerName = crypto.randomBytes(4).toString('hex');

  await page.locator('#playerNameInput').fill(playerName);
  await page.locator('#pinInput').fill('1234');

  await expect(page.locator('#logInButton')).toBeEnabled();
  await expect(page.locator('#logInButton')).toBeVisible();
  await page.locator('#logInButton').click();

  await expect(page.getByText(`Logged in as ${playerName}`)).toBeVisible();

  for (let i = 0; i < 10; i++) {
    await expect(page.locator('#dealButton')).toBeEnabled();
    await page.click('#dealButton');

    await page.waitForTimeout(100);

    await expect(page.locator('#standButton')).toBeEnabled();
    await page.click('#standButton');

    await page.waitForTimeout(1000);
  }

  await expect(page.getByText('Your 10 hands are up')).toBeVisible();

  // Click search link
  await expect(page.locator('#searchLink')).toBeVisible();
  await page.click('#searchLink');

  // Validate search input exists
  await expect(page.locator('#playerSearchInput')).toBeVisible();

  // Search for the player we created
  await page.locator('#playerSearchInput').fill(playerName);

  await page.waitForTimeout(500);

  // Validate bankroll text appears
  await expect(page.getByText('$100')).toBeVisible();
});