import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

let countdownInterval;

function handleDateSelection(selectedDate) {
  const currentDate = new Date();
  const selectedDateTime = new Date(selectedDate);

  if (selectedDateTime <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    disableStartButton();
  } else {
    enableStartButton();
  }
}

function disableStartButton() {
  const startButton = document.querySelector('[data-start]');
  startButton.disabled = true;
}

function enableStartButton() {
  const startButton = document.querySelector('[data-start]');
  startButton.disabled = false;
  startButton.addEventListener('click', startCountdown);
}

function startCountdown() {
  const endDate = flatpickr('#datetime-picker').selectedDates[0];
  countdownInterval = setInterval(() => {
    updateTimer(endDate);
  }, 1000);
}

function updateTimer(endDate) {
  const timeRemaining = endDate - new Date();
  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('The timer has reached 00:00:00:00');
    disableStartButton();
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    displayTime({ days, hours, minutes, seconds });
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function displayTime({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
