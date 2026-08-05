// Ruta de la api
const API_BASE = '/api/modules/catalog/staff';

// Función de creación de un empleado conectando a la base de datos
export async function createStaff(data) {
    const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear empleado');
    }

    return result;
}

// Función para obtener todos los empleados conectando a la base de datos
export async function getStaffs() {
    const response = await fetch(`${API_BASE}/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener empleados');
    }
    
    return result.empleados;
}

// Función para buscar un empleado con su id conectando a la base de datos
export async function findStaff(id_empleado) {
    const response = await fetch(`${API_BASE}/find.php?id_empleado=${id_empleado}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al buscar el empleado');
    }
    
    return result.data;
}

// Función para buscar el id de un empleado con su número conectando a la base de datos
export async function findIdStaff(numero) {
    const response = await fetch(`${API_BASE}/find-id.php?numero_empleado=${numero}`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al buscar el empleado');
    }
    
    return result.data;
}

// Función para actualizar un empleado conectando a la base de datos
export async function updateStaff(id_empleado, updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_empleado,
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar empleado');
    }

    return result;
}

// Función para eliminar un empleado de la base de datos
export async function deleteStaff(id_empleado) {
    const response = await fetch(`${API_BASE}/delete.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_empleado })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar empleado');
    }

    return result;
}

// Función para obtener los departamentos conectando a la base de datos
export async function getDepartaments() {
    const response = await fetch(`/api/modules/catalog/departaments/get.php`);
    const result = await response.json();
    
    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener departamentos');
    }
    
    return result.data;
}