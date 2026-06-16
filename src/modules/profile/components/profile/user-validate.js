// Utilidades
import { nameValidate, emailValidate, inputValidate } from "../../../../shared/utils/form-validations";

export function validateUser(form) {
    // Referencias para validación
    const fNameIn = form.querySelector('#info-fname');
    const sNameIn = form.querySelector('#info-sname');
    const emailIn = form.querySelector('#info-email');
    // Referencias para errores
    const fNameError = form.querySelector('#error-info-fname');
    const sNameError = form.querySelector('#error-info-sname');
    const emailError = form.querySelector('#error-info-email');

    // Validaciones
    nameValidate(fNameIn, fNameError);
    nameValidate(sNameIn, sNameError);
    emailValidate(emailIn, emailError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}