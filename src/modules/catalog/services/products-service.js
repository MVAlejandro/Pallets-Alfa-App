
// Función de creación de un producto conectando a la base de datos
export async function createProduct(codigo, nombre, descripcion) {
    const response = await fetch('/api/modules/catalog/products/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo,
            nombre,
            descripcion
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al crear producto');
    }

    return data;
}

// Función para obtener todos los productos conectando a la base de datos
export async function getProducts() {
    const response = await fetch('/api/modules/catalog/products/get.php', {
        method: 'GET'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al obtener productos');
    }

    return data.productos;
}