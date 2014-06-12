class AddStudentNameToAttendances < ActiveRecord::Migration
  def change
    add_column :attendances, :student_name, :string
  end
end
