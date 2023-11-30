import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const inputDate = document.getElementById('datetime-picker')
const startBtn = document.querySelector('[data-start]')
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
startBtn.setAttribute("disabled", "")
let timerId = null
let deltaTime = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
      const startTime = Date.now()

      if (selectedDates[0] < startTime) {
          window.alert("Please choose a date in the future")
      }
      if (startTime < selectedDates[0]) {
          startBtn.removeAttribute("disabled", "")
          deltaTime = selectedDates[0].getTime()- Date.now()
       }
  }
}
    

function startTimer(event) {
  startBtn.setAttribute("disabled", "")

  timerId = setInterval(() => {

    if (deltaTime <= 0) {
      clearInterval(timerId)
    } else {
      deltaTime -= 1000
      updateTimer()
      console.log(deltaTime)//бачу, що зупиняється на -1 але не можу знайти чому, help
    }
  }, 1000);
}

function updateTimer() {
  const {d, h, m, s} = convertMs(deltaTime)
  days.textContent = d
  hours.textContent = h
  minutes.textContent = m
  seconds.textContent = s
}

flatpickr(inputDate, options);
startBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = addLeadingZero(Math.floor(ms / day));
  const h = addLeadingZero(Math.floor((ms % day) / hour));
  const m = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const s = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { d, h, m, s };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0)
}

