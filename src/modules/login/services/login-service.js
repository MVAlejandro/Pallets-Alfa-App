
// Función de inicio de sesión conectando a la base de datos
export async function login(email, password) {
    const response = await fetch('/api/auth/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data;
}