const navLinks = document.querySelectorAll("#nav-id .nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("active"));
    navLink.classList.add("active");
  });
});
