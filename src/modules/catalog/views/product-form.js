// Funciones backend
import { handleCreateProduct } from "../controllers/products/create-controller.js";
// Utilidades
//import { loadOptions } from "../../../shared/utils/load-select"; 

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('products-form');

    container.innerHTML = 
        `<div id="products-form-container" class="container pt-4 pb-3 collapse">
            <div class="row pb-3">
                <div class="col d-flex align-items-center">
                    <div class="ms-4 me-3">
                        <i class="bi bi-box-seam icon-md"></i>
                    </div>
                    <h5>Registrar Nuevo Producto</h5>
                </div>
            </div>
            <form id="new-product-form" autocomplete="off">
                <div class="row ms-2 me-2 pt-3 pb-3">
                    <div class="col-md-2 label-over-border">
                        <label for="code" class="form-label m-2">Código</label>
                        <input type="text" id="code" class="form-control" placeholder="TAR1000">
                        <p class="error invalid-feedback" id="error-code" style="color: red;"></p>
                    </div>
                    <div class="col-md-4 label-over-border">
                        <label for="name" class="form-label m-2">Nombre</label>
                        <input type="text" id="name" class="form-control" placeholder="Tarima Estándar">
                        <p class="error invalid-feedback" id="error-name" style="color: red;"></p>
                    </div>
                    <div class="col-md-6 label-over-border">
                        <label for="description" class="form-label m-2">Descripción</label>
                        <input type="text" id="description" class="form-control" placeholder="Descripción del producto">
                        <p class="error invalid-feedback" id="error-description" style="color: red;"></p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end pt-1 me-3">
                    <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center ps-3 pe-3 me-2">Cancelar</button>
                    <button id="btn-add-manual" type="submit" class="btn btn-primary d-flex align-items-center ps-3 pe-3">
                        <i class="bi bi-floppy pe-1"></i>
                        <p class="ps-2">Agregar</p>
                    </button>
                </div>
            </form>
        </div>`;

    // loadOptions('almacen', 'inv_almacenes', 'id_almacen', 'nombre')

    // Función para intentar el registro de un nuevo producto
    document.querySelector('#new-product-form').addEventListener('submit', handleCreateProduct);

    // Crear instancia única de Collapse
    const productsContainer = document.getElementById('products-form-container');
    const collapseInstance = new bootstrap.Collapse(productsContainer, { toggle: false });
    const form = document.getElementById('new-product-form');

    document.getElementById('btn-add-product').addEventListener('click', () => {
        collapseInstance.show();
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
        collapseInstance.hide();
        
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });
    });
});
