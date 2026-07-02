// Ruta de la api
const API_BASE = '/api/modules/inventory/counts';

// Función de creación de un conteo conectando a la base de datos
export async function createCount(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear conteo');
    }

    return result;
}

// Función para obtener todos los conteos conectando a la base de datos
export async function getCounts() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener conteos');
    }
    
    return result.conteos;
}

// Función para actualizar un conteo conectando a la base de datos
export async function updateCount(id_conteo, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_conteo,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar conteo');
    }

    return result;
}

// Función para eliminar un movimiento de la base
export async function deleteCount(id_conteo) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_conteo })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar conteo');
    }

    return result;
};