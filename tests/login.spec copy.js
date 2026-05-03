//const { test } = require('@playwright/test');
//const LoginPage = require('../pages/LoginPage');
//const DashboardPage = require('../pages/DashboardPage');
//const users = require('../data/users.json');

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { dashBoardPage } from '../helpers/dashBoardPage';
import { users} from '../data/user.json';

test.describe('Login - OrangeHRM', () => {
  test('Loguin exitoso con usuario valido', async ({ page }) => {
    const loguinPage = new LoginPage(page);
    const dashBoardPage = new DashboardPage(page)

    await loginPage.goToLogin();
    await loginPage.validateDashboardLoaded();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await dashBoardPage.validateDashboardLoaded();
  });
  
  for (const invalidUser of users.invalidUsers) {
    test(`Login invalido con usuario ${invalidUser.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goToLogin();
      await loginPage.validateLoginPageLoaded();
      await loginPage.login(invalidUser.username, invalidUser.password);

      await loginPage.validateErrorMessage(invalidUser.message);
    });
  }
});