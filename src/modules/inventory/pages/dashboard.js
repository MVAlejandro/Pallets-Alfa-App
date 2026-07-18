// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/dashboard.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'
// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import { initDashboard } from '../components/dashboard/index-cards.js';
// Utilidades
import { getDateParts } from '../../../shared/utils/time-functions.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);
    if (!user) {
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    initDashboard();
});