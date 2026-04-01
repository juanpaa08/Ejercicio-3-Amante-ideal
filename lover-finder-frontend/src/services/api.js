const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Create a new amante profile.
 * @param {{ nombre: string, edad: number, intereses: string[] }} data
 * @returns {Promise<Object>}
 */
export async function createAmante(data) {
    const res = await fetch(`${API_URL}/amantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(
            json.errors ? json.errors.join('\n') : json.error || 'Error al crear el perfil.'
        );
    }

    return json;
}

/**
 * Search amantes by interest.
 * @param {string} interes
 * @returns {Promise<Array>}
 */
export async function searchByInteres(interes) {
    const res = await fetch(
        `${API_URL}/amantes?interes=${encodeURIComponent(interes)}`
    );

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || 'Error al buscar amantes.');
    }

    return json;
}
