
// Función para la validación de la sesión conectando a la base de datos
export async function getSession() {
    try {
        const response = await fetch('/api/auth/auth.php', {
            credentials: 'include'
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.success ? data.user : null;

    } catch (error) {
        console.error('Error obteniendo sesión:', error);
        return null;
    }
}