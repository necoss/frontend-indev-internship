const dynamicInputs = document.querySelectorAll('.dynamic_type')
const validationInputs = document.querySelectorAll('.validation_check')
const closeBookingModalButton = document.querySelector('.tickets_modal__close_modal')

dynamicInputs.forEach((el) => {
  el.addEventListener('focus', () => {
    if (el.id === 'type_date') {
      el.type = 'date'
    }

    if (el.id === 'type_time') {
      el.type = 'time'
    }
  })
})


const f1 = (e) => {
  e.setCustomValidity('Required Field')
}

const f2 = (e) => {
  e.setCustomValidity('')
}

validationInputs.forEach((el) => {
	const setValidity = () => f1(el)
	const clearValidity = () => f2(el)

  el.addEventListener('invalid', setValidity)
  el.addEventListener('input', clearValidity)

  closeBookingModalButton.addEventListener('click', () => {
    el.removeEventListener('invalid', setValidity)
    el.removeEventListener('input', clearValidity)
  })
})