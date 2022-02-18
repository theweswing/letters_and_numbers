class NumberSetsController < ApplicationController
  def index
    sets = NumberSet.all
    render json: sets, status: :ok
  end

  def show
    set = NumberSet.find(params[:id])
    render json: set, status: :ok
  end
end
