
// Función de cierre de sesión conectando a la base de datos
export async function logout() {

    const response = await fetch('/api/auth/logout.php', {
        method: 'POST'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al cerrar sesión');
    }

    return data;
}