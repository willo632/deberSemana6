// Gestión de órdenes - Crear orden
(function () {
    const clientes = Array.from(document.querySelectorAll("#clientesLista option"));
    const clienteBuscar = document.getElementById("clienteBuscar");
    const clienteId = document.getElementById("clienteId");
    const detalleOrden = document.getElementById("detalleOrden");
    const detalleInputs = document.getElementById("detalleInputs");
    const detalleVacio = document.getElementById("detalleVacio");
    const subtotalVista = document.getElementById("subtotalVista");
    const ivaVista = document.getElementById("ivaVista");
    const totalVista = document.getElementById("totalVista");
    const detalles = new Map();
    const moneda = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

    function actualizarClienteSeleccionado() {
        const seleccionado = clientes.find(item => item.value === clienteBuscar.value);
        clienteId.value = seleccionado ? seleccionado.dataset.id : "";
    }

    function renderDetalle() {
        detalleOrden.innerHTML = "";
        detalleInputs.innerHTML = "";

        let index = 0;
        let subtotal = 0;

        detalles.forEach((detalle, menuId) => {
            const subtotalItem = detalle.precio * detalle.cantidad;
            subtotal += subtotalItem;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${detalle.nombre}</td>
                <td>${detalle.cantidad}</td>
                <td>${moneda.format(subtotalItem)}</td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-outline-danger" data-remove="${menuId}">Quitar</button>
                </td>`;
            detalleOrden.appendChild(fila);

            detalleInputs.insertAdjacentHTML("beforeend", `
                <input type="hidden" name="Detalles[${index}].MenuId" value="${menuId}" />
                <input type="hidden" name="Detalles[${index}].Cantidad" value="${detalle.cantidad}" />`);
            index++;
        });

        const iva = subtotal * 0.15;
        detalleVacio.classList.toggle("d-none", detalles.size > 0);
        subtotalVista.textContent = moneda.format(subtotal);
        ivaVista.textContent = moneda.format(iva);
        totalVista.textContent = moneda.format(subtotal + iva);
    }

    clienteBuscar.addEventListener("input", actualizarClienteSeleccionado);
    clienteBuscar.addEventListener("change", actualizarClienteSeleccionado);
    document.querySelector("form").addEventListener("submit", actualizarClienteSeleccionado);

    document.querySelectorAll(".agregar-menu").forEach(boton => {
        boton.addEventListener("click", () => {
            const card = boton.closest(".menu-card");
            const cantidadInput = card.querySelector(".cantidad-menu");
            const cantidad = Number(cantidadInput.value);
            const menuId = boton.dataset.id;

            if (!cantidad || cantidad < 1) {
                cantidadInput.focus();
                return;
            }

            const actual = detalles.get(menuId);
            detalles.set(menuId, {
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio),
                cantidad: actual ? actual.cantidad + cantidad : cantidad
            });

            cantidadInput.value = 1;
            renderDetalle();
        });
    });

    detalleOrden.addEventListener("click", event => {
        const boton = event.target.closest("[data-remove]");
        if (!boton) {
            return;
        }

        detalles.delete(boton.dataset.remove);
        renderDetalle();
    });
})();
