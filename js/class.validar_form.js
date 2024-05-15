class FormValidator {
  #status;
  constructor(formId) {
    this.#status = true;
    this.errors = [];
    this.formId = formId;
  }
  init = async function () {
    try {
      await this.#validateForm();
      if (this.#status) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      this.#show_errors();
      return false;
    }
  };
  #validateForm = function () {
    return new Promise((rest, err) => {
      let form = document.getElementById(this.formId);
      let fields = form.querySelectorAll('[data-validate="true"]');
      fields.forEach((field) => {
        const typex = field.getAttribute("typex");
        const type = field.getAttribute("type");
        const name = field.getAttribute("name");
        const minlength = parseInt(field.getAttribute("minlength"));
        const fieldValue = field.value.trim();
        switch (type) {
          case "file":
            const file = field.files[0];
            if (!file) {
              this.#status = false;
              this.errors.push({
                type: name,
                msj: `No se ha seleccionado ninguna imagen.`,
              });
            } else {
              if (!file.type.includes("image")) {
                this.#status = false;
                this.errors.push({
                  type: name,
                  msj: `El archivo seleccionado no es una imagen.`,
                });
              }
            }
            break;
          case "checkbox":
            if (!field.checked) {
              this.#status = false;
              this.errors.push({
                type: name,
                msj: `No puede estar vacío.`,
              });
            }
            break;
          case "radio":
            const opciones = document.querySelectorAll('input[name="radio"]');
            let seleccionado = false;
            opciones.forEach((opcion) => {
              if (opcion.checked) {
                seleccionado = true;
              }
            });
            if (!seleccionado) {
              this.#status = false;
              this.errors.push({
                type: name,
                msj: `Debes seleccionar al menos una opción.`,
              });
            }
            break;
          default:
            if (fieldValue === "") {
              this.#status = false;
              this.errors.push({
                type: name,
                msj: `No puede estar vacío.`,
              });
            } else {
              if (typex === "email" && !this.validateEmail(fieldValue)) {
                this.#status = false;
                this.errors.push({
                  type: name,
                  msj: `No es un correo electrónico válido.`,
                });
              }

              if (typex === "tel" && !this.validatePhone(fieldValue)) {
                this.#status = false;
                this.errors.push({
                  type: name,
                  msj: `No es un número de teléfono válido.`,
                });
              }

              if (typex === "number" && isNaN(fieldValue)) {
                this.#status = false;
                this.errors.push({
                  type: name,
                  msj: `Debe ser un número.`,
                });
              }

              if (minlength && fieldValue.length < minlength) {
                this.#status = false;
                this.errors.push({
                  type: name,
                  msj: `No puede tener menos de ${minlength} caracteres.`,
                });
              }
            }
            break;
        }
      });
      if (!this.#status) {
        err(false);
      } else {
        rest(true);
      }
    });
  };
  validateEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePhone = function (phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  #show_errors = function () {
    this.errors.forEach((xerr) => {
      console.table(xerr);
      let div_error = document.querySelector(`.ew-${xerr.type}`);
      div_error.innerHTML = xerr.msj;
    });
  };
}
