class Ecommer {
  #contenedor = document.querySelector("main");
  #ini_nav = "home";
  #listNav = [
    { id: 1, name: "home" },
    { id: 2, name: "about" },
    { id: 3, name: "services" },
    { id: 4, name: "contact_us" },
    { id: 5, name: "register" },
    { id: 6, name: "login" },
  ];
  constructor() {
    const toggle = document.querySelector(".show-menu");
    const toggleCancel = document.querySelector(".toggle-cancel");
    const toggleSerach = document.querySelector(".b-i-search");
    this.liMenu = document.querySelectorAll(".li-a");
    this.NavButton = document.querySelectorAll(".nav-a");
    toggle.onclick = this.toggleNavBar;
    toggleCancel.onclick = this.closetToggleNavBar;
    toggleSerach.onclick = this.showSearch;
    this.liMenu.forEach((link) => {
      link.addEventListener("click", this.nav.bind(this));
    });
    this.NavButton.forEach((link) => {
      link.addEventListener("click", this.navButton.bind(this));
    });
    this.#conteiner(this.#ini_nav);
  }
  toggleNavBar() {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.add("active");
  }
  closetToggleNavBar() {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.remove("active");
  }
  nav = async (event) => {
    try {
      event.preventDefault();
      this.liMenu.forEach((link) => {
        link.classList.remove("active");
      });
      const link = event.target;
      const next = await this.#verificar_nav(link.getAttribute("data-nav"));
      link.classList.add("active");
      this.closetToggleNavBar();
      this.#conteiner(next);
    } catch (err) {
      this.closetToggleNavBar();
    }
  };
  navButton = async (event) => {
    try {
      event.preventDefault();
      const link = event.target;
      const next = await this.#verificar_nav(link.getAttribute("data-nav"));
      link.classList.add("active");
      this.#conteiner(next);
    } catch (err) {
      this.closetToggleNavBar();
    }
  };
  #verificar_nav = function (xnav) {
    return new Promise((rest, err) => {
      if (this.#listNav.some((item) => item.id == xnav)) {
        let new_nav = this.#listNav.find((item) => item.id == xnav);
        rest(new_nav.name);
      } else {
        rest("home");
      }
    });
  };
  #conteiner = async function (url) {
    try {
      await this.#send(url);
    } catch (err) {
      await this.#send("main");
    }
  };
  #send = function (xurl) {
    return new Promise((rest, err) => {
      var xhr = new XMLHttpRequest();
      var url = `./components/${xurl}.html`;
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.#contenedor.innerHTML = xhr.responseText;
          rest(true);
        } else {
          err("Error al cargar el contenido:", xhr.statusText);
        }
      };
      xhr.onerror = () => {
        err("Error de red al cargar el contenido.");
      };
      xhr.send();
      rest(true);
    });
  };
  showSearch = function () {
    const biSearch = document.querySelector(".b-i-search");
    const search = document.querySelector(".search");
    if (!search.classList.contains("d-none")) {
      biSearch.innerHTML = "search";
      search.classList.add("d-none", "active");
    } else {
      biSearch.innerHTML = "search_off";
      search.classList.remove("d-none", "active");
    }
  };
}
document.addEventListener("DOMContentLoaded", () => {
  const ecommer = new Ecommer();
});
