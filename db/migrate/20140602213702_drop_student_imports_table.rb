class DropStudentImportsTable < ActiveRecord::Migration
  def change
    drop_table :student_imports

  end
end
