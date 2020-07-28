class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_pokemon(trainer)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end
end
