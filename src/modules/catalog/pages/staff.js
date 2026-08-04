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
import { renderStaffEditForm } from '../components/staff/staff-edit.js'; 

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
    const id_empleado = JSON.parse(button.getAttribute('staff-id'));
    // Bajar la información del empleado encontrado con su id
    const staffData = await findStaff(id_empleado)
    
    await generateForm();
    await renderStaffEditForm(staffData);
});
