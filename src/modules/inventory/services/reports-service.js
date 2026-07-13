// Utilidades
import { splitTimestamp } from "../../../shared/utils/time-functions";

// Función para generar todos los resúmenes de movimientos y conteos
export async function generateGralSummaries(movements, counts) {
    if (!movements || !counts) return;

    // Omitir el almacén de materia prima
    const countsFiltered = counts.filter(c => c.id_almacen !== 5);

    // Inicializar conjuntos
    const countsMap = {};
    const movementsMap = {};
    const datesSet = new Set();

    // Agrupar conteos por fecha
    countsFiltered.forEach(c => {
        // Separar solo la fecha del dato
        const key = splitTimestamp(c.fecha_conteo).date;
        if (!countsMap[key]) countsMap[key] = [];
        countsMap[key].push(c);
    });

    // Agrupar movimientos por fecha
    movements.forEach(m => {
        const key = splitTimestamp(m.fecha).date;
        if (!movementsMap[key]) movementsMap[key] = [];
        movementsMap[key].push(m);
    });

    // Agrupar todas las fechas existentes
    movements.forEach(m => datesSet.add(splitTimestamp(m.fecha).date));
    countsFiltered.forEach(c => datesSet.add(splitTimestamp(c.fecha_conteo).date));

    const datesArray = Array.from(datesSet).sort();

    // Separar las fechas que tienen conteo
    const datesWithCounts = Object.keys(countsMap).sort();

    // Obtener el último conteo anterior
    const getInitialInventory = (currentDate) => {
        for (let i = datesWithCounts.length - 1; i >= 0; i--) {
            const date = datesWithCounts[i];
            if (date < currentDate) {
                return countsMap[date].reduce((sum, c) => sum + parseInt(c.cantidad_conteo), 0);
            }
        }

        return 0;
    };

    const summaries = [];

    for (const date of datesArray) {
        const initialInventory = getInitialInventory(date);
        const dayMovements = movementsMap[date] || [];
        let totalSystem = initialInventory;

        dayMovements.forEach(m => {
            const quantity = parseInt(m.cantidad);

            switch (m.tipo_movimiento) {
                case "ENTRADA":
                case "TRASPASO A MESAS":
                    totalSystem += quantity;
                    break;

                case "SALIDA POR FACTURA":
                case "DESARME":
                case "TRASPASO A COMEP":
                    totalSystem -= quantity;
                    break;
            }
        });

        const getQuantity = tipo =>
            dayMovements
                .filter(m => m.tipo_movimiento === tipo)
                .reduce((sum, m) => sum + parseInt(m.cantidad), 0);

        const entradas = getQuantity("ENTRADA");
        const salidas_factura = getQuantity("SALIDA POR FACTURA");
        const traslados_mesas = getQuantity("TRASPASO A MESAS");
        const desarme = getQuantity("DESARME");
        const traslados_comep = getQuantity("TRASPASO A COMEP");

        const currentCounts = countsMap[date] || [];
        const totalCounted = currentCounts.reduce((sum, c) => sum + parseInt(c.cantidad_conteo), 0);
        const difference = totalCounted - totalSystem;
        let reliability = 0;

        if (totalSystem > 0) {
            const absoluteDifference = Math.abs(difference);
            const differenceRatio = absoluteDifference / totalSystem;

            reliability = (1 - differenceRatio) * 100;
        } else {
            reliability = 0;
        }

        summaries.push({
            fecha: date,
            inventario_inicial: initialInventory,
            entradas,
            salidas_factura,
            traslados_mesas,
            desarme,
            traslados_comep,
            total_sistema: totalSystem,
            total_contado: totalCounted,
            diferencia: difference,
            confiabilidad: Number(reliability.toFixed(2))
        });
    }

    return summaries;
}

export function getGeneralTotals(summaries) {
    if (!summaries?.length) return null;

    const fields = [
        "entradas",
        "salidas_factura",
        "traslados_mesas",
        "desarme",
        "traslados_comep",
        "total_sistema",
        "total_contado",
        "diferencia",
        "confiabilidad"
    ];

    const totals = Object.fromEntries(fields.map(field => [field, 0]));

    for (const summary of summaries) {
        for (const field of fields) {
            totals[field] += summary[field];
        }
    }

    return {
        fechas: summaries.map(item => item.fecha),
        inventario_inicial: summaries[0].inventario_inicial,
        ...totals,
        confiabilidad: Number(
            (totals.confiabilidad / summaries.length).toFixed(2)
        )
    };
}
