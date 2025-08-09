document.getElementById("menuToggle").addEventListener("click", function () {
    const menu = document.getElementById("mobileMenu");
    const icon = this.querySelector("i");

    menu.classList.toggle("hidden");

    if (menu.classList.contains("hidden")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }
  });