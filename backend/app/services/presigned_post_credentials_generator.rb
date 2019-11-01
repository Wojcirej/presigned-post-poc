class PresignedPostCredentialsGenerator

  def initialize(expiration_time = 15)
    @expiration_time = (expiration_time || 15).minutes.from_now
  end

  def self.call(expiration_time = 15)
    new(expiration_time).call
  end

  def call
    {
      url: post.url,
      fields: post.fields
    }
  end

  private
  attr_reader :expiration_time

  def post
    Aws::S3::Resource.new(
      access_key_id: ENV['AWS_ACCESS_KEY'],
      secret_access_key: ENV['AWS_SECRET_KEY'],
      region: ENV['AWS_REGION']).
      bucket(ENV['S3_BUCKET_NAME']).
      presigned_post(
        key_starts_with: prefix,
        signature_expiration: expiration_time,
        content_type_starts_with: '')
  end

  def prefix
    'tmp/'
  end
end