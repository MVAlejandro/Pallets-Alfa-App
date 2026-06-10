
// Función de actualización del perfil conectando a la base de datos
export async function updateUser(nombre, apellido, email) {
    const response = await fetch('/api/modules/users/update.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            apellido,
            email
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar usuario');
    }

    return data;
}