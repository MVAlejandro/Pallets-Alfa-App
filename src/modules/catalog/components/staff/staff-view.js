// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";

// Función para cargar datos en el formulario
export async function renderStaffEditForm(empleado) {
    // Insertar valores en los inputs
    document.getElementById("hidden-id-staff").value = empleado.id_empleado;
    document.getElementById("emp-number").value = empleado.numero_empleado;
    document.getElementById("name").value = empleado.nombre;
    document.getElementById("departament").value = empleado.departamento_id;
    document.getElementById("position").value = empleado.puesto;
    document.getElementById("birthday").value = empleado.fecha_nacimiento;
    document.getElementById("nss").value = empleado.nss;
    document.getElementById("rfc").value = empleado.rfc;
    document.getElementById("curp").value = empleado.curp;
    document.getElementById("phone").value = empleado.telefono;
    document.getElementById("direction").value = empleado.direccion;
    document.getElementById("emergency-name").value = empleado.nombre_emergencia;
    document.getElementById("emergency-relation").value = empleado.parentesco_emergencia;
    document.getElementById("emergency-phone").value = empleado.telefono_emergencia;
    document.getElementById("blood-type").value = empleado.tipo_sangre;
    document.getElementById("illness").value = empleado.enfermedad;
    document.getElementById("medicament").value = empleado.medicamento;
    document.getElementById("allergy").value = empleado.alergia;
    document.getElementById("boots").value = empleado.calzado;
    document.getElementById("tshirt").value = empleado.playera || "";
    document.getElementById("pants").value = empleado.pantalon;

    if(empleado.estado !== "PENDIENTE") {
        document.getElementById("emp-number").disabled = false;
    }

    // A partir del estatus del empleado generar los botones correspondientes
    const container = document.getElementById('form-footer');

    container.innerHTML = 
        `<div id="form-footer-container" class="container px-0 pb-3">
            <p class="fw-bold modal-log-text">CREADO POR: <span id="modal-user-created">USUARIO - ----/--/--</span></p>
            <p class="fw-bold modal-log-text">ÚLTIMA MODIFICACIÓN: <span id="modal-user-history">USUARIO - ----/--/--</span></p>
        </div>`;

    if (empleado.estado === "PENDIENTE") {
        container.insertAdjacentHTML('beforeend', `
            <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cerrar</button>
            <button id="btn-authorize-entry" class="btn btn-primary px-3 d-none" data-permission="empleados.editar">Autorizar Alta</button>
        `);
    } else if (empleado.estado === "ACTIVO") {
        container.insertAdjacentHTML('beforeend', `
            <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cerrar</button>
            <button class="btn btn-danger px-3 me-2 d-none" data-permission="empleados.eliminar" data-bs-target="#remove-modal" data-bs-toggle="modal">Solicitar Baja</button>
            <button id="btn-update-entry" type="submit" form="staff-form" class="btn btn-primary px-3 d-none" data-permission="empleados.editar">Actualizar</button>
        `);
    } else {
        container.insertAdjacentHTML('beforeend', `
            <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cerrar</button>
        `);
    }

    validatePermissions();

    // Insertar los registros del historial
    document.getElementById('staff-status').textContent = `*${empleado.estado}`;
    document.getElementById('staff-status').style.color = empleado.estado === 'ACTIVO' ? 'var(--primary-dark)' : 'var(--redD-light)';
    document.getElementById('entry-date').textContent = empleado.fecha_ingreso;
    document.getElementById('modal-user-created').textContent = `${empleado.usuario_creacion || "Sin Registro"} - ${empleado.fecha_creacion}`;
    document.getElementById('modal-user-history').textContent = `${empleado.usuario_modificacion || "Sin Registro"} - ${empleado.fecha_modificacion}`;

    // Validar permisos del usuario
    validatePermissions()
}