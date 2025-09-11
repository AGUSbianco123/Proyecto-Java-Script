document.addEventListener("DOMContentLoaded", () => {
    console.log("Página principal del Concesionario cargada correctamente ✅");
});

// main.js
(function () {
  const isLoginPage = /login\.html$/i.test(location.pathname);

  // Lectura robusta del usuario activo (soporta string o JSON)
  function getUsuarioActivo() {
    const raw = localStorage.getItem("usuarioActivo");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      // Si alguna vez lo guardaste como string y lo parsea bien, puede venir como "correo"
      if (typeof parsed === "string") return { email: parsed };
      return parsed; // { email: "...", ... }
    } catch {
      // Si no es JSON, es un string simple (correo)
      return { email: raw };
    }
  }

  const usuario = getUsuarioActivo();

  // Reglas de navegación
  if (!usuario && !isLoginPage) {
    // No hay sesión y no estoy en login -> ir a login
    location.href = "login.html";
    return;
  }

  if (usuario && isLoginPage) {
    // Ya hay sesión y estoy en login -> opcional: mandar al home
    location.href = "index.html";
    return;
  }

  // Rellenar bloque de sesión (si existe en el DOM)
    document.addEventListener("DOMContentLoaded", () => {
    const userSession = document.querySelector(".user-session");
    const userInfo = document.getElementById("userInfo");
    const btnLogout = document.getElementById("btnLogout");

    if (usuario && userInfo && userSession) {
        userInfo.textContent = `Sesión activa: ${usuario.email}`;
        userSession.classList.remove("hidden"); // mostrar bloque
    } else if (userSession) {
        userSession.classList.add("hidden"); // ocultar bloque
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        location.href = "login.html";
        });
    }
    });
})();
