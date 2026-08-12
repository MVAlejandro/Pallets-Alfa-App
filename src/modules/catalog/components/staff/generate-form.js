// Funciones backend
import { getDepartaments } from "../../services/staff-service";
import { validatePermissions } from "../../../../core/auth/auth-validate";
import { createNewStaff } from "./staff-form";
import { editStaff } from "./staff-edit";
// Utilidades
import { loadOptions } from "../../../../shared/utils/load-select";

export async function generateForm() {
    const container = document.getElementById('staff-details');

    container.innerHTML = 
        `<div id="staff-details-container">
            <div id="form-header" class="py-3 px-2">
                <div class="d-flex align-items-center">
                    <div class="mx-3">
                        <i class="bi bi-person-vcard icon-md" style="color:var(--primary-dark)"></i>
                    </div>
                    <h5 class="fw-bold">Información del Empleado</h5>
                </div>
            </div>
            <div id="form-body" class="p-4 pt-3">
                <div id="form-header-container" class="container p-3">
                    <div class="row">
                        <div class="col-7 col-md-8 d-flex flex-column">
                            <p class="fw-bold modal-text">ESTADO DEL EMPLEADO</p>
                            <p id="staff-status" class="fw-bold" style="color: var(--secondary)">* PENDIENTE</p>
                        </div>
                        <div class="col-5 col-md-4 d-flex flex-column align-items-end justify-content-end">
                            <p class="fw-bold modal-text">Fecha Ingreso</p>
                            <p id="entry-date" class="modal-color state-grey">--/--/----</p>
                        </div>
                    </div>
                </div>
                <form id="staff-form" autocomplete="off" class="mt-3">
                    <input type="hidden" id="hidden-id-staff">
                    <p class="staff-title fst-italic py-2">Datos generales</p>
                    <div class="row py-3">
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="emp-number" class="form-label fw-semibold m-2">No Empleado</label>
                            <input id="emp-number" type="number" class="form-control no-arrows" placeholder="000">
                            <p id="error-emp-number" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-9 label-over-border">
                            <label for="name" class="form-label fw-semibold m-2">Nombre</label>
                            <input id="name" type="text" class="form-control" placeholder="Nombre y Apellidos">
                            <p id="error-name" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div class="col-md-4 label-over-border mb-4 mb-md-0">
                            <label for="departament" class="form-label fw-semibold m-2">Departamento</label>
                            <select id="departament" class="form-select" aria-label="Default select example">
                                <option value="0">Seleccione...</option>

                            </select>
                            <p id="error-departament" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-4 label-over-border mb-4 mb-md-0">
                            <label for="position" class="form-label fw-semibold m-2">Puesto</label>
                            <input id="position" type="text" class="form-control" placeholder="Puesto">
                            <p id="error-position" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-4 label-over-border">
                        <label for="birthday" class="form-label fw-semibold m-2">Fecha nacimiento</label>
                            <input id="birthday" type="date" class="form-control">
                            <p id="error-birthday" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="rfc" class="form-label fw-semibold m-2">RFC</label>
                            <input id="rfc" type="text" class="form-control" placeholder="RFCX000000YY">
                            <p id="error-rfc" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-6 label-over-border mb-4 mb-md-0">
                            <label for="curp" class="form-label fw-semibold m-2">CURP</label>
                            <input id="curp" type="text" class="form-control" placeholder="CURP000000AABBCC00">
                            <p id="error-curp" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border">
                            <label for="nss" class="form-label fw-semibold m-2">NSS</label>
                            <input id="nss" type="number" class="form-control no-arrows" placeholder="01234567891">
                            <p id="error-nss" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <div class="row py-3">
                    <div class="col-md-4 label-over-border mb-4 mb-md-0">
                            <label for="phone" class="form-label fw-semibold m-2">Teléfono</label>
                            <input id="phone" type="number" class="form-control no-arrows" placeholder="5510203040">
                            <p id="error-phone" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-8 label-over-border">
                            <label for="direction" class="form-label fw-semibold m-2">Dirección</label>
                            <input id="direction" type="text" class="form-control" placeholder="Dirección completa">
                            <p id="error-direction" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <p class="staff-title fst-italic py-2">Datos de emergencia</p>
                    <div class="row py-3">
                        <div class="col-md-6 label-over-border mb-4 mb-md-0">
                            <label for="emergency-name" class="form-label fw-semibold m-2">Nombre*</label>
                            <input id="emergency-name" type="text" class="form-control" placeholder="Nombre del contacto">
                            <p id="error-emergency-name" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="emergency-relation" class="form-label fw-semibold m-2">Parentesco*</label>
                            <input id="emergency-relation" type="text" class="form-control" placeholder="Parentesco de la persona">
                            <p id="error-emergency-relation" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border">
                            <label for="emergency-phone" class="form-label fw-semibold m-2">Teléfono*</label>
                            <input id="emergency-phone" type="number" class="form-control no-arrows" placeholder="Teléfono de emergencia>
                            <p id="error-emergency-phone" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <p class="staff-title fst-italic py-2">Datos de salud</p>
                    <div class="row py-3">
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="blood-type" class="form-label fw-semibold m-2">Tipo sangre*</label>
                            <input id="blood-type" type="text" class="form-control" placeholder="(Opcional)">
                            <p id="error-blood-type" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="illness" class="form-label fw-semibold m-2">Enfermedad*</label>
                            <input id="illness" type="text" class="form-control" placeholder="(Opcional)">
                            <p id="error-illness" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border mb-4 mb-md-0">
                            <label for="medicament" class="form-label fw-semibold m-2">Medicamento*</label>
                            <input id="medicament" type="text" class="form-control" placeholder="(Opcional)">
                            <p id="error-medicament" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-3 label-over-border">
                            <label for="allergy" class="form-label fw-semibold m-2">Alergia*</label>
                            <input id="allergy" type="text" class="form-control" placeholder="(Opcional)">
                            <p id="error-allergy" class="error invalid-feedback"></p>
                        </div>
                    </div>
                    <p class="staff-title fst-italic py-2">Datos de uniforme</p>
                    <div class="row py-3">
                        <div class="col-md-4 label-over-border mb-4 mb-md-0">
                            <label for="boots" class="form-label fw-semibold m-2">Calzado*</label>
                            <input id="boots" type="number" class="form-control no-arrows" placeholder="Talla de calzado">
                            <p id="error-boots" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-4 label-over-border mb-4 mb-md-0">
                            <label for="tshirt" class="form-label fw-semibold m-2">Camisa*</label>
                            <select id="tshirt" class="form-select" aria-label="Default select example">
                                <option value="">Seleccione...</option>
                                <option value="CH">CH</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                                <option value="XG">XG</option>
                            </select>
                            <p id="error-tshirt" class="error invalid-feedback"></p>
                        </div>
                        <div class="col-md-4 label-over-border">
                            <label for="pants" class="form-label fw-semibold m-2">Pantalón*</label>
                            <input id="pants" type="number" class="form-control no-arrows" placeholder="Talla de pantalón">
                            <p id="error-pants" class="error invalid-feedback"></p>
                        </div>
                    </div>
                </form>
            </div>
            <div id="form-footer" class="d-flex align-items-center justify-content-end py-3 px-3 px-md-4">
                <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>
                <button id="btn-add-entry" type="submit" form="staff-form" class="btn btn-primary d-flex align-items-center px-3 d-none" data-permission="empleados.crear">
                    <i class="bi bi-upload pe-1"></i>
                    <p class="ps-2">Añadir Empleado</p>
                </button>
            </div>
        </div>`;

    await loadOptions('departament', getDepartaments, 'id_departamento', 'nombre');

    // Función para intentar el registro de un nuevo empleado
    document.querySelector('#staff-form').addEventListener('submit', handleStaffSubmit);

    // Validar permisos del usuario
    validatePermissions()
};

export async function restoreForm() {
    // Quitar la clase active de todos los elementos
    document.getElementById('staff-list').querySelectorAll('.active').forEach(item => {
        item.classList.remove('active');
    });

    const container = document.getElementById('staff-details');

    container.innerHTML =
        `<div id="staff-details-container" class="container d-flex justify-content-center align-items-center p-5">
            <div id="logo-details" class="text-center">
                <h5 class="fw-light mb-4">Seleccione un empleado para visualizar su información.</h5>
                <img src="/app/assets/images/logo-letras-420x187.png" alt="Logo Pallets Alfa" class="w-75 img-fluid">
            </div>
        </div>`;
}

// Función para determinar la acción al mandar el formulario
function handleStaffSubmit(e) {
    const id = document.getElementById("hidden-id-staff").value;

    if (id !== "") {
        return editStaff(e);
    }

    return createNewStaff(e);
}
