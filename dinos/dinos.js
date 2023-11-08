console.log("let's go dinos !")

// fonction pour ajouter un évênement clic
function addEvent (){
    let addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click", addDinos)

    let dinos = JSON.parse(localStorage.getItem("dinos")) || []
    createTable(dinos)
}

// fonction pour rajouter des dinos
function addDinos(){
    let nameValue = document.getElementById("name").value
    let sizeValue = document.getElementById("size").value
    let weightValue = document.getElementById("weight").value
    let foodValue = document.getElementById("food-select").value
    let habitatValue = document.getElementById("habitat").value
    let periodValue = document.getElementById("period-select").value

    // Objet JSON biscuit avec les propriétés et leurs valeurs
    let dino = {
        name : nameValue,
        size : sizeValue,
        weight : weightValue,
        food : foodValue,
        habitat : habitatValue,
        period : periodValue
    }

    let dinos = JSON.parse(localStorage.getItem("dinos")) || []

    if (localStorage.getItem("keymodif")){
        let modifelement = JSON.parse(localStorage.getItem("keymodif"))
        dinos.splice(modifelement[0],0, dino)
    }
    else{
        dinos.push(dino)
    }

    localStorage.setItem("dinos", JSON.stringify(dinos))
    createTable(dinos)
}

function createTable(dinono) { // dinono = tableau de dinos
    // Récupère l'élement body du tableau tbody
    let tBody = document.getElementById("mytBody")
    // Efface tous les éléments du tableau tbody
    // pour le reconstruire avec les valeurs de chaque input enregistrées dans dinos
    tBody.innerText = "" 

    dinono.forEach(element => { // pour chaque élément dino de dinono
        
        // création de rangée de tableau rattaché à mon tr
        let tRow = document.createElement("tr")

        let tdName = document.createElement("td")
        tdName.innerText = element.name
        tRow.appendChild(tdName)

        let tdSize = document.createElement("td")
        tdSize.innerText = element.size
        tRow.appendChild(tdSize)

        let tdWeight = document.createElement("td")
        tdWeight.innerText = element.weight
        tRow.appendChild(tdWeight)

        // select ?
        let tdFood = document.createElement("td")
        tdFood.innerHTML = element.food
        tRow.appendChild(tdFood)

        let tdHabitat = document.createElement("td")
        tdHabitat.innerText = element.habitat
        tRow.appendChild(tdHabitat)

        // select ?
        let tdPeriod = document.createElement("td")
        tdPeriod.innerHTML = element.period
        tRow.appendChild(tdPeriod)

        //Créer element td pour inclure les boutons Supprimer et Modifier
        let tdBtn = document.createElement("td")
        let btnSupp = document.createElement("button")//Créer Bouton Supprimer
        btnSupp.classList.add("btnJS")
        btnSupp.textContent = "Supprimer"
        let btnModif = document.createElement("button")//Créer Bouton Modifier
        btnModif.classList.add("btnJS")
        btnModif.textContent = "Modifier"

        btnSupp.addEventListener("click", function(){
            // fonction anonyme pour pouvoir supprimer ligne, élément dans lequel est le bouton Supprimer
                
                //Récupérer index de element qui va être supprimé (ligne/dino)
                let index = dinono.indexOf(element)
                //Supprimer dans tableau de l'element à supprimer (ligne/dino)
                dinono.splice(index, 1)
                //Stocker dans le local storage du nouveau tableau 
                localStorage.setItem("dinos", JSON.stringify(dinono))
                //Afficher table
                createTable(dinono)
            })

     //Déclencher evenement modifier ligne/personne
     btnModif.addEventListener("click", function(){
        //(fonction anonyme pour pouvoir modifier ligne,
        //element dans lequel est le bouton Modifier)
        //Réhydrater = Réinjecter dans input valeurs
        //pour que l'utilisateur puisse faire sa modification
        document.getElementById("name").value = element.name
        document.getElementById("size").value = element.size
        document.getElementById("weight").value = element.weight
        document.getElementById("food-select").value = element.food
        document.getElementById("habitat").value = element.habitat
        document.getElementById("period-select").value = element.period

        //Récupérer index de l'ancien élément
        let index = dinono.indexOf(element)
        //Stocker dans un tableau de l'ancien élément avec sa position dans le tableau
        let modifElem = [index, element]
        //Enregistrer ancien élément dans le local storage avec clé keymodif
        localStorage.setItem("keymodif", JSON.stringify(modifElem))
        //Supprimer dans tableau de l'ancien élément (ligne/dino)
        dinono.splice(index, 1)
        //Persister tableau sans l'ancien élément dans local storage
        localStorage.setItem("dinos", JSON.stringify(dinono))
        //Afficher le tableau
        createTable(dinono)
        
    })
    //Accrocher boutons Modifier et Supprimer à cellule (td) des boutons
    tdBtn.appendChild(btnModif)
    tdBtn.appendChild(btnSupp)
    
    //Accrocher cellule des boutons à la ligne (tr)
    tRow.appendChild(tdBtn)
    //Accrocher ligne (td) à tbody
    tBody.appendChild(tRow)
    })
}
addEvent()
