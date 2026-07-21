// Dependencias
import { Swal } from "../../shared/utils/utils"; 
// Funciones del backend
import { getSession } from "./auth-service"; 

// Función para validar el usuario activo y la sesión
export async function validateAuth() {
    const user = await getSession();

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isLoginPage = currentPath === 'login.html';

    // Si no hay sesión redirigir al login
    if (!user && !isLoginPage) {
        window.location.href = '/app/login.html';
        return null;
    }

    // Con sesión evitar volver a login
    if (user && isLoginPage) {
        window.location.href = '/app/index.html';
        return user;
    }

    // Dejar el usuario disponible globalmente
    window.currentUser = user;

    return user;
}

// Función de validación de permisos para mostrar los elementos ocultos
export function validatePermissions(){
    const user = window.currentUser;

    if(!user) return;

    document.querySelectorAll('[data-permission]').forEach(element => {
        const permission = element.dataset.permission;
        
        if(hasPermission(permission)){
            element.classList.remove('d-none');
            if(
                element.tagName === 'INPUT' ||
                element.tagName === 'TEXTAREA' ||
                element.tagName === 'SELECT' ||
                element.tagName === 'BUTTON'
            ){
                element.disabled = false;
            }
        }
    });
}

// Función auxiliar para comprobar si un usuario tiene o no cierto permiso
export function hasPermission(permission) {
    const user = window.currentUser;

    if (!user) return false;

    if (user.superadmin == 1) { return true; }

    return user.permisos.includes(permission);
}

// Función auxiliar para restringir el acceso a los módulos sin permisos
export function requirePermission(permission){
    if(!hasPermission(permission)){
        console.warn(`Permiso ${permission} necesario`);

        Swal.fire({
            title: 'Atención',
            text: 'No cuentas con los permisos necesarios para acceder a este sitio',
            icon: 'info',
            confirmButtonText: 'OK',
            backdrop: 'rgba(0,0,0,0.8)'
        }).then(() => {
            window.location.href = '/app/index.html';
        });

        return false;
    }

    return true;
}

// Función auxiliar para restringir las acciones de la página sin permisos
export function requireActionPermission(permission) {
    if (hasPermission(permission)) {
        return true;
    }

    console.warn(`Permiso ${permission} necesario`);

    Swal.fire({
        icon: 'info',
        title: 'Acción no permitida',
        text: 'No cuentas con los permisos necesarios para realizar esta acción'
    });

    return false;
}