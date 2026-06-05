// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import './shared/css/variables.css';
import './shared/css/style.css';

// Estilos del módulo
import './shared/css/pages/index.css';

// Layout base
import { initLayout } from './core/layouts/init.js'

// Funciones del backend
import { validateAuth } from './core/auth/auth-validate';
import { AccessCard, AdviceCard } from './shared/components/index-cards.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);
    if (!user) {
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Obtener los contenedores de la información del index
    const today = new Date().toLocaleDateString('en-CA') || "-"

    const headerName = document.getElementById('header-user');
    const headerDate = document.getElementById('header-date');
    
    // Limpiar contenido y generar texto
    headerName.innerHTML = `${user.nombre}`;
    headerDate.innerHTML = `${today}`;

    const access_container = document.getElementById("direct-access-container");
    const advice_container = document.getElementById("advices-cards-container");

    const access = [
        {ref:'clients.html', id: 'client', icon: 'bi-journal-bookmark', text: 'Clientes'},
        {ref:'clients.html', id: 'shipments', icon: 'bi-truck', text: 'Embarques'},
        {ref:'clients.html', id: 'inventory', icon: 'bi-clipboard-check', text: 'Inventario'},
        {ref:'clients.html', id: 'maintenance', icon: 'bi-wrench', text: 'Mantenimiento'},
        {ref:'clients.html', id: 'rh', icon: 'bi-people', text: 'RRHH'},
        {ref:'clients.html', id: 'support', icon: 'bi-question-circle', text: 'Soporte'},
    ]

    access.forEach(access => {
        AccessCard(access_container, access.ref, access.id, access.icon, access.text);
    });

    AdviceCard(advice_container, 'bi-exclamation-circle', 'Aviso', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');
    AdviceCard(advice_container, 'bi-bell', 'Notificación', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');
    AdviceCard(advice_container, 'bi-exclamation-circle', 'Aviso', 'Título', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae facilis itaque quaerat? Totam illum sed suscipit sit odit sint ab.', '05/06/2026');
});