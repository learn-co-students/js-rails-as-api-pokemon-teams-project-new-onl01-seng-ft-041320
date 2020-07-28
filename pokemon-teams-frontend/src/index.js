const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainersContainer = document.getElementById("trainers")

function fetchTrainers() {
  return fetch(TRAINERS_URL)
    .then(function(obj) {
      return obj.json()
    })
    .then(function(json) {
      renderTrainers(json)
    })
  }

function renderTrainers(trainers) {
  trainers.forEach(function(trainer) {
    trainersContainer.innerHTML += makeTrainerCard(trainer)
  })
}

function makeTrainerCard(trainer) {
  return `
    <div class="card" id=trainer-${trainer.id}>
      <div id=trainer-${trainer.id}-details>
        <p><strong>Trainer: ${trainer.name}</strong></p>
        <button class="add" data-trainer=${trainer.id}>Add Pokemon</button>
        <ul id=trainer-${trainer.id}-pokemons>
          ${trainer.pokemons.map(makePokemonLi).join(" ")}
        </ul>
      </div>
    </div>
  `
}

function makePokemonLi(pokemon) {
  return `
    <li>${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon=${pokemon.id}>Release</button>
    </li>
  `
}

function addPokemon(e) {
  if (e.target.className == "add") {
    const trainerId = e.target.dataset.trainer
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        pokemon: {
          trainer_id: trainerId
        }
      })
    })
    .then(function(obj) {
      return obj.json()
    })
    .then(function(json) {
      addToTeam(json)
    })
  }
}


function removePokemon(e) {
  if (e.target.className == "release") {
    const pokemonId = e.target.dataset.pokemon
    fetch(POKEMONS_URL+`/${pokemonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(function(obj) {
      return obj.json()
    })
    .then(function(json) {
      e.target.parentElement.remove()
    })
  }
}

function addToTeam(pokemon) {
  if (pokemon != null) {
    const ul = document.getElementById(`trainer-${pokemon.trainer_id}-pokemons`)
    const li = document.createElement("li")
    li.innerHTML = makePokemonLi(pokemon)
    ul.appendChild(li)
  }
  else {
    alert(json.error)
  }
}

document.addEventListener("DOMContentLoaded", fetchTrainers)
document.addEventListener("click", addPokemon)
document.addEventListener("click", removePokemon)
