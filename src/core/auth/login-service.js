
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

    return response.json();
}