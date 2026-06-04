
// Función de registro conectando a la base de datos
export async function register(fName, sName, email, password) {
    const response = await fetch('/api/auth/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fName,
            sName,
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
    }

    return data;
}