const API = "https://jsonplaceholder.typicode.com/todos";

let feladatok = [];

const listaElem = document.getElementById("feladatLista");
const ujCimInput = document.getElementById("ujCim");
const hozzaadGomb = document.getElementById("hozzaadGomb");
const keresoInput = document.getElementById("kereso");
const temaGomb = document.getElementById("temaGomb");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

async function betoltFeladatok() {
    const valasz = await fetch(API);
    const adat = await valasz.json();
    feladatok = adat.slice(0, 15);
    megjelenit(feladatok);
}