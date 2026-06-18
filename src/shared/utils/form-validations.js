
// Expresiones regulares para validación de datos
const idRegex = /^\d+$/ // Id de empleado
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Nombres y el apellidos
const textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.:,()\/\#-–— +]+$/; // Texto con algunos caracteres especiales
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/; // CURP
const rfcRegex = /^([A-Z&Ñ]{3,4})\d{6}[A-Z0-9]{3}$/; // RFC
const nssRegex = /^\d{11}$/; // NSS
const cpRegex = /^\d{5}$/ // Código postal
const amountRegex = /^\d+([-\.]\d{1,2})?$/ // Cantidades y precios
const phoneRegex = /^[1-9]\d{9}$/; // Número telefónico
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/; // Email
const passRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()\/\-–—_!@#$%^&*+=?:;'"{}[\]<>\|~`]+$/; // Contraseñas con signos comunes

// Función universal de validación para reutilizar en las diferentes variantes
export function validateFunction(input, error, regex, text) {
    error.textContent = '';
    input.classList.remove('is-invalid', 'is-valid');

    // Validar longitud del valor
    if (input.value.length < 3) {
        error.textContent = `El campo debe de tener al menos 3 caracteres`;
        input.classList.add('is-invalid');
    // Validar con regex
    } else if (!regex.test(input.value)) {
        error.textContent = text;
        input.classList.add('is-invalid');
    // Confirmar validación
    } else {
        error.textContent = '';
        input.classList.add('is-valid');
    }
}

// Función que valida que los códigos sean válidos
export function codeValidate(input, error) {
    validateFunction(input, error, textRegex, 'Código inválido');
}

// Función que valida que los campos sean solo letras y algunos caracteres especiales
export function textValidate(input, error) {
    validateFunction(input, error, textRegex, 'El campo no acepta caracteres especiales');
}

// Función que valida que los campos sean solo letras y que haya al menos 3 caracteres
export function nameValidate(input, error) {
    validateFunction(input, error, nameRegex, 'El campo no acepta caracteres especiales ni números');
}

// Función que valida que el ID sea correcto
export function idValidate (input, error){
    validateFunction(input, error, idRegex, 'El ID no es válido');
}

// Función que valida que la curp tenga un formato válido
export function curpValidate(input, error) {
    validateFunction(input, error, curpRegex, 'La CURP debe de cumplir con el formato válido');
}

// Función que valida que el rfc tenga un formato válido
export function rfcValidate(input, error) {
    validateFunction(input, error, rfcRegex, 'El RFC debe de cumplir con el formato válido');
}

// Función que valida que el nss tenga un formato válido
export  function nssValidate(input, error) {
    validateFunction(input, error, nssRegex, 'El NSS debe de cumplir con el formato válido');
}

// Función que valida que sea un número telefónico
export function phoneValidate(input, error) {
    validateFunction(input, error, phoneRegex, 'El número telefónico no es válido');
}

// Función que valida que el código postal sea correcto
export function cpValidate (input, error){
    validateFunction(input, error, cpRegex, 'El código postal no es válido');
}

// Función que valida que el costo sea válido
export function amountValidate (input, error){
    validateFunction(input, error, amountRegex, 'El dato no es válido');
}

// Función que valida que la cantidad sea menor al máximo establecido
export function quantityValidate(input, error, maxValue) {
    error.textContent = "";
    input.classList.remove("is-invalid", "is-valid");

    if(!amountRegex.test(input.value)){
        error.textContent=`El dato no es válido`;
        input.classList.add('is-invalid');
    } else if (input.value > maxValue) {
        error.textContent = `No puede exceder ${maxValue} unidades`;
        input.classList.add("is-invalid");

        input.value = maxValue;
    } else {
        error.textContent = '';
        input.classList.add('is-valid');
    }
}

// Función que valida que el correo tenga un formato válido
export  function emailValidate(input, error) {
    validateFunction(input, error, emailRegex, 'El correo debe de cumplir con el formato example@example.com');
}

// Función que valida los caracteres permitidos en contraseñas
export function passValidate(input, error) {
    validateFunction(input, error, passRegex, 'La contraseña no puede incluir caracteres especiales');
}

// Función que valida la confirmación de la contraseña
export function confirmPassValidate(data1, data2, error) {
    error.textContent = '';
    data1.classList.remove('is-invalid', 'is-valid');

    if (data1.value.length < 3) {
        error.textContent = `El campo debe de tener al menos 3 caracteres`;
        data1.classList.add('is-invalid');
    } else if (data1.value !== data2.value) {
        error.textContent=`Las contraseñas deben coincidir`;
        data1.classList.add('is-invalid');
    } else {
        error.textContent = '';
        data1.classList.add('is-valid');
    }
}

// Función que valida los inputs de fechas
export function dateValidate(input, error) {
    error.textContent = '';
    input.classList.remove('is-invalid', 'is-valid');

    if (input.value === "") {
        error.textContent = `Debe seleccionar una fecha valida`;
        input.classList.add('is-invalid');
    } else {
        error.textContent = '';
        input.classList.add('is-valid');
    }
}

// Función que valida los inputs de tiempo
export function timeValidate(input, error) {
    error.textContent = '';
    input.classList.remove('is-invalid', 'is-valid');

    if (input.value === "") {
        error.textContent = `Se debe indicar un horario`;
        input.classList.add('is-invalid');
        return false;
    } else {
        error.textContent = '';
        input.classList.add('is-valid');
        return true;
    }
}

// Función que valida que los inputs no sean inválidos
export function inputValidate(campos) {
    for (let campo of campos) {
        if (campo.classList.contains('is-invalid')) {
        return false;
        }
    }
    return true;
} 

// Función que valida la selección de una opción en selects
export function selectValidate(select, error) {
    error.textContent = '';
    select.classList.remove('is-invalid', 'is-valid');

    if (select.value === '0') {
        error.textContent = 'Se debe seleccionar una opción';
        select.classList.add('is-invalid');
        return false;
    } else {
        error.textContent = '';
        select.classList.add('is-valid');
        return true;
    }
}
