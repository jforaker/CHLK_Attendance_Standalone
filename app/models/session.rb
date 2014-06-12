class Session < ActiveRecord::Base

  #has_many :attendances
  #has_many :students, through: :attendances
  #belongs_to :user
  #accepts_nested_attributes_for :attendances

  has_many :attendances
  has_many :students, through: :attendances
  belongs_to :section

end
