class Student < ActiveRecord::Base

  belongs_to :section
  belongs_to :user
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

  def self.import(file, section, teacher_id)
    CSV.foreach(file.path, headers: true) do |row|
      a = row.to_hash
      b = a.slice("name", "note")

      Student.create! b.merge('section_id' => section, 'teacher_id' => teacher_id)
      puts b
    end
  end
end
