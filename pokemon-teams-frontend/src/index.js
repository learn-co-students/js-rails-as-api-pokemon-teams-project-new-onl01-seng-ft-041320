const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let main = document.querySelector('#main')

function getTrainers() {
  return fetch('http://localhost:3000/trainers')
    .then(res => res.json())
}

getTrainers().then(trainers => {
  trainers.forEach(trainer => {
    //function to render toys goes here or something
    renderTrainers(trainer)
  })
})

function renderTrainers(trainer) {


  let p = document.createElement('p')
  p.setAttribute('id', 'id')
  p.innerText = trainer.name

  let btn = document.createElement('button')
  btn.setAttribute('class', 'add-btn')
  btn.setAttribute('id', 'id')
  btn.innerText= "Add Pokemon"
  btn.addEventListener('click', (e) => {
    addPokemon(e)
  })

  let ul = document.createElement('ul')
    for(let pokemon of trainer.pokemons) {
      let li = document.createElement('li')
      li.innerHTML =`${pokemon.nickname} (${pokemon.species})`


      let rbtn= document.createElement('button')
      rbtn.setAttribute('class', 'release')
      rbtn.setAttribute('id', 'pokemon.id')
      rbtn.innerText= "Release"

      li.appendChild(rbtn)

      rbtn.addEventListener('click', (event) => {
        console.log(event.target.dataset);
        releasePokemon(event)
      })

      ul.appendChild(li)
    }

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(p, btn, ul)
  main.append(divCard)
}

function addPokemon(e) {
  fetch('http://localhost:3000/pokemons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({

      })
    })
    .then(res => res.json())
    .then(obj => {
      let new_poke = divCard.children[id-1].lastElementChild.innherHTML +=
      `<li>${pokemon.nickname} </li>`
    })
}

function releasePokemon (event){

  return fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}
