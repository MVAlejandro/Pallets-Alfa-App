
export function generateRegister() {
    const container = document.getElementById('login-container');

    container.innerHTML = 
        `<div class="card col-12 col-md-7 col-lg-3 p-4">
            <div class="card-body">
                <div id="login-logo" class="text-center">
                    <img src="./assets/images/logo.png" alt="Logo" class="m-2" style="height: 70px;">
                </div>
                <div class="text-center mb-4 mt-2">
                    <h2 class="card-title fw-bold">Pallets Alfa App</h2>
                    <p class="text-muted small">Registre sus datos</p>
                </div>
                <form id="register-form" class=" justify-content-center">
                    <div class="row">
                        <div class="col register mb-3">
                            <label for="fname-register" class="form-label fw-bold mb-1 ps-1">Nombre(s)</label>
                            <input type="text" id="fname-register" class="form-control" placeholder="Introduzca su(s) nombre(s)">
                            <p class="error invalid-feedback" id="error-fnameReg" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col register mb-3">
                            <label for="sname-register" class="form-label fw-bold mb-1 ps-1">Apellido(s)</label>
                            <input type="text" id="sname-register" class="form-control" placeholder="Introduzca su(s) apellido(s)">
                            <p class="error invalid-feedback" id="error-snameReg" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col register mb-3">
                            <label for="email-register" class="form-label fw-bold mb-1 ps-1">Correo</label>
                            <input type="email" id="email-register" class="form-control" placeholder="Introduzca su correo">
                            <p class="error invalid-feedback" id="error-emailReg" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col register mb-3">
                            <label for="password-register" class="form-label fw-bold mb-1 ps-1">Contraseña</label>
                            <input type="password" id="password-register" class="form-control" placeholder="Introduzca su contraseña">
                            <p class="error invalid-feedback" id="error-passwordReg" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col register mb-3">
                            <label for="repassword-register" class="form-label fw-bold mb-1 ps-1">Confirmación</label>
                            <input type="password" id="repassword-register" class="form-control" placeholder="Confirme su contraseña">
                            <p class="error invalid-feedback" id="error-repasswordReg" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="text-end mb-3">
                        <p id="login-change" class="small fw-semibold">Iniciar Sesión</p>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" id="btn-register" class="btn btn-primary fw-semibold">Registrarse</button>
                    </div>
                </form>
            </div>
            <div class="card-footer text-center pt-4 fw-semibold">
                <p>2026 Pallets Alfa Texcoco.</p>
                <p>Todos los derechos reservados.</p>
            </div>
        </div>`;
};