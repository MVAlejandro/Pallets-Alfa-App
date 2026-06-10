// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../shared/css/variables.css';
import '../shared/css/style.css';

// Estilos del módulo
import '../shared/css/pages/profile.css';

// Layout base
import { initLayout } from '../core/layouts/init.js'

// Funciones del backend
import { validateAuth } from '../core/auth/auth-validate';
import { handleUpdateUser } from '../modules/profile/user-controller.js';

// Componentes del módulo
import { ProfileActivity, ProfileHeader, ProfileUserInfo } from '../modules/profile/profile-info.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);
    if (!user) { return; }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    ProfileHeader(user);
    ProfileUserInfo(user);
    ProfileActivity(user);

    // Función para actualización de información
    document.querySelector('#user-info-form').addEventListener('submit', handleUpdateUser);
});
