import { mockUser } from "./mock-data/user";
import { mockOrder } from "./mock-data/order";
import ingredients from './mock-data/ingredients.json';
import { test, expect } from '@playwright/test';


test('создание заказа', async ({page}) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredients)
    });
  });

  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUser)
    })
  })

  await page.route('**/api/orders', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockOrder)
    });
  });

  await page.context().addCookies([
    {
      name: 'accessToken',
      value: 'test-access-token',
      domain: 'localhost',
      path: '/'
    }
  ])

  await page.addInitScript(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
  });

  await page.goto('/');

  const constructor = page.getByTestId('burger-constructor');

  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
    .getByRole('button', { name: 'Добавить' })
    .click();
  
  await page
    .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
    .getByRole('button', { name: 'Добавить' })
    .click();

  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await expect(page.getByText('12345')).toBeVisible();
  await page.getByTestId('modal-close').click();
  await expect(constructor).toContainText('Выберите булки');
  await expect(constructor).toContainText('Выберите начинку');
})
