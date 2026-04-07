// 1. Envolvemos todo en una función
function inicializarCarruseles() {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    if (carousels.length === 0) return;

    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-track]') as HTMLElement;
        const slides = carousel.querySelectorAll('[data-index]');
        const dots = carousel.querySelectorAll('[data-dot]');
        const prevBtn = carousel.querySelector('[data-prev]');
        const nextBtn = carousel.querySelector('[data-next]');

        let currentIndex = 0;
        const totalSlides = slides.length;

        function goToSlide(index: number) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;
            // Aquí está la magia del movimiento
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                if(i === currentIndex){
                    dot.classList.add('bg-white');
                    dot.classList.remove('bg-transparent');
                }else{
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-transparent');
                }
            });
        }

        prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

        dots.forEach((dot) => {
            const index = Number(dot.getAttribute('data-dot'));
            dot.addEventListener('click', () => goToSlide(index));
        });

        let startX = 0;
        let endX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if(!startX || !endX) return;

            const diffX = startX - endX;
            const threshold = 50;

            if(diffX > threshold){
                goToSlide(currentIndex + 1);
            }else if(diffX < -threshold){
                goToSlide(currentIndex - 1);
            }

            startX = 0;
            endX = 0;
        });

    });
}

inicializarCarruseles();

document.addEventListener('astro:page-load', inicializarCarruseles);