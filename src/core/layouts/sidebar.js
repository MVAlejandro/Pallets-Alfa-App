
// Crear sección del usuario
export function createUserBar() {
    const bar = document.getElementById("user-bar");

    bar.innerHTML =
        `<hr>
        <a href="#" class="d-flex align-items-center dropdown-toggle" id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle ms-2" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
            <strong class="ps-3 pt-1">Usuario</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#">Perfil</a></li>
            <li><a class="dropdown-item" href="#">Cerrar Sesión</a></li>
        </ul>`;
}