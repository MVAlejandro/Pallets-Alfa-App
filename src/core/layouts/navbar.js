
// Crear barra superior
export function createBar() {
    const bar = document.getElementById("top-navbar");

    bar.innerHTML =
        `<a id="nav-title" class="col-md-3 col-lg-2 fw-bold me-0 px-3 py-1" href="#">Pallets Alfa Texcoco</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#side-navbar" aria-controls="side-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>`;
}

// Crear navbar
export function createNavbar() {
    const navbar = document.getElementById("side-navbar");

    navbar.innerHTML =
        `<div class="p-3 d-flex flex-column h-100">
            <ul id="nav-list" class="ps-0 mb-auto">
                <li class="mb-1">
                    <button class="btn btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#clients-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8"/>
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                        </svg>
                        <p class="ps-2 pt-1">Clientes</p>
                    </button>
                    <div class="collapse" id="clients-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Prospectos</a></li>
                            <li><a href="#" class="link-dark rounded">Actividades</a></li>
                            <li><a href="#" class="link-dark rounded">Planeación</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#shipments-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                        </svg>
                        <p class="ps-2 pt-1">Embarques</p>
                    </button>
                    <div class="collapse" id="shipments-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Partidas</a></li>
                            <li><a href="#" class="link-dark rounded">Recolecciones</a></li>
                            <li><a href="#" class="link-dark rounded">Transportes</a></li>
                            <li><a href="#" class="link-dark rounded">Producción</a></li>
                            <li><a href="#" class="link-dark rounded">Embarques</a></li>
                            <li><a href="#" class="link-dark rounded">Facturación</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#inventory-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                        <p class="ps-2 pt-1">Inventario</p>
                    </button>
                    <div class="collapse" id="inventory-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Productos</a></li>
                            <li><a href="#" class="link-dark rounded">Movimientos</a></li>
                            <li><a href="#" class="link-dark rounded">Conteos</a></li>
                            <li><a href="#" class="link-dark rounded">Reportes</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#maintenance-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench" viewBox="0 0 16 16">
                            <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11z"/>
                        </svg>
                        <p class="ps-2 pt-1">Mantenimiento</p>
                    </button>
                    <div class="collapse" id="maintenance-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Activos</a></li>
                            <li><a href="#" class="link-dark rounded">Refacciones</a></li>
                            <li><a href="#" class="link-dark rounded">Proveedores</a></li>
                            <li><a href="#" class="link-dark rounded">Tareas</a></li>
                            <li><a href="#" class="link-dark rounded">Planeación</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#rh-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                        </svg>
                        <p class="ps-2 pt-1">RRHH</p>
                    </button>
                    <div class="collapse" id="rh-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Personal</a></li>
                            <li><a href="#" class="link-dark rounded">Horarios</a></li>
                            <li><a href="#" class="link-dark rounded">Asistencia</a></li>
                            <li><a href="#" class="link-dark rounded">Uniformes</a></li>
                            <li><a href="#" class="link-dark rounded">Permisos</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#support-collapse" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                        <p class="ps-2 pt-1">Soporte</p>
                    </button>
                    <div class="collapse" id="support-collapse">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Tickets</a></li>
                            <li><a href="#" class="link-dark rounded">Reportes</a></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div id="user-bar" class="dropdown mt-auto">
                
            </div>
        </div>`;
}
