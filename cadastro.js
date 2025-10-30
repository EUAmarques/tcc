async function handleRegister() {
  const name = document.getElementById("name").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password").value

  // Validar campos
  if (!name || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos!")
    return
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!")
    return
  }

  if (password.length < 8) {
    alert("A senha deve ter no mínimo 8 caracteres!")
    return
  }

  // Buscar usuários existentes
  const users = JSON.parse(localStorage.getItem("impoline_users")) || []

  // Verificar se usuário já existe
  const userExists = users.some((user) => user.name === name)
  if (userExists) {
    alert("Este nome de usuário já está cadastrado!")
    return
  }

  // Salvar novo usuário
  users.push({ name, password })
  localStorage.setItem("impoline_users", JSON.stringify(users))

  localStorage.setItem("impoline_logged_user", name)

  alert("Cadastro realizado com sucesso! Bem-vindo ao IMPOLINE!")
  window.location.href = "test.html"
}
