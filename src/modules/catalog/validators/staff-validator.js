// Utilidades
import { dateValidate, nameValidate, textValidate, idValidate, inputValidate, selectValidate } from "../../../shared/utils/form-validations"

export function validateStaffForm(form) {
    // Referencias para validación
    const eNumberIn = document.getElementById("emp-number");
    const nameIn = document.getElementById("name");
    const departamentIn = document.getElementById("departament");
    const positionIn = document.getElementById("position");
    const birthdayIn = document.getElementById("birthday");
    // Referencias para errores
    const eNumberError = document.getElementById("error-emp-number");
    const nameError = document.getElementById("error-name");
    const departamentError = document.getElementById("error-departament");
    const positionError = document.getElementById("error-position");
    const birthdayError = document.getElementById("error-birthday");

    // Validaciones
    idValidate(eNumberIn, eNumberError)
    nameValidate(nameIn, nameError)
    selectValidate(departamentIn, departamentError)
    textValidate(positionIn, positionError)
    dateValidate(birthdayIn, birthdayError)

    const campos = form.querySelectorAll('input, select');

    return inputValidate(campos);
}

export function validateStaffRemove(form) {
    // Referencias para validación
    const motiveIn = document.getElementById("remove-motive");
    const descriptionIn = document.getElementById("remove-description");
    const rehiringIn = document.getElementById("remove-rehiring");
    const reasonIn = document.getElementById("remove-reason");
    // Referencias para errores
    const motiveError = document.getElementById("error-remove-motive");
    const descriptionError = document.getElementById("error-remove-description");
    const rehiringError = document.getElementById("error-remove-rehiring");
    const reasonError = document.getElementById("error-remove-reason");
    
    // Validaciones
    selectValidate(motiveIn, motiveError)
    textValidate(descriptionIn, descriptionError)
    selectValidate(rehiringIn, rehiringError)
    textValidate(reasonIn, reasonError)

    const campos = form.querySelectorAll('input, select');

    return inputValidate(campos);
}