let inputDrops = document.querySelectorAll('.input-drop,.has-drop');

inputDrops.forEach(function(inputDrop) {
    inputDrop.addEventListener('click', function(e) {
        inputDrop.classList.add('values-show')
    })
})

let dropValues = document.querySelectorAll('.drop-value');

dropValues.forEach(function(dropValue) {
    dropValue.addEventListener('click', function(e) {
        let inputWrapper = dropValue.closest('.input');
        let input = inputWrapper.querySelector('input');
        input.value = dropValue.querySelector('.value-name').textContent;

        setTimeout(() => {
            inputWrapper.classList.remove('values-show');
        }, 10)

    })
})


let textAreas = document.querySelectorAll('.text-aria textarea');
textAreas.forEach(function(textArea) {
    textArea.addEventListener('input', function(e) {

        let ariaWrapper = textArea.closest('.input');
        if (textArea.value != '') {
            ariaWrapper.classList.add('has-value')
        } else {
            ariaWrapper.classList.remove('has-value')
        }
        if (textArea.value.length > 3) {
            textArea.closest('.form-input').classList.add('can-clean')
        }
        if (textArea.value == "") {
            textArea.closest('.form-input').classList.remove('can-clean')
            textArea.value = '';
            textArea.closest('.form-input').classList.remove('error')
        }
        if (textArea.value == "123") {
            textArea.closest('.form-input').classList.add('error')
        }
    })
})

let inputs = document.querySelectorAll('.input');
inputs.forEach(function(input) {
    let curentInput = input.querySelector('input');
    if (curentInput) {
        if (curentInput.classList.contains('input-drop') || curentInput.classList.contains('has-drop')) {
            return
        } else {
            curentInput.addEventListener('input', () => {

                if (curentInput.value != "" && curentInput.value.length > 3) {
                    curentInput.closest('.form-input').classList.add('can-clean')
                }
                if (curentInput.value == "") {
                    curentInput.closest('.form-input').classList.remove('can-clean')
                    curentInput.setAttribute('value', '')
                    curentInput.closest('.form-input').classList.remove('error')
                }
                if (curentInput.value == "123") {
                    curentInput.closest('.form-input').classList.add('error')
                }
            })

        }
    }

})


let cleanButtons = document.querySelectorAll('.clear-input');
cleanButtons.forEach(function(cleanButton) {
    cleanButton.addEventListener('click', function(e) {
        console.log(cleanButton.closest('.input'))
        if (cleanButton.closest('.input').classList.contains('text-aria')) {
            cleanButton.closest('.form-input').classList.remove('can-clean', 'error');
            cleanButton.closest('.form-input').querySelector('textarea').value = "";
            cleanButton.closest('.input').classList.remove('has-value')
        } else {
            cleanButton.closest('.form-input').querySelector('input').value = "";
            cleanButton.closest('.form-input').classList.remove('can-clean');
            cleanButton.closest('.form-input').classList.remove('error')
        }


    })
})






let timepickerEls = document.querySelectorAll('.time-el');
let timepicker = document.querySelector('.timepicker-input input');
timepickerEls.forEach(function(timepickerEl) {
    timepickerEl.addEventListener('click', () => {
        let hourse;
        let minutes;
        if (timepickerEl.closest('.time-value').classList.contains('time-hours')) {
            let curentActiveHourse = document.querySelector('.time-hours .time-el.selected');
            if (curentActiveHourse) {
                curentActiveHourse.classList.remove('selected')
            }
            hourse = timepickerEl.textContent;
            minutes = document.querySelector('.time-minutes .time-el.selected');

            timepickerEl.classList.add('selected');

            if (minutes) {
                timepicker.value = hourse + ':' + minutes.textContent
            } else {
                timepicker.value = hourse + ':00';
            }

        } else {
            let curentActiveMinutea = document.querySelector('.time-minutes .time-el.selected');
            if (curentActiveMinutea) {
                curentActiveMinutea.classList.remove('selected')
            }
            minutes = timepickerEl.textContent;
            hourse = document.querySelector('.time-hours .time-el.selected')
            timepickerEl.classList.add('selected');

            if (hourse) {
                timepicker.value = hourse.textContent + ':' + minutes;
            } else {
                timepicker.value = '00:' + minutes;
            }
        }
        if (hourse && minutes) {
            setTimeout(() => {
                timepicker.closest('.timepicker-input').classList.remove('values-show');
            }, 10)
        }
    })
})



let slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;

    if (display === 'none')
        display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}
var slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

if (document.querySelector('.add-row')) {
    document.querySelector('.add-row').addEventListener('click', function(e) {
        let row = document.querySelector('.report-row').cloneNode(true)
        row.classList.add('will-add')
        document.querySelector('.report-rows .container').appendChild(row);
        slideDown(row, 200)
    })
}

let datePicker = document.querySelector('.datepicker');
if (datePicker) {

    let calendarElements = document.querySelectorAll('.caledar-week-day');
    let fromInput = document.querySelector('#from');
    let toInput = document.querySelector('#to');

    let firstValue = 0;
    let LastValue = 0;

    let Finput = datePicker.querySelector('.false-input');
    Finput.addEventListener('click', () => {
        datePicker.classList.add('input-focused', 'values-show', 'first-focus');

        calendarElements.forEach(function(calendarElement) {
            calendarElement.addEventListener('click', () => {

                if (fromInput.value == '') {
                    fromInput.value = calendarElement.textContent.trim(' ') + '.03.2021';
                    firstValue = parseInt(calendarElement.textContent);
                    calendarElement.classList.add('stage-interval', 'stage-select');
                    datePicker.classList.remove('first-focus');
                    toInput.focus();
                    datePicker.classList.add('second-focus');

                } else {
                    toInput.value = calendarElement.textContent.trim(' ') + '.03.2021';
                    LastValue = parseInt(calendarElement.textContent);
                    calendarElement.classList.add('stage-interval', 'stage-select');

                    setTimeout(function(e) {
                        datePicker.classList.remove('values-show', 'second-focus');
                    }, 10)



                }
                while (firstValue < LastValue) {
                    calendarElements[firstValue].classList.add('stage-interval');
                    firstValue++;
                }

            })
        })
    })
}