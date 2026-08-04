// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { updateStaff, deleteStaff, getStaffs, findStaff } from '../../services/staff-service.js'; 
import { requireActionPermission, validatePermissions } from "../../../../core/auth/auth-validate.js";
// Funciones del módulo
import { staffFilter, staffState } from './staff-filter.js';
// Validaciones
//import { validateEditStaff } from '../../validators/staff-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para cargar datos en el formulario
export async function renderStaffEditForm(empleado) {
    // Insertar valores en los inputs
    document.getElementById("hidden-id-staff").value = empleado.id_empleado;
    document.getElementById("emp-number").value = empleado.numero_empleado;
    document.getElementById("name").value = empleado.nombre;
    document.getElementById("departament").value = empleado.id_departamento;
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
    document.getElementById("tshirt").value = empleado.playera;
    document.getElementById("pants").value = empleado.pantalon;

    if(empleado.estado !== "PENDIENTE") {
        document.getElementById("emp-number").disabled = false;
    }

    const container = document.getElementById('form-footer');

    // A partir del estatus del empleado generar los botones correspondientes
    if(empleado.estado == "PENDIENTE") {
        container.innerHTML =
            `<button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>
            <button id="btn-authorize-entry" class="btn btn-primary m-1 d-none" data-dir-only>Autorizar Alta</button>`;
        validatePermissions()
    } else if(empleado.estado == "ACTIVO") {
        container.innerHTML =
            `<button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>
            <button class="btn btn-danger px-3 me-2 d-none" data-permission="empleados.eliminar" data-bs-target="#remove-modal" data-bs-toggle="modal">Solicitar Baja</button>
            <button id="btn-update-entry" type="submit" form="staff-form" class="btn btn-primary px-3 d-none" data-permission="empleados.editar">Actualizar Empleado</button>`;
        validatePermissions()
    } else {
        container.innerHTML =
            `<button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>`;
        validatePermissions()
    }

    // Insertar los registros del historial
    document.getElementById('staff-status').textContent = empleado.estado;
    document.getElementById('entry-date').textContent = empleado.fecha_ingreso;
    //document.getElementById('modal-user-created').textContent = `${producto.usuario_creacion || "Sin Registro"} - ${producto.fecha_creacion}`;
    //document.getElementById('modal-user-history').textContent = `${producto.usuario_modificacion || "Sin Registro"} - ${producto.fecha_modificacion}`;

    // Función para intentar la actualización del empleado
    //document.querySelector('#staff-form').addEventListener('submit', editStaff);

    // Validar permisos del usuario
    validatePermissions()
}