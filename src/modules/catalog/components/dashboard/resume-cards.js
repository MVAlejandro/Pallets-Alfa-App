
// Función para crear la card de empleados
export async function renderStaffCard(staff) {
    const element = document.getElementById("staff-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";

    if (!staff) {
        element.textContent = `-`;
        element.className = "general-report-cant text-muted"
        return;
    }

    // Generar el contenido
    element.className = "text-primary general-report-cant"
    element.innerText = `${staff.length.toLocaleString('en-US')}`;
}

// Función para crear la card de productos
export async function renderProductsCard(product) {
    const element = document.getElementById("products-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";

    if (!product) {
        element.textContent = `-`;
        element.className = "general-report-cant text-muted"
        return;
    }

    // Generar el contenido
    element.className = "text-primary general-report-cant"
    element.innerText = `${product.length.toLocaleString('en-US')}`;
}

