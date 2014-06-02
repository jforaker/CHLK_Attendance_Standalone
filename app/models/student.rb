class Student < ActiveRecord::Base

  belongs_to :section
  has_many :sections, :through => :user
  has_many :notes
  has_many :section_ids

  validates_length_of :name, :minimum => 2, :maximum => 100, :allow_blank => false


  accepts_nested_attributes_for :sections


  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |product|
        csv << product.attributes.values_at(*column_names)
      end
    end
  end

  def self.import(file, section)
    CSV.foreach(file.path, headers: true) do |row|
      a = row.to_hash
      Student.create! a.merge('section_id' => section)
    end
  end
end
