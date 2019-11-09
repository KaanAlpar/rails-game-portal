class GamesController < ApplicationController
  before_action :set_game, only: [:show]

  def index
    @games = Game.all
  end

  def show
    @comment = Comment.new
  end

  private

  def game_params
    params.require(:game).permit(:title)
  end

  def set_game
    @game = Game.find(params[:id])
  end
end
