class NumberSolutionsController < ApplicationController
  def index
    if params[:number_set_id]
      num_set = NumberSet.find(params[:number_set_id])
      solutions = num_set.number_solutions
      render json: solutions, status: :ok
    end
  end
end
