
// Función de llenado pare el header del perfil
export function ProfileHeader(user) {
    const userPicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const userId = document.getElementById('user-id');

    userPicture.src = user.foto || "../api/storage/employees/profile.jpg";
    userName.textContent = `${user.nombre} ${user.apellido}`;
    userRole.textContent = user.rol;
    userId.textContent = `ID-${user.id_usuario}`;
};

// Función de llenado para el formulario de la cuenta
export function ProfileUserInfo(user) {
    // Insertar valores en los inputs
    document.getElementById('info-fname').value = user.nombre;
    document.getElementById('info-sname').value = user.apellido;
    document.getElementById('info-email').value = user.email;
    document.getElementById('info-role').value = user.rol;
}

// Función de llenado para las cards de actividad
export function ProfileActivity(user) {
    // Insertar valores en los inputs
    document.getElementById('activity-date').textContent = `El usuario fue creado el ${user.fecha_creacion}`;
    document.getElementById('activity-last').textContent = `La última modificación fue el ${user.fecha_modificacion}`;
}