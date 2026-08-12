// Ruta de la api
const API_BASE = '/api/modules/rrhh/extra-time';

// Función de creación de tiempo extra conectando a la base de datos
export async function createExtraTime(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear tiempo extra');
    }

    return result;
}

// Función para obtener todos los tiempos extra conectando a la base de datos
export async function getExtraTimes() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener tiempo extra');
    }
    
    return result.tiempo_extra;
}

// Función para buscar el tiempo extra con el id del empleado conectando a la base de datos
export async function findExtraTime(id_empleado) {
    const response = await fetch(`${API_BASE}/find.php?id_empleado=${id_empleado}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al buscar el tiempo extra');
    }
    
    return result.data;
}

// Función para actualizar tiempo extra conectando a la base de datos
export async function updateExtraTime(id_extra, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_extra,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar tiempo extra');
    }

    return result;
}

// Función para eliminar tiempo extra de la base de datos
export async function deleteExtraTime(id_extra) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_extra })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar tiempo extra');
    }

    return result;
}
