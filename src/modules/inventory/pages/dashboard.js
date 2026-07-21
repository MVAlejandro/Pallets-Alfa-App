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
import { requirePermission, validateAuth, validatePermissions } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import { AccessCardMd } from '../../../shared/components/direct-access-cards.js';
import { initDashboard } from '../components/dashboard/index-cards.js';
// Utilidades
import { getDateParts } from '../../../shared/utils/time-functions.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);

    if (!user) { return; }

    // Comprobar que se tiene permiso de acceder al módulo
    if(!requirePermission('inventario.acceder')){
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    initDashboard();

    // Generar accesos directos
    const access_container = document.getElementById("access-cards");
    access_container.innerHTML = '';
    
    const access = [
        {permission:'movimientos.ver', ref:'./movements.html', id: 'movements', icon: 'bi-arrow-left-right', text: 'Movimientos sistema'},
        {permission:'conteos.ver', ref:'./counts.html', id: 'counts', icon: 'bi-list-check', text: 'Conteos físicos'},
        {permission:'reportes.ver', ref:'./reports.html', id: 'reports', icon: 'bi-clipboard-data', text: 'Generar reportes'}
    ]
    
    access.forEach(access => {
        AccessCardMd(access_container, access.permission, access.ref, access.id, access.icon, access.text);
    });

    // Validar permisos del usuario
    validatePermissions();
});