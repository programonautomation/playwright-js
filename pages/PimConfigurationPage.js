const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const {PAGE_TITLES} = require('../constants/pimConstants');

class PimConfigurationPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.getByRole('heading', { name: PAGE_TITLES.OPTIONAL_FIELDS });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

async validateTitle() {
    await expect(this.title).toBeVisible({ timeout: 10000 }); 
    await expect(this.title).toHaveText(PAGE_TITLES.OPTIONAL_FIELDS);
}

async toggleField(label) {
    const switchWrapper = this.page.locator('.oxd-switch-wrapper', { hasText: label });
    const switchInput = switchWrapper.locator('.oxd-switch-input');
        
    await expect(switchInput).toBeVisible();        
    await switchInput.click({ force: true });
}

async toggleMultipleFields(labels) {
    for (const label of labels) {        
        const fieldContainer = this.page.locator('.oxd-checkbox-label', { hasText: label });        
        const switchButton = fieldContainer.locator('span.oxd-switch-input');
        
        await switchButton.click();
    }
}
}

module.exports = PimConfigurationPage;