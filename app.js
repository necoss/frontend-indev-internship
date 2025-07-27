document.addEventListener('DOMContentLoaded', () => {
  const body = window.document.getElementById('body')
  const div = window.document.createElement('div')
  const ul = window.document.createElement('ul')
  const list = ul
  const li = window.document.createElement('li')

  setupPage()
  getUserVisitsCount()
  addMetaTag()
  generateDivControls()

  function setupPage() {
    setElement(body, list)
    setElementClassName(list, 'list')

    list.addEventListener('click', changeElementStyle)

    let createElementsCount = 0
    while (createElementsCount < 5) {
      const fillingElement = document.createElement('li')
      fillingElement.style.fontSize = '16px'
      list.appendChild(fillingElement)
      fillingElement.textContent = `This is element #${createElementsCount + 1}`
      fillingElement.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      createElementsCount++
    }
  }

  function generateDivControls() {
    const divControls = document.createElement('div')
    const buttonAdd = document.createElement('button')
    const buttonDelete = document.createElement('button')
    const buttonDuplicate = document.createElement('button')
    const buttonShowList = document.createElement('button')
    const buttonPushState = document.createElement('button')
    const buttonUserAgent = document.createElement('button')

    setElement(body, divControls)
    divControls.id = 'controls'

    buttonAdd.textContent = 'Добавить'
    buttonAdd.addEventListener('click', addElementToList)

    buttonDelete.textContent = 'Удалить Последний'
    buttonDelete.addEventListener('click', deleteElementFromList)

    buttonDuplicate.textContent = 'Дублировать существующие'
    buttonDuplicate.addEventListener('click', duplicateList)

    buttonShowList.textContent = 'Состав списка'
    buttonShowList.addEventListener('click', showCollection)

    buttonPushState.textContent = 'Пушнуть состояне'
    buttonPushState.addEventListener('click', pushState)

    buttonUserAgent.textContent = 'Юзер Агент'
    buttonUserAgent.addEventListener('click', getUserAgent)

    divControls.append(buttonAdd)
    divControls.append(buttonDelete)
    divControls.append(buttonDuplicate)
    divControls.append(buttonShowList)
    divControls.append(buttonPushState)
    divControls.append(buttonUserAgent)
  }

  function getUserVisitsCount() {
    const parsedCount = localStorage.getItem('visitCount')
    let count = Number(JSON.parse(parsedCount)) || 0
    window.localStorage.setItem('visitCount', JSON.stringify(count + 1))
    // alert(`You visited this webpage ${count + 1} times`)
  }

  function addElementToList() {
    const newLi = document.createElement('li')
    newLi.textContent = `This is element #${list.getElementsByTagName('li').length + 1}`
    newLi.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    list.append(newLi)
  }

  function deleteElementFromList() {
    if (list.getElementsByTagName('li').length >= 1) {
      const lastElem = list.getElementsByTagName('li').length - 1
      list.getElementsByTagName('li')[lastElem].remove()
    }
  }

  function duplicateList() {
    const clone = list.cloneNode(true)
    div.append(clone)
  }

  function changeElementStyle(event) {
    event.target.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

    if (event.target.style.fontSize <= '16px') {
      event.target.style.fontSize = '20px'
    } else {
      event.target.style.fontSize = '10px'
    }
  }

  function showCollection() {
    const elementsCount = list.childElementCount
    const elementsText = [...list.children].map(element => element.innerText)

    alert(`There are ${elementsCount} elements: ${elementsText.join(', ')}`)
  }

  function pushState() {
    history.pushState({}, '?page=<rand>', '?page=<pipipu>')
    const currentUrl = window.location.href
    alert(`Your location: ${currentUrl}`)
  }

  function getUserAgent() {
    alert(navigator.userAgent)
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
})
