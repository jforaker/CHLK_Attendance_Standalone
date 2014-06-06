class StudentsController < ApplicationController
  def index
    @students = Student.all
  end

  def create
    @student = Student.new(student_params)
    alert_message = student_params['name'] == "" ? "Must add a name" : "Unable to add #{student_params['name']}."
    if @student.save
      redirect_to section_path(params['student']['section_id']),   :notice => "#{student_params['name']} added successfully."
    else
      redirect_to new_section_student_path(params['student']['section_id']), :alert => alert_message
    end
  end

  def edit
    @student = Student.find(params[:id])
  end

  def new
    @sections = current_user.sections
    params.each do |key, value|
      if "section_id" == "#{key}"
        @section = "#{value}"
      end
    end
    @student = Student.new
  end

  def destroy
  end

  def show
    authenticate_user!
    @student = Student.find(params[:id])
    @section = Student.find(params[:section_id])
    if @student.teacher_id == current_user.id
      respond_to do |format|
        format.html
        format.json { render :json => @student }
      end
    else
      flash[:error] = "Not your student"
      redirect_to sections_path
    end
  end

  def update
    @student = Student.find(params[:id])
    if @student.update_attributes(student_params)
      flash[:notice] = "#{student_params['name']} updated successfully."
      redirect_to section_path(@student.section_id)
    else
      flash[:error] = "student wasnt updated."
      redirect_to @student
    end
  end

  def import
    params.each do |key, value|
      Rails.logger.warn "Param #{key}: #{value}"
      if "section_id" == "#{key}"
        @section = "#{value}"
      end
      if "teacher_id" == "#{key}"
        @teacher_id = "#{value}"
      end
    end
    Student.import(params[:file], @section, @teacher_id)
    redirect_to section_path(@section), notice: "students imported."
  end


  private

  def student_params
    params.require(:student).permit(:_json, :student, :name, :note, :section_id, :teacher_id,  student_attributes: [ :name, :note, :section_id ])
  end
end
