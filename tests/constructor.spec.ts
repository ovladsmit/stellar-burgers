import {test, expect} from "@playwright/test";
import ingredients from './mock-data/ingredients.json';
test('добавление булки в конструктор', async ({ page }) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredients)
    });
  });

  await page.goto('/');

  const constructor = page.getByTestId('burger-constructor');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
    .getByRole('button', { name: 'Добавить' })
    .click();

  await expect(constructor).toContainText('Краторная булка N-200i');
});

test('добавление начинки в конструктор', async ({ page }) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredients)
    });
  });

  await page.goto('/');

  const constructor = page.getByTestId('burger-constructor');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
    .getByRole('button', { name: 'Добавить' })
    .click();

  await expect(constructor).toContainText(
    'Биокотлета из марсианской Магнолии'
  );
});
