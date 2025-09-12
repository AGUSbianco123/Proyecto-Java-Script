async function obtenerAutosPublicos() {
  try {
    const resp = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getTrims&year=2020&make=Toyota");
    const data = await resp.json();

    // CarQuery devuelve un objeto con trims
    return data.Trims.map(auto => ({
      marca: auto.make,
      modelo: auto.model_name,
      año: auto.year
    }));
  } catch (error) {
    console.error("Error al traer autos:", error);
    return [];
  }
}

function mostrarAutos(autos) {
  const cont = document.getElementById("vehiculosPublicos");
  cont.innerHTML = ""; // limpiar contenido

  if (autos.length === 0) {
    cont.innerHTML = "<p>No se encontraron autos.</p>";
    return;
  }

  autos.forEach(auto => {
    const card = document.createElement("div");
    card.className = "card-publico";
    card.innerHTML = `
      <h3>${auto.marca} ${auto.modelo}</h3>
      <p>Año: ${auto.año}</p>
    `;
    cont.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const autos = await obtenerAutosPublicos();
  mostrarAutos(autos);
});

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "../login/login.html";
}

