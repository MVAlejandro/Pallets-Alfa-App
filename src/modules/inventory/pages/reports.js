// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/reports.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'

// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';

// Funciones del módulo
import { initReportsModule } from '../components/reports/reports-filter.js';
//import { renderCountsEditModal } from '../components/reports/reports-modal.js'; 

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
    await initReportsModule();
});
   