class AddNoteToStudents < ActiveRecord::Migration
  def change
    add_column :students, :note, :string
  end
end
