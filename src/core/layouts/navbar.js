
// Crear barra superior
export function createBar() {
    const bar = document.getElementById("top-navbar");

    bar.innerHTML =
        `<a id="nav-title" class="col-md-3 col-lg-2 fw-bold me-0 px-3 py-1" href='/index.html' title="Inicio">Pallets Alfa Texcoco</a>
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
                    <button class="btn btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#catalog" aria-expanded="false">
                        <i class="bi bi-journal-bookmark"></i>
                        <p class="ps-3">Catálogos</p>
                    </button>
                    <div class="collapse" id="catalog">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="/app/catalog/dashboard.html" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Activos</a></li>
                            <li><a href="#" class="link-dark rounded">Clientes</a></li>
                            <li><a href="#" class="link-dark rounded">Empleados</a></li>
                            <li><a href="#" class="link-dark rounded">Refacciones</a></li>
                            <li><a href="/app/catalog/products.html" class="link-dark rounded">Productos</a></li>
                            <li><a href="#" class="link-dark rounded">Proveedores</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#shipments" aria-expanded="false">
                        <i class="bi bi-truck"></i>
                        <p class="ps-3">Embarques</p>
                    </button>
                    <div class="collapse" id="shipments">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Contratos</a></li>
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
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#inventory" aria-expanded="false">
                        <i class="bi bi-clipboard-check"></i>
                        <p class="ps-3">Inventario</p>
                    </button>
                    <div class="collapse" id="inventory">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="/app/inventory/dashboard.html" class="link-dark rounded">Inicio</a></li>
                            <li><a href="/app/inventory/movements.html" class="link-dark rounded">Movimientos</a></li>
                            <li><a href="/app/inventory/counts.html" class="link-dark rounded">Conteos</a></li>
                            <li><a href="/app/inventory/reports.html" class="link-dark rounded">Reportes</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#maintenance" aria-expanded="false">
                        <i class="bi bi-wrench"></i>
                        <p class="ps-3">Mantenimiento</p>
                    </button>
                    <div class="collapse" id="maintenance">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Tareas</a></li>
                            <li><a href="#" class="link-dark rounded">Planeación</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#rh" aria-expanded="false">
                        <i class="bi bi-people"></i>
                        <p class="ps-3">RRHH</p>
                    </button>
                    <div class="collapse" id="rh">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Horarios</a></li>
                            <li><a href="#" class="link-dark rounded">Asistencia</a></li>
                            <li><a href="#" class="link-dark rounded">Uniformes</a></li>
                            <li><a href="#" class="link-dark rounded">Permisos</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#support" aria-expanded="false">
                        <i class="bi bi-question-circle"></i>
                        <p class="ps-3">Soporte</p>
                    </button>
                    <div class="collapse" id="support">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Tickets</a></li>
                            <li><a href="#" class="link-dark rounded">Reportes</a></li>
                        </ul>
                    </div>
                </li>
                <li class="mb-1">
                    <button class="btn btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#sales" aria-expanded="false">
                        <i class="bi bi-graph-up"></i>
                        <p class="ps-3">Ventas</p>
                    </button>
                    <div class="collapse" id="sales">
                        <ul class="btn-toggle-nav pb-1 small">
                            <li><a href="#" class="link-dark rounded">Inicio</a></li>
                            <li><a href="#" class="link-dark rounded">Prospectos</a></li>
                            <li><a href="#" class="link-dark rounded">Actividades</a></li>
                            <li><a href="#" class="link-dark rounded">Planeación</a></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div id="user-bar" class="dropdown mt-auto">
                
            </div>
        </div>`;

        activePage()
}

// Marcar la pestaña activa en la navbar
function activePage() {
    const currentLocation = window.location.href;
    const module = currentLocation.split("/app/")[1].split("/")[0];
    const collapsedItems = document.querySelectorAll(".collapse");
    const menuItems = document.querySelectorAll(".link-dark");

    // Dejar desplegado el módulo actual
    collapsedItems.forEach(item => {
        if (item.id === module) {
            item.classList.add("show");
        }
    });

    // Marcar como activo el link de la página actual
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add("link-active");
        }
    });
}