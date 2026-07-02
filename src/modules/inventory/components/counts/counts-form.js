// Funciones del backend
import { createCount, getCounts } from '../../services/counts-service.js'; 
import { findProductStore } from '../../../catalog/services/product-store-service.js';
// Funciones del módulo
import { countsFilter, countsState } from './counts-filter.js';
// Validaciones
import { validateCreateCount } from '../../validators/count-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función que maneja la creación de un movimiento con su validación
export async function createNewCount(e) {
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

    if (!validateCreateCount(form)) {
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
    
    // Buscar la relación entre el almacén y el producto seleccionado
    const almacen_id = form.querySelector('#store').value;
    const producto_id = form.querySelector('#product').value;
    const producto_almacen_id = await findProductStore(almacen_id, producto_id)

    // Guardar valores
    const countData = {
        producto_almacen_id,
        cantidad_conteo: form.querySelector('#quantity').value.trim(),
        observaciones: form.querySelector('#observations').value.trim()
    };
    
    try {
        await createCount(countData);

        // Mostrar verificación y limpiar el formulario
        Swal.fire({
            title: 'Conteo agregado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(countsState, getCounts)
        countsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al agregar el conteo',
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