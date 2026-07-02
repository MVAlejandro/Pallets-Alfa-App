// Utilidades
import { amountValidate, excelValidate, inputValidate, selectValidate } from "../../../shared/utils/form-validations"

export function validateCreateCount(form) {
    // Referencias para validación
    const storeIn = document.getElementById('store')
    const productIn = document.getElementById('product')
    const quantityIn = document.getElementById('quantity')
    // Referencias para errores
    const storeError = document.getElementById('error-store')
    const productError = document.getElementById('error-product')
    const quantityError = document.getElementById('error-quantity')

    // Validaciones
    selectValidate(storeIn, storeError);
    selectValidate(productIn, productError);
    amountValidate(quantityIn, quantityError);

    const campos = form.querySelectorAll('input, select');

    return inputValidate(campos);
}

export function validateExcelCounts(form) {
    // Referencias para validación y errores
    const excelDataIn = document.getElementById('excel-data')
    const excelDataError = document.getElementById('error-excel-data')

    // Validaciones
    excelValidate(excelDataIn, excelDataError)

    const campos = form.querySelectorAll('textarea');

    return inputValidate(campos);
}

export function validateEditCount(form) {
    // Referencias para validación
    const quantityIn = document.getElementById('edit-quantity')
    // Referencias para errores
    const quantityError = document.getElementById('error-editQuantity')

    // Validaciones
    amountValidate(quantityIn, quantityError);

    const campos = form.querySelectorAll('input');

    return inputValidate(campos);
}