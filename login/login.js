// Mostrar formulario elegido
function showForm(type) {
  document.getElementById("choiceSection").classList.add("hidden");
  document.getElementById("loginSection").classList.toggle("hidden", type !== "login");
  document.getElementById("registerSection").classList.toggle("hidden", type !== "register");
}

// Volver al menú inicial
function goBack() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("choiceSection").classList.remove("hidden");
}

// Utilidades de storage
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
function setUsuarios(arr) {
  localStorage.setItem("usuarios", JSON.stringify(arr));
}
function setSesion(email) {
  localStorage.setItem("usuarioActivo", JSON.stringify({ email, time: Date.now() }));
}

// ------- VALIDAR EMAIL -------
function validarEmail(email) {
  // Debe tener algo antes del @, un @, algo después, y terminar en .com
  const regex = /^[^\s@]+@[^\s@]+\.com$/i;
  return regex.test(email);
}

// ------- LOGIN -------
document.getElementById("loginSection").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  if (!email || !password) return alert("Por favor, completa todos los campos.");

  // Validar email
  if (!validarEmail(email)) {
    alert("El correo debe contener '@' y terminar en '.com'");
    return;
  }

  const usuarios = getUsuarios();
  const match = usuarios.find(u => u.email === email && u.password === password);

  if (!match) {
    if (usuarios.some(u => u.email === email)) {
      alert("Contraseña incorrecta.");
    } else {
      alert("Usuario no registrado. Por favor, regístrate.");
      goBack(); showForm("register");
    }
    return;
  }

  alert("Login exitoso ✅");
  setSesion(email);
  location.href = "../index/index.html";

  /* Redirigir en 2 segundos no es funcional porque solo arranca despues de tocar el boton de la alerta
  setTimeout(() => {
    location.href = "index.html";
  }, 2000); */
});

// ------- REGISTRO -------
document.getElementById("registerSection").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value.trim();
  if (!email || !password) return alert("Por favor, completa todos los campos.");

  // Validar email
  if (!validarEmail(email)) {
    alert("El correo debe contener '@' y terminar en '.com'");
    return;
  }

  const usuarios = getUsuarios();
  if (usuarios.some(u => u.email === email)) {
    alert("Usuario ya registrado. Por favor, inicia sesión.");
    goBack(); showForm("login");
    return;
  }

    usuarios.push({ email, password });
  setUsuarios(usuarios);
  alert("Registro exitoso ✅");
  setSesion(email);
  location.href = "../index/index.html";

  /* Redirigir en 2 segundos mismo problema que en login
  setTimeout(() => {
    location.href = "index.html";
  }, 2000); */

});
