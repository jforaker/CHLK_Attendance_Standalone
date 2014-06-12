class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  enum role: [:user, :vip, :admin]

  before_save :ensure_authentication_token
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  include TokenAuthenticatable


  has_many :sections
  has_many :sessions, :through => :sections
  has_many :students,  :through => :sections

end
