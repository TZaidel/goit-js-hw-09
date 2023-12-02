import Notiflix from 'notiflix';
const form = document.querySelector('.form')
const button = document.querySelector('.form button')
form.addEventListener('submit', onSubmit)
console.log('kjj')
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



// import { Notify } from 'notiflix';
// const formRef = document.querySelector('.form');
// formRef.addEventListener('submit', onSubmitForm);

// function onSubmitForm(e) {
//   e.preventDefault();
//   let delay = Number(formRef.delay.value);
//   for (let i = 1; i <= formRef.amount.value; i += 1) {
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`:white_check_mark: Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`:x: Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += Number(formRef.step.value);
//   }
// }
// // Create promise
// function createPromise(position, delay) {
//   const obj = { position, delay };
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve(obj);
//       } else {
//         // Reject
//         reject(obj);
//       }
//     }, delay);
//   });
// } 