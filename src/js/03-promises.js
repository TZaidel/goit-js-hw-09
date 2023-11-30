const form = document.querySelector('.form')
form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()

  const delay = +event.target.elements.delay.value *1000
  const step = +event.target.elements.step.value*1000
  const amount = +event.target.elements.amount.value
  console.log(delay, step, amount)
  
  for (let i = 0; i < amount; i++){
    const promiseDelay = delay+step
    console.log(promiseDelay)

    createPromise(i + 1, promiseDelay)
      
     .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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

//чи я в доброму напрямку рухаюсь? Здається залишилась тільки проблема з delay але я вже заплуталась. Можливо раніше не туди пішла
