const body = document.getElementById('body')
const div = document.createElement('div')
const ul = document.createElement('ul')
const li = document.createElement('li')
const divControls = document.createElement('div')
let button = document.createElement('button')

const buttonsText = ['Добавить', 'Удалить последний', 'Перемешать']
const buttonId = ['add', 'delete', 'shuffle']

setElement(body, divControls)
divControls.id = 'controls'

for (let i = 0; i < 3; i++) {
  button = document.createElement('button')
  divControls.appendChild(button)

  buttonsText.forEach((text) => {
    if (!button.innerText) {
      button.insertAdjacentHTML('beforeend', buttonsText[i])
    }
  })

  buttonId.forEach((id) => {
    button.id = buttonId[i]

    if (button.id === 'add') {
      button.addEventListener('click', () => {
        div.appendChild(li)
				li.setAttribute('class', 'zaebalo')
        console.log(123)
      })
    }
  })
}
const setupPage = () => {
  // Controls

  // END CONTROLS

  // List
  setElement(body, div)
  setElement(div, ul)

  setElementClassName(ul, 'list')
  fillList(ul, li, 5)

  window.list = ul
}

function createControlls() {}

function setElement(setTo, elementToSet) {
  setTo.append(elementToSet)
}

function setElementClassName(element, className) {
  element.className = className
}

function fillList(elemToFill, elemFillWith, fillQuantity) {
  for (let i = 1; i <= fillQuantity; i++) {
    elemFillWith = document.createElement('li')
    elemToFill.appendChild(elemFillWith)
    elemFillWith.insertAdjacentHTML('beforeend', `This is element #${i}`)
    elemFillWith.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
}

function addToList(ul, li) {
  ul.append(li)
}

const getUserVisitsQuantity = () => {
  let count = Number(localStorage.getItem('visitCount')) || 0
  localStorage.setItem('visitCount', count + 1)
  // alert(`You visited this webpage ${count + 1} times`)
}

document.addEventListener('DOMContentLoaded', getUserVisitsQuantity)

setupPage()
