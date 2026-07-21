// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../shared/css/variables.css';
import '../../shared/css/style.css';

// Estilos del módulo
import './styles/index.css';

// Layout base
import { initLayout } from '../../core/layouts/init.js'
// Funciones del backend
import { validateAuth, validatePermissions } from '../../core/auth/auth-validate.js';
// Funciones del módulo
import { AccessCardSm, AdviceCard } from '../../shared/components/direct-access-cards.js';
// Utilidades
import { getDateParts } from '../../shared/utils/time-functions.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);

    if (!user) { return; }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Obtener los contenedores de la información del index
    const today = new Date() || "-"
    const headerName = document.getElementById('header-user');
    const headerDate = document.getElementById('header-date');
    const headerWeek = document.getElementById('header-week');
    
    // Limpiar contenido y generar texto
    headerName.innerHTML = `${user.nombre}`;
    headerDate.innerHTML = `El día de hoy: ${today.toLocaleDateString('en-CA')}`;
    headerWeek.innerHTML = `Semana ${getDateParts(today).semana}`;

    const access_container = document.getElementById("access-cards");
    const advice_container = document.getElementById("advices-cards-container");

    // Limpiar primero los contenedores
    access_container.innerHTML = '';

    const access = [
        {permission:'catalogos.acceder', ref:'./catalog/dashboard.html', id: 'catalog', icon: 'bi-journal-bookmark', text: 'Catálogos'},
        {permission:'embarques.acceder', ref:'#', id: 'shipments', icon: 'bi-truck', text: 'Embarques'},
        {permission:'inventario.acceder', ref:'./inventory/dashboard.html', id: 'inventory', icon: 'bi-clipboard-check', text: 'Inventario'},
        {permission:'mantenimiento.acceder', ref:'#', id: 'maintenance', icon: 'bi-wrench', text: 'Mantenimiento'},
        {permission:'rrhh.acceder', ref:'#', id: 'rh', icon: 'bi-people', text: 'RRHH'},
        {permission:'soporte.acceder', ref:'#', id: 'support', icon: 'bi-question-circle', text: 'Soporte'},
        {permission:'ventas.acceder', ref:'#', id: 'sales', icon: 'bi-graph-up', text: 'Ventas'}
    ]

    access.forEach(access => {
        AccessCardSm(access_container, access.permission, access.ref, access.id, access.icon, access.text);
    });

    AdviceCard(advice_container, 'bi-exclamation-circle', 'Aviso', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');
    AdviceCard(advice_container, 'bi-bell', 'Notificación', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');
    AdviceCard(advice_container, 'bi-exclamation-circle', 'Aviso', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');

    // Validar permisos del usuario
    validatePermissions();
});