// Utilidades
import { emailValidate, passValidate, inputValidate } from "../../shared/utils/form-validations";

export function validateLogin(form) {
    // Referencias para validación
    const emailIn = form.querySelector('#email-login');
    const passwordIn = form.querySelector('#password-login');
    // Referencias para errores
    const emailError = form.querySelector('#error-emailLog');
    const passwordError = form.querySelector('#error-passwordLog');

    // Validaciones
    emailValidate(emailIn, emailError);
    passValidate(passwordIn, passwordError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}