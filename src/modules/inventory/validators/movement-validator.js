// Utilidades
import { amountValidate, excelValidate, inputValidate, selectValidate } from "../../../shared/utils/form-validations"

export function validateCreateMovement(form) {
    // Referencias para validación
    const typeIn = document.getElementById('type')
    const quantityIn = document.getElementById('quantity')
    // Referencias para errores
    const typeError = document.getElementById('error-type')
    const quantityError = document.getElementById('error-quantity')

    // Validaciones
    selectValidate(typeIn, typeError);
    amountValidate(quantityIn, quantityError);

    const campos = form.querySelectorAll('input, select');

    return inputValidate(campos);
}

export function validateExcelMovements(form) {
    // Referencias para validación y errores
    const excelDataIn = document.getElementById('excel-data')
    const excelDataError = document.getElementById('error-excel-data')

    // Validaciones
    excelValidate(excelDataIn, excelDataError)

    const campos = form.querySelectorAll('textarea');

    return inputValidate(campos);
}

export function validateEditMovement(form) {
    // Referencias para validación
    const quantityIn = document.getElementById('edit-type')
    const typeIn = document.getElementById('edit-quantity')
    // Referencias para errores
    const quantityError = document.getElementById('error-editType')
    const typeError = document.getElementById('error-editQuantity')

    // Validaciones
    selectValidate(typeIn, typeError);
    amountValidate(quantityIn, quantityError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}