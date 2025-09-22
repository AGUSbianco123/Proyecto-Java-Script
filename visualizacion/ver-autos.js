const autosExtras = {
  Corolla: {
    img: "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_5f198c2718fb4374894a07d61d75e053.webp",
    desc: "El Toyota Corolla combina eficiencia, confort y tecnología de punta."
  },
  Camry: {
    img: "https://toyota.com.ar/img/Camry.png",
    desc: "El Camry es un sedán elegante, potente y con diseño sofisticado."
  },
  Hilux: {
    img: "https://toyota.com.ar/img/Hilux.png",
    desc: "La Hilux es la pick-up líder en durabilidad y rendimiento."
  }
  // Podés seguir agregando más modelos...
};


// ver-autos.js — carga JSONP desde CarQuery y renderiza tarjetas

// Helper: cargar JSONP mediante un <script> dinámico
function cargarCarQueryJSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "carquery_cb_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    // Defino la función global que CarQuery invocará
    window[callbackName] = function(data) {
      cleanup();
      resolve(data);
    };

    // Limpieza: remover script y callback
    function cleanup() {
      try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    const script = document.createElement("script");
    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + callbackName;
    script.onerror = function(err) {
      cleanup();
      reject(new Error("Error cargando script JSONP"));
    };
    document.body.appendChild(script);
  });
}

async function obtenerAutosPublicos() {
  // parámetros que quieras (podés hacer dinámico)
  const make = "Toyota";
  const year = 2020;
  const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}`;

  try {
    const data = await cargarCarQueryJSONP(url);
    // CarQuery devuelve algo con data.Trims (revisá en consola si quieres)
    if (!data || !data.Trims || !Array.isArray(data.Trims) || data.Trims.length === 0) {
      console.warn("CarQuery devolvió Trims vacío o mal formado:", data);
      return [];
    }

    // Mapear usando las claves reales de CarQuery
    const lista = data.Trims.map(auto => ({
      marca: auto.model_make_id || auto.make || "—",
      modelo: auto.model_name || auto.model || "—",
      año: auto.model_year || auto.year || "—"
    }));

    return lista;
  } catch (err) {
    console.error("Error al obtener autos de CarQuery:", err);
    return []; // fallback manejado por el que llamó la función
  }
}

function mostrarAutos(autos) {
  const cont = document.getElementById("vehiculosPublicos");
  cont.innerHTML = "";

  if (!autos || autos.length === 0) {
    cont.innerHTML = "<p>No se encontraron autos.</p>";
    return;
  }

  autos.forEach(auto => {
    const card = document.createElement("div");
    card.className = "card-publico";
    card.innerHTML = `
      <h3>${String(auto.marca).toUpperCase()} ${auto.modelo}</h3>
      <p>Año: ${auto.año}</p>
    `;

    // Al hacer click en la card → abrir modal
    card.addEventListener("click", () => {
      const extra = autosExtras[auto.modelo] || {
        img: "https://via.placeholder.com/400x250?text=Auto",
        desc: "Descripción no disponible."
      };

      document.getElementById("modalImg").src = extra.img;
      document.getElementById("modalTitulo").textContent = `${auto.marca} ${auto.modelo} (${auto.año})`;
      document.getElementById("modalDescripcion").textContent = extra.desc;

      document.getElementById("modalAuto").classList.remove("hidden");
    });

    cont.appendChild(card);
  });
}

// Cerrar modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalAuto");
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden"); // cerrar al hacer click afuera
  });
});


async function cargarYMostrarAutosConFallback() {
  const cont = document.getElementById("vehiculosPublicos");
  // dejar loader (ya lo tenés en el HTML)
  try {
    const autos = await obtenerAutosPublicos();
    if (!autos || autos.length === 0) {
      // Fallback: si API no devolvió nada, mostrar ejemplos locales
      console.warn("FALLBACK: usando datos de ejemplo porque CarQuery no devolvió autos.");
      const ejemplo = [
        { marca: "toyota", modelo: "Corolla", año: 2020 },
        { marca: "ford", modelo: "Mustang", año: 2019 },
        { marca: "chevrolet", modelo: "Camaro", año: 2018 }
      ];
      mostrarAutos(ejemplo);
    } else {
      mostrarAutos(autos);
    }
  } catch (err) {
    console.error("Error en el flujo de autos:", err);
    cont.innerHTML = "<p>Error al cargar autos. Probá reintentar más tarde.</p>";
  }
}

// Arrancar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  cargarYMostrarAutosConFallback();
});


function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "../login/login.html";
}

