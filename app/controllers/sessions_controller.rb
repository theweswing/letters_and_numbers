class SessionsController < ApplicationController
  # skip_before_action :authorize, only: :create, :save

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: {
               errors: ['Invalid username or password'],
             },
             status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  def save
    answer = params[:answer]
    score = params[:score]
    date = params[:date]
    lg_id = params[:letter_game_id]
    session[date] = { answer: answer, score: score, letter_game_id: lg_id }
    render json: session, status: :created
  end

  private

  # def new_game_params
  #   params.permit(date, answer, score, letter_game_id)
  # end
end
