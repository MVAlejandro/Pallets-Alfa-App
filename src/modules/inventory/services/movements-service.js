// Ruta de la api
const API_BASE = '/api/modules/inventory/movements';

// Función de creación de un movimiento conectando a la base de datos
export async function createMovement(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear movimiento');
    }

    return result;
}

// Función para obtener todos los movimientos conectando a la base de datos
export async function getMovements() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener movimientos');
    }
    
    return result.movimientos;
}

// Función para actualizar un movimiento conectando a la base de datos
export async function updateMovement(id_movimiento, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_movimiento,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar movimiento');
    }

    return result;
}

// Función para eliminar un movimiento de la base
export async function deleteMovement(id_movimiento) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_movimiento })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar movimiento');
    }

    return result;
};