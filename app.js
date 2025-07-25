const body = document.getElementById('body')
const div = document.createElement('div')
const ul = document.createElement('ul')
const li = document.createElement('li')

generateDivControls()
setupPage()

document.addEventListener('DOMContentLoaded', getUserVisitsQuantity)

function generateDivControls() {
  const divControls = document.createElement('div')
  const buttonAdd = document.createElement('button')
  const buttonDelete = document.createElement('button')
  const buttonDuplicate = document.createElement('button')
  const buttonList = document.createElement('button')
  const buttonPushState = document.createElement('button')
  const buttonUserAgent = document.createElement('button')

  setElement(body, divControls)
  divControls.id = 'controls'

  buttonAdd.insertAdjacentHTML('beforeend', 'Добавить')
  divControls.append(buttonAdd)
  buttonDelete.insertAdjacentHTML('beforeend', 'Удалить Последний')
  divControls.append(buttonDelete)
  buttonDuplicate.insertAdjacentHTML('beforeend', 'Дублировать существующие')
  divControls.append(buttonDuplicate)
  buttonList.insertAdjacentHTML('beforeend', 'Состав списка')
  divControls.append(buttonList)
  buttonPushState.insertAdjacentHTML('beforeend', 'Пушнуть состояне')
  divControls.append(buttonPushState)
  buttonUserAgent.insertAdjacentHTML('beforeend', 'Юзер Агент')
  divControls.append(buttonUserAgent)

  buttonAdd.addEventListener('click', addElementToList)
  buttonDelete.addEventListener('click', deleteElementFromList)
  buttonDuplicate.addEventListener('click', duplicateList)
  ul.addEventListener('click', changeElementStyle)
  buttonList.addEventListener('click', inspectCollection)
  buttonPushState.addEventListener('click', pushState)
  buttonUserAgent.addEventListener('click', getUserAgent)
  document.addEventListener('DOMContentLoaded', addMetaTag)
}

function setupPage() {
  setElement(body, div)
  setElement(div, ul)

  setElementClassName(ul, 'list')
  fillList(ul)

  window.list = ul
}

function getUserVisitsQuantity() {
  let count = Number(localStorage.getItem('visitCount')) || 0
  localStorage.setItem('visitCount', count + 1)
  // alert(`You visited this webpage ${count + 1} times`)
}

function addElementToList() {
  const newLi = document.createElement('li')
  newLi.insertAdjacentHTML('beforeend', `This is element #${list.getElementsByTagName('li').length + 1}`)
  newLi.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  ul.append(newLi)
}

function deleteElementFromList() {
  if (list.getElementsByTagName('li').length >= 1) {
    const lastElem = list.getElementsByTagName('li').length - 1
    list.getElementsByTagName('li')[lastElem].remove()
  }
}

function duplicateList() {
  const clone = ul.cloneNode(true)
  div.append(clone)
}

function changeElementStyle(element) {
  element.target.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  if (element.target.style.fontSize <= '16px') {
    element.target.style.fontSize = '20px'
  } else {
    element.target.style.fontSize = '10px'
  }
}

function inspectCollection() {
  let elements = ''
  const elementsQuantity = list.getElementsByTagName('li').length

  for (let i = 0; i < list.getElementsByTagName('li').length; i++) {
    elements += list.getElementsByTagName('li')[i].innerText + ', '
  }

  alert(`There are ${elementsQuantity} elements: ${elements}`)
}

function pushState() {
  history.pushState({}, '?page=<rand>', '?page=<pipipu>')
  const currentUrl = window.location.href
  alert(`Your location: ${currentUrl}`)
}

function getUserAgent() {
  alert(navigator.userAgent) //Интересный факт, но я писал генератор фейковых (но рабочих) юзер агентов (им пользуются)
}

function addMetaTag() {
  const meta = document.createElement('meta')
  meta.name = 'description'
  meta.content = 'Mini-DOM-Playground training app'
  document.getElementsByTagName('head')[0].appendChild(meta)
}

function setElement(setTo, elementToSet) {
  setTo.append(elementToSet)
}

function setElementClassName(element, className) {
  element.className = className
}

function fillList(elemToFill) {
  for (let i = 1; i <= 5; i++) {
    elemFillWith = document.createElement('li')
    elemFillWith.style.fontSize = '16px'
    elemToFill.appendChild(elemFillWith)
    elemFillWith.insertAdjacentHTML('beforeend', `This is element #${i}`)
    elemFillWith.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
}