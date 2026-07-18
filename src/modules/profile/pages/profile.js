// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/profile.css';
// Layout base
import { initLayout } from '../../../core/layouts/init.js'
// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import { editUser } from '../components/profile/profile-form.js'; 
import { ProfileActivity, ProfileHeader, ProfileUserInfo } from '../components/profile/profile-info.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);
    if (!user) { return; }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    ProfileHeader(user);
    ProfileUserInfo(user);
    ProfileActivity(user);

    // Función para actualización de información
    document.querySelector('#user-info-form').addEventListener('submit', editUser);
});
