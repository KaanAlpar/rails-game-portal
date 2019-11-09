Rails.application.routes.draw do
  root to: 'games#index'
  resources :games, only: [:index, :show] do
    resources :comments, only: [:create]
  end
end
