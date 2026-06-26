// Funciones del backend
import { createProduct, getProducts } from '../../services/products-service.js'; 
// Funciones del módulo
import { productsFilter, productsState } from './products-filter.js';
// Validaciones
import { validateCreateProduct } from '../../validators/product-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función que maneja la creación de un producto con su validación
export async function createNewProduct(e) {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="ps-2">Subiendo...</p>`;
    }

    if (!validateCreateProduct(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 
                `<i class="bi bi-floppy pe-1"></i>
                <p class="ps-2">Agregar</p>`;
        }
        return
    }
    
    // Guardar valores
    const productData = {
        codigo: form.querySelector('#code').value.trim(),
        nombre: form.querySelector('#name').value.trim(),
        descripcion: form.querySelector('#description').value.trim()
    };
    
    try {
        await createProduct(productData);

        // Mostrar verificación y limpiar el formulario
        Swal.fire({
            title: 'Producto agregado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(productsState, getProducts)
        productsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al agregar el producto',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 
                `<i class="bi bi-floppy pe-1"></i>
                <p class="ps-2">Agregar</p>`;
        }
    }
};