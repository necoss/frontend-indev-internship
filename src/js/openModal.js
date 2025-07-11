const modalBookingWindow = document.getElementById('tickets_modal')
const modalButtons = document.querySelectorAll('.toggle_modal')

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modalBookingWindow.classList.toggle('tickets_modal_open')
  })
})