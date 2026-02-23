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
        megjelenitodiv.innerHTML += element.userId +  " " + `${element.id}` + " " + `${element.title}` + " " + `${element.completed} `+ "<br>"
    })
}

fetchData()