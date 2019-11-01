Rails.application.routes.draw do
  get '/upload_credentials' => 'presigned_posts#upload_credentials'
  get '/presigned_url' => 'presigned_posts#presigned_url'
end
