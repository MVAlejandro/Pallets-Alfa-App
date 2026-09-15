// Utilidades
import { timeValidate, inputValidate } from "../../../shared/utils/form-validations"

export function validateEditSchedule(form) {
    const scheduleItems = form.querySelectorAll('.schedule-day-item');

    for (const item of scheduleItems) {
        // Referencias para validación
        const entry = item.querySelector('.entry-time');
        const entryError = item.querySelector('.entry-error');
        // Referencias para errores
        const exit = item.querySelector('.exit-time');
        const exitError = item.querySelector('.exit-error');

        // Validaciones
        timeValidate(entry, entryError);
        timeValidate(exit, exitError);
    }

    return inputValidate(form.querySelectorAll('.entry-time, .exit-time'));
}

// Función para agrupar todos los datos de los inputs
export function getScheduleData(form) {
    const scheduleItems = form.querySelectorAll('.schedule-day-item');

    return Array.from(scheduleItems).map(item => ({
        id_horario: item.querySelector('.id-schedule').value,
        dia: item.querySelector('.day').textContent.trim(),
        entrada: item.querySelector('.entry-time').value,
        salida: item.querySelector('.exit-time').value
    }));
}