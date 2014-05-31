class SectionsController < ApplicationController
  def index
    @user = User.find_by_id(current_user.id)

    @sections = current_user.sections.order('updated_at DESC')
  end

  def create
    kick_params = params.require(:section).permit(:section, :description, :name, :student_count, :id, :user_id)
    #@section = Section.new(kick_params)
    @section = current_user.sections.build(kick_params)
    if @section.save
      flash[:notice] = "Class submitted successfully."
      redirect_to @section
    else
      redirect_to sections_path
    end
  end


  def new
    @section = Section.new
  end

  def destroy
  end

  def show
    @section = Section.find(params[:id])
    #@user = current_user.name
    respond_to do |format|
      format.html
      format.json { render :json => @section }
    end
  end
end
