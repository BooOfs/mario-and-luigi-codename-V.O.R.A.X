const input = document.getElementById("support_amount_donation");

input.addEventListener("input", () => {
  let value = input.value.replace(/[^\d.]/g, "");

  if (value) {
    input.value = value + "€";
  } else {
    input.value = "";
  }
  input.style.fontSize = "50px";
});
input.addEventListener("blur", () => {
  input.value = "";
  input.style.fontSize = "";
});


document.addEventListener("DOMContentLoaded", () => {
    const paypal_btn = document.getElementById("button_paypal");
    const apple_pay_btn = document.getElementById("button_applepay");
    
    const pay_btn = document.getElementById("support_pay_button");
    
    var currently_selected = -1; // 0 = ApplePay 1 = Paypal
    
    var all_buttons_list = [paypal_btn,apple_pay_btn];
    
    apple_pay_btn.onclick = () => {
        currently_selected = 0;
        all_buttons_list.forEach(function(el) {
           el.classList.remove("clicked"); 
        });
        apple_pay_btn.classList.add("clicked");
    }
    paypal_btn.onclick = () => {
        currently_selected = 1;
        all_buttons_list.forEach(function(el) {
           el.classList.remove("clicked"); 
        });
        paypal_btn.classList.add("clicked");
    }
    
    pay_btn.onclick = () => {
        if (currently_selected == -1) {
            alert("Please select a Payment method");
        } 
        else if (currently_selected == 0)
        {
            let html = '"<iframe class="content_website" src="https://www.apple.com/"></iframe>"'
            createWindow("Apple Pay Donation Thx <3",500,700,html,"applepay_site",true,true,"website");
        }
        else if (currently_selected == 1)
        {
            let html = '"<iframe class="content_website" src="https://de.wikipedia.org/wiki/PayPal"></iframe>"'
            createWindow("PayPal Donation Thx <3",500,700,html,"applepay_site",true,true,"website");
        }
    }
});
