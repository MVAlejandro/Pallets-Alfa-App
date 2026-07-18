// Función para crear la card de diferencia
export async function renderDifferenceCard(summaries) {
    const element = document.getElementById("difference-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";

    // Determinar clase CSS para la diferencia
    let differenceClass = '';
    if (summaries.diferencia > 0) {
        differenceClass = 'text-success'; // Verde para positivo
    } else if (summaries.diferencia < 0) {
        differenceClass = 'text-danger';  // Rojo para negativo
    } else {
        differenceClass = 'text-muted';   // Gris para cero
    }

    if (!summaries || summaries.length === 0) {
        element.textContent = `-`;
        element.className = "general-report-cant text-muted"
        return;
    }

    // Generar el contenido
    element.textContent = `${summaries.diferencia.toLocaleString('en-US')}`;
    element.className = `general-report-cant ${differenceClass}`
}

// Función para crear la card de confiabilidad
export async function renderReliabilityCard(summaries) { 
    const element = document.getElementById("reliability-text");
    // Limpiar elemento antes de insertar
    element.textContent = "";
    element.className = "general-report-cant text-muted"

    // Determinar clase CSS para la confiabilidad
    let reliabilityClass = '';
    if (summaries.confiabilidad >= 95) {
        reliabilityClass = 'text-success'; // Excelente (95-100%)
    } else if (summaries.confiabilidad >= 85) {
        reliabilityClass = 'text-warning'; // Bueno (85-94%)
    } else {
        reliabilityClass = 'text-danger';  // Bajo (<85%)
    }

    if (!summaries || summaries.length === 0) {
        element.textContent = `-`;
        return;
    }

    // Generar el contenido
    element.textContent = `${summaries.confiabilidad.toLocaleString('en-US')}%`;
    element.className = `general-report-cant ${reliabilityClass}`;
}
