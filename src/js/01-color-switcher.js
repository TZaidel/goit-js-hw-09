const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let timerId = null

startBtn.addEventListener('click', onStartClick)
stopBtn.addEventListener('click', onStopClick)
    stopBtn.setAttribute('disabled', '')

function onStartClick(event) {
  startBtn.setAttribute('disabled', '')
      stopBtn.removeAttribute('disabled', '')

    timerId = setInterval(() => {
       document.body.style.backgroundColor = getRandomHexColor()
    },1000)
}

function onStopClick() {
      stopBtn.setAttribute('disabled', '')
    clearInterval(timerId)
    startBtn.removeAttribute('disabled', '')
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


