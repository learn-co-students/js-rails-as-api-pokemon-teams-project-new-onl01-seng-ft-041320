const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon.

let main = document.querySelector('main')

fetch(TRAINERS_URL)
    .then(function (trainersObject) {
        return trainersObject.json()
    })
    // .then(console.log)
    .then(function (trainersArray) {
        // debugger
        // Add Trainer info to the div
        trainersArray.forEach(function(trainer) {
            main.innerHTML += makeTrainerDiv(trainer)
        })
    })

function makeTrainerDiv(trainer){
    // debugger
    return `   
        <div class='card' id='${trainer.id}'>
            <p>${trainer.name}</p>
            <button id='${trainer.id}' class='add'>Add Pokemon</button>
            <ul id='ul-${trainer.id}'>
                ${ trainer.pokemons.map(makePokemonLi).join("") }
            </ul>
        </div>
    `
}

function makePokemonLi(pokemon) {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class='release' id='${pokemon.id}'>Release</button> </li>`
}

// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

// Listen
// Select

main.addEventListener('click', function(e){
    // e.preventDefault()
    if (e.target.className == 'add') {
        let trainerId = e.target.id
        addPokemon(trainerId)
    }
})

// Do

function addPokemon(trainerId) {
    // debugger
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            'trainerId': trainerId
        })
    })
    .then(function(responseObject) {
        return responseObject.json()
    })
    .then(function(pokemon) {
        if (!!pokemon) {
            alert(pokemon.message)
        } else {
            let newPokemon = makePokemonLi(pokemon)
            let trainerUl = document.querySelector(`#ul-${pokemon.trainer_id}`)
            // debugger
            trainerUl.innerHTML += newPokemon
            // document.body.innerHTML = object.id
        }
    })
        // .catch(function (error) {
        //     document.body.innerHTML = error.message
        // });
}

// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.