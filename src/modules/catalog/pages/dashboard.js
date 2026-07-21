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
import { AccessCardMd } from '../../../shared/components/index-cards.js';
// Utilidades
import { getDateParts } from '../../../shared/utils/time-functions.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);

    if (!user) { return; }

    // Comprobar que se tiene permiso de acceder al módulo
    if(!requirePermission('catalogos.acceder')){
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)
    
    // Generar accesos directos
    const access_container = document.getElementById("access-cards");
    access_container.innerHTML = '';
    
    const access = [
        {permission:'productos.ver', ref:'./actives.html', id: 'actives', icon: 'bi-gear', text: 'Activos registrados'},
        {permission:'productos.ver', ref:'./clients.html', id: 'clients', icon: 'bi-person', text: 'Cartera de clientes'},
        {permission:'productos.ver', ref:'./staff.html', id: 'staff', icon: 'bi-people', text: 'Kardex de empleados'},
        {permission:'productos.ver', ref:'./spares.html', id: 'spares', icon: 'bi-wrench', text: 'Catálogo de refacciones'},
        {permission:'productos.ver', ref:'./products.html', id: 'products', icon: 'bi-boxes', text: 'Productos existentes'},
        {permission:'productos.ver', ref:'./suppliers.html', id: 'suppliers', icon: 'bi-shop', text: 'Cartera de proveedores'}
    ]
    
    access.forEach(access => {
        AccessCardMd(access_container, access.permission, access.ref, access.id, access.icon, access.text);
    });

    // Validar permisos del usuario
    validatePermissions();
});