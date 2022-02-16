class LetterSolutionsController < ApplicationController
  def index
    if params[:letter_set_id]
      set = LetterSet.find(params[:letter_set_id])
      solutions = set.letter_solutions
    else
      solutions = LetterSolution.all
    end
    render json: solutions, status: :ok
  end
end
