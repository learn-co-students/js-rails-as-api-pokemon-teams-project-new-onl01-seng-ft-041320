const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.getElementsByTagName("main")[0]

function indexTrainers() {
    return fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
            object.forEach(function(trainer) {
                mainTag.innerHTML += `
                    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                        <ul>
                            ${trainer.pokemons.map(function(poke) {
                                return `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Exterminate</button></li>`
                            }).join("")}
                        </ul>
                    </div>
                `
            })
        })
}

function createPokemon(trainerId) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "id": trainerId
        })
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(poke) {
            let ul = document.querySelector(`div[data-id='${poke.trainer_id}']`).children[2]
            ul.innerHTML += `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Exterminate</button></li>`
        })
}

function deletePokemon(pokemonId) {
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "id": pokemonId
        })
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            console.log(json)
            document.querySelector(`button[data-pokemon-id='${json.id}']`).parentElement.remove()
        })
}

document.addEventListener("DOMContentLoaded", function() {
    indexTrainers();

    mainTag.addEventListener("click", function(e) {
        // debugger
        if (e.target.tagName == "BUTTON") {
            // debugger
            if (e.target.className == "release") {
                pokemonId = e.target.attributes[1].value
                deletePokemon(pokemonId)
            } else {
                if (e.target.parentElement.getElementsByTagName("li").length < 6) {
                    trainerId = e.target.attributes[0].value
                    createPokemon(trainerId)
                }
            }
        }
    })
})