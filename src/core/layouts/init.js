// Estilos de layout
import '../../shared/css/layouts/navbar.css';
import '../../shared/css/layouts/footer.css';

// Componentes de layout base
import { createBar, createNavbar } from '../layouts/navbar'
import { createUserBar } from '../layouts/sidebar'
import { createFooter } from '../layouts/footer'

export function initLayout(user) {
    createBar()
    createNavbar()
    createUserBar(user)
    createFooter()
}