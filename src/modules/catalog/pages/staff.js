// Implementación de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../../../shared/css/variables.css';
import '../../../shared/css/style.css';

// Estilos del módulo
import '../styles/staff.css';

// Layout base
import { initLayout } from '../../../core/layouts/init.js'
// Funciones del backend
import { findStaff } from '../services/staff-service.js';
import { requirePermission, validateAuth, validatePermissions } from '../../../core/auth/auth-validate.js';
// Funciones del módulo
import { generateForm, restoreForm } from '../components/staff/generate-form.js';
import { initStaffModule } from '../components/staff/staff-filter.js';
import { renderStaffEditForm } from '../components/staff/staff-view.js'; 
import { renderStaffRemoveModal } from '../components/staff/staff-remove.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Validar que haya sesión y obtener al usuario
    const user = await validateAuth();
    console.log(user);

    if (!user) { return; }

    // Comprobar que se tiene permiso de acceder al módulo
    if(!requirePermission('empleados.ver')){
        return;
    }

    // Generar componentes base (navbar y footer)
    initLayout(user)

    // Renderizado inicial del módulo
    await initStaffModule();

    // Validar permisos del usuario
    validatePermissions();
});

// Declarar los botones para manipulación del formulario
document.getElementById("btn-add-staff").addEventListener("click", async () => {
    // Quitar la clase active de todos los elementos
    document.getElementById('staff-list').querySelectorAll('.active').forEach(item => {
        item.classList.remove('active');
    });

    await generateForm()
});

document.addEventListener("click", (e) => {
    if (e.target.id === "btn-cancel") {
        restoreForm();
    }
});

// Llenar formulario con información del empleado
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
    const staffData = await findStaff(id_empleado)
    
    await generateForm();
    await renderStaffEditForm(staffData);
});

// Acciones del modal de eliminación
const removeModal = document.getElementById('remove-modal');
const removeForm = document.querySelector('#remove-staff-form');
// Al abrir modal
removeModal.addEventListener('shown.bs.modal', event => {
    renderStaffRemoveModal();
});
// Al cerrar modal limpiar inputs
removeModal.addEventListener('hidden.bs.modal', () => {
    removeForm.reset();
    removeForm.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
        e.classList.remove('is-valid', 'is-invalid');
    });
    document.getElementById('header-name').textContent = '-';
    document.getElementById('header-num-staff').textContent = `#CATE-000`;
});
