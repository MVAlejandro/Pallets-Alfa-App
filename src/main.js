// Estilos y variables globales
import './shared/css/variables.css';
import './shared/css/style.css';

// Estilos del módulo
import './shared/css/pages/index.css';

// Estilos de layout
import './shared/css/layouts/navbar.css';
import './shared/css/layouts/footer.css';

// Layout base
import { createBar, createNavbar } from './core/layouts/navbar'
import { createUserBar } from './core/layouts/sidebar';
import { createFooter } from './core/layouts/footer'

document.addEventListener('DOMContentLoaded', () => {
    createBar();
    createNavbar();
    createUserBar();
    createFooter();
});