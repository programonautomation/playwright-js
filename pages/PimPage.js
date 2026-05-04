const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const { UI } = require('../constants/pimConstants');
const PimConfigurationPage = require('./PimConfigurationPage');

class PimPage extends BasePage {
  constructor(page) {
    super(page);
        
    this.pimTitle = page.locator('h6');
    this.employeeNameLabel = page.getByText('Employee Name', { exact: true });
    this.employeeIdLabel = page.getByText('Employee Id', { exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.configurationDropdown = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Configuration' });
    this.optionalFieldsLk = page.getByRole('menuitem', { name: 'Optional Fields' });    
    this.header = page.locator('.oxd-topbar-header-breadcrumb');
    this.saveButton = page.getByRole('button', { name: UI.SAVE_BUTTON_TEXT });
  }
  
  async verifyPIMHeader() {
    await expect(this.header).toContainText(UI.HEADER);
  }

  async verifySaveButtonIsVisible() {
    await expect(this.saveButton).toBeVisible();
  }

  async navigateToTab(tabName) {
    const tab = this.page.getByRole('link', { name: tabName, exact: true });
    await tab.click();
  }
  
  async validatePimPageLoaded() {
    await expect(this.page).toHaveURL(/pim/);
    await expect(this.pimTitle).toHaveText('PIM');
  }

  async validatePimMainElements() {
    await expect(this.employeeNameLabel).toBeVisible();
    await expect(this.employeeIdLabel).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }

  async goToOptionalFields() {
    await this.configurationDropdown.click();
    await this.optionalFieldsLk.waitFor({ state: 'visible' });
    
    await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.optionalFieldsLk.click()
    ]);
        
    return new PimConfigurationPage(this.page);
  }
}

module.exports = PimPage;