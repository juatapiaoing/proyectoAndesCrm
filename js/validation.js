/**
 * Valida que todos los campos requeridos de un formulario estén llenos
 * @param {string} formId - ID del formulario a validar
 * @returns {boolean} - Devuelve true si todos los campos están llenos, de lo contrario false
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            alert(`El campo ${input.name || 'sin nombre'} es obligatorio.`);
        }
    });

    return isValid;
}
