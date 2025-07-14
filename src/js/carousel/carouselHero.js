import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButton.js'
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton.js'
import { updateSelectedSnapDisplay } from './EmblaCarouselSelectedSnapDisplay.js'


const OPTIONS = { align: 'end', loop: true }

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtnNode = emblaNode.querySelector('.embla__button--prev')
const nextBtnNode = emblaNode.querySelector('.embla__button--next')
const dotsNode = emblaNode.querySelector('.embla__dots')
const snapDisplayNode = emblaNode.querySelector('.embla__selected-snap-display')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [EmblaCarouselAutoplay(), EmblaCarouselFade()])

const onNavButtonClick = (emblaApi) => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return

  const resetOrStop =
    autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop

  resetOrStop()
}

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtnNode,
  nextBtnNode,
  onNavButtonClick
)
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
  emblaApi,
  dotsNode
)

updateSelectedSnapDisplay(emblaApi, snapDisplayNode)

emblaApi.on('destroy', removePrevNextBtnsClickHandlers)
emblaApi.on('destroy', removeDotBtnsAndClickHandlers)