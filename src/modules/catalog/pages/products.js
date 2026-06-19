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
import { renderProductsTable } from '../components/products/products-table.js';

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

    // Generar componentes del módulo
    await renderProductsTable();
});

// Servicios Supabase
// import { initPage } from '../utils/session-validate.js';
// import { addManualProduct, addExcelProduct } from '../components/products/products-form.js';
// import { productsFilter } from '../components/products/products-filter.js';
// import { renderProductsTable } from '../components/products/products-table.js';
// import { renderProductsEditModal } from '../components/products/products-modal.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     await renderProductsTable();
//     await initPage()
// });

// // Declarar el botón del formulario manual
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'btn-add-manual' || e.target.closest('#btn-add-manual')) {
//         addManualProduct(e);
//     }
// });

// // Declarar el botón del formulario Excel
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'btn-add-excel' || e.target.closest('#btn-add-excel')) {
//         addExcelProduct(e);
//     }
// });

// // Declarar el botón de filtrado
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'filter-btn' || e.target.closest('#filter-btn')) {
//         productsFilter(e);
//     }
// });

// // Acciones del modal de edición
// const editModal = document.getElementById('edit-modal');
// // Al abrir modal
// editModal.addEventListener('shown.bs.modal', event => {
//     const button = event.relatedTarget;
//     const productData = JSON.parse(button.getAttribute('product-data'));
//     renderProductsEditModal(productData);
// });
// // Al cerrar modal
// editModal.addEventListener('hidden.bs.modal', () => {
//     editModal.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
//         e.classList.remove('is-valid', 'is-invalid');
//     });

//     editModal.querySelectorAll('input, select').forEach(el => {
//         el.value = '';
//     });
// });

// // Acciones del modal de eliminación
// const deleteModal = document.getElementById('delete-modal');
// // Al abrir modal
// deleteModal.addEventListener('show.bs.modal', event => {
//     const button = event.relatedTarget;
//     const idProduct = button.dataset.id;
//     document.getElementById('delete-id-product').value = idProduct;
// });
// // Limpiar información al cerrar modal
// deleteModal.addEventListener('hidden.bs.modal', () => {
//     document.getElementById('delete-id-product').value = '';
// });