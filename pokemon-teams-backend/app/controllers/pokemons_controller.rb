class PokemonsController < ApplicationController
  before_action :set_pokemon, only: [:show, :destroy]

  def index
    pokemons = Pokemon.all

    render json: PokemonSerializer.new(pokemons).to_serialized_json

  end

  def show
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
    if trainer.pokemons.length < 7
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)

      render json: PokemonSerializer.new(pokemon).to_serialized_json
    else
      render json: {error: "If you want to add, you must first release!"}
    end
  end

  def destroy
    @pokemon.destroy

    render json: {success: "Released!"}
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:id, :nickname, :species, :trainer_id)
  end

  def set_pokemon
    @pokemon = Pokemon.find_by(id: params[:id])
  end

end
