Rails.application.routes.draw do
  resources :letter_sets, only: %i[index show] do
    resources :letter_solutions, only: [:index]
  end

  resources :letter_solutions, only: :index

  resources :letter_games, only: %i[index show] do
    resources :letter_results, only: [:index]
  end

  resources :letter_results, only: %i[index show create]

  resources :users, only: %i[index show create update] do
    resources :letter_games, only: [:index]
    resources :letter_results, only: %i[index]
    resources :number_games, only: [:index]
    resources :number_results, only: %i[index]
  end

  resources :number_sets, only: %i[index show] do
    resources :number_solutions, only: [:index]
  end

  resources :number_games, only: %i[index show] do
    resources :number_results, only: [:index]
  end

  resources :number_results, only: %i[index show create]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
