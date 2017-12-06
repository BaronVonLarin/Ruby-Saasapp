class ContactMailer < ActionMailer::Base
  default to: 'vonpoops@gmail.com'   
  
  def contact_email(name, email, body)
    @name = name.to_s
    @email = email.to_s
    @body = body.to_s
    
    mail(from: email, subject: 'Contact Form Message')
  end 
end