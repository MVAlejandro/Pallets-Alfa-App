// Funciones del backend
import { createCount, getCounts } from '../../services/counts-service.js'; 
import { findProduct } from '../../../catalog/services/products-service.js';
import { findProductStore } from '../../../catalog/services/product-store-service.js';
// Funciones del módulo
import { countsFilter, countsState } from './counts-filter.js';
// Validaciones
import { validateExcelCounts } from '../../validators/count-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Mapeo de nombre de almacén a ID
const storeMap = {
    'PT': 1, // NAVE 1
    'N2': 2, // NAVE 2
    'N3': 3, // NAVE 3
    'R' : 4, // PRODUCCION
    'MP': 5 // MATERIA PRIMA
};

// Función que maneja la creación de movimientos desde Excel con validación
export async function createExcelCounts(e) {
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
    
        if (!validateExcelCounts(form)) {
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
        let insertedCounts = 0;
        let failedCounts = 0;

        for (let row of rows) {
            const columns = row.split('\t');
            if (columns.length < 3) continue;
        
            // Guardar valores
            const codigo = columns[0].trim();
            const almacen = columns[1].trim().toUpperCase();
            const cantidad_conteo = Number(columns[2].trim());
            const observaciones = columns[3] || "Sin Observaciones";
        
            if (Number.isNaN(cantidad_conteo)) {
                console.error("Cantidad inválida");
                continue;
            }

            // Buscar la relación entre el almacén y el producto seleccionado
            const id_almacen = storeMap[almacen];
            const producto_id = await findProduct(codigo);
            const producto_almacen_id = await findProductStore(id_almacen, producto_id)
        
            const countData = {
                producto_almacen_id,
                cantidad_conteo,
                observaciones
            };
        
            try {
                await createCount(countData);
                insertedCounts++;
            } catch (error) {
                failedCounts++;
                console.error('Error al insertar conteo:', countData, error);
            }
        }
        
        // Construir mensaje de la alerta
        let message = "";
        
        if (insertedCounts > 0) { message += `Se agregaron: ${insertedCounts} registros | `; }
        
        if (failedCounts > 0) { message += `Fallaron: ${failedCounts} registros`; }
        
        if (!message) { message = "No se agregaron conteos"; }
        
        // Mostrar alerta y limpiar el formulario
        Swal.fire({
            title: 'Conteos agregados con éxito',
            text: message,
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
            text: error.message || 'Error al agregar conteos',
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