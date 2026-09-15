// Funciones backend
import { validatePermissions } from "../../../../core/auth/auth-validate";

export async function generateForm() {
    const container = document.getElementById('schedule-details');

    container.innerHTML = 
        `<div id="schedule-details-container">
            <div id="form-header" class="py-3 px-2">
                <div class="d-flex align-items-center">
                    <div class="mx-3">
                        <i class="bi bi-person-vcard icon-md" style="color:var(--primary-dark)"></i>
                    </div>
                    <h5 class="fw-bold">Información del Empleado</h5>
                </div>
            </div>
            <div class="p-4 pt-3">
                <div id="form-header-container" class="container p-3">
                    <div class="row">
                        <div class="col-12 col-md-6 d-flex flex-column">
                            <p class="fw-bold modal-text">ESTADO DEL EMPLEADO</p>
                            <p id="staff-status" class="fw-bold" style="color: var(--secondary)">* PENDIENTE</p>
                        </div>
                        <div class="col-12 col-md-6 d-flex align-items-center justify-content-end pe-2">
                            <div class="action-buttons">
                                <button class="btn btn-edit d-none" data-permission="horarios.editar" data-bs-target="#edit-modal" data-bs-toggle="modal" title="Editar horarios">
                                    <i class="bi bi-calendar2-week"></i>
                                </button>
                                <button class="btn btn-edit d-none" data-permission="textra.editar" data-bs-target="#extra-modal" data-bs-toggle="modal" title="Agregar tiempo extra">
                                    <i class="bi bi-clock-history"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="form-body" class="mt-3">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div id="schedule-container">
                                <div id="schedule-header" class="p-2 mb-3">
                                    <div class="d-flex align-items-center">
                                        <div class="mx-3">
                                            <i class="bi bi-calendar2-week icon-md" style="color:var(--primary-dark)"></i>
                                        </div>
                                        <h5 class="fw-bold">Horario semanal</h5>
                                    </div>
                                </div>
                                <div id="schedule-body" class="table-responsive">
                                    <table id="schedule-table" class="table table-hover align-middle mb-0">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" colspan="2">No hay horarios registrados</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id="extra-pending-container">
                                <div id="extra-pending-header" class="p-2 mb-3">
                                    <div class="d-flex align-items-center">
                                        <div class="mx-3">
                                            <i class="bi bi-clock-history icon-md" style="color:var(--primary-dark)"></i>
                                        </div>
                                        <h5 class="fw-bold">Horas extra pendientes</h5>
                                    </div>
                                </div>
                                <div id="extra-pending" class="table-responsive">
                                    <table id="extra-pending-table" class="table table-hover align-middle mb-0">
                                        <tbody>
                                            <tr>
                                                <td class="text-center" colspan="2">Sin horas extra pendientes</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div id="extra-revised-container">
                                <div id="extra-revised-header" class="p-2 mb-3">
                                    <div class="d-flex align-items-center">
                                        <div class="mx-3">
                                            <i class="bi bi-clock icon-md" style="color:var(--primary-dark)"></i>
                                        </div>
                                        <h5 class="fw-bold">Horas extra revisadas</h5>
                                    </div>
                                </div>
                                <div class="container pb-3">
                                    <div class="row">
                                        <div class="col d-flex align-items-center justify-content-end">
                                            <p id="time-text" class="fw-bold">Tiempo Total: --:--</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="extra-revised" class="table-responsive">
                                    <table id="extra-revised-table" class="table table-hover align-middle mb-0">
                                        <thead>
                                            <tr class="table-secondary">
                                                <th class="">FECHA</th>
                                                <th class="">OBSERVACIONES</th>
                                                <th class="">ESTADO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center" colspan="3">Sin horas extra registradas</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- SECCIÓN DE PAGINACIÓN -->
                                <div id="extra-pages" class="mt-3">
                                    <div id="extra-pages-container" class="container py-3">
                                        <div class="row align-items-center ms-2 me-1">
                                            <div class="col-12 col-lg-9 mb-2">
                                                <p id="extra-pages-results"></p>
                                            </div>
                                            <div class="col-12 col-lg-3 d-flex justify-content-end">
                                                <nav aria-label="Page navigation example">
                                                    <ul class="pagination mb-0">
                                                
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="form-footer" class="d-flex align-items-center justify-content-end py-3 px-3 px-md-4">
                <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cerrar</button>
            </div>
        </div>`;

    // Validar permisos del usuario
    validatePermissions()
};

export async function restoreForm() {
    // Quitar la clase active de todos los elementos
    document.getElementById('staff-list').querySelectorAll('.active').forEach(item => {
        item.classList.remove('active');
    });

    const container = document.getElementById('schedule-details');

    container.innerHTML =
        `<div id="schedule-details-container" class="container d-flex justify-content-center align-items-center p-5">
            <div id="logo-details" class="text-center">
                <h5 class="fw-light mb-4">Seleccione un empleado para visualizar su información.</h5>
                <img src="/app/assets/images/logo-letras-420x187.png" alt="Logo Pallets Alfa" class="w-75 img-fluid">
            </div>
        </div>`;
}

