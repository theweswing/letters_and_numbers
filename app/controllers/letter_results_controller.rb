class LetterResultsController < ApplicationController
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      results = user.letter_results
    elsif params[:letter_game_id]
      game = LetterGame.find(params[:letter_game_id])
      results = game.letter_results
    else
      results = LetterResult.all
    end
    render json: results, status: :ok
  end

  def show
    result = LetterResult.find(params[:id])
    render json: result, status: :ok
  end

  def create
    result = LetterResult.create(letter_result_params)
    render json: result, status: :created
  end

  private

  def letter_result_params
    params.permit(:user_id, :letter_game_id, :answer, :score)
  end
end
