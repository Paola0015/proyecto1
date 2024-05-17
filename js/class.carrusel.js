const izquierda = document.querySelector(".boton_izquierdo"),
    derecha = document.querySelector(".boton_derecho"),
    slider = document.querySelector("#frame"),
    sliderSection = document.querySelectorAll(".slider_section");

izquierda.addEventListener("click", e => moverIzquierda())
derecha.addEventListener("click", e => moverDerecha())

setInterval(() => {
    moverDerecha()
}, 5000);

let operacion = 0,
    contador = 0,
    ancho = 100 / sliderSection.length;

function moverDerecha() {
    if (contador >= sliderSection.length - 1) {
        contador = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    }
    contador++;
    operacion = operacion + ancho;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease-in 2s"

}

function moverIzquierda() {
    contador--;
    if (contador < 0) {
        contador = sliderSection.length - 1;
        operacion = ancho * (sliderSection.length - 1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    }
    operacion = operacion - ancho;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease-out 2s"
} 