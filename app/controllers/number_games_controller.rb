class NumberGamesController < ApplicationController
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      games = user.number_games
    else
      games = NumberGame.all
    end
    render json: games, status: :ok
  end

  def show
    game = NumberGame.find(params[:id])
    render json: game, status: :ok
  end
end
