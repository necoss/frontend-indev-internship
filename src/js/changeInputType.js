const dynamicInput = document.querySelectorAll('.dynamic_type')

dynamicInput.forEach((el) => {
  el.addEventListener('focus', () => {
    if (el.id === 'type_date') {
      el.type = 'date'
    }

    if (el.id === 'type_time') {
      el.type = 'time'
    }
  })
})
