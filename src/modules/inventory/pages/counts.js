// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/counts.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'

// Funciones del backend
import { validateAuth } from '../../../core/auth/auth-validate.js';

// Funciones del módulo
import '../components/counts/generate-form.js'
import { initCountsModule } from '../components/counts/counts-filter.js';
import { renderCountsEditModal } from '../components/counts/counts-modal.js'; 

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
    await initCountsModule();
});

// Acciones del modal de edición
const editModal = document.getElementById('edit-modal');
const editForm = document.querySelector('#count-edit-form');
// Al abrir modal
editModal.addEventListener('shown.bs.modal', event => {
    const button = event.relatedTarget;
    const countData = JSON.parse(button.getAttribute('count-data'));
    renderCountsEditModal(countData);
});
// Al cerrar modal
editModal.addEventListener('hidden.bs.modal', () => {
    editForm.reset();
    editForm.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });
});

// Acciones del modal de eliminación
const deleteModal = document.getElementById('delete-modal');
// Al abrir modal
deleteModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const idCount = button.dataset.id;
    document.getElementById('delete-id-count').value = idCount;
});
// Limpiar información al cerrar modal
deleteModal.addEventListener('hidden.bs.modal', () => {
    document.getElementById('delete-id-product').value = '';
});