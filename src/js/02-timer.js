import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    startButton: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
let selectedDate = null;
let timerId = null;

refs.startButton.disabled = true;
refs.startButton.addEventListener("click", onStartClick)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            refs.startButton.disabled = true; 
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startButton.disabled = false;
        }
    }
};

flatpickr(refs.input, options);

function onStartClick() {
    timerId = setInterval(() => {
        refs.startButton.disabled = true;
        refs.input.disabled = true;
        const deltaTime = selectedDate - new Date();
        const time = convertMs(deltaTime);
            
        if (deltaTime < 1000) {
            clearInterval(timerId);
            refs.input.disabled = false;
        }
        updateTime(time);
    }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
return String(value).padStart(2, "0");
}
