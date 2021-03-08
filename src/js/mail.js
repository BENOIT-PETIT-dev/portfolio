const form = document.querySelector('#contact-form');
const email = form.querySelector('input[name=email]');
const fullname = form.querySelector('input[name=fullname]');
const phone = form.querySelector('input[name=phone]');
const message = form.querySelector('textarea[name=message]');
const button = form.querySelector('button');
const showResponse = form.querySelector('#response');
var pause = false;

button.addEventListener('click', function(e) {
    e.preventDefault();
    if (pause === false) {
        let formFields = getFormFields();
        sendMail(formFields);

        pause = true;
        setTimeout(() => {
            pause = false;
        }, 4000);
    }
});


function getFormFields() {
    return formFields = {
        email: email.value,
        fullname: fullname.value,
        phone: phone.value,
        message: message.value,
    }
}

function sendMail(formFields) {
    if (!formFields.email || !formFields.fullname || !formFields.message) {
        errorAnim();
        return
    }

    $.ajax({
        method: "GET",
        url: "mail.php",
        data: {
            email: formFields.email,
            fullname: formFields.fullname,
            phone: formFields.phone,
            message: formFields.message,
        },
        success: function(html, status, xhr){
            successAnim();
        },
        error: function(html, status, xhr){
            errorAnim();
        }
    });
}



function errorAnim() {
    const errorMessage = "🚨 Error 🚨";
    showResponse.innerHTML = errorMessage;
    responseAnim(true);
}

function successAnim() {
    const successMessage = "Sent 👌";
    showResponse.innerHTML = successMessage;
    responseAnim();
}

function responseAnim(err) {
    if (err === true) {
        var tl = new TimelineLite;
        tl.to(showResponse, { x:0, opacity: 1, duration: .4, ease: CustomEase.create("custom", "M0,0 C0.77,0 0.18,1 1,1 ") })
        .to(showResponse, { x:5, duration: .1 })
        .to(showResponse, { x:-5, duration: .1 })
        .to(showResponse, { x:5, duration: .1 })
        .to(showResponse, { x:0, duration: .1 })
        .to(showResponse, { x:-40, opacity: 0, duration: .4, delay: 2, ease: CustomEase.create("custom", "M0,0 C0.77,0 0.18,1 1,1 ") });
    }
    else {
        var tl = new TimelineMax({ 
            onComplete: function(){ clearFields() }
        });
        tl.to(showResponse, {  x:0, opacity: 1, duration: .4, ease: CustomEase.create("custom", "M0,0 C0.77,0 0.18,1 1,1 ") })
        .to(showResponse, { x:-40, opacity: 0, duration: .4, delay: 2, ease: CustomEase.create("custom", "M0,0 C0.77,0 0.18,1 1,1 ") });
    }
}

function clearFields() {
    email.value = " ";
    fullname.value = " ";
    phone.value = " ";
    message.value = " ";
}