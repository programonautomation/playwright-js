const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class PimConfigurationPage extends BasePage {
    constructor(page) {
        super(page);
        this.breadcrumbPim         = page.getByRole('heading', { name: 'PIM' });
        this.breadcrumbConfig      = page.getByRole('heading', { name: '/ Configuration' });
        this.optionalFieldsTitle   = page.getByText('Optional Fields');
        this.deprecatedFieldsTitle = page.getByRole('heading', { name: 'Show Deprecated Fields' });
        this.saveButton            = page.getByRole('button', { name: 'Save' });
    }

    switchWrapper(label) {
        // Busca el generic que contiene exactamente el paragraph con ese texto
        return this.page.locator('p', { hasText: label }).locator('..');
    }

    async validatePageTexts() {
        await expect(this.optionalFieldsTitle).toBeVisible({ timeout: 10000 });
        await expect(this.breadcrumbPim).toBeVisible();
        await expect(this.breadcrumbConfig).toBeVisible();
        await expect(this.deprecatedFieldsTitle).toBeVisible();
        await expect(this.saveButton).toBeVisible();
    }

    async validateTitle() {
        await expect(this.optionalFieldsTitle).toBeVisible({ timeout: 10000 });
    }

    async toggleField(label) {
        const checkbox = this.page.locator('p', { hasText: label })
            .locator('..')
            .locator('input[type="checkbox"]');
        await checkbox.click({ force: true });
    }

    async toggleMultipleFields(labels) {
        for (const label of labels) {
            await this.toggleField(label);
        }
    }

    async saveConfiguration() {
        await this.saveButton.click();
    }
}

module.exports = PimConfigurationPage;