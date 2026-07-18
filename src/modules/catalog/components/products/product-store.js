// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { getProducts } from '../../services/products-service.js'; 
import { getProductStores, getStores, toggleProductStore } from '../../services/product-store-service.js';
// Funciones del módulo
import { productsFilter, productsState } from './products-filter.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

export async function renderAssignStores(id_producto) {
    // Función para renderizado de la lista de almacenes en el offcanvas y obtención de mapas con almacenes
    const { assignedStores, allStoresMap } = await renderStoreList(id_producto);

    document.getElementById('btn-save').onclick = async (e) => {
        e.preventDefault();

        const checkboxes = document.querySelectorAll('#store-list .form-check-input');
        // Estado actual después de interacción del usuario
        const currentAssigned = new Set();

        // Construir el Set actual
        checkboxes.forEach((checkbox) => {
            const id_almacen = Number(checkbox.id.replace("store-", ""));

            if (checkbox.checked) {
                currentAssigned.add(id_almacen);
            }
        });

        // Detectar qué almacenes agregar
        const toAssign = [...currentAssigned].filter( id_almacen => !assignedStores.has(id_almacen) );
        // Detectar qué almacenes eliminar
        const toRemove = [...assignedStores.keys()].filter( id_almacen => !currentAssigned.has(id_almacen) );

        try {
            const assignedNames = [];
            const unassignedNames = [];

            // Asignar nuevos
            for (const id_almacen of toAssign) {
                const storeName = allStoresMap.get(id_almacen);
                assignedNames.push(storeName);
                await toggleProductStore(id_producto, id_almacen);
            }

            // Eliminar desmarcados
            for (const id_almacen of toRemove) {
                const storeName = assignedStores.get(id_almacen);
                unassignedNames.push(storeName);
                await toggleProductStore(id_producto, id_almacen);
            }

            // Construir mensaje de la alerta
            let message = "";

            if (assignedNames.length > 0) { message += `Asignados: ${assignedNames.join(", ")} | `; }

            if (unassignedNames.length > 0) { message += `Desasignados: ${unassignedNames.join(", ")}`; }

            if (!message) { message = "No hubo cambios en la asignación."; }

            // Cerrar todo y mostrar alerta
            bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();
            bootstrap.Offcanvas.getInstance(document.getElementById('asign-stores')).hide();
            Swal.fire({
                title: 'Asignación actualizada',
                text: message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Recarga la tabla con los datos actualizados
            await refreshState(productsState, getProducts)
            productsFilter();

        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error en la asignación:',
                text: error.message || 'Ocurrió un error al actualizar los almacenes',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
}

// Función para cargar la lista de los almacenes disponibles para asignar
export async function renderStoreList(id_producto) {
    // Obtener los almacenes existentes en la base
    let allStores = await getStores();
    let productStores = await getProductStores(id_producto);
    const container = document.getElementById('store-list');

    // Limpiar antes de insertar
    container.innerHTML = "";

    if (!allStores || allStores.length === 0) {
        container.innerHTML = `
            <div class="row border-top pt-4">
                <div class="col d-flex align-items-center justify-content-center">
                    <div class="me-2">
                        <i class="bi bi-exclamation-circle" style="color:var(--redD-dark)"></i>
                    </div>
                    <p>No se encontraron almacenes registrados</p>
                </div>
            </div>`;
        return;
    }

    // Todos los almacenes
    const allStoresMap = new Map(
        allStores.map(store => [store.id_almacen, store.nombre])
    );

    // Guardar relación id - nombre de almacenes asignados al producto
    const assignedStores = new Map(
        productStores?.map(ps => [ps.id_almacen, ps.nombre]) || []
    );

    // Generar lista con los asignados marcados
    allStores.forEach(almacen => {
        const isAssigned = assignedStores.has(almacen.id_almacen);

        container.innerHTML += `
            <div class="form-check form-switch mb-3" store-id='${almacen.id_almacen}'>
                <input class="form-check-input" type="checkbox" role="switch" id="store-${almacen.id_almacen}" ${isAssigned ? "checked" : ""}>
                <label class="form-check-label fw-bold" for="store-${almacen.id_almacen}">${almacen.nombre} - <span class="store-name">${almacen.descripcion}</span></label>
            </div>`;
    });

    return { assignedStores, allStoresMap };
}