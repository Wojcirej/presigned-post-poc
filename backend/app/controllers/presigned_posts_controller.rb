class PresignedPostsController < ApplicationController

  def upload_credentials
    credentials = PresignedPostCredentialsGenerator.call(params[:expiration_time])
    render json: credentials, status: 200
  end
end