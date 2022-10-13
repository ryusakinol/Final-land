const seccionSeleccionar = document.getElementById("seleccionar-personaje");
const botonReiniciar = document.getElementById("btn-reiniciar");
const botonPersonajeJugador = document.getElementById("btn-select");

const personaJugador = document.getElementById("personaje-jugador");
const personaEnemigo = document.getElementById("personaje-enemigo");
const botonShow = document.getElementById("btn-select");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques")

const seccionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")

let jugadorId = null
let personajes = []
let personajesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDePersonajes;
let personajeJugadorObjeto
let personajeEnemigoObjeto
let vidaJugador = 3;
let vidaEnemigo = 3;
let inputYfry
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
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBack = new Image()
mapaBack.src = "./imagenes/mapa-final.jpg"
let atluraQuebuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 400

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}
atluraQuebuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = atluraQuebuscamos
class Personaje {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 50
    this.alto = 50
    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarPersonaje() {
    lienzo.drawImage(
      // Enemigo
    this.mapaFoto,
    this.x,
    this.y,
    this.ancho,
    this.alto,
    )
  }
}

let yfry = new Personaje("Yfry", "./imagenes/14-Squall-Leonhart-final.png", 5, "./imagenes/squall-map.png")
let growdo = new Personaje("Growdo", "./imagenes/laguna.png", 5, "./imagenes/laguna-map.png")
let allen = new Personaje("Allen", "./imagenes/ff7.png", 5, "./imagenes/s-map.png" )
let watta = new Personaje("Watta", "./imagenes/zack.png", 5,"./imagenes/zack-map.png")

const YFRY_ATAQUES = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🛬", id: "btn-aire" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
]
yfry.ataques.push(...YFRY_ATAQUES)

const GROWDO_ATAQUES = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🛬", id: "btn-aire" },
]
growdo.ataques.push(...GROWDO_ATAQUES)

const ALLEN_ATAQUES = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🛬", id: "btn-aire" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
]
allen.ataques.push(...ALLEN_ATAQUES)

const WATTA_ATAQUES = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💦", id: "btn-agua" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🌱", id: "btn-tierra" },
  { nombre: "🛬", id: "btn-aire" },
]
watta.ataques.push(...WATTA_ATAQUES)

personajes.push(yfry, growdo, allen, watta);

function iniciarJuego() {

  seccionSeleccionarAtaque.style.display = 'none'
  seccionVerMapa.style.display = 'none'

  personajes.forEach((personaje) => {
    opcionDePersonajes = `
    <input  type="radio" name="mascota" id=${personaje.nombre}>
    <label class="tarjeta-de-personaje " for=${personaje.nombre}>
      <p>${personaje.nombre}</p>
      <img src=${personaje.foto} alt=${personaje.nombre}>
    </label>
    `
    contenedorTarjetas.innerHTML += opcionDePersonajes

     inputYfry = document.getElementById("Yfry");
     inputWatta = document.getElementById("Watta");
     inputAllen = document.getElementById("Allen");
     inputGrowdo = document.getElementById("Growdo");
  })

  botonPersonajeJugador.addEventListener("click", seleccionarPersonajeJugador);

  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
      .then(function (res){
        if (res.ok) {
            res.text()
                .then(function (respuesta){
                  console.log(respuesta)
                  jugadorId = respuesta
                })
        }
      })
}

function seleccionarPersonajeJugador() {

  seccionSeleccionar.style.display = 'none'

  if (inputYfry.checked) {
   personaJugador.innerHTML = inputYfry.id;
    personajeJugador = inputYfry.id
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
  
  seleccionarPersonaje(personajeJugador)

  extraerAtaques(personajeJugador)
  seccionVerMapa.style.display = 'flex'
  iniciarMapa()
}

function seleccionarPersonaje(personajeJugador) {
    fetch(`http://localhost:8080/personaje/${jugadorId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personaje: personajeJugador
        })
    })
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
      ataqueAleatorioEnemigo()
    })
  })
}

function seleccionarPersonajeEnemigo(enemigo) {
  personaEnemigo.innerHTML = enemigo.nombre
  ataquesPersonajeEnemigo = enemigo.ataques
  secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length -1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO")
  } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
    ataqueEnemigo.push("AGUA")
  } else if (ataqueAleatorio == 4 || ataqueAleatorio == 5) {
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
        crearMensaje("EMPATE")
      } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "AIRE") {
        crearMensaje("GANASTE")
        victoriasJugador++
        spanVidasEnemigo.innerHTML = vidaEnemigo;
      } else if (ataqueJugador[index] === "AIRE" && ataqueEnemigo[index] === "AGUA") {
        indexAmbosOponente(index, index) 
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
        indexAmbosOponente(index, index) 
        crearMensaje("GANASTE");
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
      } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "TIERRA") {
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
  revisarVidas()
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("!!!Esto es un Empate 👻")
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicidades! Ganaste 😁")
  } else {
    crearMensajeFinal("Lo Sentimos, Perdiste 😥")
  }
}

function reinirciar() {
  let reiniciarMostrar = document.getElementById("reiniciar");
  reiniciarMostrar.removeAttribute("hidden", "false");
}

function crearMensaje(resultado) {
  let nuevoAtaquedelJugador = document.createElement("p")
  let nuevoAtaquedelEnemigo = document.createElement("p")

  seccionMensaje.innerHTML = resultado;
  nuevoAtaquedelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo

  ataquesDelJugador.appendChild(nuevoAtaquedelJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo)
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

function pintarCanvas() {
  personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
  personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBack,
    0,
    0,
    mapa.width,
    mapa.height
  )

  personajeJugadorObjeto.pintarPersonaje()
  
  enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)

  personajesEnemigos.forEach(function(personaje){
    personaje.pintarPersonaje()
  })
  if (personajeJugadorObjeto.velocidadX !== 0 || personajeJugadorObjeto.velocidadY !== 0) {
    revisarColision(yfryEnemigo)
    revisarColision(allenEnemigo)
    revisarColision(growdoEnemigo)
    revisarColision(wattaEnemigo)
  }
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/monterland/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x: x,
      y: y
    })
  })
  .then(function (res){
    if (res.ok) {
      res.json()
          .then(function({ enemigos }){
              console.log(enemigos)
              personajesEnemigos = enemigos.map(function(enemigo) {
              let personajeEnemigo = null
              const personajeNombre = enemigo.personaje.nombre || ""
              if (personajeNombre === "Yfry") {
                  personajeEnemigo = new Personaje("Yfry", "./imagenes/14-Squall-Leonhart-final.png", 5, "./imagenes/squall-map.png")
              } else if (personajeNombre === "Growdo") {
                  personajeEnemigo= new Personaje("Growdo", "./imagenes/laguna.png", 5, "./imagenes/laguna-map.png")
              } else if (personajeNombre === "Watta") {
                  personajeEnemigo = new Personaje("Watta", "./imagenes/zack.png", 5,"./imagenes/zack-map.png")
              } else if(personajeNombre === "Allen") {
                  personajeEnemigo = new Personaje("Allen", "./imagenes/ff7.png", 5, "./imagenes/s-map.png" )
              }
              personajeEnemigo.x = enemigo.x
              personajeEnemigo.y = enemigo.y
              
              return personajeEnemigo
            })
          })
    }
  })
}

function moverArriba() {
  personajeJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
  personajeJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
  personajeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  personajeJugadorObjeto.velocidadX = -5
}

function detenerMovimiento(){
  personajeJugadorObjeto.velocidadX = 0
  personajeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverArriba()
      break
    case 'ArrowDown':
      moverAbajo()
      break
    case 'ArrowRight':
      moverDerecha()
      break
    case 'ArrowLeft':
      moverIzquierda()
      break
    default:
      break;
  }
}
function iniciarMapa() {
  
  personajeJugadorObjeto = obtenerObjetoPersonaje(personaJugador)
  intervalo = setInterval(pintarCanvas, 50)

  window.addEventListener("keydown", sePresionoUnaTecla)
  
  window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoPersonaje() {
  for (let i = 0; i < personajes.length; i++) {
    if (personajeJugador === personajes[i].nombre) {
        return personajes[i]
    }    
  }
}

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaPersonaje = personajeJugadorObjeto.y
  const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
  const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
  const izquierdaPersonaje = personajeJugadorObjeto.x 

  if(
      abajoPersonaje < arribaEnemigo ||
      arribaPersonaje > abajoEnemigo ||
      derechaPersonaje < izquierdaEnemigo ||
      izquierdaPersonaje > derechaEnemigo
  ) {
    return
  }
  detenerMovimiento()
  clearInterval(intervalo)
  console.log('se detecto una colision');
  seccionSeleccionarAtaque.style.display = "flex"
  seccionVerMapa.style.display = "none"
  seleccionarPersonajeEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego);
