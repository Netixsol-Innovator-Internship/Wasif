const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    window.onscroll = function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible", "translate-y-4");
        scrollToTopBtn.classList.add("opacity-100", "visible", "translate-y-0");
      } else {
        scrollToTopBtn.classList.add("opacity-0", "invisible", "translate-y-4");
        scrollToTopBtn.classList.remove("opacity-100", "visible", "translate-y-0");
      }
    };
    
    scrollToTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });