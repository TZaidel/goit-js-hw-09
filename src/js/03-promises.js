import Notiflix from 'notiflix';
const form = document.querySelector('.form')
const button = document.querySelector('.form button')

form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()
  button.setAttribute('disabled', '')//де цей атрибут можна видалити, щоб після закінчення - кнопка знову була актовною?
  const delay = +event.target.elements.delay.value 
  const step = +event.target.elements.step.value
  const amount = +event.target.elements.amount.value
  
  for (let i = 0; i < amount; i++){
    const promiseDelay = delay + step * i
    console.log(i+1, amount)

    createPromise(i + 1, promiseDelay)
      
    .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
//         if (i+1 === amount) {
//   button.removeAttribute('disabled', '')
// }
  }
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



