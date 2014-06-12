class AddSectionIdToAttendances < ActiveRecord::Migration
  def change
    add_column :attendances, :section_id, :integer
  end
end
