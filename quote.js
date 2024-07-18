document.addEventListener('keypress', function(event) {
    if (event.which === 13) {
        event.preventDefault();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 9) {  // tab pressed
        event.preventDefault(); // stops its action
    }
});

document.querySelectorAll('.u-mutli-next-btn, .radio_button').forEach(function(button) {
    button.addEventListener('click', function() {
        var nextButton = document.querySelector('.form_next');
        if (nextButton) {
            nextButton.click();
        }
    });
});

var slideNumber = document.querySelectorAll('.slider_slide').length - 1;
var totalNumberElement = document.querySelector('.total-number');
if (totalNumberElement) {
    totalNumberElement.textContent = slideNumber;
}

function sliderAnimation() {
    var currentSlide = Array.from(document.querySelectorAll('.w-slider-dot')).findIndex(dot => dot.classList.contains('w-active'));
    var formPrev = document.querySelector('.u-mutli-back-btn');
    if (formPrev) {
        if (currentSlide === 0) {
            formPrev.classList.add('u-hidden');
        } else {
            formPrev.classList.remove('u-hidden');
        }
    }
    var firstElement = document.querySelector('.first');
    if (firstElement) {
        firstElement.textContent = currentSlide - 1;
    }
    var secondElement = document.querySelector('.second');
    if (secondElement) {
        secondElement.textContent = currentSlide;
    }
    var percent = (currentSlide / slideNumber) * 100;
    var percentRound = percent.toFixed(0);
    var formPercentElement = document.querySelector('.form_percent');
    if (formPercentElement) {
        formPercentElement.textContent = percentRound;
    }
    var formProgressFillElement = document.querySelector('.form_progress-fill');
    if (formProgressFillElement) {
        formProgressFillElement.style.width = percentRound + '%';
    }
}

document.querySelectorAll('.u-mutli-next-btn, .u-mutli-back-btn, .radio_button').forEach(function(button) {
    button.addEventListener('click', function() {
        setTimeout(sliderAnimation, 200);
    });
});

function validateForm(item) {
    var siblingButton = item.closest('.slider_slide').querySelector('.form_button');
    if (siblingButton) {
        if (item.value.length > 1) {
            siblingButton.classList.add('form-active');
        } else {
            siblingButton.classList.remove('form-active');
        }
    }
}

document.querySelectorAll('.form_field').forEach(function(field) {
    field.addEventListener('keydown', function() {
        validateForm(this);
    });
    field.addEventListener('focusout', function() {
        validateForm(this);
    });
});
