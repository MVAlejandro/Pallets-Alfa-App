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
import { requirePermission, validateAuth, validatePermissions } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import '../components/counts/generate-form.js'
import { initCountsModule } from '../components/counts/counts-filter.js';
import { renderCountsEditModal } from '../components/counts/counts-modal.js'; 

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);
    
    if (!user) { return; }
    
    // Comprobar que se tiene permiso de acceder al módulo
    if(!requirePermission('conteos.ver')){
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    await initCountsModule();

    // Validar permisos del usuario
    validatePermissions();
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
// Al cerrar modal limpiar inputs e historial
editModal.addEventListener('hidden.bs.modal', () => {
    editForm.reset();
    editForm.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });

    document.getElementById('header-status').textContent = '- NA';
    document.getElementById('header-id-count').textContent = `#INVC-000`;
    document.getElementById('modal-user-created').textContent = `USUARIO - ----/--/--`;
    document.getElementById('modal-user-history').textContent = `USUARIO - ----/--/--`;
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
    document.getElementById('delete-id-count').value = '';
});