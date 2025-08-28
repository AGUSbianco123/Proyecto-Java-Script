// Mostrar formulario elegido
function showForm(type) {
  document.getElementById("choiceSection").classList.add("hidden");
  if (type === "login") {
    document.getElementById("loginSection").classList.remove("hidden");
  } else {
    document.getElementById("registerSection").classList.remove("hidden");
  }
}

// Volver al menú inicial
function goBack() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("choiceSection").classList.remove("hidden");
}

// Array para simular usuarios registrados
const usuariosRegistrados = [];

// Simulación de login
document.getElementById("loginSection").addEventListener("submit", e => {
  e.preventDefault();
  const usuario = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  if (usuario === "" || password === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }
  // Verificar si el usuario está registrado
  const usuarioEncontrado = usuariosRegistrados.find(u => u.usuario === usuario && u.password === password);
  if (!usuarioEncontrado) {
    if (usuariosRegistrados.some(u => u.usuario === usuario)) {
      alert("Contraseña incorrecta.");
    } else {
      alert("Usuario no registrado. Por favor, regístrate.");
      goBack();
      showForm("register");
    }
    return;
  }
  alert("Login exitoso ✅");
  window.location.href = "../index.html";
});

// Simulación de registro
document.getElementById("registerSection").addEventListener("submit", e => {
  e.preventDefault();
  const usuario = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value.trim();
  if (usuario === "" || password === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }
  // Verificar si el usuario ya está registrado
  if (usuariosRegistrados.some(u => u.usuario === usuario)) {
    alert("Usuario ya registrado. Por favor, inicia sesión.");
    goBack();
    showForm("login");
    return;
  }
  usuariosRegistrados.push({ usuario, password });
  alert("Registro exitoso ✅");
  window.location.href = "../index.html";
});
// 