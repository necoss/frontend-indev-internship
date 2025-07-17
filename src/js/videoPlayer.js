const video = document.getElementById('vid1')

const player = videojs(video, {
  autoplay: false,
  controls: true,
  aspectRatio: '16:9',
  poster: 'https://live.staticflickr.com/8364/8292162662_0af21389f7_b.jpg',
})

player.on('touchstart', function (e) {
  if (e.target.nodeName === 'VIDEO') {
    player.paused() ? this.play() : this.pause() 
  }
})
