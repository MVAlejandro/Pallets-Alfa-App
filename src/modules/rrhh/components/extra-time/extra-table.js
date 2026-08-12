// Importar el estadoo de los registros
import { extraState } from "../schedule/schedule-module.js"; 
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";

// Función para crear la tabla de aprobación de tiempo extra
export async function renderPendingExtraTimeTable() {
    const tbody = document.querySelector('#extra-pending-table tbody');
    const pendingExtraTimes = extraState.allRecords.filter(e => e.estado_extra === "PENDIENTE");

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!pendingExtraTimes || pendingExtraTimes.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="2">Sin horas extra pendientes</td></tr>`;
        return;
    }

    pendingExtraTimes.forEach(extraT => {
        tbody.innerHTML +=
            `<tr>
                <td>
                    <p class="extra-date fw-bold">${extraT.fecha} - <span class="extra-time">${extraT.tiempo.slice(0, 5)}</span></p>
                    <P class="extra-observations">${extraT.observaciones}</P>
                </td>
                <td class="schedule-controls text-center">
                    <div class="action-buttons">
                        <button class="btn btn-edit btn-extra" title="Aprobar horas extra" extra-id='${extraT.id_extra}' staff-id='${extraT.empleado_id}'>
                            <i class="bi bi-check-lg icon-sm"></i>
                        </button>
                        <button class="btn btn-delete btn-extra" title="Denegar horas extra" extra-id='${extraT.id_extra}' staff-id='${extraT.empleado_id}'>
                            <i class="bi bi-x-lg icon-sm"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });

    // Validar permisos del usuario
    validatePermissions()
}

// Función para crear la tabla de aprobación de tiempo extra
export async function renderExtraTimeTable() {
    const perPage = 6;
    const filteredRecords = extraState.allRecords.filter(e => e.estado_extra != "PENDIENTE");

    const tbody = document.querySelector('#extra-revised-table tbody');
    const pagination = document.querySelector('#extra-pages .pagination');
    const resultsText = document.getElementById('extra-pages-results');
    const totalText = document.getElementById('time-text');

    // Calcular registros de la página actual
    const pageStart = (extraState.currentPage - 1) * perPage;
    const pageEnd = pageStart + perPage;
    const extraTimes = filteredRecords.slice(pageStart, pageEnd);

    // Actualizar visibleRecords del estado
    extraState.visibleRecords = extraTimes;

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!extraTimes || extraTimes.length === 0) {
        totalText.textContent = `Tiempo Total: 00:00`;
        tbody.innerHTML = `<tr><td class="text-center" colspan="3">Sin horas extra registradas</td></tr>`;
        resultsText.textContent = `Mostrando 0 de ${extraTimes.length} resultados`;
        pagination.innerHTML = '';
        return;
    }

    extraTimes.forEach(extraT => {
        tbody.innerHTML += `
        <tr>
            <td class="">
                <p class="extra-date">${extraT.fecha}</p>
                <P class="extra-time">${extraT.tiempo.slice(0, 5)}</P>
            </td>
            <td class="extra-observations fst-italic">${extraT.observaciones}</td>
            <td class="extra-status">${extraT.estado_extra}</td>
        </tr>`;
    });

    // Sumar tiempo
    let totalMinutes = 0;

    filteredRecords.forEach(extraT => {
        const [hours, minutes] = extraT.tiempo.split(':').map(Number);
        totalMinutes += (hours * 60) + minutes;
    });

    // Convertir minutos totales a HH:mm
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalTime = `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;

    // Agregar total de horas
    totalText.textContent = `Tiempo Total: ${totalTime}`;

    // Actualizar texto de resultados
    const total = filteredRecords.length;
    resultsText.textContent = `Mostrando ${Math.min(pageStart + 1, total)} a ${Math.min(pageEnd, total)} de ${total} resultados`;
    
    // Crear paginación
    const totalPages = Math.ceil(total / perPage);
    pagination.innerHTML = '';
    
    // Corregir página inválida
    if (extraState.currentPage > totalPages) {
        extraState.currentPage = totalPages;
    }
    
    const maxVisible = 4; // máximo de botones visibles
    let startPage = Math.max(extraState.currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisible + 1, 1);
    }
    
    // Botón Anterior
    pagination.innerHTML += 
        `<li class="page-item ${extraState.currentPage === 1 ? 'disabled' : ''}" data-page="prev">
            <a class="page-link" href="#">&lt;</a>
        </li>`;
    
    // Primera página + ...
    if (startPage > 1) {
        pagination.innerHTML += 
            `<li class="page-item" data-page="1"><a class="page-link" href="#">1</a></li>`;
        if (startPage > 2) {
            pagination.innerHTML += 
                `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Botones centrales
    for (let i = startPage; i <= endPage; i++) {
        pagination.innerHTML += 
            `<li class="page-item ${i === extraState.currentPage ? 'active' : ''}" data-page="${i}">
                <a class="page-link" href="#">${i}</a>
            </li>`;
    }
    
    // Última página + ...
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagination.innerHTML += 
                `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        pagination.innerHTML += 
            `<li class="page-item" data-page="${totalPages}"><a class="page-link" href="#">${totalPages}</a></li>`;
    }
    
    // Botón Siguiente
    pagination.innerHTML += 
        `<li class="page-item ${extraState.currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="#">&gt;</a>
        </li>`;
    
    // Añadir los eventos de clic a la paginación
    pagination.querySelectorAll('.page-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const type = item.dataset.page;
    
            if (type === 'prev' && extraState.currentPage > 1) {
                extraState.currentPage--;
            } else if (type === 'next' && extraState.currentPage < totalPages) {
                extraState.currentPage++;
            } else if (!isNaN(parseInt(type))) {
                extraState.currentPage = parseInt(type);
            }
    
            renderExtraTimeTable();
        });
    });
}