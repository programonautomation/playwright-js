import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginHelper';

/**
 * Estos tests fueron generados con el comando: npx playwright codegen https://opensource-demo.orangehrmlive.com
 * esto abre una "grabadora de tc"
 * dentro de la grabadora podremos replicar los pasos requeridos.
 * Luego ese código puede limpiarse y mejorarse manualmente.
 */
test('test grabado con codegen', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
});


test('ejemplo de test codegen sin limpiar', async ({ page }) => {
 await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Quick Launch$/ }).first().click();

});