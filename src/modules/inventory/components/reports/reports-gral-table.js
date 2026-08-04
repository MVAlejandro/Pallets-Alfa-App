// Funciones del módulo
import { renderDifferenceCard, renderReliabilityCard } from "../dashboard/resume-cards.js";
// Utilidades
import { getDateParts } from "../../../../shared/utils/time-functions.js";
import { getGeneralTotals } from "../../services/reports-service.js";

// Función para crear la tabla general de movimientos
export async function renderGralReportTable(summaries) {
    const weekText = document.getElementById('week-title');
    const tbody = document.querySelector("#general-report-table tbody");
    // Limpiar tabla antes de insertar
    weekText.innerHTML = "";
    tbody.innerHTML = "";

    if (!summaries || summaries.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="2">No hay datos en este rango</td></tr>`;
        renderDifferenceCard([]);
        renderReliabilityCard([]);
        return;
    }

    // Obtener el resumen de los registros filtrados para mostrar totales
    const summariesResume = getGeneralTotals(summaries);
    // Calcular las semanas de las fechas para el título
    const summariesWeeks = summariesResume.fechas.map(fecha => getDateParts(fecha).semana);
    weekText.innerHTML = `Semana ${summariesWeeks || "-"}`;;

    // Generar la tabla con el resumen por tipo de movimiento
    tbody.innerHTML = 
        `<tr>
            <td class="ps-4">INVENTARIO INICIAL</td>
            <td class="text-center report-quantity">${summariesResume.inventario_inicial.toLocaleString('en-US')}</td>
        </tr>
        <tr>
            <td class="ps-4">ENTRADAS</td>
            <td class="text-center report-quantity">${summariesResume.entradas.toLocaleString('en-US')}</td>
        </tr>
        <tr>
            <td class="ps-4">SALIDAS POR FACTURA</td>
            <td class="text-center report-quantity">${summariesResume.salidas_factura.toLocaleString('en-US')}</td>
        </tr>
        <tr>
            <td class="ps-4">TRASPASOS A MESAS</td>
            <td class="text-center report-quantity">${summariesResume.traslados_mesas.toLocaleString('en-US')}</td>
        </tr>
        <tr>
            <td class="ps-4">DESARME</td>
            <td class="text-center report-quantity">${summariesResume.desarme.toLocaleString('en-US')}</td>
        </tr>
        <tr>
            <td class="ps-4">TRASPASO A COMEP</td>
            <td class="text-center report-quantity">${summariesResume.traslados_comep.toLocaleString('en-US')}</td>
        </tr>
        <tr class="table-active">
            <td class="fw-bold ps-4">TOTAL EN SISTEMA</td>
            <td class="text-center fw-bold report-quantity">${summariesResume.total_sistema.toLocaleString('en-US')}</td>
        </tr>
        <tr class="table-active">
            <td class="fw-bold ps-4">TOTAL CONTADO</td>
            <td class="text-center fw-bold report-quantity">${summariesResume.total_contado.toLocaleString('en-US')}</td>
        </tr>`;

    renderDifferenceCard(summariesResume);
    renderReliabilityCard(summariesResume);
};