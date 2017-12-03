# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :port           => ['MAILGUN_SMTP_PORT'], 
  :address        => ['MAILGUN_SMTP_SERVER'],
  :user_name      => ['MAILGUN_SMTP_LOGIN'],
  :password       => ['MAILGUN_SMTP_PASSWORD'],
  :domain         => 'whispering-springs-51303.herokuapp.com',
  :authentication => :plain,
}
ActionMailer::Base.delivery_method = :smtp