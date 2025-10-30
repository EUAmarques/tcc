// Salvar usuário no localStorage
function saveUser(name, password) {
  const users = getUsers()
  users.push({ name, password })
  localStorage.setItem("impoline_users", JSON.stringify(users))
}

// Buscar todos os usuários
function getUsers() {
  const users = localStorage.getItem("impoline_users")
  return users ? JSON.parse(users) : []
}

// Verificar se usuário existe
function userExists(name) {
  const users = getUsers()
  return users.some((user) => user.name === name)
}

// Verificar login
function checkLogin(name, password) {
  const users = getUsers()
  return users.find((user) => user.name === name && user.password === password)
}

// Fazer login (salvar sessão)
function login(name) {
  localStorage.setItem("impoline_logged_user", name)
}

// Verificar se está logado
function isLoggedIn() {
  return localStorage.getItem("impoline_logged_user") !== null
}

// Pegar usuário logado
function getLoggedUser() {
  return localStorage.getItem("impoline_logged_user")
}

// Fazer logout
function logout() {
  localStorage.removeItem("impoline_logged_user")
  window.location.href = "login.html"
}
