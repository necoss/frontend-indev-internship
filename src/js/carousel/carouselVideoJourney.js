import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButton.js'
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton.js'

// localStorage.clear()

const OPTIONS = { align: 'start', loop:true }

const emblaNode = document.querySelector('.embla_vj')
const viewportNode = emblaNode.querySelector('.embla_vj__viewport')
const prevBtnNode = emblaNode.querySelector('.embla_vj__button--prev')
const nextBtnNode = emblaNode.querySelector('.embla_vj__button--next')
const dotsNode = emblaNode.querySelector('.embla_vj__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

const removeClickHandlers = () => {

	const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
		emblaApi,
		prevBtnNode,
		nextBtnNode,
	)
	const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
		emblaApi,
		dotsNode
	)
}

emblaApi.on('destroy', removeClickHandlers())
