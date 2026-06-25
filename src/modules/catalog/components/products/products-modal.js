// Funciones del backend
import { updateProduct, deleteProduct, getProducts } from '../../services/products-service.js'; 
// Funciones del módulo
import { productsFilter, productsState } from './products-filter.js';
// Validaciones
import { validateEditProduct } from '../../validators/product-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para cargar datos en el modal
export async function renderProductsEditModal(producto) {
    // Insertar valores en los inputs
    document.getElementById('edit-id-product').value = producto.id_producto;
    document.getElementById('edit-code').value = producto.codigo;
    document.getElementById('edit-name').value = producto.nombre;
    document.getElementById('edit-store').value = producto.almacenes || "Sin Asignar";
    document.getElementById('edit-description').value = producto.descripcion;

    // Función para intentar la actualización del producto
    document.querySelector('#product-edit-form').addEventListener('submit', editProduct);
}

// Función para guardar cambios
export async function editProduct(e) {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Actualizando...';
    }

    if (!validateEditProduct(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Guardar cambios`;
        }
        return
    }

    const id_producto = document.getElementById('edit-id-product').value;
    const updatedData = {
        nombre: form.querySelector('#edit-name').value.trim(),
        codigo: form.querySelector('#edit-code').value.trim(),
        descripcion: form.querySelector('#edit-description').value.trim()
    };

    try {
        await updateProduct(id_producto, updatedData);

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();
        Swal.fire({
            title: 'Producto actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(productsState, getProducts)
        productsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar producto:',
            text: error.message || 'Ocurrió un error al actualizar el producto.',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Guardar cambios`;
        }
    }
};

// Eliminar entrada al dar click en el botón del modal
document.getElementById('btn-delete-entry').addEventListener('click', async () => {
    const id_producto = document.getElementById('delete-id-product').value;
    await deleteProduct(id_producto);

    // Cerrar el modal y mostrar alerta
    bootstrap.Modal.getInstance(document.getElementById('delete-modal')).hide();
    Swal.fire({
        title: 'Producto eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Recarga la tabla con los datos actualizados
    await refreshState(productsState, getProducts)
    productsFilter();
});