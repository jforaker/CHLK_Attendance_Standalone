class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :attendances, :type, :status
  end
end
