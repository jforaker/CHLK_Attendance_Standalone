class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.string :type

      t.timestamps
    end
  end
end
