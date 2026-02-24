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
    megjelenitodiv.innerHTML = ""; 

    adat.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("kartya");
        
        if (element.completed) {
            card.classList.add("completed");
        }

        card.textContent = `${element.title}  ${element.userId} ${element.completed}`;

        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.checked = element.completed

        check.addEventListener("change", function () {
            
            if (check.checked) {
                card.classList.add("completed");
                element.completed = "true";
            } else {
                card.classList.remove("completed");
                element.completed = "false";
            } 
            card.textContent = `${element.title}  ${element.userId} ${element.completed}`;
            card.append(check);
            card.append(torles)
        });

        const torles = document.createElement("button")
        torles.innerHTML = "Törlés"
        torles.style.marginLeft = "10px"

        torles.addEventListener("click", function () {
            card.remove()
        })
       
        card.append(check); 
        card.append(torles)
        megjelenitodiv.append(card);
    });
}

const valtozas = document.getElementById("temaGomb")
let sotet = false
valtozas.addEventListener("click", function () {
    
    if (!sotet) {
        document.body.classList.add("dark")
        sotet = true
    }
    else{
        document.body.classList.remove("dark")
        sotet = false
    }
})


fetchData()

