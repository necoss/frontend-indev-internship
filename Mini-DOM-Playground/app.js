window.document.addEventListener('DOMContentLoaded', () => {
  const bodyElements = window.document.getElementsByTagName('body')
  const body = bodyElements[0]

  const list = window.document.createElement('ul')
  // window.list = ul

  const radioButtonOn = window.document.createElement('input')
  const radioButtonOff = window.document.createElement('input')

  setupPage()
  createStylesForPage()
  getUserVisitsCount()
  createAndAddMiniDomMetaTag()
  createDivControls()

  initRedirect()
  createRadioGroup()

  function setupPage() {
    let elementsCountForCreate = 0
    let currentClickEventsCount = 0

    list.addEventListener('click', (event) => {
      const eventTargetStyle = event.target.style
      const computedStyle = window.getComputedStyle(event.target).fontSize
      const currentFontSize = window.Number.parseInt(computedStyle, 10)

      changeBackgroundColor(event.target)

      if (currentClickEventsCount % 2 === 0) {
        eventTargetStyle.fontSize = currentFontSize - 6 + 'px'
      } else {
        eventTargetStyle.fontSize = currentFontSize + 4 + 'px'
      }

      currentClickEventsCount++
    })

    while (elementsCountForCreate < 5) {
      const li = document.createElement('li')

      li.style.fontSize = '16px'
      list.append(li)
      li.textContent = `This is element #${elementsCountForCreate + 1}`

      changeBackgroundColor(li)
      elementsCountForCreate++
    }

    body.append(list)
  }

  function createDivControls() {
    const divControls = document.createElement('div')
    const buttonAdd = document.createElement('button')
    const buttonDelete = document.createElement('button')
    const buttonShuffle = document.createElement('button')
    const buttonShowList = document.createElement('button')
    const buttonPushState = document.createElement('button')
    const buttonUserAgent = document.createElement('button')

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

    body.append(divControls)
    divControls.append(buttonAdd)
    divControls.append(buttonDelete)
    divControls.append(buttonShuffle)
    divControls.append(buttonShowList)
    divControls.append(buttonPushState)
    divControls.append(buttonUserAgent)
  }

  function createRadioGroup() {
    const formRadioButtons = document.createElement('form')
    const labelRedirectOn = document.createElement('label')
    const labelRedirectOff = document.createElement('label')

    radioButtonOn.type = 'radio'
    radioButtonOn.name = 'radioButton'
    radioButtonOn.id = 'buttonOn'
    labelRedirectOn.htmlFor = 'buttonOn'
    labelRedirectOn.textContent = 'ON'

    radioButtonOff.type = 'radio'
    radioButtonOff.name = 'radioButton'
    radioButtonOff.id = 'buttonOff'
    labelRedirectOff.htmlFor = 'buttonOff'
    labelRedirectOff.textContent = 'OFF'

    body.append(formRadioButtons)

    formRadioButtons.append(radioButtonOn)
    formRadioButtons.append(labelRedirectOn)

    formRadioButtons.append(radioButtonOff)
    formRadioButtons.append(labelRedirectOff)
  }

  function createStylesForPage() {
    const allElements = document.querySelectorAll('*')
    const liList = list.getElementsByTagName('li')

    allElements.forEach((element) => {
      element.style.padding = 0
      element.style.margin = 0
      element.style.boxSizing = 'border-box'
      element.style.userSelect = 'none'
    })

    body.style.position = 'relative'
    body.style.width = '100vw'
    body.style.height = '100vh'

    list.style.position = 'relative'
    list.style.top = '100px'
    list.style.width = '100vw'
    list.style.height = '40vh'
    list.style.marginBottom = '230px'
    list.style.zIndex = 5

    const li = [...liList].forEach((element) => {
      element.style.top = '100%'
      element.style.width = '30%'
      element.style.alignContent = 'center'
      element.style.fontSize = '16px'
    })
  }

  function initRedirect() {
    const localStorageValue = JSON.parse(localStorage.getItem('redirect'))
    const head = document.getElementsByTagName('head')[0]

    if (localStorageValue === 'on') {
      const meta = document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      head.append(meta)
      localStorage.setItem('redirect', JSON.stringify('auto'))
    }

    if (localStorageValue === 'auto') {
      setupMetaRedirect()
    }

    radioButtonOn.addEventListener('click', () => {
      const metaTag = document.getElementById('metaRefresh')
      localStorage.setItem('redirect', JSON.stringify('on'))

      if (metaTag.length <= 0) {
        const meta = document.createElement('meta')
        meta.content = '10;url=https://example.com'
        meta.id = 'metaRefresh'
        meta.httpEquiv = 'refresh'
        head.append(meta)
      }
    })

    radioButtonOff.addEventListener('click', () => {
      localStorage.setItem('redirect', JSON.stringify('off'))

      document.querySelector('meta[id="metaRefresh"]').remove()
    })
  }

  function setupMetaRedirect() {
    const metaTag = document.getElementById('metaRefresh')
    const head = document.getElementsByTagName('head')[0]
    const localStorageValue = JSON.parse(localStorage.getItem('redirect'))

    if (list.childElementCount >= 13 && metaTag === null) {
      const meta = document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      head.append(meta)
      localStorage.setItem('redirect', JSON.stringify('auto'))
    }

    if (list.childElementCount < 13 && localStorageValue === 'auto' && metaTag != null) {
      metaTag.remove()
      localStorage.setItem('redirect', JSON.stringify('off'))
    }
  }

  function getUserVisitsCount() {
    const parsedCount = JSON.parse(localStorage.getItem('visitCount'))
    let count = Number(parsedCount) || 0

    window.localStorage.setItem('visitCount', JSON.stringify(count + 1))
    // alert(`You visited this webpage ${count + 1} times`)
  }

  function addElementToList() {
    const newLi = document.createElement('li')
    newLi.textContent = `This is element #${list.getElementsByTagName('li').length + 1}`

    changeBackgroundColor(newLi)
    list.append(newLi)

    setupMetaRedirect()
  }

  function deleteElementFromList() {
    const li = list.getElementsByTagName('li')
    if (li.length >= 1) {
      list.lastChild.remove()
      setupMetaRedirect()
    }
  }

  function shuffleList() {
    const array = list.getElementsByTagName('li')
    let arrayItemsCount = array.length

    while (arrayItemsCount >= 0) {
      list.append(list.children[(Math.random() * arrayItemsCount) | 0])
      arrayItemsCount--
    }

    setupMetaRedirect()
  }

  function showCollection() {
    const elementsCount = list.childElementCount
    const elementsText = [...list.children].map((element) => element.innerText)

    alert(`There are ${elementsCount} elements: ${elementsText.join(', ')}`)
  }

  function pushState() {
    const randomParameter = (Math.random() + 1).toString(36).substring(7)
    const currentUrl = window.location.href
    history.pushState({}, '', `?page=<${randomParameter}>`)
    alert(`Your location: ${currentUrl}`)
  }

  function getUserAgent() {
    alert(navigator.userAgent)
  }

  function createAndAddMiniDomMetaTag() {
    const head = document.getElementsByTagName('head')[0]
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = 'Mini-DOM-Playground training app'
    head.append(meta)
  }

  function changeBackgroundColor(element) {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
    const R = randomBetween(0, 255)
    const G = randomBetween(0, 255)
    const B = randomBetween(0, 255)
    const elementBackgroundColor = `rgb(${R},${G},${B})`
    element.style.backgroundColor = elementBackgroundColor
  }
})
