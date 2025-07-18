const bookingModal = document.getElementById('tickets_modal')
const bookingModalButtons = document.querySelectorAll('.toggle_modal')

bookingModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    bookingModal.classList.toggle('tickets_modal_open')
  })
})

// DEFAULT
const closeModalButton = document.getElementById('close_modal')

const counterIncreaseButtonFirst = document.getElementById('counter_button__increase_1')
const counterDecreaseButtonFirst = document.getElementById('counter_button__decrease_1')
const counterFirstQty = document.getElementById('counter_value_1')

const counterIncreaseButtonSecond = document.getElementById('counter_button__increase_2')
const counterDecreaseButtonSecond = document.getElementById('counter_button__decrease_2')
const counterSecondQty = document.getElementById('counter_value_2')

// OVERVIEW MODAL
const counterIncreaseButtonOverviewFirst = document.getElementById('overview_incr_1')
const counterDecreaseButtonOverviewFirst = document.getElementById('overview_decr_1')
const counterOverviewFirstQty = document.getElementById('overview_value_1')

const counterIncreaseButtonOverviewSecond = document.getElementById('overview_incr_2')
const counterDecreaseButtonOverviewSecond = document.getElementById('overview_decr_2')
const counterOverviewSecondQty = document.getElementById('overview_value_2')

const firstTicketsQty = document.getElementById('tickets_qty_1')
const secondTicketsQty = document.getElementById('tickets_qty_2')
const firstTicketsTotal = document.getElementById('first_tickets_total')
const secondTicketsTotal = document.getElementById('second_tickets_total')
const ticketsTotal = document.getElementById('tickets_total')

// TOTAL
let totalPrice = document.getElementById('tickets_total_value')
const buyNowButton = document.getElementById('tickets_buy_now')

const calcTotalPrice = () => {
  const firstTicketCost = 20
  const secondTicketCost = 10

  firstTicketsQty.innerHTML = parseInt(localStorage.getItem('First'))
  secondTicketsQty.innerHTML = parseInt(localStorage.getItem('Second'))

  const calc = firstTicketsQty.innerHTML * firstTicketCost + secondTicketsQty.innerHTML * secondTicketCost

  firstTicketsTotal.innerHTML = firstTicketsQty.innerHTML * firstTicketCost
  secondTicketsTotal.innerHTML = secondTicketsQty.innerHTML * secondTicketCost

  totalPrice.innerHTML = calc + ''
  ticketsTotal.innerHTML = totalPrice.innerHTML
}

const counterFunc = (button_decr, button_incr, counter_value, key) => {
  const increaseCounter = () => {
    let count = counter_value.innerHTML
    count++
    counter_value.innerHTML = parseInt(count)
    localStorage.setItem(key, count)
    calcTotalPrice()
  }

  const decreseCounter = () => {
    let count = counter_value.innerHTML

    if (count >= 1) {
      count--
      counter_value.innerHTML = parseInt(count)
      localStorage.setItem(key, count)
      calcTotalPrice()
    }
  }

  button_incr.addEventListener('click', increaseCounter)
  button_decr.addEventListener('click', decreseCounter)
}

counterFunc(counterDecreaseButtonFirst, counterIncreaseButtonFirst, counterFirstQty, 'First')
counterFunc(counterDecreaseButtonSecond, counterIncreaseButtonSecond, counterSecondQty, 'Second')
counterFunc(counterDecreaseButtonOverviewFirst, counterIncreaseButtonOverviewFirst, counterOverviewFirstQty, 'First')
counterFunc(counterDecreaseButtonOverviewSecond, counterIncreaseButtonOverviewSecond, counterOverviewSecondQty, 'Second')

buyNowButton.addEventListener('click', () => {
  counterOverviewFirstQty.innerHTML = localStorage.getItem('First')
  counterOverviewSecondQty.innerHTML = localStorage.getItem('Second')
})

closeModalButton.addEventListener('click', () => {
  counterFirstQty.innerHTML = localStorage.getItem('First')
  counterSecondQty.innerHTML = localStorage.getItem('Second')
})

// GET OTHER USER DATA
const ticketInputs = document.querySelectorAll('.update_data')

const ticketDate = document.getElementById('type_date')
const ticketTime = document.getElementById('type_time')
const ticketType = document.getElementById('ticketTypeSelection')

const orderDataDate = document.getElementById('user_data_date')
const orderDataTime = document.getElementById('user_data_time')
const orderDataTicket = document.getElementById('user_data_ticket')

const getOrderData = () => {
  ticketInputs.forEach((e) => {
    e.addEventListener('keyup', () => {
      orderDataTime.innerHTML = ticketTime.value
      orderDataDate.innerHTML = ticketDate.value
    })
  })

  ticketType.addEventListener('click', () => {
    orderDataTicket.innerHTML = ticketTypeSelection.options[ticketTypeSelection.selectedIndex].text
  })
}

getOrderData()

const ticketsBookButton = document.getElementById('tickets_book')

ticketsBookButton.addEventListener('click', () => {
  localStorage.setItem('First', 0)
  localStorage.setItem('Second', 0)
})


