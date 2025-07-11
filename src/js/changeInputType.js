const dynamicInputs = document.querySelectorAll('.dynamic_type')

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
