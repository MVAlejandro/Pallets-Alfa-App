// Implementación de dependencias
import Swal from 'sweetalert2'
import flatpickr from "flatpickr"
import { Spanish } from "flatpickr/dist/l10n/es.js"
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ExcelJS from 'exceljs'

export {
  Swal,
  flatpickr,
  Spanish,
  Chart,
  ChartDataLabels,
  ExcelJS
}

// Función para programar un retraso en la carga de información
export function debounce(fn, delay = 300) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}