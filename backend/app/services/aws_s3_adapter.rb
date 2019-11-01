class AwsS3Adapter

  def initialize
    @bucket = Aws::S3::Resource.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_KEY'],
      region: ENV['AWS_REGION']).
      bucket(ENV['S3_BUCKET_NAME'])
  end

  def generate_presigned_post_credentials(expiration_time = 15)
    credentials = @bucket.presigned_post(
      success_action_status: '201',
      key_starts_with: 'tmp/',
      signature_expiration: (expiration_time || 15).minutes.from_now,
      content_type_starts_with: '')
    
    return {
      url: credentials.url,
      fields: credentials.fields,
    }
  end

  def generate_public_url_to_item(key)
    @bucket.object(key).presigned_url(:get, expires_in: 3600)
  end
end