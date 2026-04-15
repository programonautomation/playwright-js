const { expect } = require('@playwright/test');

async function buscarEmpleado(page, nombreEmpleado) {
    // 1. Ir a la sección PIM (Employee List) usando el menú lateral
    await page.getByRole('link', { name: 'PIM' }).click();
    
    // 2. Llenar el campo de nombre de empleado
    // Usamos un selector genérico que suele aparecer en esa pantalla
    await page.getByPlaceholder('Type for hints...').first().fill(nombreEmpleado);
    
    // 3. Hacer clic en el botón Search
    await page.getByRole('button', { name: 'Search' }).click();
}

module.exports = { buscarEmpleado };