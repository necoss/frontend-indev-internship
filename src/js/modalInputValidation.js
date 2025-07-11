const inputValidation = document.querySelectorAll('.validation_check')

inputValidation.forEach((el) => {
	el.addEventListener('invalid', () => {
		el.setCustomValidity('Required Field')
	})

	el.addEventListener('input', () => {
		el.setCustomValidity('')
	})
})