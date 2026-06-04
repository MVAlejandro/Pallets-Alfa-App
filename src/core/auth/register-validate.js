// Utilidades
import { nameValidate, emailValidate, passValidate, confirmPassValidate, inputValidate } from "../../shared/utils/form-validations";

export function validateRegister(form) {
    // Referencias para validación
    const fNameIn = form.querySelector('#fname-register');
    const sNameIn = form.querySelector('#sname-register');
    const emailIn = form.querySelector('#email-register');
    const passwordIn = form.querySelector('#password-register');
    const rePasswordIn = form.querySelector('#repassword-register');
    // Referencias para errores
    const fNameError = form.querySelector('#error-fnameReg');
    const sNameError = form.querySelector('#error-snameReg');
    const emailError = form.querySelector('#error-emailReg');
    const passwordError = form.querySelector('#error-passwordReg');
    const rePasswordError = form.querySelector('#error-repasswordReg');

    // Validaciones
    nameValidate(fNameIn, fNameError);
    nameValidate(sNameIn, sNameError);
    emailValidate(emailIn, emailError);
    passValidate(passwordIn, passwordError);
    confirmPassValidate(rePasswordIn, passwordIn, rePasswordError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}