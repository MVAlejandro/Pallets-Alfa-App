// Importar el estadoo de los registros
import { countsState } from "./reports-filter.js";
// Utilidades
import { getDateParts } from "../../../../shared/utils/time-functions.js";

// Función para crear la tabla general de movimientos
export async function renderIndReportTable() {
    const counts = countsState.visibleRecords;
    const tbody = document.querySelector('#store-report-table tbody');
    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!counts || counts.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="8">No hay conteos registrados</td></tr>`;
        return;
    }

    // Calcular totales
    const totalContado = counts.reduce((sum, c) => sum + c.cantidad_conteo, 0);

    counts.forEach((conteo) => {
        tbody.innerHTML += 
        `<tr>
            <td class="p-2 ps-4">
                <p class="count-week">Semana ${getDateParts(conteo.fecha_conteo).semana || "Sin definir"}</p>
                <p class="count-date">${conteo.fecha_conteo.split(" ")[0]}</p>
            </td>
            <td class="p-2">
                <p class="count-code fw-bold">${conteo.codigo_producto}</p>
                <p class="count-product">${conteo.descripcion_producto}</p>
            </td>
            <td class="count-store text-center p-2">${conteo.almacen}</td>
            <td class="count-quantity text-center p-2">${conteo.cantidad_conteo.toLocaleString('en-US')}</td>
        </tr>`;
    });

    // Agregar fila de totales al final
    tbody.innerHTML += 
    `<tr class="table-active fw-bold">
        <td class="text-center" colspan="3">TOTALES</td>
        <td class="text-center p-2">${totalContado.toLocaleString('en-US')}</td>
    </tr>`;
};