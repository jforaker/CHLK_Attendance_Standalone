Rails.application.routes.draw do


  get 'sections/index'

  get 'sections/create'

  get 'sections/new'

  get 'sections/destroy'

  get 'sections/show'

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  resources :sections

end