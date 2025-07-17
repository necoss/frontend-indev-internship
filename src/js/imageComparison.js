function imageComparator() {
  const sizaDiv = document.getElementById('slider-ic').value
  const imageOriginal = document.querySelector('.image-original')
  const cursorIc = document.getElementById('cursor-ic')

  imageOriginal.style.width = sizaDiv + '%'
  cursorIc.style.left = sizaDiv + '%'
}

document.getElementById('slider-ic').addEventListener('click', imageComparator)

document.getElementById('slider-ic').addEventListener('touchmove', imageComparator)

document.getElementById('slider-ic').addEventListener('mousemove', imageComparator)
