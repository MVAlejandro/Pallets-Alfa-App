// Funciones backend
import { createNewProduct } from "./products-form";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('products-form');

    container.innerHTML = 
        `<div id="products-form-container" class="container py-4 collapse">
            <div class="row">
                <div class="col d-flex align-items-center">
                    <div class="mx-3">
                        <i class="bi bi-box-seam icon-md" style="color:var(--primary-dark)"></i>
                    </div>
                    <h5 class="fw-bold">Nuevo Registro de Producto</h5>
                </div>
            </div>
            <form id="new-product-form" autocomplete="off" class="p-3 pb-0">
                <div class="row py-3">
                    <div class="col-md-4 col-lg-2 label-over-border mb-4 mb-lg-0">
                        <label for="code" class="form-label m-2">Código</label>
                        <input type="text" id="code" class="form-control" placeholder="TAR1000">
                        <p class="error invalid-feedback" id="error-code" style="color: red;"></p>
                    </div>
                    <div class="col-md-8 col-lg-4 label-over-border mb-4 mb-lg-0">
                        <label for="name" class="form-label m-2">Nombre</label>
                        <input type="text" id="name" class="form-control" placeholder="Nombre del producto">
                        <p class="error invalid-feedback" id="error-name" style="color: red;"></p>
                    </div>
                    <div class="col-md-12 col-lg-6 label-over-border">
                        <label for="description" class="form-label m-2">Descripción</label>
                        <input type="text" id="description" class="form-control" placeholder="Descripción detallada del producto">
                        <p class="error invalid-feedback" id="error-description" style="color: red;"></p>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end pt-1">
                    <button id="btn-cancel" type="button" class="btn btn-secondary d-flex align-items-center px-3 me-2">Cancelar</button>
                    <button id="btn-add-product" type="submit" class="btn btn-primary d-flex align-items-center px-3 d-none" data-permission="productos.crear">
                        <i class="bi bi-floppy pe-1"></i>
                        <p class="ps-2">Agregar</p>
                    </button>
                </div>
            </form>
        </div>`;

    // Función para intentar el registro de un nuevo producto
    document.querySelector('#new-product-form').addEventListener('submit', createNewProduct);

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
