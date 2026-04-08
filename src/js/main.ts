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

  function inicializarTerminal() {
    const btnClose = document.getElementById('btn-close');
    const btnMinimize = document.getElementById('btn-minimize');
    const terminalWrapper = document.getElementById('terminal-wrapper');
    const contactGrid = document.getElementById('contact-grid');
    const floatingTerminal = document.getElementById('floating-terminal');
    
  
    const footer = document.querySelector('footer'); 

    if (!btnClose || !btnMinimize || !terminalWrapper || !contactGrid || !floatingTerminal) return;

    if (btnClose.dataset.iniciado === "true") return;
    btnClose.dataset.iniciado = "true";

    const hideTerminal = () => {
      terminalWrapper.style.opacity = '0';
      terminalWrapper.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        terminalWrapper.classList.add('hidden');
        contactGrid.classList.remove('md:grid-cols-2');
        contactGrid.classList.add('md:grid-cols-1');
      }, 300);
    };

    const showTerminal = () => {
      contactGrid.classList.remove('md:grid-cols-1');
      contactGrid.classList.add('md:grid-cols-2');
      terminalWrapper.classList.remove('hidden');
      
      setTimeout(() => {
        terminalWrapper.style.opacity = '1';
        terminalWrapper.style.transform = 'scale(1)';
      }, 50);
    };

    btnClose.addEventListener('click', hideTerminal);
    
    btnMinimize.addEventListener('click', () => {
      hideTerminal();
      floatingTerminal.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    });

    floatingTerminal.addEventListener('click', () => {
      showTerminal();
      floatingTerminal.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    });


    let ticking = false; 

    const checkFooterOverlap = () => {
      if (!footer) return;
      
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const footerRect = footer.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (footerRect.top < windowHeight) {
            const overlap = windowHeight - footerRect.top;
            floatingTerminal.style.bottom = `${overlap + 24}px`;
          } else {
            floatingTerminal.style.bottom = '24px';
          }
          ticking = false; 
        });
        ticking = true; 
      }
    };

    window.addEventListener('scroll', checkFooterOverlap, { passive: true });
    window.addEventListener('resize', checkFooterOverlap, { passive: true });
    

    checkFooterOverlap();
  }

  inicializarTerminal();
  document.addEventListener('astro:page-load', inicializarTerminal);