// BOOKING MODAL
const bookingModal = document.getElementById('tickets_modal')
const bookingModalButtons = document.querySelectorAll('.toggle_modal')

// DEFAULT
const closeModalButton = document.getElementById('close_modal')

const buttonIncreaseCounterBasic = document.getElementById('counter_button__increase_1')
const buttonDecreaseCounterBasic = document.getElementById('counter_button__decrease_1')
const counterQuantityBasic = document.getElementById('counter_value_1')

const buttonIncreaseCounterSenior = document.getElementById('counter_button__increase_2')
const buttonDecreaseCounterSenior = document.getElementById('counter_button__decrease_2')
const counterQuantitySenior = document.getElementById('counter_value_2')

// OVERVIEW MODAL
const buttonIncreaseCounterBasicOverview = document.getElementById('overview_incr_1')
const buttonDecreaseCounterBasicOverview = document.getElementById('overview_decr_1')
const counterQuantityBasicOverview = document.getElementById('overview_value_1')

const buttonIncreaseCounterSeniorOverview = document.getElementById('overview_incr_2')
const buttonDecreaseCounterSeniorOverview = document.getElementById('overview_decr_2')
const counterQuantitySeniorOverview = document.getElementById('overview_value_2')

const basicTicketsQuantity = document.getElementById('tickets_qty_1')
const seniorTicketsQuantity = document.getElementById('tickets_qty_2')

const basicTicketsTotalPrice = document.getElementById('first_tickets_total')
const seniorTicketsTotalPrice = document.getElementById('second_tickets_total')

// PRICE & BUTTON
const ticketsTotalPrice = document.getElementById('tickets_total_value')
const ticketsTotalPriceModal = document.getElementById('tickets_total')
const buttonOpenBookingModal = document.getElementById('tickets_buy_now')
const buttonSubmitOrder = document.getElementById('tickets_book')

// GET OTHER USER DATA
const ticketInputs = document.querySelectorAll('.update_data')

const ticketDate = document.getElementById('type_date')
const ticketTime = document.getElementById('type_time')
const ticketType = document.getElementById('type_select')

const orderDate = document.getElementById('user_data_date')
const orderTime = document.getElementById('user_data_time')
const orderTicket = document.getElementById('user_data_ticket')

//! END OF THE CONSTANTS ---------------

bookingModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    bookingModal.classList.toggle('tickets_modal_open')
  })
})

const calcTotalPrice = () => {
  const firstTicketCost = 20
  const secondTicketCost = 10

  basicTicketsQuantity.innerText = localStorage.getItem('First')
  seniorTicketsQuantity.innerText = localStorage.getItem('Second')

  const calc = basicTicketsQuantity.innerText * firstTicketCost + seniorTicketsQuantity.innerText * secondTicketCost

  basicTicketsTotalPrice.innerText = basicTicketsQuantity.innerText * firstTicketCost
  seniorTicketsTotalPrice.innerText = seniorTicketsQuantity.innerText * secondTicketCost

  ticketsTotalPrice.innerText = calc + ''
  ticketsTotalPriceModal.innerText = ticketsTotalPrice.innerText
}

counterFunc(buttonDecreaseCounterBasic, buttonIncreaseCounterBasic, counterQuantityBasic, 'First')
counterFunc(buttonDecreaseCounterSenior, buttonIncreaseCounterSenior, counterQuantitySenior, 'Second')
counterFunc(buttonDecreaseCounterBasicOverview, buttonIncreaseCounterBasicOverview, counterQuantityBasicOverview, 'First')
counterFunc(buttonDecreaseCounterSeniorOverview, buttonIncreaseCounterSeniorOverview, counterQuantitySeniorOverview, 'Second')

buttonOpenBookingModal.addEventListener('click', () => {
  counterQuantityBasicOverview.innerText = localStorage.getItem('First')
  counterQuantitySeniorOverview.innerText = localStorage.getItem('Second')
})

closeModalButton.addEventListener('click', () => {
  counterQuantityBasic.innerText = localStorage.getItem('First')
  counterQuantitySenior.innerText = localStorage.getItem('Second')
})

ticketInputs.forEach((e) => {
  e.addEventListener('keyup', () => {
    orderTime.innerText = ticketTime.value
    orderDate.innerText = ticketDate.value
  })
})

ticketType.addEventListener('click', () => {
  orderTicket.innerText = ticketType.options[ticketType.selectedIndex].text
})

buttonSubmitOrder.addEventListener('click', () => {
  localStorage.setItem('First', 0)
  localStorage.setItem('Second', 0)
})

function counterFunc(buttonDecrease, buttonIncrease, counterValue, key) {
  const increaseCounter = () => {
    let count = counterValue.innerText
    count++
    counterValue.innerText = count
    localStorage.setItem(key, count)
    calcTotalPrice()
  }

  const decreseCounter = () => {
    let count = counterValue.innerText

    if (count >= 1) {
      count--
      counterValue.innerText = count
      localStorage.setItem(key, count)
      calcTotalPrice()
    }
  }

  buttonIncrease.addEventListener('click', increaseCounter)
  buttonDecrease.addEventListener('click', decreseCounter)
}
