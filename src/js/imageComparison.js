//! REALIZATION USING IMAGE COMPARE VIEWER
// const element = document.getElementById('image-compare')

// const options = {
//   controlColor: "#ffffff",
//   controlShadow: false,
//   addCircle: true,
//   addCircleBlur: true,
// }

// const viewer = new ImageCompare(element, options).mount()

// function imageComparator() {
//   sizeDiv = $('#slider-ic').val();
//   $('.image-original').css('width',sizeDiv + '%');
//   $('#cursor-ic').css('left',sizeDiv + '%');
// }

// $('#slider-ic').on('mousemove touchmove click', function(){
//   imageComparator();
// });

function imageComparator() {
  const sizaDiv = document.getElementById('slider-ic').value
  const imageOriginal = document.querySelector('.image-original')
  const cursorIc = document.getElementById('cursor-ic')

  imageOriginal.style.width = sizaDiv + '%'
  cursorIc.style.left = sizaDiv + '%'
}

const callImageComporatorFunc = () => {
  imageComparator()
}

document.getElementById('slider-ic').addEventListener('click', () => imageComparator())

document.getElementById('slider-ic').addEventListener('touchmove', () => imageComparator())

document.getElementById('slider-ic').addEventListener('mousemove', () => imageComparator())
