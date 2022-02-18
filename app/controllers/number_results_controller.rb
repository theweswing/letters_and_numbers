class NumberResultsController < ApplicationController
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      results = user.number_results
    elsif params[:number_game_id]
      game = NumberGame.find(params[:number_game_id])
      results = game.number_results
    else
      results = NumberResult.all
    end
    render json: results, status: :ok
  end

  def show
    result = NumberResult.find(params[:id])
    render json: result, status: :ok
  end

  def create
    result = NumberResult.create!(num_result_params)
    render json: result, status: :created
  end

  private

  def num_result_params
    params.permit(:user_id, :number_game_id, :answer, :score)
  end
end
