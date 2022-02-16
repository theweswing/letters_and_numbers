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
end
