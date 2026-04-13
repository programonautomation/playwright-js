const { test, expect } = require('@playwright/test');
const { goToLogin } = require('../helpers/navigationHelper');
const { login } = require('../helpers/loginHelper');
const { buscarEmpleado } = require('../helpers/pimHelper');
const { logout } = require('../helpers/logoutHelper'); // Si creaste el helper de logout
const users = require('../data/users.json');

test('Validar flujo completo: Login, Búsqueda en PIM y Logout', async ({ page }) => {
    // 1. Ir a la web
    await goToLogin(page);

    // 2. Loguearse usando la data del JSON
    await login(page, users.validUser.username, users.validUser.password);

    // 3. Usar la "función mejorada" de búsqueda (la que simplifica el codegen)
    await buscarEmpleado(page, 'Charlie Carter'); 

    // 4. Verificación (Assert)
    const registro = page.locator('.oxd-table-card');
    await expect(registro.first()).toContainText('Charlie');

    // 5. Bonus: Cerrar sesión para dejar el test limpio
    // await logout(page); 
});