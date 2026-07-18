// Ruta de la api
const API_BASE = '/api/modules/users';

// Función de actualización del perfil conectando a la base de datos
export async function updateUser(updatedData) {
    const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...updatedData
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar usuario');
    }

    return result;
}