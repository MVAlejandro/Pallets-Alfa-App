// Importar el estadoo de los registros
import { productsState } from "./products-filter.js";

const perPage = 15;

// Función para crear la tabla y la paginación
export async function renderProductsTable() {
    const tbody = document.querySelector('#products-table tbody');
    const pagination = document.querySelector('#products-pages .pagination');
    const resultsText = document.getElementById('products-pages-results');

    // Calcular productos de la página actual
    const pageStart = (productsState.currentPage - 1) * perPage;
    const pageEnd = pageStart + perPage;
    const products = productsState.visibleRecords.slice(pageStart, pageEnd);

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!products || products.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="8">No hay productos registrados</td></tr>`;
        resultsText.textContent = `Mostrando 0 de ${products.length} resultados`;
        pagination.innerHTML = '';
        return;
    }

    products.forEach(producto => {
        tbody.innerHTML += 
        `<tr>
            <td class="product-code p-3 ps-4">${producto.codigo}</td>
            <td class="p-3">
                <p class="product-name">${producto.nombre}</p>
                <p class="product-description">${producto.descripcion}</p>
            </td>
            <td class="product-store p-3">${producto.almacenes || "Sin Asignar"}</td>
            <td class="product-controls text-pageEnd p-3 pe-4">
                <div class="action-buttons">
                    <button class="btn btn-edit" data-bs-target="#edit-modal" data-bs-toggle="modal" title="Editar producto"
                        product-data='${JSON.stringify(producto)}'>
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-delete" data-bs-target="#delete-modal" data-bs-toggle="modal" title="Eliminar producto"
                        data-id='${producto.id_producto}'>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    });

    // Actualizar texto de resultados
    const total = productsState.visibleRecords.length;
    resultsText.textContent = `Mostrando ${Math.min(pageStart + 1, total)} a ${Math.min(pageEnd, total)} de ${total} resultados`;

    // Crear paginación
    const totalPages = Math.ceil(total / perPage);
    pagination.innerHTML = '';

    // Corregir página inválida
    if (productsState.currentPage > totalPages) {
        productsState.currentPage = totalPages;
    }

    const maxVisible = 4; // máximo de botones visibles
    let startPage = Math.max(productsState.currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    // Botón Anterior
    pagination.innerHTML += 
        `<li class="page-item ${productsState.currentPage === 1 ? 'disabled' : ''}" data-page="prev">
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
            `<li class="page-item ${i === productsState.currentPage ? 'active' : ''}" data-page="${i}">
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
        `<li class="page-item ${productsState.currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="#">&gt;</a>
        </li>`;

    // Añadir los eventos de clic a la paginación
    pagination.querySelectorAll('.page-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const type = item.dataset.page;

            if (type === 'prev' && productsState.currentPage > 1) {
                productsState.currentPage--;
            } else if (type === 'next' && productsState.currentPage < totalPages) {
                productsState.currentPage++;
            } else if (!isNaN(parseInt(type))) {
                productsState.currentPage = parseInt(type);
            }

            renderProductsTable();
        });
    });
}