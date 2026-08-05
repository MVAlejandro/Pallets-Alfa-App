// Ruta de la api
const API_BASE = '/api/modules/catalog/products';

// Función de creación de un producto conectando a la base de datos
export async function createProduct(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear producto');
    }

    return result;
}

// Función para obtener todos los productos conectando a la base de datos
export async function getProducts() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener productos');
    }
    
    return result.productos;
}

// Función para buscar el id de un producto con su código conectando a la base de datos
export async function findProduct(codigo) {
    const response = await fetch(`${API_BASE}/find.php?codigo_producto=${codigo}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al buscar el producto');
    }
    
    return result.data;
}

// Función para actualizar un producto conectando a la base de datos
export async function updateProduct(id_producto, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_producto,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar producto');
    }

    return result;
}

// Función para eliminar un producto de la base de datos
export async function deleteProduct(id_producto) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_producto })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar producto');
    }

    return result;
}