// Authentication utilities

// Save user session to localStorage
function saveUserSession(user) {
  localStorage.setItem(
    "impoline_user",
    JSON.stringify({
      id: user.id,
      name: user.name,
      loggedIn: true,
      timestamp: new Date().getTime(),
    }),
  )
}

// Get current user session
function getUserSession() {
  const userStr = localStorage.getItem("impoline_user")
  if (!userStr) return null

  try {
    const user = JSON.parse(userStr)
    // Check if session is still valid (24 hours)
    const now = new Date().getTime()
    const sessionAge = now - user.timestamp
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    if (sessionAge > maxAge) {
      clearUserSession()
      return null
    }

    return user
  } catch (e) {
    console.error("[v0] Error parsing user session:", e)
    return null
  }
}

// Clear user session
function clearUserSession() {
  localStorage.removeItem("impoline_user")
}

// Check if user is logged in
function isUserLoggedIn() {
  return getUserSession() !== null
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isUserLoggedIn()) {
    alert("Você precisa estar logado para acessar esta página!")
    window.location.href = "login.html"
    return false
  }
  return true
}

// Hash password (simple hash for demonstration - in production use bcrypt on server)
async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
