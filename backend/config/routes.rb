Rails.application.routes.draw do
  get '/upload_credentials' => 'presigned_posts#upload_credentials'
end
