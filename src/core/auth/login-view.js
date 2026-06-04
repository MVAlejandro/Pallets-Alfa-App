
export function generateLogin() {
    const container = document.getElementById('login-container');

    container.innerHTML = 
        `<div class="card col-12 col-md-7 col-lg-3 p-4">
            <div class="card-body">
                <div id="login-logo" class="text-center">
                    <img src="./assets/images/logo.png" alt="Logo" class="m-2" style="height: 70px;">
                </div>
                <div class="text-center mb-4 mt-2">
                    <h2 class="card-title fw-bold">Pallets Alfa App</h2>
                    <p class="text-muted small">Ingrese sus datos</p>
                </div>
                <form id="login-form" class=" justify-content-center">
                    <div class="row">
                        <div class="col login mb-4">
                            <label for="email-login" class="form-label fw-bold mb-2 ps-1">Correo</label>
                            <input type="email" id="email-login" class="form-control" placeholder="Ingrese su correo">
                            <p class="error invalid-feedback" id="error-emailLog" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col login mb-3">
                            <label for="password-login" class="form-label fw-bold mb-2 ps-1">Contraseña</label>
                            <input type="password" id="password-login" class="form-control" placeholder="Ingrese su contraseña">
                            <p class="error invalid-feedback" id="error-passwordLog" style="color: red;"></p>
                        </div>
                    </div>
                    <div class="text-end mb-3">
                        <p id="login-change" class="small fw-semibold">Regístrate</p>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" id="btn-login" class="btn btn-primary fw-semibold">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
            <div class="card-footer text-center pt-4 fw-semibold">
                <p>2026 Pallets Alfa Texcoco.</p>
                <p>Todos los derechos reservados.</p>
            </div>
        </div>`;
};