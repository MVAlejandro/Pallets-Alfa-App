// Funciones backend
import { logout } from "../auth/logout/logout-service";

// Crear sección del usuario
export function createUserBar(user) {
    const bar = document.getElementById("user-bar");

    bar.innerHTML =
        `<hr>
        <a href="#" class="d-flex align-items-center justify-content-center dropdown-toggle" id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle icon-lg"></i>
            <p class="ps-3 fw-bold">${user.nombre} ${user.apellido[0]}</p>
        </a>
        <ul class="dropdown-menu dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="#" user-data='${JSON.stringify(user)}'>Perfil</a></li>
            <li><a id="logout-btn" class="dropdown-item" href="#">Cerrar Sesión</a></li>
        </ul>`;

    // Función para cerrar la sesión
    document.getElementById('logout-btn')?.addEventListener('click', async (e) => {
        e.preventDefault();

        try {

            await logout();

            await Swal.fire({
                title: 'Cierre de sesión exitoso.',
                padding: "3rem 3rem 5rem 3rem",
                icon: 'warning',
                timer: 1000,
                showConfirmButton: false
            });

            window.location.href = './login.html';

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: 'Error',
                text: 'No se pudo cerrar la sesión',
                icon: 'error'
            });
        }
    });
}