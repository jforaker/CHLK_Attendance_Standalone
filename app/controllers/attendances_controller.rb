class AttendancesController < ApplicationController

  def index
    puts params
    @attendances = Attendance.where('section_id' => params[:section_id], 'session_id' => Time.now.strftime("%m-%d-%Y"))

    respond_to do |format|
      format.html
      format.csv { send_data @attendances.to_csv }
      format.xls { send_data @attendances.to_csv(col_sep: "\t") }
    end
  end

  def show
    puts params
    @attendances = Attendance.where('section_id' => params[:section_id], 'session_id' => params[:id])
    @secion = Section.find(params[:section_id])
  end

  def new
    @att = Attendance.new
  end

  def create

    args = {:status => params[:status],
            :student_id => params[:student_id],
            :student_name => params[:student_name],
            :session_id => params[:session_id],
            :section_id => params[:section_id]}
    @att = Attendance.new(args)
    @att.save
    puts args
    respond_to do |format|
      if @att.save
        format.json { render json: @att }
      else
        format.html { render action: "index" }
        format.json { render json: @att.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    args = {:status => params['student']['attendances'], :student_id => params[:student_id], :session_id => params[:session_id], :section_id => params[:section_id]}
    @att = Attendance.find(params[:id])
    respond_to do |format|
      if @att.update_attributes(args)
        format.html {
          flash[:success] = "success."
          redirect_to section_path(params[:section_id])
        }
        format.json { render json: @att }
      else
        format.html { render action: "new" }
        format.json { render json: @att.errors, status: :unprocessable_entity }
      end
    end
  end

  def export
    params.each do |key, value|
      Rails.logger.warn "Param #{key}: #{value}"
      if "section_id" == "#{key}"
        @section = "#{value}"
      end
      if "teacher_id" == "#{key}"
        @teacher_id = "#{value}"
      end
    end
    Attendance.export(params[:file], @section, @teacher_id)
    redirect_to section_session_path(@section, Time.now.strftime("%m-%d-%Y")), notice: "students imported."
  end

  private

  def attendance_params
    params.require(:attendances).permit(:attendance, :session_id, :section_id, :status, :student_id, :day, :student_name)
  end
end
