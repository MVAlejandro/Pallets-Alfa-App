// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/movements.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'

// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';

// Funciones del módulo
import '../components/movements/generate-form.js'
import { initMovementsModule } from '../components/movements/movements-filter.js';
// import { renderProductsEditModal } from '../components/products/products-modal.js'; 

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
    await initMovementsModule();
});

// // Servicios Supabase
// import { initPage } from '../utils/session-validate.js'; 
// import { addManualMovement, addExcelMovement } from '../components/movements/movements-form.js'
// import { movementsFilter } from '../components/movements/movements-filter.js';
// import { renderMovementsTable } from '../components/movements/movements-table.js';
// import { renderMovementsEditModal } from '../components/movements/movements-modal.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     await renderMovementsTable();
//     await initPage()
// });

// // Declarar el botón del formulario manual
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'btn-add-manual' || e.target.closest('#btn-add-manual')) {
//         addManualMovement(e);
//     }
// });

// // Declarar el botón del formulario Excel
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'btn-add-excel' || e.target.closest('#btn-add-excel')) {
//         addExcelMovement(e);
//     }
// });

// // Declarar el botón de filtrado
// document.addEventListener('click', function(e) {
//     if (e.target.id === 'filter-btn' || e.target.closest('#filter-btn')) {
//         movementsFilter(e);
//     }
// });

// // Acciones del modal de edición
// const editModal = document.getElementById('edit-modal');
// // Al abrir modal
// editModal.addEventListener('shown.bs.modal', event => {
//     const button = event.relatedTarget;
//     const movementData = JSON.parse(button.getAttribute('movement-data'));
//     renderMovementsEditModal(movementData);
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
//     const idMovement = button.dataset.id;
//     document.getElementById('delete-id-movement').value = idMovement;
// });
// // Limpiar información al cerrar modal
// deleteModal.addEventListener('hidden.bs.modal', () => {
//     document.getElementById('delete-id-product').value = '';
// });