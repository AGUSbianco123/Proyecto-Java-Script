document.addEventListener("DOMContentLoaded", () => {
    console.log("Página principal del Concesionario cargada correctamente ✅");
});

(function () {
  // Lectura robusta del usuario activo
  function getUsuarioActivo() {
    const raw = localStorage.getItem("usuarioActivo");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") return { email: parsed };
      return parsed;
    } catch {
      return { email: raw };
    }
  }

  const usuario = getUsuarioActivo();

  document.addEventListener("DOMContentLoaded", () => {
    const userSession = document.querySelector(".user-session");
    const userInfo = document.getElementById("userInfo");
    const btnLogout = document.getElementById("btnLogout");
    const opcionesPrivadas = document.querySelectorAll(".requires-login");
    const loginBtn = document.getElementById("btnLogin");

    if (usuario) {
      // Mostrar sesión activa
      if (userInfo && userSession) {
        userInfo.textContent = `Sesión activa: ${usuario.email}`;
        userSession.classList.remove("hidden");
      }
      // Mostrar opciones privadas
      opcionesPrivadas.forEach(el => el.classList.remove("hidden"));
      // Ocultar botón login
      if (loginBtn) loginBtn.classList.add("hidden");
    } else {
      // Sin sesión
      if (userSession) userSession.classList.add("hidden");
      opcionesPrivadas.forEach(el => el.classList.add("hidden"));
      if (loginBtn) loginBtn.classList.remove("hidden");
    }

    // Logout
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        location.href = "index.html"; // volver al home en estado público
      });
    }
  });
})();
