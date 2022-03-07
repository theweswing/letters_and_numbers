class ChallengesController < ApplicationController
  def create
    challenge = Challenge.create(challenge_params)
    render json: challenge, status: :created
  end

  def update
    challenge = Challenge.find(id: params[:id])
    challenge.update!(update_params)
    render json: challenge, status: :accepted
  end

  private

  def challenge_params
    params.permit(:letter_result_id, :seen, :approved)
  end

  def update_params
    params.permit(:seen, :approved)
  end
end
