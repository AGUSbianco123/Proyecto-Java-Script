// ------------------------------
// CRUD VEHÍCULOS - Con LocalStorage
// ------------------------------

let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

// Elementos del DOM
const vehiculoForm = document.getElementById("vehiculoForm");
const vehiculosTable = document.getElementById("vehiculosTable");
const buscarInput = document.getElementById("buscarInput");
const mensajeError = document.getElementById("mensajeError");

// Función para renderizar la tabla
function renderTabla(lista = vehiculos) {
  vehiculosTable.innerHTML = "";
  lista.forEach((vehiculo, index) => {
    vehiculosTable.innerHTML += `
      <tr>
        <td>${vehiculo.marca}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.anio}</td>
        <td>$${vehiculo.precio}</td>
        <td>
          <button onclick="editarVehiculo(${index})">✏️ Editar</button>
          <button onclick="eliminarVehiculo(${index})">🗑️ Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Función para guardar en LocalStorage
function guardarDatos() {
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  renderTabla();
}

// Agregar o editar vehículo
vehiculoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("vehiculoId").value;
  const marca = document.getElementById("marca").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const anio = document.getElementById("anio").value;
  const precio = document.getElementById("precio").value;

  if (!marca || !modelo || !anio || !precio) {
    mensajeError.textContent = "⚠️ Todos los campos son obligatorios";
    return;
  }

  const nuevoVehiculo = { marca, modelo, anio, precio };

  if (id) {
    vehiculos[id] = nuevoVehiculo; // Editar
  } else {
    vehiculos.push(nuevoVehiculo); // Agregar
  }

  guardarDatos();
  vehiculoForm.reset();
  document.getElementById("vehiculoId").value = "";
  mensajeError.textContent = "";
});

// Editar vehículo
function editarVehiculo(index) {
  const v = vehiculos[index];
  document.getElementById("vehiculoId").value = index;
  document.getElementById("marca").value = v.marca;
  document.getElementById("modelo").value = v.modelo;
  document.getElementById("anio").value = v.anio;
  document.getElementById("precio").value = v.precio;
}

// Eliminar vehículo
function eliminarVehiculo(index) {
  if (confirm("¿Seguro que quieres eliminar este vehículo?")) {
    vehiculos.splice(index, 1);
    guardarDatos();
  }
}

// Buscar vehículo
buscarInput.addEventListener("input", () => {
  const filtro = buscarInput.value.toLowerCase();
  const filtrados = vehiculos.filter(
    v =>
      v.marca.toLowerCase().includes(filtro) ||
      v.modelo.toLowerCase().includes(filtro)
  );
  renderTabla(filtrados);
});

// Función cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "../login/login.html";
}

// Render inicial
renderTabla();

