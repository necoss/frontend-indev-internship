window.document.addEventListener('DOMContentLoaded', () => {
  const body = window.document.body as HTMLBodyElement
  const list: HTMLUListElement = window.document.createElement('ul')

  setupPage()
  createDivControls()
  createRadioGroup()

  createStylesForPage()

  getUserVisitsCount()
  createAndAddMiniDomMetaTag()
  initRedirect()

  function setupPage() {
    let elementsCountForCreate: number = 0
    let currentClickEventsCount: number = 0

    list.addEventListener('click', (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        const eventTargetStyle: CSSStyleDeclaration = event.target.style

        const computedStyle: string = window.getComputedStyle(event.target).fontSize
        const currentFontSize: number = window.Number.parseInt(computedStyle, 10)

        changeBackgroundColor(event.target)

        if (currentClickEventsCount % 2 === 0) {
          eventTargetStyle.fontSize = currentFontSize - 6 + 'px'
        } else {
          eventTargetStyle.fontSize = currentFontSize + 4 + 'px'
        }

        currentClickEventsCount++
      }
    })

    while (elementsCountForCreate < 5) {
      const li: HTMLLIElement = window.document.createElement('li')
      li.style.fontSize = '16px'

      list.append(li)
      li.textContent = `This is element #${elementsCountForCreate + 1}`

      changeBackgroundColor(li)
      elementsCountForCreate++
    }

    body.append(list)
  }

  function createDivControls() {
    const divControls: HTMLDivElement = window.document.createElement('div')
    const buttonAdd: HTMLButtonElement = window.document.createElement('button')
    const buttonDelete: HTMLButtonElement = window.document.createElement('button')
    const buttonShuffle: HTMLButtonElement = window.document.createElement('button')
    const buttonShowList: HTMLButtonElement = window.document.createElement('button')
    const buttonPushState: HTMLButtonElement = window.document.createElement('button')
    const buttonUserAgent: HTMLButtonElement = window.document.createElement('button')

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
    const formRadioButtons: HTMLFormElement = window.document.createElement('form')
    const radioButtonOn: HTMLInputElement = window.document.createElement('input')
    const radioButtonOff: HTMLInputElement = window.document.createElement('input')

    const labelRedirectOn: HTMLLabelElement = window.document.createElement('label')
    const labelRedirectOff: HTMLLabelElement = window.document.createElement('label')

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

  function initRedirect() {
    const redirectValue: string = window.JSON.parse(window.localStorage.getItem('redirect') || '""')
    const head: HTMLHeadElement = window.document.head
    const radioButtonOn = window.document.getElementById('buttonOn') as HTMLInputElement | null
    const radioButtonOff = window.document.getElementById('buttonOff') as HTMLInputElement | null

    if (redirectValue === 'on') {
      const meta: HTMLMetaElement = window.document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      head.append(meta)
      window.localStorage.setItem('redirect', window.JSON.stringify('auto'))
    }

    if (redirectValue === 'auto') {
      setupMetaRedirect()
    }

    radioButtonOn?.addEventListener('click', () => {
      const metaTag = window.document.getElementById('metaRefresh') as HTMLMetaElement | null
      window.localStorage.setItem('redirect', window.JSON.stringify('on'))

      if (!metaTag) {
        const meta: HTMLMetaElement = window.document.createElement('meta')
        meta.content = '10;url=https://example.com'
        meta.id = 'metaRefresh'
        meta.httpEquiv = 'refresh'
        head.append(meta)
      }
    })

    radioButtonOff?.addEventListener('click', () => {
      window.localStorage.setItem('redirect', window.JSON.stringify('off'))

      window.document.querySelector('meta[id="metaRefresh"]')?.remove()
    })
  }

  function setupMetaRedirect() {
    const metaTag: HTMLElement | null = window.document.getElementById('metaRefresh')
    const head: HTMLHeadElement = window.document.head
    const redirectValue: string = window.JSON.parse(window.localStorage.getItem('redirect') || '""')

    if (list.childElementCount >= 13 && metaTag === null) {
      const meta: HTMLMetaElement = window.document.createElement('meta')
      meta.content = '10;url=https://example.com'
      meta.id = 'metaRefresh'
      meta.httpEquiv = 'refresh'
      head.append(meta)
      window.localStorage.setItem('redirect', window.JSON.stringify('auto'))
    }

    if (list.childElementCount < 13 && redirectValue === 'auto' && metaTag != null) {
      metaTag.remove()
      window.localStorage.setItem('redirect', window.JSON.stringify('off'))
    }
  }

  function getUserVisitsCount() {
    const parsedCount: string = window.JSON.parse(window.localStorage.getItem('visitCount') || '""')
    let count: number = window.Number(parsedCount) || 0

    window.localStorage.setItem('visitCount', window.JSON.stringify(count + 1))
    // window.alert(`You visited this webpage ${count + 1} times`)
  }

  function addElementToList() {
    const newLi: HTMLLIElement = window.document.createElement('li')
    newLi.textContent = `This is element #${list.getElementsByTagName('li').length + 1}`

    newLi.style.width = '100%'
    newLi.style.height = '30%'
    newLi.style.alignContent = 'center'

    changeBackgroundColor(newLi)
    list.append(newLi)

    setupMetaRedirect()
  }

  function deleteElementFromList() {
    const li: HTMLCollectionOf<HTMLLIElement> = list.getElementsByTagName('li')
    if (li.length >= 1) {
      list.lastChild?.remove()
      setupMetaRedirect()
    }
  }

  function shuffleList() {
    const array: HTMLCollectionOf<HTMLLIElement> = list.getElementsByTagName('li')
    let arrayItemsCount: number = array.length
    const randomElementPosition: number = window.Math.floor(window.Math.random()) * arrayItemsCount

    console.log('position', randomElementPosition, 'count: ', arrayItemsCount)

    while (arrayItemsCount >= 0) {
      list.append(list.children[randomElementPosition || 0])
      arrayItemsCount--
    }

    setupMetaRedirect()
  }

  function showCollection() {
    const elementsCount: number = list.childElementCount
    const elementsText: string[] = [...list.children].map((element) => (element as HTMLLIElement).innerText)

    window.alert(`There are ${elementsCount} elements: ${elementsText.join(', ')}`)
  }

  function pushState() {
    const randomParameter: string = (window.Math.random() + 1).toString(36).substring(7)
    const currentUrl: string = window.location.href
    window.history.pushState({}, '', `?page=<${randomParameter}>`)
    window.alert(`Your location: ${currentUrl}`)
  }

  function getUserAgent() {
    window.alert(window.navigator.userAgent)
  }

  function createAndAddMiniDomMetaTag() {
    const head: HTMLHeadElement = window.document.head
    const meta: HTMLMetaElement = window.document.createElement('meta')
    meta.name = 'description'
    meta.content = 'Mini-DOM-Playground training app'
    head.append(meta)
  }

  function changeBackgroundColor(element: HTMLElement) {
    const randomBetween = (min: number, max: number): number => min + window.Math.floor(window.Math.random() * (max - min + 1))
    const R = randomBetween(0, 255)
    const G = randomBetween(0, 255)
    const B = randomBetween(0, 255)
    const elementBackgroundColor: string = `rgb(${R},${G},${B})`
    element.style.backgroundColor = elementBackgroundColor
  }

  function createStylesForPage() {
    const allElements: NodeListOf<HTMLElement> = window.document.querySelectorAll<HTMLElement>('*')
    const liList: HTMLCollectionOf<HTMLLIElement> = list.getElementsByTagName('li')
    const controls = window.document.getElementById('controls') as HTMLDivElement | null
    const controlsButtonsList: HTMLCollectionOf<HTMLButtonElement> = window.document.getElementsByTagName('button')
    const form: HTMLFormElement | null = window.document.querySelector('form')

    allElements.forEach((element) => {
      element.style.padding = '0'
      element.style.margin = '0'
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
    list.style.zIndex = '5'

    const li = [...liList].forEach((element) => {
      element.style.width = '100%'
      element.style.height = '30%'
      element.style.alignContent = 'center'
      element.style.fontSize = '16px'
    })

    if (controls) {
      controls.style.position = 'absolute'
      controls.style.top = '0'
      controls.style.left = '50%'
      controls.style.transform = 'translateX(-50%)'
      controls.style.width = '70vw'
      controls.style.height = '10vh'
      controls.style.display = 'flex'
      controls.style.justifyContent = 'center'
      controls.style.alignItems = 'center'
      controls.style.gap = '20px'
    }

    const controlsButtons = [...controlsButtonsList].forEach((element) => {
      element.style.maxWidth = '40vw'
      element.style.cursor = 'pointer'
    })

    if (form) {
      form.style.position = 'fixed'
      form.style.bottom = '0'
      form.style.left = '0'
      form.style.zIndex = '5'
      form.style.display = 'flex'
      form.style.justifyContent = 'center'
      form.style.alignItems = 'center'
      form.style.gap = '30px'
      form.style.backgroundColor = '#00000090'
      form.style.width = '100vw'
      form.style.height = '10vh'
      form.style.fontSize = '20px'
      form.style.color = 'white'
    }
  }
})
