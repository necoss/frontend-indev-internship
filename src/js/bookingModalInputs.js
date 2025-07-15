const dynamicInputs = document.querySelectorAll('.dynamic_type')
const validationInputs = document.querySelectorAll('.validation_check')

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

validationInputs.forEach((el) => {
	el.addEventListener('invalid', () => {
		el.setCustomValidity('Required Field')
	})

	el.addEventListener('input', () => {
		el.setCustomValidity('')
	})
})