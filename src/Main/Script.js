export function handleNavToggle() {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navLinks = document.querySelectorAll(".nav-link");

  console.log("navMenu:", navMenu);
  console.log("navToggle:", navToggle);
  console.log("navClose:", navClose);
  console.log("navLinks:", navLinks);
  /*=============== SHOW MENU ===============*/
  /* validate if constant exists */
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add("show-menu");
    });
  }

  /*============== MENU HIDDEN ===============*/
  /* validate if constant exists */
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*=============== REMOVE MENU MOBILE ===============*/
  function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // when clicking on each nav link, it removes the show-menu class
    navMenu.classList.remove("show-menu");
  }

  navLinks.forEach(n => n.addEventListener('click', linkAction));

  /*=============== PORTFOLIO ITEM FILTER ===============*/
  const filterContainer = document.querySelector(".project-filter-inner"),
        filterBtns = filterContainer ? filterContainer.children : [],
        totalFilterBtn = filterBtns.length,
        projectItems = document.querySelectorAll(".project-item"),
        totalprojectItem = projectItems.length;

  if (filterContainer) {
    for (let i = 0; i < totalFilterBtn; i++) {
      filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalprojectItem; k++) {
          if (filterValue === projectItems[k].getAttribute("data-category")) {
            projectItems[k].classList.remove("hide");
            projectItems[k].classList.add("show");
          } else {
            projectItems[k].classList.add("hide");
            projectItems[k].classList.remove("show");
          }
          if (filterValue === "all") {
            projectItems[k].classList.remove("hide");
            projectItems[k].classList.add("show");
          }
        }
      });
    }
  }
}
