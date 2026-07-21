// Funciones backend
import { createNewMovement } from "./movements-form";
import { createExcelMovements } from "./movements-form-excel";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('movements-form');

    container.innerHTML = 
        `<div id="movements-form-container" class="container pt-4 pb-3 collapse">
            <div class="row pb-3">
                <div class="col d-flex align-items-center">
                    <div class="ms-4 me-3">
                        <i class="bi bi-arrow-down-up icon-md"></i>
                    </div>
                    <h5>Registrar Nuevo Movimiento</h5>
                </div>
                <div class="col d-flex justify-content-end controls btn-group me-3 mb-3">
                    <div class="nav nav-pills" id="ganttTabs" role="tablist">
                        <button id="manual-tab" class="nav-link tab-btn active" data-bs-toggle="pill" data-bs-target="#tab-form-manual" type="button" role="tab">Manual</button>
                        <button id="excel-tab" class="nav-link tab-btn" data-bs-toggle="pill" data-bs-target="#tab-form-excel" type="button" role="tab">Excel</button>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="movements-tabs-content">
                <!-- Tab de llenado manual -->
                <div class="tab-pane fade show active" id="tab-form-manual" role="tabpanel">
                    <form id="new-movement-form" autocomplete="off">
                        <div class="row ms-2 me-2 pt-3 pb-3">
                            <div class="col-md-3 label-over-border mb-4 mb-lg-0">
                                <label for="type" class="form-label m-2">Tipo</label>
                                <select id="type" class="form-select" aria-label="Default select example">
                                    <option value="0">Seleccione...</option>
                                    <option value="ENTRADA">Entrada</option>
                                    <option value="SALIDA POR FACTURA">Salida por factura</option>
                                    <option value="TRASPASO A MESAS">Traspaso a mesas</option>
                                    <option value="DESARME">Desarme</option>
                                    <option value="TRASPASO A COMEP">Traspaso a Comep</option>
                                </select>
                                <p class="error invalid-feedback" id="error-type" style="color: red;"></p>
                            </div>
                            <div class="col-md-2 label-over-border mb-4 mb-lg-0">
                                <label for="quantity" class="form-label m-2">Cantidad</label>
                                <input type="number" id="quantity" class="form-control no-arrows" placeholder="0000">
                                <p class="error invalid-feedback" id="error-quantity" style="color: red;"></p>
                            </div>
                            <div class="col-md-7 label-over-border">
                                <label for="observations" class="form-label m-2">Observaciones</label>
                                <input type="text" id="observations" class="form-control" placeholder="Observaciones generales">
                                <p class="error invalid-feedback" id="error-observations" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-end pt-1 me-3">
                            <button id="btn-cancel-manual" type="button" class="btn btn-secondary d-flex align-items-center ps-3 pe-3 me-2">Cancelar</button>
                            <button id="btn-add-manual" type="submit" class="btn btn-primary d-flex align-items-center ps-3 pe-3 d-none" data-permission="movimientos.crear">
                                <i class="bi bi-floppy pe-1"></i>
                                <p class="ps-2">Agregar</p>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Tab de Excel -->
                <div class="tab-pane fade" id="tab-form-excel" role="tabpanel">
                    <form id="new-excel-form" autocomplete="off">
                        <div class="row ms-2 me-2 pb-3">
                            <div class="col label-over-border">
                                <label for="excel-data" class="m-2">Datos del movimiento</label>
                                <textarea id="excel-data" class="form-control" rows="4" placeholder="Ingrese los datos desde Excel con formato:  'Movimiento, Cantidad, Observaciones'"></textarea>
                                <p class="error invalid-feedback" id="error-excel-data" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-end pt-1 me-3">
                            <button id="btn-cancel-excel" type="button" class="btn btn-secondary d-flex align-items-center ps-3 pe-3 me-2">Cancelar</button>
                            <button id="btn-add-excel" type="submit" class="btn btn-primary d-flex align-items-center ps-3 pe-3 d-none" data-permission="movimientos.crear">
                                <i class="bi bi-floppy pe-1"></i>
                                <p class="ps-2">Agregar</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>  
        </div>`;

    // Función para intentar el registro de un nuevo movimiento
    document.querySelector('#new-movement-form').addEventListener('submit', createNewMovement);
    document.querySelector('#new-excel-form').addEventListener('submit', createExcelMovements);

    // Crear instancia única de Collapse
    const movementsContainer = document.getElementById('movements-form-container');
    const collapseInstance = new bootstrap.Collapse(movementsContainer, { toggle: false });
    const forms = document.querySelectorAll('#movements-form-container form');

    document.getElementById('btn-add-movement').addEventListener('click', () => {
        collapseInstance.show();
    });

    document.getElementById('btn-cancel-manual').addEventListener('click', () => {
        collapseInstance.hide();

        forms.forEach(form => {
            form.reset();

            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        });
    });

    document.getElementById('btn-cancel-excel').addEventListener('click', () => {
        collapseInstance.hide();

        forms.forEach(form => {
            form.reset();

            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        });
    });
});
