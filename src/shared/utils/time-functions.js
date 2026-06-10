
// Función para separar el formato de tiempo en fecha y hora
export function splitDateTime(fechaTexto) {
    const [date, hour] = fechaTexto.trim().split(' ');
    const [day, month, year] = date.split('/');
    return { date: `${year}-${month}-${day}`, hour };
}

// Función para obtener las partes de una fecha
export function getDateParts(input = new Date()) {
    const date = input instanceof Date ? input : new Date(input);
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    // Semana ISO
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;

    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return {
        anio: date.getFullYear(),
        mes: date.getMonth() + 1,
        dia: date.getDate(),
        diaSemanaNum: date.getDay(),
        diaSemana: days[date.getDay()],

        semana: week,
        anioSemana: d.getUTCFullYear()
    };
}

// Función para darle formato al día de la semana
export function formatWeekDay(day) {
    const dias = {
        lunes: 'Lunes',
        martes: 'Martes',
        miercoles: 'Miércoles',
        jueves: 'Jueves',
        viernes: 'Viernes',
        sabado: 'Sábado',
        domingo: 'Domingo'
    };

    return dias[day] || null;
}

// Función auxiliar para convertir horas en minutos
export function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Función auxiliar para convertir minutos en horas
export function minutesToTime(mins) {
    const sign = mins < 0 ? '-' : '+';
    const hours = Math.floor(Math.abs(mins) / 60);
    const minutes = Math.abs(mins) % 60;

    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
