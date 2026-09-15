// Utilidades
import { timeDifference } from "../../../shared/utils/time-functions";

// Función para ordenar los horarios
export function determinateSchedule(horario) {
    let entrada = "00:00";
    let salida = "00:00";

    if (horario.entrada != null) {
        entrada = horario.entrada.slice(0, 5);
    }

    if (horario.salida != null) {
        salida = horario.salida.slice(0, 5);
    }

    let formato = `${entrada} - ${salida}`;

    if (formato == "00:00 - 00:00") {
        return "Descanso"
    } else {
        return formato
    }
}

// Función para agregar una fila por cada día de horario
export function addDayRow(scheduleDay = '') {
    const container = document.getElementById("schedule-days-container");
    const newDay = document.createElement("div");

    const entrada = scheduleDay.entrada || "07:30";
    const salida = scheduleDay.salida || "18:00";

    const totalTime = timeDifference(entrada, salida);

    newDay.className = "schedule-day-item row py-2 py-lg-3";
    newDay.innerHTML = 
        `<div class="col-12 col-lg-2 label-over-border date-item d-flex align-items-center">
            <input type="hidden" class="id-schedule" value="${scheduleDay.id_horario ?? null}"">
            <p class="day fw-bold ps-2 ps-lg-0 pb-3 pb-lg-0">${scheduleDay.dia}</p>
        </div>
        <div class="col-5 col-lg-4 label-over-border date-item">
            <label for="edit-entry-${scheduleDay.id_horario}" class="form-label m-2">Entrada</label>
            <input type="time" class="form-control entry-time" id="edit-entry-${scheduleDay.id_horario}" value="${entrada}">
            <p class="entry-error invalid-feedback" style="color: red;"></p>
        </div>
        <div class="col-5 col-lg-4 label-over-border date-item">
            <label for="edit-exit-${scheduleDay.id_horario}" class="form-label m-2">Salida</label>
            <input type="time" class="form-control exit-time" id="edit-exit-${scheduleDay.id_horario}" value="${salida}">
            <p class="exit-error invalid-feedback" style="color: red;"></p>
        </div>
        <div class="col-2 label-over-border date-item d-flex align-items-center justify-content-center px-0 px-lg-2">
            <p class="schedule-total fw-bold px-2 py-1">${totalTime} hrs</p>
        </div>`;
        
    container.appendChild(newDay);
}