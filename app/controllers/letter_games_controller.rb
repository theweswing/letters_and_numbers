class LetterGamesController < ApplicationController
  # skip_before_action :authorize, only: %i[index show]

  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      games = user.letter_games
    else
      games = LetterGame.all
    end
    render json: games, status: :ok
  end

  def show
    game = LetterGame.find(params[:id])
    render json: game, status: :ok
  end
end
