Rails.application.routes.draw do

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users
  resources :sections do
    resources :attendances
    get '/attendances/:session_id', :to => 'attendances#index'

    resources :students do
      collection { post :import }
    end
    resources :sessions do

      resources :students do
        resources :attendances, :only => [:create, :new]
      end
    end
  end

  get '/sections/:id', :to => 'sessions#show'
  post '/sections/:section_id/students/new', :to => 'students#create'


  #    ==================   API    =======================

  namespace :api do
    namespace :v1 do
      devise_for :users,controller: { sessions: 'api/v1/sessions' }, :token_authentication_key => 'authentication_key'
      resources :sections do
        resources :attendances
        get '/attendances/:session_id', :to => 'attendances#index'

        resources :students do
          collection { post :import }
        end
        resources :sessions do

          resources :students do
            resources :attendances, :only => [:create, :new]
          end
        end
      end
    end
  end

end

