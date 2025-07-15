const bookingModal = document.getElementById('tickets_modal')
const bookingModalButtons = document.querySelectorAll('.toggle_modal')

bookingModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    bookingModal.classList.toggle('tickets_modal_open')
  })
})