// Funciones backend
import { getStores, getStoreProducts } from '../../../catalog/services/product-store-service'; 
import { createNewCount } from "./counts-form";
import { createExcelCounts } from "./counts-form-excel";
// Utilidades
import { loadOptions } from '../../../../shared/utils/load-select.js';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('counts-form');

    container.innerHTML = 
        `<div id="counts-form-container" class="container py-4 collapse">
            <div class="row">
                <div class="col d-flex align-items-center">
                    <div class="mx-3">
                        <i class="bi bi-clipboard2-plus icon-md" style="color:var(--primary-dark)"></i>
                    </div>
                    <h5 class="fw-bold">Nuevo Registro de Conteo</h5>
                </div>
                <div class="col d-flex justify-content-end controls btn-group me-3 mb-3 mb-md-0">
                    <div class="nav nav-pills" id="ganttTabs" role="tablist">
                        <button id="manual-tab" class="nav-link tab-btn me-2 active" data-bs-toggle="pill" data-bs-target="#tab-form-manual" type="button" role="tab">Manual</button>
                        <button id="excel-tab" class="nav-link tab-btn" data-bs-toggle="pill" data-bs-target="#tab-form-excel" type="button" role="tab">Excel</button>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="counts-tabs-content">
                <!-- Tab de llenado manual -->
                <div class="tab-pane fade show active" id="tab-form-manual" role="tabpanel">
                    <form id="new-count-form" autocomplete="off" class="p-3 pb-0">
                        <div class="row py-3">
                            <div class="col-md-4 col-lg-2 label-over-border mb-4 mb-lg-0">
                                <label for="store" class="form-label m-2">Almacén</label>
                                <select id="store" class="form-select" aria-label="Default select example">
                                    <option value="0">Seleccione...</option>
                                </select>
                                <p class="error invalid-feedback" id="error-store" style="color: red;"></p>
                            </div>
                            <div class="col-md-4 col-lg-3 label-over-border mb-4 mb-lg-0">
                                <label for="product" class="form-label m-2">Producto</label>
                                <select id="product" class="form-select" aria-label="Default select example" disabled>
                                    <option value="0">Seleccione...</option>
                                </select>
                                <p class="error invalid-feedback" id="error-product" style="color: red;"></p>
                            </div>
                            <div class="col-md-4 col-lg-2 label-over-border mb-4 mb-lg-0">
                                <label for="quantity" class="form-label m-2">Cantidad</label>
                                <input type="number" id="quantity" class="form-control no-arrows" placeholder="0000">
                                <p class="error invalid-feedback" id="error-quantity" style="color: red;"></p>
                            </div>
                            <div class="col-md-12 col-lg-5 label-over-border mb-4 mb-lg-0">
                                <label for="observations" class="form-label m-2">Observaciones</label>
                                <input type="text" id="observations" class="form-control" placeholder="Observaciones generales">
                                <p class="error invalid-feedback" id="error-observations" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-end pt-1">
                            <button id="btn-cancel-manual" type="button" class="btn btn-secondary d-flex align-items-center ps-3 pe-3 me-2">Cancelar</button>
                            <button id="btn-add-manual" type="submit" class="btn btn-primary d-flex align-items-center ps-3 pe-3 d-none" data-permission="conteos.crear">
                                <i class="bi bi-floppy pe-1"></i>
                                <p class="ps-2">Agregar</p>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Tab de Excel -->
                <div class="tab-pane fade" id="tab-form-excel" role="tabpanel">
                    <form id="new-excel-form" autocomplete="off" class="p-3 pb-0">
                        <div class="row py-3">
                            <div class="col label-over-border">
                                <label for="excel-data" class="m-2">Datos del conteo</label>
                                <textarea id="excel-data" class="form-control" rows="4" placeholder="Ingrese los datos desde Excel con formato:  'Código, Almacén, Cantidad, Observaciones'"></textarea>
                                <p class="error invalid-feedback" id="error-excel-data" style="color: red;"></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-end pt-1">
                            <button id="btn-cancel-excel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>
                            <button id="btn-add-excel" type="submit" class="btn btn-primary d-flex align-items-center px-3 d-none" data-permission="conteos.crear">
                                <i class="bi bi-floppy pe-1"></i>
                                <p class="ps-2">Agregar</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>  
        </div>`;

    loadOptions('store', getStores, 'id_almacen', 'nombre');

    // Detectar cambio en el select de almacen en formulario
    document.getElementById('store').addEventListener('change', function() {
        const productSelect = document.getElementById('product');
        const id_almacen = this.value;
        productSelect.disabled = true;
        document.getElementById('product').innerHTML = '<option value="0">Seleccione...</option>';

        if (id_almacen !== "0") {
            productSelect.disabled = false;
            loadOptions('product', () => getStoreProducts(id_almacen), 'id_producto', 'codigo');
        }
    });

    // Función para intentar el registro de un nuevo movimiento
    document.querySelector('#new-count-form').addEventListener('submit', createNewCount);
    document.querySelector('#new-excel-form').addEventListener('submit', createExcelCounts);

    // Crear instancia única de Collapse
    const countsContainer = document.getElementById('counts-form-container');
    const collapseInstance = new bootstrap.Collapse(countsContainer, { toggle: false });
    const forms = document.querySelectorAll('#counts-form-container form');

    document.getElementById('btn-add-count').addEventListener('click', () => {
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
