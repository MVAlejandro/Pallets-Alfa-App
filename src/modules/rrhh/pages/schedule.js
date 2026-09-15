// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/schedule.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'
// Funciones del backend
import { requirePermission, validateAuth, validatePermissions } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import { restoreForm } from '../components/schedule/generate-form.js';
import { initScheduleModule } from '../components/schedule/schedule-filter.js';
import { renderScheduleDetails } from '../components/schedule/schedule-view.js';
import { renderScheduleEditModal } from '../components/schedule/schedule-modal.js';
// import { renderExtraTimeModal } from '../components/extra-time/extra-modal.js'; 

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);

    if (!user) { return; }

    // Comprobar que se tiene permiso de acceder al módulo
    if(!requirePermission('horarios.ver')){
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    await initScheduleModule();

    // Validar permisos del usuario
    validatePermissions();
});

// Llenar tabla con información del empleado
const container = document.getElementById('staff-list');
container.addEventListener('click', async function(e) {
    // Obtener el id del empleado del botón
    const button = e.target.closest('button[staff-id]');
    if (!button) return;

    // Quitar la clase active de todos los elementos
    container.querySelectorAll('.active').forEach(item => {
        item.classList.remove('active');
    });

    // Agregar la clase active al botón seleccionado
    button.classList.add('active');

    // Bajar la información del empleado encontrado con su id
    const id_empleado = JSON.parse(button.getAttribute('staff-id'));

    await renderScheduleDetails(id_empleado);
});

document.addEventListener("click", (e) => {
    if (e.target.id === "btn-cancel") {
        restoreForm();
    }
});

// Acciones del modal de edición
const editModal = document.getElementById('edit-modal');
const editForm = document.querySelector('#schedule-edit-form');
// Al abrir modal
editModal.addEventListener('shown.bs.modal', async event => {
    const button = event.relatedTarget;
    const id_empleado = button.dataset.id;

    await renderScheduleEditModal(id_empleado);
});
// Al cerrar modal limpiar inputs e historial
editModal.addEventListener('hidden.bs.modal', () => {
    editForm.reset();
    editForm.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });
    document.getElementById('header-name').textContent = '-';
    document.getElementById('header-num-staff').textContent = `#CATE-000`;
    document.getElementById('modal-user-created').textContent = `USUARIO - ----/--/--`;
    document.getElementById('modal-user-history').textContent = `USUARIO - ----/--/--`;
});