const seccionSeleccionar = document.getElementById("seleccionar-personaje");
const botonReiniciar = document.getElementById("btn-reiniciar");
const botonPersonajeJugador = document.getElementById("btn-select");

const personaJugador = document.getElementById("personaje-jugador");
const personaEnemy = document.getElementById("personaje-enemigo");
const botonShow = document.getElementById("btn-select");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

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
let victoriasJugador = 0
let victoriasEnemigo = 0
let indexAtaqueJugador
let indexAtaqueEnemigo
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
let allen = new Personaje("Allen", "./imagenes/ff7.png", 5, );
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
          boton.disabled = true
      } else if (e.target.textContent === '💦') {
          ataqueJugador.push('AGUA')
          console.log(ataqueJugador);
          boton.style.background = "#112f58"
          boton.disabled = true
      } else if (e.target.textContent === '🛬') {
          ataqueJugador.push('AIRE')
          console.log(ataqueJugador);
          boton.style.background = "#112f58" 
          boton.disabled = true
      } else {
          ataqueJugador.push('TIERRA')
          console.log(ataqueJugador);
          boton.style.background = "#112f58" 
          boton.disabled = true
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
    ataqueEnemigo.push("FUEGO")
  } else if (ataqueAleatorio == 2 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA")
  } else if (ataqueAleatorio == 5 || ataqueAleatorio== 6 ) {
    ataqueEnemigo.push("AIRE")
  } else {
    ataqueEnemigo.push("TIERRA")
  }
  console.log(ataqueEnemigo)
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate()
  }
}

function indexAmbosOponente(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

  for (let index = 0; index < ataqueJugador.length; index++) {
      if(ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponente(index, index) 
        crearMensaje("EMPATE");
      } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "AIRE") {
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasEnemigo.innerHTML = vidaEnemigo;
      } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
        indexAmbosOponente(index, index) 
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
        indexAmbosOponente(index, index) 
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else if (ataqueJugador[index] === "AIRE" && ataqueEnemigo[index] === "TIERRA") {
        indexAmbosOponente(index, index) 
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else {
        indexAmbosOponente(index, index) 
        crearMensaje("PERDISTE");
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
      }
    }
  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("!!!Esto es un Empate 👻");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicidades! Ganaste 😁");
  } else {
    crearMensajeFinal("Lo Sentimos, Perdiste 😥");
  }
}

function show() {
  let parrafo = document.getElementById("seleccionar-ataque");
  parrafo.style.display = "flex";
  parrafo.removeAttribute("hidden", "true");
}

function reinirciar() {
  let reiniciarMostrar = document.getElementById("reiniciar");
  reiniciarMostrar.removeAttribute("hidden", "false");
}

function crearMensaje(resultado) {
  let nuevoAtaquedelJugador = document.createElement("p");
  let nuevoAtaquedelEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  nuevoAtaquedelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo

  ataquesDelJugador.appendChild(nuevoAtaquedelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo);
  reinirciar()
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
