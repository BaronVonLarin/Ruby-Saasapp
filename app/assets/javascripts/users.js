/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');    
  var submitBtn = $('#form-submit-btn');
  
  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
 
  // When user clicks form submit button 
  submitBtn.click(function(event){
    
    // prevent default submit behavior
    event.preventDefault();
    submitBtn.val("Processing...").prop('disabled', true);
    
    // Collect cc fields
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Use Stripe JS lib to check for card error
    var error = false;
    
    // Validate card info
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The Credit Card number appears to be invalid');
    }
    
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC appears to be invalid');
    }
    
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The Expiration date appears to be invalid');
    }
    
    if (error) {
      // If card errors, dont send
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      // Send card information to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    
    
    return false;
  });

  // Stripe will return card token
  function stripeResponseHandler(status, response) {
    // get the token from the response
    var token = response.idl;
    
    // Inject the card token in a hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Submit form to rails app
    theForm.get(0).submit();
  }
});