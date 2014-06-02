class CreateStudentImports < ActiveRecord::Migration
  def change
    create_table :student_imports do |t|

      t.timestamps
    end
  end
end
