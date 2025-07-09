
const burgerToggle = document.getElementById('navigation_burger_menu__toggle')

burgerToggle.addEventListener('change', (e) => {
  if (e.target.checked === true) {
    document.body.classList.add('overflow_y_hidden')
  } else{
    document.body.classList.remove('overflow_y_hidden')
	}
})
