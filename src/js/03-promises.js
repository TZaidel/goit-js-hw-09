import Notiflix from 'notiflix';
const form = document.querySelector('.form')
const button = document.querySelector('.form button')
form.addEventListener('submit', onSubmit)
function onSubmit(event) {
  event.preventDefault()
  button.setAttribute('disabled', '')
  const delay = +event.target.elements.delay.value 
  const step = +event.target.elements.step.value
  const amount = +event.target.elements.amount.value

  for (let i = 0; i < amount; i++){
    const promiseDelay = delay + step * i
    createPromise(i + 1, promiseDelay)
      
      .then(({ position, delay }) => {
          if (i+1 === amount) {
              button.removeAttribute('disabled', '')
          }
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      
      .catch(({ position, delay }) => {
          if (i+1 === amount) {
              button.removeAttribute('disabled', '')
          }
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })}
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const random = Math.random()
    setTimeout(() => {

      if (random > 0.3) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

