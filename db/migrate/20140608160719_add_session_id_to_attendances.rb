class AddSessionIdToAttendances < ActiveRecord::Migration
  def change
    add_column :attendances, :session_id, :string
  end
end
