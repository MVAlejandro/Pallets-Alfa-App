// Funciones del backend
import { createMovement, getMovements } from '../../services/movements-service.js'; 
// Funciones del módulo
import { movementsFilter, movementsState } from './movements-filter.js';
// Validaciones
import { validateExcelMovements } from '../../validators/movement-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función que maneja la creación de movimientos desde Excel con validación
export async function createExcelMovements(e) {
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

    if (!validateExcelMovements(form)) {
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

    try {
        // Dividir las filas y columnas para guardar valores
        const excelData = form.querySelector('#excel-data').value
        const rows = excelData.split('\n');
        let insertedMovements = 0;
        let failedMovements = 0;

        for (let row of rows) {
            const columns = row.split('\t');
            if (columns.length < 2) continue;

            // Guardar valores
            const tipo_movimiento = columns[0].trim().toUpperCase();
            const cantidad = Number(columns[1].trim());
            const observaciones = columns[2] || "Sin Observaciones";

            if (Number.isNaN(cantidad)) {
                console.error("Cantidad inválida");
                continue;
            }

            // Insertar en Supabase
            const movementData = {
                tipo_movimiento,
                cantidad,
                observaciones
            };

            try {
                await createMovement(movementData);
                insertedMovements++;
            } catch (error) {
                failedMovements++;
                console.error('Error al insertar movimiento:', movementData, error);
            }
        }

        // Construir mensaje de la alerta
        let message = "";

        if (insertedMovements > 0) { message += `Se agregaron: ${insertedMovements} registros | `; }

        if (failedMovements > 0) { message += `Fallaron: ${failedMovements} registros`; }

        if (!message) { message = "No se agregaron movimientos"; }

        // Mostrar alerta y limpiar el formulario
        Swal.fire({
            title: 'Movimientos agregados con éxito',
            text: message,
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
            text: error.message || 'Error al agregar movimientos',
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