function saveUser(name, password) {
  const users = getUsers()
  users.push({ name, password })
  localStorage.setItem("impoline_users", JSON.stringify(users))
}

function getUsers() {
  const users = localStorage.getItem("impoline_users")
  return users ? JSON.parse(users) : []
}

function userExists(name) {
  const users = getUsers()
  return users.some((user) => user.name === name)
}

function checkLogin(name, password) {
  const users = getUsers()
  return users.find((user) => user.name === name && user.password === password)
}

function login(name) {
  localStorage.setItem("impoline_logged_user", name)
}

function isLoggedIn() {
  return localStorage.getItem("impoline_logged_user") !== null
}

function getLoggedUser() {
  return localStorage.getItem("impoline_logged_user")
}

function logout() {
  localStorage.removeItem("impoline_logged_user")
  window.location.href = "login.html"
}
