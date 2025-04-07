document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = [
        'imgs/background-bolos-di-sofi.png',
        'imgs/carousel-image-2.jpg',
        'imgs/carousel-image-3.jpg',
        'imgs/carousel-image-4.jpg'
   
    ];
    let currentIndex = 0;

    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        carousel.innerHTML = `<img src="${images[currentIndex]}" alt="Bolo" class="w-full h-[80%]" />`;
    }

    setInterval(changeImage, 3500);
});