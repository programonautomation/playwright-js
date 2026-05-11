const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const PimPage = require('../../pages/PimPage');
const PimConfigurationPage = require('../../pages/PimConfigurationPage');
const users = require('../../data/users.json');

test.describe('PIM - Configuration Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await dashboardPage.openMenuOption('PIM');
    await pimPage.goToOptionalFields();
  });

  test('Should validate UI elements', async ({ page }) => {
    const pimConfigPage = new PimConfigurationPage(page);
    await pimConfigPage.validatePageTexts();
  });

  test('should display correct elements and texts on PIM Configuration page', async ({ page }) => {
    // Verificaciones para asegurar que estamos en la página correcta
    await expect(page.getByRole('banner')).toContainText('PIM');
    await expect(page.getByRole('banner')).toContainText('Configuration');
    await expect(page.locator('#app')).toContainText('Optional Fields');
    await expect(page.locator('form')).toContainText('Show Deprecated Fields');
    await expect(page.locator('form')).toContainText('Country Specific Information');
    await expect(page.locator('form')).toContainText('Save');
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Configuration');
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Employee List');
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Add Employee');
    await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText('Reports');
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeEmpty();

  });

});