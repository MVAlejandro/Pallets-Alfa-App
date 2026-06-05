// Funciones del backend
import { getSession } from "./auth-service"; 

export async function validateAuth() {
    const user = await getSession();

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isLoginPage = currentPath === 'login.html';

    // Si no hay sesión redirigir al login
    if (!user && !isLoginPage) {
        window.location.href = './login.html';
        return null;
    }

    // Con sesión evitar volver a login
    if (user && isLoginPage) {
        window.location.href = './index.html';
        return user;
    }

    // Dejar el usuario disponible globalmente
    window.currentUser = user;

    return user;
}