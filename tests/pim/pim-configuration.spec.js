const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const DashboardPage = require('../../pages/DashboardPage');
const PimPage = require('../../pages/PimPage');
const PimConfigurationPage = require('../../pages/PimConfigurationPage'); 
const users = require('../../data/users.json');
const { OPTIONAL_FIELDS_LABELS, UI } = require('../../constants/pimConstants');

test.describe('PIM - Configuration Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test.afterEach(async ({ page }) => {
    try {
      await page.goto('/web/index.php/pim/viewOptionalFields');      
      const pimConfigPage = new PimConfigurationPage(page);
      await pimConfigPage.toggleMultipleFields(OPTIONAL_FIELDS_LABELS);
      await pimConfigPage.saveConfiguration();
    } catch (error) {
      console.log("El afterEach no pudo resetear el estado.");
    }
  });

  test('Should validate UI elements, navigation and toggle optional fields', async ({ page }) => {
    const pimPage = new PimPage(page);
    const pimConfigPage = new PimConfigurationPage(page);

    await page.goto('/web/index.php/pim/configurePim', { waitUntil: 'domcontentloaded' });
 
    await pimPage.verifyPIMHeader(); 
    await pimPage.verifySaveButtonIsVisible();

    for (const tabName of UI.TABS) {
      await pimPage.navigateToTab(tabName);
    }
    
    await page.goto('/web/index.php/pim/viewOptionalFields', { waitUntil: 'domcontentloaded' });
    await pimConfigPage.validateTitle();

    await pimConfigPage.toggleMultipleFields(OPTIONAL_FIELDS_LABELS);
    await pimConfigPage.saveConfiguration();
  });
});