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

export function validateEditProduct(form) {
    // Referencias para validación
    const nameIn = document.getElementById('edit-name')
    const codeIn = document.getElementById('edit-code')
    const descriptionIn = document.getElementById('edit-description')
    // Referencias para errores
    const nameError = document.getElementById('error-editName')
    const codeError = document.getElementById('error-editCode')
    const descriptionError = document.getElementById('error-editDescription')

    // Validaciones
    textValidate(nameIn, nameError);
    codeValidate(codeIn, codeError);
    textValidate(descriptionIn, descriptionError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}