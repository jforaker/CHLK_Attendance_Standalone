class SessionsController < ApplicationController
  def show
    @section = Section.find(params[:section_id])
    status = []

    @section.students.each do |s|
      a = s.attendances.where(:session_id => params[:id])
      unless a.nil?
        unless a.last.nil?
          puts a.last.status
          status.push({'status' => a.last.status, 'student_id' => a.last.student_id})
        end
      end
    end

    puts 'status ===== ' + status.to_s

    @status = status

    if @section.user_id === current_user.id
      respond_to do |format|
        format.html
        format.json { render json: @section}
        format.js
      end
    else
      #flash[:error] = "Error. Not your section."
      redirect_to sections_path
    end
  end

  def edit
    @section = Section.find(params[:id])
  end

  private

  def section_params
    params.require(:session).permit(:id, :user_id)
  end
end


