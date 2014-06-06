class SectionsController < ApplicationController

  before_filter :authenticate_user!


  def index
    @user = User.find_by_id(current_user.id)
    @sections = current_user.sections.order('updated_at DESC')
  end

  def create
    @section = current_user.sections.build(section_params)
    if @section.save
      flash[:notice] = "#{section_params['name']} submitted successfully."
      redirect_to @section
    else
      flash[:error] = "Error saving #{section_params['name']}."
      redirect_to sections_path
    end
  end

  def edit
    @section = Section.find(params[:id])
  end

  def new
    @section = Section.new
  end

  def destroy
    @section = Section.find(params[:id])
    @section.destroy
    respond_to do |format|
      format.html {redirect_to sections_path,
                               :alert => "Removed #{@section.name}"}
    end
  end

  def show
    @section = Section.find(params[:id])
    @students = @section.students
    unless @section.user_id != current_user.id
      respond_to do |format|
        format.html
        format.json { render json: @section}
      end
    else
      flash[:error] = "Error. Not your section."
      redirect_to sections_path
    end
  end

  def update
    @section = Section.find(params[:id])
    respond_to do |format|
      if @section.update_attributes(section_params)
        format.html { redirect_to @section, notice: "#{section_params['name']}"' was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @section.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def section_params
    params.require(:section).permit(:section, :description, :name, :student_count, :id, :user_id, :monday, :tuesday, :wednesday,
    :thursday, :friday, :saturday, :sunday)
  end
end
