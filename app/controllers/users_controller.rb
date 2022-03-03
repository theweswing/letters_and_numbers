class UsersController < ApplicationController
  # skip_before_action :authorize, only: :create :show

  def index
    users = User.all
    render json: users, status: :ok
  end

  def show
    # user = @current_user
    # user = User.find_by(id: cookies.signed[:user_id])
    user = User.find_by(id: session[:user_id]) if !user
    session[:user_id] = user.id

    # cookies.signed.permanent[:user_id] = user.id
    render json: user, status: :ok
  end

  def create
    user = User.create!

    # cookies.signed.permanent[:user_id] = user.id
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user.User.find(params[:id])
    user.update
    render json: user, status: :accepted
  end

  # private

  # def user_params
  #   params.permit(:email, :password)
  # end
end
