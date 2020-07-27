class PokemonsController < ApplicationController
    def create
        # byebug
        trainer = Trainer.find_by(id: params[:id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
    end
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: { "message": "Successfully exterminated that poke", "id": params[:id] }
    end
end
