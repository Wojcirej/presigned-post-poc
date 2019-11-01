class PresignedPostsController < ApplicationController

  def upload_credentials
    credentials = AwsS3Adapter.new.generate_presigned_post_credentials(params[:expiration_time])
    render json: credentials, status: 200
  end

  def presigned_url
    presigned_url = AwsS3Adapter.new.generate_public_url_to_item(params[:key])
    render json: { presignedUrl: presigned_url }, status: 200
  end
end