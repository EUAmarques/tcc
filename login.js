async function handleLogin() {
  const namelogin = document.getElementById("namelogin").value
  const passwordlogin = document.getElementById("passwordlogin").value

  // Validate inputs
  if (!namelogin || !passwordlogin) {
    alert("Por favor, preencha todos os campos!")
    return
  }

  // Buscar usuários do localStorage
  const users = JSON.parse(localStorage.getItem("impoline_users")) || []

  // Verificar se usuário existe e senha está correta
  const user = users.find((u) => u.name === namelogin && u.password === passwordlogin)

  if (!user) {
    alert("Nome de usuário ou senha incorretos!")
    return
  }

  localStorage.setItem("impoline_logged_user", namelogin)

  alert("Login realizado com sucesso! Bem-vindo de volta!")
  window.location.href = "test.html"
}
