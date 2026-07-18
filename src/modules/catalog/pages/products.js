// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/products.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'

// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';

// Funciones del módulo
import '../components/products/generate-form.js'
import { initProductsModule } from '../components/products/products-filter.js';
import { renderProductsEditModal } from '../components/products/products-modal.js'; 

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
    await initProductsModule();
});

// Acciones del modal de edición
const editModal = document.getElementById('edit-modal');
const editForm = document.querySelector('#product-edit-form');
// Al abrir modal
editModal.addEventListener('shown.bs.modal', event => {
    const button = event.relatedTarget;
    const productData = JSON.parse(button.getAttribute('product-data'));
    renderProductsEditModal(productData);
});
// Al cerrar modal limpiar inputs e historial
editModal.addEventListener('hidden.bs.modal', () => {
    editForm.reset();
    editForm.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });
    document.getElementById('header-status').textContent = '- NA';
    document.getElementById('header-id-product').textContent = `#CATP-000`;
    document.getElementById('modal-user-created').textContent = `USUARIO - ----/--/--`;
    document.getElementById('modal-user-history').textContent = `USUARIO - ----/--/--`;
});

// Acciones del modal de eliminación
const deleteModal = document.getElementById('delete-modal');
// Al abrir modal
deleteModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const productId = button.dataset.id;
    document.getElementById('delete-id-product').value = productId;
});
// Limpiar información al cerrar modal
deleteModal.addEventListener('hidden.bs.modal', () => {
    document.getElementById('delete-id-product').value = '';
});