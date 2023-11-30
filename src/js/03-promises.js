import Notiflix from 'notiflix';
const form = document.querySelector('.form')
form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()

  const delay = +event.target.elements.delay.value 
  const step = +event.target.elements.step.value
  const amount = +event.target.elements.amount.value
  console.log(delay, step, amount)
  
  for (let i = 0; i < amount; i++){
    const promiseDelay = delay+step*i
    console.log(promiseDelay)

    createPromise(i + 1, promiseDelay)
      
     .then(({ position, delay }) => {
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
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



