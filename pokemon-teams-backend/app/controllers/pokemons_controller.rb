class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def create
        trainer = Trainer.find_by(id: params["trainerId"])
            if trainer.pokemons.count < 6
                pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)
                render json: pokemon
            else
                render json: {message: 'A Trainer can have a maximum of six Pokemon'}
            end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params["pokemonId"])
        pokemon.destroy
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:id, :nickname, :species, :trainer_id)
    end

end