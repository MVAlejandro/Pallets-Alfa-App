// Dependencias
import { Chart, ChartDataLabels } from "../../../../shared/utils/utils.js"
// Utilidades
import { getDateParts } from "../../../../shared/utils/time-functions";

Chart.register(ChartDataLabels);

// Función para crear el gráfico de confiabilidad
export function renderGralGraphic(summaries, year) {
    const allSummaries = summaries
        .map(summary => ({
            ...summary,
            ...getDateParts(summary.fecha)
        }))
        .filter(summary => summary.anioSemana == year);

    const container = document.getElementById("graphic-report-container");

    // Limpiar antes de insertar
    container.innerHTML = "";

    if (!allSummaries.length) {
        container.innerHTML = `
            <div class="alert alert-info">
                No hay datos para mostrar con los filtros seleccionados
            </div>`;
        return;
    }

    // Ordenar por semana, por si las fechas no vienen ordenadas
    allSummaries.sort((a, b) => a.semana - b.semana);

    // Preparar labels y datos
    const labels = allSummaries.map(s => `Sem ${s.semana}`);
    const reliabilityData = allSummaries.map(s => s.confiabilidad);
    // Calcular promedio
    const averageReliability = reliabilityData.reduce((sum, value) => sum + value, 0) / reliabilityData.length;

    container.innerHTML = '<canvas id="report-graphic"></canvas>';

    const ctx = document.getElementById("report-graphic").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Confiabilidad",
                data: reliabilityData,
                borderColor: "#C7C6C6",
                backgroundColor: "#E8F5E9",
                tension: 0.3,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `TENDENCIA DE CONFIABILIDAD POR SEMANA (${year}) - PROM ${averageReliability.toFixed(1)}%`,
                    font: { weight: "bold" },
                    padding: { bottom: 25 }
                },
                datalabels: {
                    display: () => window.innerWidth > 770,
                    color: "#5e8132",
                    font: { weight: "bold" },
                    formatter: value => `${value}%`,
                    align: (ctx) => ctx.dataIndex % 2 === 0 ? "top" : "bottom",
                    offset: 8
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const summary = allSummaries[ctx.dataIndex];

                            return [
                                `Confiabilidad: ${summary.confiabilidad}%`,
                                `Diferencia: ${summary.diferencia}`
                            ];
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    min: 60,
                    max: 120,
                    title: {
                        display: true,
                        text: "Confiabilidad (%)"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Semanas"
                    }
                }
            }
        }
    });
};