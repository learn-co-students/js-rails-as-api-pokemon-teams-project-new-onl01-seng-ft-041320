class TrainerSerializer

  def initialize(trainers_object)
    @trainers = trainers_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          except: [:created_at, :updated_at, :trainer_id]
        },
      },
      only: [:id, :name]
    }
    @trainers.to_json(options)
  end
end
