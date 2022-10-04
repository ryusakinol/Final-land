const seccionSeleccionar = document.getElementById("seleccionar-personaje");
const botonMascotaJugador = document.getElementById("btn-select");
const botonReiniciar = document.getElementById("btn-reinirciar");
const botonShow = document.getElementById("btn-select");
const botonFuego = document.getElementById("btn-fuego");
const botonAgua = document.getElementById("btn-agua");
const botonAire = document.getElementById("btn-aire");
const botonTierra = document.getElementById("btn-tierra");
const spanMonstroEnemy = document.getElementById("monstro-enemigo");



const monstroJugador = document.getElementById("monstro-jugador");

const spanJugador = document.getElementById("vidas-jugador");
const spanEnemigo = document.getElementById("vidas-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let personajes = []
let ataqueJugador;
let ataqueEnemigo;
let opcionDePersonajes;
let vidaJugador = 3;
let vidaEnemigo = 3;
let inputYfryr
let inputWatta
let inputAllen
let inputGrowdo

class Personaje {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let yfryr = new Personaje("Yfryr", "./imagenes/14-Squall-Leonhart-final.png", 5);
let growdo = new Personaje("Growdo", "./imagenes/laguna.png", 5);
let allen = new Personaje("Allen", "./imagenes/ff7.png", 5);
let watta = new Personaje("Watta", "./imagenes/zack.png", 5);

yfryr.ataques.push(
  { nombre: "🩸", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🛬", id: "btn-aire" },
  { nombre: "🩸", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
);

growdo.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🛬", id: "btn-aire" },
);

allen.ataques.push(
  { nombre: "🩸", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
);

watta.ataques.push(
  { nombre: "🩸", id: "btn-fuego" },
  { nombre: "🩸", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🩸", id: "btn-fuego" },
);

personajes.push(yfryr, growdo, allen, watta);

function iniciarJuego() {

  seccionSeleccionar.style.display = "flex";

  personajes.forEach((personaje) => {
    opcionDePersonajes = `
    <input  type="radio" name="mascota" id=${personaje.nombre}>
    <label class="tarjeta-de-personaje " for=${personaje.nombre}>
      <p>${personaje.nombre}</p>
      <img src=${personaje.foto} alt=${personaje.nombre}>
    </label>
    `
    contenedorTarjetas.innerHTML += opcionDePersonajes
      // console.log(personaje);

     inputYfryr = document.getElementById("Yfryr");
     inputWatta = document.getElementById("Watta");
     inputAllen = document.getElementById("Allen");
     inputGrowdo = document.getElementById("Growdo");
  })

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonShow.addEventListener("click", show);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonAire.addEventListener("click", ataqueAire);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {

  seccionSeleccionar.style.display = "none";
  
  if (inputYfryr.checked) {
    monstroJugador.innerHTML = inputYfryr.id;
  } else if (inputWatta.checked) {
    monstroJugador.innerHTML = inputWatta.id;
  } else if (inputAllen.checked) {
    monstroJugador.innerHTML = inputAllen.id;
  } else if (inputGrowdo.checked) {
    monstroJugador.innerHTML = inputGrowdo.id;
  } else {
  }
  seleccionarPersonajeEnemigo();
}

function seleccionarPersonajeEnemigo() {
  let MonstroAleatorio = aleatorio(0, personajes.length -1);
  
  spanMonstroEnemy.innerHTML = personajes[MonstroAleatorio].nombre
}

// ATAQUE JUGADOR
function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioEnemgio();
}
function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioEnemgio();
}
function ataqueAire() {
  ataqueJugador = "Aire";
  ataqueAleatorioEnemgio();
}
function ataqueTierra() {
  ataqueJugador = "Tierra";
  ataqueAleatorioEnemgio();
}

function ataqueAleatorioEnemgio() {
  let ataqueAleatorio = aleatorio(1, 4);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "Agua";
  } else if (ataqueAleatorio == 3) {
    ataqueEnemigo = "Aire";
  } else {
    ataqueEnemigo = "Tierra";
  }
  combate();
}

function show() {
  let parrafo = document.getElementById("seleccionar-ataque");
  parrafo.style.display = "flex";
  parrafo.removeAttribute("hidden", "true");
}

function combate() {
  // COMBATE
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") {
    crearMensaje("GANASTE");
    vidaEnemigo--;
    spanEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") {
    crearMensaje("GANASTE");
    vidaEnemigo--;
    spanEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Aire") {
    crearMensaje("GANASTE");
    vidaEnemigo--;
    spanEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "Aire" && ataqueEnemigo == "Agua") {
    crearMensaje("GANASTE");
    vidaEnemigo--;
    spanEnemigo.innerHTML = vidaEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidaJugador--;
    spanJugador.innerHTML = vidaJugador;
  }
  revisarVidas();
}

function revisarVidas() {
  if (vidaEnemigo == 0) {
    crearMensajeFinal("Felicidades! Ganaste 😁");
    reinirciar();
  } else if (vidaJugador == 0) {
    crearMensajeFinal("Lo sentimos, Perdiste 😥");
    reinirciar();
  }
}

function reinirciar() {
  let reiniciarMostrar = document.getElementById("reiniciar");
  reiniciarMostrar.removeAttribute("hidden", "false");
}

function crearMensaje(resultado) {
  let nuevoAtaquedelJugador = document.createElement("p");
  let nuevoAtaquedelEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  nuevoAtaquedelJugador.innerHTML = ataqueJugador;
  nuevoAtaquedelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaquedelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonAire.disabled = true;
  botonTierra.disabled = true;
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
