class CommentsController < ApplicationController
  before_action :set_game, only: [:create]

  def create
    @comment = Comment.new(comment_params)
    @comment.game = @game
    if @comment.save
      redirect_to game_path(@game)
    else
      render 'games/show'
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:username, :content)
  end

  def set_game
    @game = Game.find(params[:game_id])
  end
end
