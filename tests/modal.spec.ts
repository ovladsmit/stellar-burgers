import {test, expect} from "@playwright/test";
import ingredients from './mock-data/ingredients.json';

test('открытие модального окна ингредиента', async ({page}) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredients)
    });
  });

  await page.goto('/');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
    .click();
  
  const modal = page.getByTestId('modal');

  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Краторная булка N-200i');
});

test('закрытие модального окна ингредиента по крестику', async ({ page }) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredients)
    });
  });

  await page.goto('/');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
    .click();

  const modal = page.getByTestId('modal');

  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Краторная булка N-200i');

  await page.getByTestId('modal-close').click();

  await expect(modal).not.toBeVisible();
});
