const validationInputs = document.querySelectorAll('.validation_check')

validationInputs.forEach((el) => {
	el.addEventListener('invalid', () => {
		el.setCustomValidity('Required Field')
	})

	el.addEventListener('input', () => {
		el.setCustomValidity('')
	})
})