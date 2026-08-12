// Ruta de la api
const API_BASE = '/api/modules/rrhh/active-staff';

// Función para obtener empleados activos a partir de una fecha establecida y con la posibilidad de usar rango
export async function getActiveStaff(fecha_inicial, fecha_final = null) {
    let url = `${API_BASE}/get.php?fecha_inicial=${fecha_inicial}`;
    if (fecha_final) {
        url += `&fecha_final=${fecha_final}`;
    }
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al obtener empleados activos');
    }

    return result.empleados;
}