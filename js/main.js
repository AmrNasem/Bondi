const navLinks = document.querySelectorAll("#nav-id .nav-link");
const filters = document.querySelectorAll("#portfolio .filters li button");
const projectsList = document.querySelectorAll("#portfolio .projects > div");
const portfolio = document.getElementById("portfolio");
const sections = Array.from(document.getElementsByTagName("section"))
  .filter((sec) => sec.getAttribute("id"))
  .map((sec) => {
    return { distance: sec.offsetTop, height: sec.offsetHeight, id: sec.id };
  });

const activateLink = (links, link) => {
  links.forEach((li) => li.classList.remove("active"));
  link.classList.add("active");
};

const projectModal = (src, alt) => {
  const modal = document.createElement("div");
  modal.className = "my-modal position-fixed top-0 w-100 h-100";
  modal.onclick = () => {
    portfolio.removeChild(modal);
  };
  const project = document.createElement("div");
  project.className = "project p-3 position-relative top-50";

  const image = document.createElement("div");
  image.className = "image position-relative p-2 bg-white mx-auto";
  image.onclick = (e) => e.stopPropagation();

  const dismiss = document.createElement("button");
  dismiss.innerHTML = "&Cross;";
  dismiss.className =
    "dismiss btn fs-4 text-warning d-flex justify-content-center align-items-center rounded-pill position-absolute";
  dismiss.onclick = () => portfolio.removeChild(modal);

  const img = document.createElement("img");
  img.className = "w-100";
  img.src = src;
  img.alt = alt;

  image.append(dismiss, img);
  project.appendChild(image);
  modal.appendChild(project);
  return modal;
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.getAttribute("href") === "#home") window.scrollTo(0, 0);
    activateLink(navLinks, link);
  });
});

filters.forEach((link) => {
  link.addEventListener("click", () => {
    const projects = document.querySelector("#portfolio .projects");
    let newChildren = projectsList;
    if (link.getAttribute("key") !== "all") {
      newChildren = Array.from(projectsList).filter(
        (singleProject) =>
          link.getAttribute("key") === singleProject.dataset.category
      );
    }

    activateLink(filters, link);

    if (newChildren.length === 0) {
      const noProjectsAlert = document.createElement("div");
      noProjectsAlert.className = " text-center fs-3 alert alert-primary";
      noProjectsAlert.innerText = "No Projects Found!";
      projects.replaceChildren(noProjectsAlert);
    } else {
      projects.replaceChildren(...newChildren);
    }
  });
});

projectsList.forEach((project) =>
  project.addEventListener("click", () =>
    portfolio.prepend(
      projectModal(
        project.children[0].children[0].src,
        project.children[0].children[0].alt
      )
    )
  )
);

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    if (
      window.scrollY >= sec.distance - 3 ||
      window.scrollY + 1.2 * window.innerHeight >= sec.distance + sec.height
    ) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sec.id}`) {
          activateLink(navLinks, link);
        }
      });
    }
  });
});
