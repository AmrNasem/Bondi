const navLinks = document.querySelectorAll("#nav-id .nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    if (navLink.getAttribute("href") === "#home") window.scrollTo(0, 0);
    navLinks.forEach((link) => link.classList.remove("active"));
    navLink.classList.add("active");
  });
});
