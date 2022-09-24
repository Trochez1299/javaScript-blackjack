function modulePatron() {
	"use strict";
	let e = [],
		f = ["C", "D", "H", "S"],
		g = ["A", "J", "Q", "K"],
		h = [],
		a = document.querySelector("#btnGet"),
		b = document.querySelector("#btnNewGame"),
		c = document.querySelector("#btnStop"),
		i = document.querySelectorAll(".divCartas"),
		j = document.querySelectorAll("small"),
		d = (d = 2) => {
			(e = k()), (h = []);
			for (let b = 0; b < d; b++) h.push(0);
			j.forEach((a) => (a.innerText = 0)),
				i.forEach((a) => (a.innerHTML = "")),
				(a.disabled = !1),
				(c.disabled = !1),
				console.log({ puntosJugadores: h });
		},
		k = () => {
			e = [];
			for (let a = 2; a <= 10; a++) for (let b of f) e.push(a + b);
			for (let c of g) for (let d of f) e.push(c + d);
			return _.shuffle(e);
		},
		l = () => {
			if (0 === e.length) throw "No hay cartas en el deck";
			return e.shift();
		},
		m = (b) => {
			let a = b.substring(0, b.length - 1),
				c = isNaN(a);
			return c ? ("A" === a ? 11 : 10) : parseInt(a);
		},
		n = (b, a) => ((h[a] = h[a] + m(b)), (j[a].innerText = h[a]), h[a]),
		o = (b, c) => {
			let a = document.createElement("img");
			(a.src = `assets/cartas/${b}.png`), a.classList.add("carta"), i[c].append(a);
		},
		p = () => {
			let [a, b] = h;
			setTimeout(() => {
				alert(b === a ? "Nadie Gano :(" : b > 21 ? "Bien, Ganaste" : "Gano la computadora");
			}, 100);
		},
		q = (a) => {
			let b = 0;
			do {
				let c = l();
				(b = n(c, h.length - 1)), o(c, h.length - 1);
			} while (b < a && a <= 21);
			p();
		};
	return (
		a.addEventListener("click", () => {
			let d = l(),
				b = n(d, 0);
			o(d, 0),
				b > 21
					? (console.warn("Lo siento mucho, perdiste"), (a.disabled = !0), (c.disabled = !0), q(b))
					: 21 === b && (console.warn("21, Genial"), (a.disabled = !0), (c.disabled = !0), q(b));
		}),
		c.addEventListener("click", () => {
			(a.disabled = !0), (c.disabled = !0), q(h[0]);
		}),
		b.addEventListener("click", () => {
			d();
		}),
		{ nuevoJuego: d }
	);
}
const juego1 = modulePatron();
