// Gerenciamento de navegação da área educativa
document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  const contentSections = document.querySelectorAll(".content-section")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () { console.log("foi")
      const contentId = this.getAttribute("data-content")

      // Remove active de todos os itens e seções
      sidebarItems.forEach((i) => i.classList.remove("active"))
      contentSections.forEach((section) => section.classList.remove("active"))

      // Adiciona active ao item clicado e à seção correspondente
      this.classList.add("active")
      document.getElementById(contentId).classList.add("active")

      // Scroll suave para o topo do conteúdo em mobile
      if (window.innerWidth <= 768) {
        document.querySelector(".education-content").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
