// BOOKING MODAL
const bookingModal = document.getElementById('tickets_modal')
const bookingModalButtons = document.querySelectorAll('.toggle_modal')

// ELEMENTS WRAPPERs
const counterWrapperElements = document.querySelectorAll('.counter_wrapper *')

// COUNTER QUANTITY
const counterQuantityBasic = document.getElementById('counter_value_1')
const counterQuantitySenior = document.getElementById('counter_value_2')
const counterQuantityBasicOverview = document.getElementById('overview_value_1')
const counterQuantitySeniorOverview = document.getElementById('overview_value_2')
const basicTicketsQuantity = document.getElementById('tickets_qty_1')
const seniorTicketsQuantity = document.getElementById('tickets_qty_2')

const basicTicketPrice = 20
const seniorTicketPrice = 10

// OVERVIEW MODAL
const basicTicketsTotalPrice = document.getElementById('first_tickets_total')
const seniorTicketsTotalPrice = document.getElementById('second_tickets_total')
const ticketsTotalPrice = document.getElementById('tickets_total_value')
const ticketsTotalPriceOverview = document.getElementById('tickets_total')

// ORDER DETAILS
const ticketOverviewInputs = document.querySelectorAll('.update_data')
const bookingTicketDate = document.getElementById('type_date')
const bookingTicketTime = document.getElementById('type_time')
const bookingTicketType = document.getElementById('type_select')
const orderTypeDate = document.getElementById('order_type_date')
const orderTypeTime = document.getElementById('order_type_time')
const orderTypeTicket = document.getElementById('order_type_ticket')

//! END OF THE CONSTANTS ---------------

bookingModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    bookingModal.classList.toggle('tickets_modal_open')
  })
})

const increaseCounter = (counterElement, counterElementOverview) => () => {
  let count = Number(counterElement.innerText)

  count++
  counterElement.innerText = count
  counterElementOverview.innerText = count
  calcTotalPrice(basicTicketPrice, seniorTicketPrice, basicTicketsQuantity, seniorTicketsQuantity)
}

const decreaseCounter = (counterElement, counterElementOverview) => () => {
  let count = Number(counterElement.innerText)

  if (count) {
    count--
    counterElement.innerText = count
    counterElementOverview.innerText = count
    calcTotalPrice(basicTicketPrice, seniorTicketPrice, basicTicketsQuantity, seniorTicketsQuantity)
  }
}

counterWrapperElements.forEach((element) => {
  const elementAttribute = element.getAttribute('data-counter-type')
  const [ticketType, counterAction] = elementAttribute.split('-')

  if (ticketType === 'basic') {
    if (counterAction === 'increase') {
      element.addEventListener('click', increaseCounter(counterQuantityBasic, counterQuantityBasicOverview))
    }
    if (counterAction === 'decrease') {
      element.addEventListener('click', decreaseCounter(counterQuantityBasic, counterQuantityBasicOverview))
    }
  }

  if (ticketType === 'senior') {
    if (counterAction === 'increase') {
      element.addEventListener('click', increaseCounter(counterQuantitySenior, counterQuantitySeniorOverview))
    }

    if (counterAction === 'decrease') {
      element.addEventListener('click', decreaseCounter(counterQuantitySenior, counterQuantitySeniorOverview))
    }
  }
})

const calcTotalPrice = (basicTicketCost, seniorTicketCost, basicOverallQuantityElement, seniorOverallQuantityElement) => {
  basicOverallQuantityElement.innerText = counterQuantityBasic.innerText
  seniorOverallQuantityElement.innerText = counterQuantitySenior.innerText

  const basicPriceOverall = +basicOverallQuantityElement.innerText
  const seniorPriceOverall = +seniorOverallQuantityElement.innerText

  const totalPrice = basicPriceOverall * basicTicketCost + seniorPriceOverall * seniorTicketCost

  basicTicketsTotalPrice.innerText = basicPriceOverall * basicTicketCost
  seniorTicketsTotalPrice.innerText = seniorPriceOverall * seniorTicketCost

  ticketsTotalPrice.innerText = totalPrice
  ticketsTotalPriceOverview.innerText = totalPrice
}

bookingTicketDate.addEventListener('keyup', (event) => {
  orderTypeDate.innerText = event.target.value
})

bookingTicketTime.addEventListener('keyup', (event) => {
  orderTypeTime.innerText = event.target.value
})

bookingTicketType.addEventListener('click', (event) => {
  const elementEvent = event.currentTarget
  orderTypeTicket.innerText = elementEvent.options[elementEvent.selectedIndex].text
})
