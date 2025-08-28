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

// Simulación de login
document.getElementById("loginSection").addEventListener("submit", e => {
  e.preventDefault();
  alert("Login exitoso ✅");
  window.location.href = "../index.html";
});

// Simulación de registro
document.getElementById("registerSection").addEventListener("submit", e => {
  e.preventDefault();
  alert("Usuario registrado correctamente 🎉");
  goBack();
});
