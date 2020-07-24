const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = document.getElementById("main")


// (1) get all trainers and their POKEMONS_URL
// user loads the page, should see all trainers with team of pokemon
function fetchTrainers() {
    fetch(TRAINERS_URL) 
        .then(obj => obj.json())
        .then(json => renderTeams(json))
    }

function renderTeams(trainers) {
    trainers.forEach(trainer => {
       // debugger
       main.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}" class="add-pokemon">Add Pokemon</button>
        <ul class="pokemon-list" data-trainer=${trainer.id}>
        </ul>
        </div>
        `
                                //data-trainer=${trainer.id} (((dataset)))
        // debugger
        let pokemonUl = document.querySelector(`[data-trainer = "${trainer.id}"]`)
        for(let pokemon of trainer.pokemons) {
            pokemonUl.innerHTML += `
            <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
            `
        }
    })
}


document.addEventListener("DOMContentLoaded", function(){
    fetchTrainers()
})


// (2) adding a pokemon 
// user hits 'add pokemon' 
// and they have space on their team
// buttons don't refresh page (has click property)

// click button 
// trainer.id (on button) sent to pokemon#create 
// nickname/species : randomly gen by faker
// Pokemon.new(trainer_id) (created)
// render json (getting that back to file as instance of json)
//second then statemtent creating <li> appending it to ul ((like above))



function addOrReleasePokemon(e) {
    if (e.target.className === "add-pokemon") {
        let trainerId = e.target.dataset.trainerId
        // debugger
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({
                "pokemon": {
                    "trainer_id": trainerId
                }
            })
        }
        
        fetch(POKEMONS_URL, configObj)
        .then(obj => obj.json())
        .then(json => {
            if (!!json.pokemon) {
            let pokemonUl = document.querySelector(`[data-trainer="${json.pokemon.trainer_id}"]`)
            
            pokemonUl.innerHTML += `
            <li>${json.pokemon.nickname} (${json.pokemon.species}) <button class="release" data-pokemon-id="${json.pokemon.id}">Release</button></li>
            `
            } else {
                alert(json.message)
            }
        })
// (3) releasing a pokemon
// user hits "Release Pokemon"
    } else if (e.target.className === "release") {
        // debugger
        let pokemonId = e.target.dataset.pokemonId
        // debugger
        let configObj = {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            }
        }
        fetch(POKEMONS_URL+`/${pokemonId}`, configObj)
        e.target.parentElement.remove()
    }

}

document.addEventListener('click', addOrReleasePokemon)


