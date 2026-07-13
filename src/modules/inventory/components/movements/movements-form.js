// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { createMovement, getMovements } from '../../services/movements-service.js'; 
// Funciones del módulo
import { movementsFilter, movementsState } from './movements-filter.js';
// Validaciones
import { validateCreateMovement } from '../../validators/movement-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función que maneja la creación de un movimiento con su validación
export async function createNewMovement(e) {
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

    if (!validateCreateMovement(form)) {
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
    const movementData = {
        tipo_movimiento: form.querySelector('#type').value, 
        cantidad: form.querySelector('#quantity').value.trim(),
        observaciones: form.querySelector('#observations').value.trim()
    };
    
    try {
        await createMovement(movementData);

        // Mostrar verificación y limpiar el formulario
        Swal.fire({
            title: 'Movimiento agregado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(movementsState, getMovements)
        movementsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al agregar el movimiento',
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
