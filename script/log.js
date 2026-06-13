

    const STORAGE_KEY = "users";

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function showMessage(msg, type = "error") {
  const el = document.getElementById("loginMessage");
  el.textContent = msg;
  el.className = type;
  el.style.display = "block";
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const senha = document.getElementById("senha")?.value.trim();

  if (!email || !senha) {
    showMessage("Preencha todos os campos!");
    return;
  }

  const users = getUsers();

  if (!users.length) {
    showMessage("Nenhum usuário cadastrado!");
    return;
  }

  const user = users.find(
    u => u.email === email && u.senha === senha
  );

  if (!user) {
    showMessage("E-mail ou senha inválidos!");
    return;
  }

  localStorage.setItem("loggedUser", JSON.stringify(user));

  showMessage("Login realizado com sucesso!", "success");

  setTimeout(() => {
    window.location.href = "/pages/index.html";
  }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("loginForm")
    .addEventListener("submit", handleLogin);
});