document.addEventListener('DOMContentLoaded', () => {
  const bodyElements = window.document.getElementsByTagName('body')
  const body = bodyElements[0]

  const ul = window.document.createElement('ul')
  window.list = ul

  const li = window.document.createElement('li')

  const radioButtonOn = window.document.createElement('input')
  const radioButtonOff = window.document.createElement('input')

  setupPage()
  getUserVisitsCount()
  addMetaTag()
  generateDivControls()

  initRedirect()
  generateRadioButtons()

  function setupPage() {
    let createElementsCount = 0
    let currentEventClicks = 0

    body.append(list)
    list.className = 'list'

    list.addEventListener('click', (event) => {
      changeBackgroungColor(event.target)

      const computedStyle = window.getComputedStyle(event.target).fontSize
      const newFont = parseInt(computedStyle, 10)

      const increaseBy = 4
      const decreaseBy = 6

      if (currentEventClicks % 2 === 0) {
        event.target.style.fontSize = newFont - decreaseBy + 'px'
      } else {
        event.target.style.fontSize = newFont + increaseBy + 'px'
      }

      currentEventClicks++
    })

    while (createElementsCount < 5) {
      const fillingElement = document.createElement('li')

      fillingElement.style.fontSize = '16px'
      list.appendChild(fillingElement)
      fillingElement.textContent = `This is element #${createElementsCount + 1}`

      changeBackgroungColor(fillingElement)
      createElementsCount++
    }
  }

  function generateDivControls() {
    const divControls = document.createElement('div')
    const buttonAdd = document.createElement('button')
    const buttonDelete = document.createElement('button')
    const buttonShuffle = document.createElement('button')
    const buttonShowList = document.createElement('button')
    const buttonPushState = document.createElement('button')
    const buttonUserAgent = document.createElement('button')

    body.append(divControls)
    divControls.id = 'controls'

    buttonAdd.textContent = 'Добавить'
    buttonAdd.addEventListener('click', addElementToList)

    buttonDelete.textContent = 'Удалить Последний'
    buttonDelete.addEventListener('click', deleteElementFromList)

    buttonShuffle.textContent = 'Перемешать'
    buttonShuffle.addEventListener('click', shuffleList)

    buttonShowList.textContent = 'Состав списка'
    buttonShowList.addEventListener('click', showCollection)

    buttonPushState.textContent = 'Пушнуть состояне'
    buttonPushState.addEventListener('click', pushState)

    buttonUserAgent.textContent = 'Юзер Агент'
    buttonUserAgent.addEventListener('click', getUserAgent)

    divControls.append(buttonAdd)
    divControls.append(buttonDelete)
    divControls.append(buttonShuffle)
    divControls.append(buttonShowList)
    divControls.append(buttonPushState)
    divControls.append(buttonUserAgent)
  }

  function generateRadioButtons() {
    const formRadioButtons = document.createElement('form')

    const labelRadionButtonOn = document.createElement('label')

    const labelRadionButtonOff = document.createElement('label')

    radioButtonOn.type = 'radio'
    radioButtonOn.name = 'radionButton'
    labelRadionButtonOn.htmlFor = 'buttonOn'
    labelRadionButtonOn.textContent = 'ON'

    radioButtonOff.type = 'radio'
    radioButtonOff.name = 'radionButton'
    labelRadionButtonOff.htmlFor = 'buttonOff'
    labelRadionButtonOff.textContent = 'OFF'

    body.append(formRadioButtons)

    formRadioButtons.append(radioButtonOn)
    formRadioButtons.append(labelRadionButtonOn)

    formRadioButtons.append(radioButtonOff)
    formRadioButtons.append(labelRadionButtonOff)
  }

  function initRedirect() {
    const localStorageValue = JSON.parse(localStorage.getItem('redirect'))

    if (localStorageValue === 'on') {
      const meta = document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      document.getElementsByTagName('head')[0].append(meta)
      localStorage.setItem('redirect', JSON.stringify('auto'))
    }

    if (localStorageValue === 'auto') {
      encforceRedirectIfLong()
    }

    radioButtonOn.addEventListener('click', () => {
      localStorage.setItem('redirect', JSON.stringify('on'))

      if (document.querySelectorAll('meta[id="metaRefresh"]').length <= 0) {
        const meta = document.createElement('meta')
        meta.content = '10;url=https://example.com'
        meta.id = 'metaRefresh'
        meta.httpEquiv = 'refresh'
        document.getElementsByTagName('head')[0].append(meta)
      }
    })

    radioButtonOff.addEventListener('click', () => {
      localStorage.setItem('redirect', JSON.stringify('off'))

      document.querySelector('meta[id="metaRefresh"]').remove()
    })
  }

  function encforceRedirectIfLong() {
    const metaTag = document.querySelector('meta[id="metaRefresh"]')
    const localStorageValue = JSON.parse(localStorage.getItem('redirect'))

    if (list.childElementCount >= 13 && metaTag === null) {
      const meta = document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      document.getElementsByTagName('head')[0].append(meta)
      localStorage.setItem('redirect', JSON.stringify('auto'))
    }

    if (list.childElementCount < 13 && localStorageValue === 'auto' && metaTag != null) {
      metaTag.remove()
      localStorage.setItem('redirect', JSON.stringify('off'))
    }
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
    changeBackgroungColor(newLi)
    list.append(newLi)

    encforceRedirectIfLong()
  }

  function deleteElementFromList() {
    if (list.getElementsByTagName('li').length >= 1) {
      list.lastChild.remove()
      encforceRedirectIfLong()
    }
  }

  function shuffleList() {
    const array = list.getElementsByTagName('li')

    for (let i = array.length; i >= 0; i--) {
      list.appendChild(list.children[(Math.random() * i) | 0])
    }

    encforceRedirectIfLong()
  }

  function showCollection() {
    const elementsCount = list.childElementCount
    const elementsText = [...list.children].map((element) => element.innerText)

    alert(`There are ${elementsCount} elements: ${elementsText.join(', ')}`)
  }

  function pushState() {
    const randomParameter = (Math.random() + 1).toString(36).substring(7)
    history.pushState({}, '', `?page=<${randomParameter}>`)
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

  function changeBackgroungColor(element) {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
    const R = randomBetween(0, 255)
    const G = randomBetween(0, 255)
    const B = randomBetween(0, 255)
    const elementBackgrounColor = `rgb(${R},${G},${B})`
    element.style.backgroundColor = elementBackgrounColor
  }
})
