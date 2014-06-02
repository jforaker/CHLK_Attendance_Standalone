class Section < ActiveRecord::Base
  belongs_to :user
  has_many :students

  accepts_nested_attributes_for :user, :students
  accepts_nested_attributes_for :students

  validates_length_of :name, :minimum => 2, :maximum => 100, :allow_blank => false
  validates_presence_of :student_count

end
