// Dependencias
import { flatpickr, Spanish } from './utils.js'

// Función para cargar datos completos en un select, si se pasa un valor seleccinoado se limpia el select
export async function loadOptions(selectId, getFunction, valueKey, textKey, selectedValue = '0') {
    const select = document.getElementById(selectId)
    if (!select) return

    if (selectedValue !== '0') {
        select.innerHTML = '';
    }
    
    // Obtener datos externos
    let data;
    try {
        data = await getFunction();
    } catch (error) {
        console.error('Error cargando opciones:', error);
        return;
    }

    data.forEach(item => {
        const option = document.createElement('option')
        option.value = item[valueKey]
        option.textContent = item[textKey]

        // Si el valor coincide, marcar como seleccionado
        if (selectedValue && item[valueKey] === selectedValue) {
            option.selected = true
        }

        select.appendChild(option)
    })
}

// Función para cargar datos en un select eliminando duplicados y permitiendo más de un valor a mostrar
export async function loadOptionsFilter(selectId, getFunction, valueKey, textKey, defaultOption, selectedId = 0) {
    const select = document.getElementById(selectId);
    if (!select) return;

    // Limpiar contenido previo
    select.innerHTML = '';

    // Obtener datos externos
    let data;
    try {
        data = await getFunction();
    } catch (error) {
        console.error('Error cargando opciones:', error);
        return;
    }

    // Opción por defecto
    const defaultOptionEl = document.createElement('option');
    defaultOptionEl.value = 0;
    defaultOptionEl.textContent = defaultOption;
    select.appendChild(defaultOptionEl);

    // Eliminar duplicados por texto
    const seenTexts = new Set();

    // Agregar opciones al select
    data.forEach(item => {
        let text;
        if (Array.isArray(textKey)) {
            text = textKey.map(f => item[f]).filter(Boolean).join(' - ');
        } else {
            text = item[textKey];
        }

        if (!text || seenTexts.has(text)) return;
        seenTexts.add(text);

        const optionEl = document.createElement('option');
        optionEl.value = item[valueKey];
        optionEl.textContent = text;

        // Marcar como seleccionado si coincide con selectedId
        if (item[valueKey] == selectedId) {
            optionEl.selected = true;
        }

        select.appendChild(optionEl);
    });
}

// Función para cargar las fechas en el filtro con el uso de Flatpickr en modo de rango
export function loadDateFilter(input, defaultValue = true) {
    const config = {
        locale: {
            ...Spanish,
            firstDayOfWeek: 0
        },
        weekNumbers: true,
        mode: "range",
        dateFormat: "Y-m-d"
    };

    // Solo agregar fecha por defecto si se pide o usar la que se pasa
    if (defaultValue === true) {
        config.defaultDate = [new Date(), new Date()];
    } else if (defaultValue) {
        config.defaultDate = defaultValue;
    }

    return flatpickr(input, config);
}
