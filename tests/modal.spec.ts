import {test, expect} from "@playwright/test";
import ingredients from './mock-data/ingredients.json';

test('открытие модального окна ингредиента', async ({page}) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false
  })

  await page.goto('/');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
    .click();
  
  const modal = page.getByTestId('modal');

  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Краторная булка N-200i');
});

test('закрытие модального окна ингредиента по крестику', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false
  })

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


