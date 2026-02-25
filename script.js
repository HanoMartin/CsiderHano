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
function megjelenit(lista) {
    listaElem.innerHTML = "";
    lista.forEach(feladat => {
        const kartya = document.createElement("div");
        kartya.classList.add("kartya");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = feladat.completed;
        checkbox.addEventListener("click", () => statuszValtas(feladat.id));

        const cim = document.createElement("p");
        cim.textContent = feladat.title;
        if (feladat.completed) cim.classList.add("completed");

        const user = document.createElement("small");
        user.textContent = "User: " + feladat.userId;

        const torlesGomb = document.createElement("button");
        torlesGomb.textContent = "Törlés";
        torlesGomb.addEventListener("click", () => torles(feladat.id));

        kartya.append(checkbox, cim, user, document.createElement("br"), torlesGomb);
        listaElem.appendChild(kartya);
    });
}

async function ujFeladatLetrehozas() {
    const cim = ujCimInput.value.trim();
    if (!cim) return;

    const valasz = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: cim,
            completed: false,
            userId: 1
        })
    });

    const uj = await valasz.json();
    feladatok.unshift(uj);
    megjelenit(feladatok);
    ujCimInput.value = "";
}

function statuszValtas(id) {
    const feladat = feladatok.find(f => f.id === id);
    feladat.completed = !feladat.completed;
    megjelenit(feladatok);
}

function torles(id) {
    feladatok = feladatok.filter(f => f.id !== id);
    megjelenit(feladatok);
}