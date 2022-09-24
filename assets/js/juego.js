function modulePatron() {
	"use strict";

	let deck = [];
	const tipos = ["C", "D", "H", "S"],
		especiales = ["A", "J", "Q", "K"];

	let puntosJugadores = [];

	// Referencias del HTML
	const btnGet = document.querySelector("#btnGet"),
		btnNewGame = document.querySelector("#btnNewGame"),
		btnStop = document.querySelector("#btnStop"),
		divCartasJugador = document.querySelectorAll(".divCartas"),
		puntosHTML = document.querySelectorAll("small");

	// Esta función incializa el juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
		puntosHTML.forEach((elem) => (elem.innerText = 0));
		divCartasJugador.forEach((elem) => (elem.innerHTML = ""));

		btnGet.disabled = false;
		btnStop.disabled = false;
		console.log({ puntosJugadores });
	};

	// Se creo la deck para empezar el juego
	const crearDeck = () => {
		deck = [];
		for (let i = 2; i <= 10; i++) {
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
		}

		for (let esp of especiales) {
			for (let tipo of tipos) {
				deck.push(esp + tipo);
			}
		}

		return _.shuffle(deck);
	};

	// Del deck saca la primera carta y la elimina del deck para no estar repetida
	const pedirCarta = () => {
		if (deck.length === 0) {
			throw "No hay cartas en el deck";
		}
		return deck.shift();
	};

	// Saca el valor de la carta
	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);
		const booleanValor = isNaN(valor);
		return booleanValor ? (valor === "A" ? 11 : 10) : parseInt(valor);
	};

	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement("img"); // Se crea la etiqueta
		imgCarta.src = `assets/cartas/${carta}.png`; // Se le ingresa la imagen a la etiqueta en su src
		imgCarta.classList.add("carta"); // Se le añade la clase carta a imgCarta
		divCartasJugador[turno].append(imgCarta);
	};

	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;

		setTimeout(() => {
			alert(
				puntosComputadora === puntosMinimos
					? "Nadie Gano :("
					: puntosComputadora > 21
					? "Bien, Ganaste"
					: puntosMinimos > 21
					? "Gano la computadora"
					: "Gano la computadora"
			);
		}, 100);
	};

	// Turno computadora
	const turnoComputadora = (puntosMinimos) => {
		let puntosComputadora = 0;

		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			crearCarta(carta, puntosJugadores.length - 1);
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
		determinarGanador();
	};

	// Eventos
	btnGet.addEventListener("click", () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);
		crearCarta(carta, 0);

		if (puntosJugador > 21) {
			console.warn("Lo siento mucho, perdiste");
			btnGet.disabled = true;
			btnStop.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			console.warn("21, Genial");
			btnGet.disabled = true;
			btnStop.disabled = true;
			turnoComputadora(puntosJugador);
		}
	});

	btnStop.addEventListener("click", () => {
		btnGet.disabled = true;
		btnStop.disabled = true;
		turnoComputadora(puntosJugadores[0]);
	});

	btnNewGame.addEventListener("click", () => {
		inicializarJuego();
	});

	return {
		nuevoJuego: inicializarJuego,
	};
}

const juego1 = modulePatron();
