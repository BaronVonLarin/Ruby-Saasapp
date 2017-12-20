class Users::RegistrationsController < Devise::RegistrationsController
  # Extend default devise gem behavior for Pro Account (ID 2) to save
  # with Stripe subscription function
  # Basic saves as normal
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end