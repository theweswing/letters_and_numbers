class LetterSetsController < ApplicationController
  def index
    render json: LetterSet.all, status: :ok
  end

  def show
    letter_set = LetterSet.find(params[:id])
    render json: letter_set, status: :ok
  end
end
