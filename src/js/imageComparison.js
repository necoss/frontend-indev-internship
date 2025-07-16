const element = document.getElementById('image-compare')

const options = {
  controlColor: "#ffffff",
  controlShadow: false,
  addCircle: true,
  addCircleBlur: true,
}

const viewer = new ImageCompare(element, options).mount()

console.log(1)

