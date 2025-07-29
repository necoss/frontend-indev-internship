document.addEventListener('DOMContentLoaded', () => {
  const body: HTMLElement = window.document.body
  const list: HTMLUListElement = window.document.createElement('ul')

  setupPage()
  createDivControls()
  // createRadioGroup()

  // createStylesForPage()

  getUserVisitsCount()
  // createAndAddMiniDomMetaTag()
  // initRedirect()

  function setupPage() {
    let elementsCountForCreate: number = 0
    let currentClickEventsCount: number = 0

    list.addEventListener('click', (event) => {
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

  function setupMetaRedirect() {
    const metaTag: HTMLElement | null = window.document.getElementById('metaRefresh')
    const head: HTMLHeadElement = window.document.head
    const redirectValue: any = window.JSON.parse(window.localStorage.getItem('redirect') || '{}')

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
    const parsedCount: any = window.JSON.parse(window.localStorage.getItem('visitCount') || '{}')
    let count: number = window.Number(parsedCount) || 0

    window.window.localStorage.setItem('visitCount', window.JSON.stringify(count + 1))
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
    //!UNDEFINED
    const array: HTMLCollectionOf<HTMLLIElement> = list.getElementsByTagName('li')
    let arrayItemsCount: number = array.length
    const randomElementPosition: number = window.Math.random() * arrayItemsCount

    while (arrayItemsCount >= 0) {
      list.append(list.children[randomElementPosition || 0])
      arrayItemsCount--
    }

    setupMetaRedirect()
  }

  function showCollection() {
    const elementsCount: number = list.childElementCount
    const elementsText: any[] = [...list.children].map((element) => (element as HTMLElement).innerText)

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
    const randomBetween = (min: number, max: number) => min + window.Math.floor(window.Math.random() * (max - min + 1))
    const R = randomBetween(0, 255)
    const G = randomBetween(0, 255)
    const B = randomBetween(0, 255)
    const elementBackgroundColor: string = `rgb(${R},${G},${B})`
    element.style.backgroundColor = elementBackgroundColor
  }
})
