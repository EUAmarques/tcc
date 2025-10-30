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
