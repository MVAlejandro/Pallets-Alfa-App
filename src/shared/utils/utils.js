
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

// Función para cargar las fechas en el filtro con el uso de Flatpickr
export function loadDateFilter(input, useDefault = true) {
    const config = {
        locale: {
            ...flatpickr.l10ns.es,
            firstDayOfWeek: 0
        },
        mode: "range",
        dateFormat: "Y-m-d"
    };

    // Solo agregar fecha por defecto si se pide
    if (useDefault) {
        config.defaultDate = new Date();
    }

    flatpickr(input, config);
}