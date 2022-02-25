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

  def create
    if params[:letter_set_id]
      set = LetterSet.find(params[:letter_set_id])
      solution = LetterSolution.create(new_word_params)
      set.letter_solutions << solution
      render json: solution, status: :created
    end
  end

  private

  def new_word_params
    params.permit(:word, :length)
  end
end
