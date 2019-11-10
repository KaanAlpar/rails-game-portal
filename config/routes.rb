Rails.application.routes.draw do
  root to: 'static_pages#home'
  resources :games, only: [:index, :show] do
    resources :comments, only: [:create]
  end
end
