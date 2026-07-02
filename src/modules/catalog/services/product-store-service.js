// Ruta de la api
const API_BASE = '/api/modules/inventory/product-store';

// Función para obtener los almacenes vinculados a productos conectando a la base de datos
export async function getProductStores(producto_id) {
    const response = await fetch(`${API_BASE}/get-stores.php?producto_id=${producto_id}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener almacenes del producto');
    }
    
    return result.data;
}

// Función para obtener los productos vinculados a un almacén conectando a la base de datos
export async function getStoreProducts(almacen_id) {
    const response = await fetch(`${API_BASE}/get-products.php?almacen_id=${almacen_id}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener productos del almacén');
    }
    
    return result.data;
}

// Función para buscar la relación de producto - almacen conectando a la base de datos
export async function findProductStore(almacen_id, producto_id) {
    const response = await fetch(`${API_BASE}/find.php?almacen_id=${almacen_id}&producto_id=${producto_id}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener buscar el producto');
    }
    
    return result.data;
}

// Función de asignación de un producto a un almacén conectando a la base de datos
export async function assignProductToStore(producto_id, almacen_id) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto_id, almacen_id })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al asignar producto');
    }
    
    return result;
}

// Función de desasignación de un producto a un almacén conectando a la base de datos
export async function unassignProductToStore(producto_id, almacen_id) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto_id, almacen_id })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al remover producto');
    }
    
    return result;
}

// Función para obtener los almacenes conectando a la base de datos
export async function getStores() {
    const response = await fetch(`/api/modules/catalog/stores/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener almacenes');
    }
    
    return result.data;
}