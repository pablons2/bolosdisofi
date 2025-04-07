document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel')
  const images = [
    'imgs/carrousel-1.jpg',
    'imgs/carrousel-2.jpg',
    'imgs/carrousel-3.jpg',
    'imgs/carrousel-4.jpg',
  ]

  let currentIndex = 0
  const img = carousel.querySelector('img')

  function changeImage() {
    img.classList.replace('opacity-100', 'opacity-0')

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length
      img.src = images[currentIndex]

      img.classList.replace('opacity-0', 'opacity-100')
    }, 1000)
  }

  setInterval(changeImage, 4500)
})
