const clienteForm = document.getElementById("clienteForm");
const clientesTable = document.getElementById("clientesTable").querySelector("tbody");
const filterInput = document.getElementById("filterInput");

let clientes = [];

// Validar RUN
function validarRUN(run) {
    const regex = /^[0-9]+-[0-9kK]$/;
    if (!regex.test(run)) return false;

    const [numero, digito] = run.split("-");
    const numeros = numero.split("").reverse();
    let suma = 0;
    let factor = 2;

    for (const num of numeros) {
        suma += parseInt(num) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    const dvEsperado = dvCalculado === 10 ? "k" : dvCalculado === 11 ? "0" : String(dvCalculado);
    return dvEsperado === digito.toLowerCase();
}

// Validar Teléfono
function validarTelefono(telefono) {
    return /^\+569\d{8}$/.test(telefono);
}

// Agregar cliente
clienteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const run = event.target.run.value.trim();
    const telefono = event.target.telefono.value.trim();

    if (!validarRUN(run)) {
        alert("RUN inválido. Debe tener el formato 12345678-9.");
        return;
    }

    if (!validarTelefono(telefono)) {
        alert("Teléfono inválido. Debe tener el formato +56912345678.");
        return;
    }

    const nuevoCliente = {
        run,
        nombre: event.target.nombre.value.trim(),
        giro: event.target.giro.value.trim(),
        direccion: event.target.direccion.value.trim(),
        telefono,
        correo: event.target.correo.value.trim(),
    };

    clientes.push(nuevoCliente);
    renderClientes();
    clienteForm.reset();
});

// Renderizar clientes en la tabla
function renderClientes() {
    clientesTable.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${cliente.run}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.giro}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td>
                <button class="edit" onclick="editarCliente(${index})">Editar</button>
                <button class="delete" onclick="eliminarCliente(${index})">Eliminar</button>
            </td>
        `;

        clientesTable.appendChild(row);
    });
}

// Eliminar cliente
function eliminarCliente(index) {
    if (confirm("¿Seguro que desea eliminar este cliente?")) {
        clientes.splice(index, 1);
        renderClientes();
    }
}

// Editar cliente
function editarCliente(index) {
    const cliente = clientes[index];

    clienteForm.run.value = cliente.run;
    clienteForm.nombre.value = cliente.nombre;
    clienteForm.giro.value = cliente.giro;
    clienteForm.direccion.value = cliente.direccion;
    clienteForm.telefono.value = cliente.telefono;
    clienteForm.correo.value = cliente.correo;

    clientes.splice(index, 1);
    renderClientes();
}

// Filtrar clientes
filterInput.addEventListener("input", () => {
    const filtro = filterInput.value.toLowerCase();
    clientesTable.innerHTML = "";

    clientes
        .filter((cliente) =>
            Object.values(cliente).some((valor) =>
                valor.toLowerCase().includes(filtro)
            )
        )
        .forEach((cliente, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cliente.run}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.giro}</td>
                <td>${cliente.direccion}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.correo}</td>
                <td>
                    <button class="edit" onclick="editarCliente(${index})">Editar</button>
                    <button class="delete" onclick="eliminarCliente(${index})">Eliminar</button>
                </td>
            `;

            clientesTable.appendChild(row);
        });
});
