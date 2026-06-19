// Utilidades
import { textValidate, codeValidate, inputValidate } from "../../../shared/utils/form-validations"

export function validateCreateProduct(form) {
    // Referencias para validación
    const codeIn = document.getElementById('code')
    const nameIn = document.getElementById('name')
    const descriptionIn = document.getElementById('description')
    // Referencias para errores
    const codeError = document.getElementById('error-code')
    const nameError = document.getElementById('error-name')
    const descriptionError = document.getElementById('error-description')

    // Validaciones
    codeValidate(codeIn, codeError);
    textValidate(nameIn, nameError);
    textValidate(descriptionIn, descriptionError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}