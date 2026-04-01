/**
 * DTO validation for creating an Amante.
 * Returns { errors: string[] | null, data: object | null }
 */
function validateCreateAmante(body) {
    const errors = [];

    // nombre
    if (!body.nombre || typeof body.nombre !== 'string' || body.nombre.trim() === '') {
        errors.push('El campo "nombre" es obligatorio y debe ser una cadena no vacía.');
    }

    // edad
    if (body.edad === undefined || body.edad === null) {
        errors.push('El campo "edad" es obligatorio.');
    } else if (!Number.isInteger(body.edad) || body.edad < 18) {
        errors.push('El campo "edad" debe ser un número entero mayor o igual a 18.');
    }

    // intereses
    if (!body.intereses) {
        errors.push('El campo "intereses" es obligatorio.');
    } else if (!Array.isArray(body.intereses) || body.intereses.length === 0) {
        errors.push('El campo "intereses" debe ser un arreglo con al menos un elemento.');
    } else {
        const allStrings = body.intereses.every(
            (item) => typeof item === 'string' && item.trim() !== ''
        );
        if (!allStrings) {
            errors.push('Cada interés debe ser una cadena no vacía.');
        }
    }

    if (errors.length > 0) {
        return { errors, data: null };
    }

    return {
        errors: null,
        data: {
            nombre: body.nombre.trim(),
            edad: body.edad,
            intereses: body.intereses.map((i) => i.trim().toLowerCase()),
        },
    };
}

module.exports = { validateCreateAmante };
