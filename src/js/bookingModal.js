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

// OVERVIEW MODAL
const basicTicketsTotalPrice = document.getElementById('first_tickets_total')
const seniorTicketsTotalPrice = document.getElementById('second_tickets_total')
const ticketsTotalPrice = document.getElementById('tickets_total_value')
const ticketsTotalPriceOverview = document.getElementById('tickets_total')

// ORDER DETAILS
const ticketInputsOverview = document.querySelectorAll('.update_data')
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
  calcTotalPrice(20, 10, basicTicketsQuantity, seniorTicketsQuantity)
}

const decreaseCounter = (counterElement, counterElementOverview) => () => {
  let count = Number(counterElement.innerText)

  if (count) {
    count--
    counterElement.innerText = count
    counterElementOverview.innerText = count
    calcTotalPrice(20, 10, basicTicketsQuantity, seniorTicketsQuantity)
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

const calcTotalPrice = (basicTicketCost, seniorTicketCost, basicOverallQuantity, seniorOverallQuantity) => {
  basicOverallQuantity.innerText = counterQuantityBasic.innerText
  seniorOverallQuantity.innerText = counterQuantitySenior.innerText

  const basicPriceOverall = +basicOverallQuantity.innerText
  const seniorPriceOverall = +seniorOverallQuantity.innerText

  const totalPriceCalculations = basicPriceOverall * basicTicketCost + seniorPriceOverall * seniorTicketCost

  basicTicketsTotalPrice.innerText = basicOverallQuantity.innerText * basicTicketCost
  seniorTicketsTotalPrice.innerText = seniorOverallQuantity.innerText * seniorTicketCost

  ticketsTotalPrice.innerText = Number(totalPriceCalculations)
  ticketsTotalPriceOverview.innerText = Number(ticketsTotalPrice.innerText)
}

ticketInputsOverview.forEach((e) => {
  e.addEventListener('keyup', () => {
    orderTypeTime.innerText = bookingTicketTime.value
    orderTypeDate.innerText = bookingTicketDate.value
  })
})

bookingTicketType.addEventListener('click', () => {
  orderTypeTicket.innerText = bookingTicketType.options[bookingTicketType.selectedIndex].text
})
