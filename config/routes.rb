Rails.application.routes.draw do

  get 'import_students/create'

  get 'import_students/new'

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  resources :students
  resources :sections do
    resources :students   do
      collection { post :import }
    end
  end


end