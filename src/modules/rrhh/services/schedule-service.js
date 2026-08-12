// Ruta de la api
const API_BASE = '/api/modules/rrhh/schedule';

// Función de creación de un horario conectando a la base de datos
export async function createSchedule(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear horario');
    }

    return result;
}

// Función para obtener todos los horarios conectando a la base de datos
export async function getSchedules() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener horarios');
    }
    
    return result.horarios;
}

// Función para buscar un horario con el id del empleado conectando a la base de datos
export async function findSchedules(id_empleado) {
    const response = await fetch(`${API_BASE}/find.php?id_empleado=${id_empleado}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al buscar el horario');
    }
    
    return result.data;
}

// Función para actualizar un horario conectando a la base de datos
export async function updateSchedule(id_horario, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_horario,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar horario');
    }

    return result;
}

// Función para eliminar un horario de la base de datos
export async function deleteSchedule(id_horario) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_horario })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar horario');
    }

    return result;
}
