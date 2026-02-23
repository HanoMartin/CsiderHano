let megjelenitodiv = document.getElementById("feladatLista");

async function fetchData() {
    try{
        const szerverValasz = await fetch("https://jsonplaceholder.typicode.com/todos")
        if (!szerverValasz.ok) {
            throw new Error("Hiba", szerverValasz.status);
        }
        const adat = await szerverValasz.json();
        megjelenites(adat)
    } catch (Error){
        console.log(Error)
    }
}

function megjelenites(adat) {
    adat.forEach(element => {
        const kesz = element.completed
        let card = document.createElement("card");
        card.classList.add("kartya")
        megjelenitodiv.append(card)
        card.innerHTML += element.userId +  " " + `${element.id}` + " " + `${element.title}` + " " + `${kesz} `+ "<br>"
    })


}

fetchData()