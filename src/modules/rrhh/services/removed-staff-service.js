// Ruta de la api
const API_BASE = '/api/modules/rrhh/remove-staff';

// Función de creación de un empleado conectando a la base de datos
export async function createRemove(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear baja');
    }

    return result;
}

// Función para obtener todos los empleados conectando a la base de datos
export async function getRemoves() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener bajas');
    }
    
    return result.empleados;
}

// Función para actualizar un empleado conectando a la base de datos
export async function updateRemove(id_baja, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_baja,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar baja');
    }

    return result;
}

// Función para eliminar un empleado de la base de datos
export async function deleteRemove(id_baja) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_baja })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar baja');
    }

    return result;
}
