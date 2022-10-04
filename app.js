const seccionSeleccionar = document.getElementById("seleccionar-personaje");
const botonReiniciar = document.getElementById("btn-reiniciar");
const botonPersonajeJugador = document.getElementById("btn-select");

const personaJugador = document.getElementById("personaje-jugador");
const personaEnemy = document.getElementById("personaje-enemigo");
const botonShow = document.getElementById("btn-select");
const spanJugador = document.getElementById("vidas-jugador");
const spanEnemigo = document.getElementById("vidas-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById('contenedor-ataques')

let personajes = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePersonajes;
let vidaJugador = 3;
let vidaEnemigo = 3;
let inputYfryr
let inputWatta
let inputAllen
let inputGrowdo
let personajeJugador
let ataquesPersonaje
let botonAire
let botonTierra
let botonFuego 
let botonAgua 
let botones = []
let ataquesPersonajeEnemigo
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
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🛬", id: "btn-aire" },
  { nombre: "🌱", id: "btn-tierra" },
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
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🛬", id: "btn-aire" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
);

watta.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🛬", id: "btn-aire" },
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

     inputYfryr = document.getElementById("Yfryr");
     inputWatta = document.getElementById("Watta");
     inputAllen = document.getElementById("Allen");
     inputGrowdo = document.getElementById("Growdo");
  })

  botonPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador);
  botonShow.addEventListener("click", show);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarPersonajeJugador() {

  seccionSeleccionar.style.display = "none";
  
  if (inputYfryr.checked) {
   personaJugador.innerHTML = inputYfryr.id;
    personajeJugador = inputYfryr.id
  } else if (inputWatta.checked) {
    personaJugador.innerHTML = inputWatta.id;
    personajeJugador = inputWatta.id
  } else if (inputAllen.checked) {
    personaJugador.innerHTML = inputAllen.id;
    personajeJugador =  inputAllen.id
  } else if (inputGrowdo.checked) {
    personaJugador.innerHTML = inputGrowdo.id;
    personajeJugador = inputGrowdo.id
  } else {
    alert('Seleciona un personaje')  
  }
  extraerAtaques(personajeJugador)
  seleccionarPersonajeEnemigo();
}

function extraerAtaques(personajeJugador) {
  let ataques 
  for (let i = 0; i < personajes.length; i++) {
    if (personajeJugador === personajes[i].nombre) {
        ataques = personajes[i].ataques
    }    
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesPersonaje = `
    <button id=${ataque.id} class="btn-ataque BAtaque">${ataque.nombre}</button>`

    contenedorAtaques.innerHTML += ataquesPersonaje
  })

  botonFuego = document.getElementById("btn-fuego");
  botonAire = document.getElementById("btn-aire");
  botonAgua = document.getElementById("btn-agua");
  botonTierra = document.getElementById("btn-tierra");
  botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if(e.target.textContent === '🔥') {
          ataqueJugador.push('FUEGO')
          console.log(ataqueJugador);
          boton.style.background = "#112f58"
      } else if (e.target.textContent === '💦') {
          ataqueJugador.push('AGUA')
          console.log(ataqueJugador);
          boton.style.background = "#112f58"
      } else if (e.target.textContent === '🛬') {
          ataqueJugador.push('Aire')
          console.log(ataqueJugador);
          boton.style.background = "#112f58" 
      } else {
          ataqueJugador.push('TIERRA')
          console.log(ataqueJugador);
          boton.style.background = "#112f58" 
      }
      ataqueAleatorioEnemgio()
    })
  })
}

function seleccionarPersonajeEnemigo() {
  let personajeAleatorio = aleatorio(0, personajes.length -1);
  
  personaEnemy.innerHTML += personajes[personajeAleatorio].nombre
  ataquesPersonajeEnemigo = personajes[personajeAleatorio].ataques
  secuenciaAtaque()
}

function ataqueAleatorioEnemgio() {
  let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length -1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("Fuego")
  } else if (ataqueAleatorio == 2 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("Agua")
  } else if (ataqueAleatorio == 5 || ataqueAleatorio== 6 ) {
    ataqueEnemigo.push("AIRE")
  } else {
    ataqueEnemigo.push("TIERRA")
  }
  console.log(ataqueEnemigo)
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
