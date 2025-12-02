document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  const contentSections = document.querySelectorAll(".content-section")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () { console.log("foi")
      const contentId = this.getAttribute("data-content")

      sidebarItems.forEach((i) => i.classList.remove("active"))
      contentSections.forEach((section) => section.classList.remove("active"))

      this.classList.add("active")
      document.getElementById(contentId).classList.add("active")

      if (window.innerWidth <= 768) {
        document.querySelector(".education-content").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
window.addEventListener('DOMContentLoaded', function() {
  const loggedUser = localStorage.getItem('impoline_logged_user');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.querySelector('a[href="login.html"]');
  const cadastroBtn = document.querySelector('a[href="cadastro.html"]');

  if (!logoutBtn || !loginBtn || !cadastroBtn) return;

  if (loggedUser) {
   
    logoutBtn.style.display = 'flex';
    loginBtn.style.display = 'none';
    cadastroBtn.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'flex';
    cadastroBtn.style.display = 'flex';
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('impoline_logged_user');
    alert('Você saiu da sua conta!');
    window.location.reload();
  });
});

document.querySelectorAll(".tax-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

