class form_register {
  idform = "registro-usuario";
  #options = [
    { id: 1, name: "Facebook" },
    { id: 2, name: "Instagram" },
    { id: 3, name: "Un Amigo" },
  ];
  constructor() {
    const formulario = document.getElementById("registro-usuario");
    formulario.addEventListener("submit", this.registrar.bind(this));
    let form = document.getElementById(this.idform);
    let fields = form.querySelectorAll('[data-validate="true"]');
    fields.forEach((field) => {
      field.addEventListener("keypress", this.change.bind(this));
      field.addEventListener("change", this.change.bind(this));
    });
    this.#show_option();
  }
  #show_option = function () {
    const select_tipos = document.querySelector("#select_tipos");
    this.#options.forEach((option) => {
      select_tipos.innerHTML += ` 
            <option value="${option.id}" >${option.name}</option>
        `;
    });
  };
  registrar = async function (event) {
    event.preventDefault();
    try {
      const idform = this.idform;
      const fv = new FormValidator(idform);
      if (await fv.init()) {
        let form_register = document.querySelector("#register-status");
        form_register.innerHTML = `
              <div class="class1 checkregister">
                <div >
                  <img src="./img/check.png" />
                  <h4>Te has registrado exitosamente</h4>
                </div>
              </div>
        `;
      }
      window.location.href = "#register-status";
    } catch (err) {
      window.location.href = "#register-status";
      console.log(err);
    }
  };
  change = function (event) {
    let rclass = document.querySelector(`.ew-${event.target.name}`);
    rclass.innerHTML = "";
  };
}
