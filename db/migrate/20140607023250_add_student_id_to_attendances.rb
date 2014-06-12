class AddStudentIdToAttendances < ActiveRecord::Migration
  def change
    add_column :attendances, :student_id, :integer
  end
end
