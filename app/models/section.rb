class Section < ActiveRecord::Base
  belongs_to :user
  has_many :sessions
  has_many :students
  has_many :attedances

  accepts_nested_attributes_for :user, :students, :sessions
  accepts_nested_attributes_for :students

  validates_length_of :name, :minimum => 2, :maximum => 100, :allow_blank => false

end
