
function setupMenu() {
  const btn = document.getElementById('burger-btn');
  const menu = document.getElementById('mobile-menu');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const menuItems = document.querySelectorAll('.menu-item');

  if (btn && menu) {

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      menu.classList.toggle('opacity-0');
      menu.classList.toggle('pointer-events-none');
      menu.classList.toggle('opacity-100');
      menu.classList.toggle('pointer-events-auto');

      const isOpen = menu.classList.contains('opacity-100');

      menuItems.forEach((item, index) => {
        setTimeout(() => {
          if (isOpen) {
            item.classList.remove('opacity-0', 'translate-y-4');
            item.classList.add('opacity-100', 'translate-y-0');
          } else {
            item.classList.remove('opacity-100', 'translate-y-0');
            item.classList.add('opacity-0', 'translate-y-4');
          }
        }, isOpen ? index * 100 : 0);
      });

      const newLine1 = newBtn.querySelector('#line1') || document.getElementById('line1');
      const newLine2 = newBtn.querySelector('#line2') || document.getElementById('line2');
      
      if(newLine1 && newLine2) {
        newLine1.classList.toggle('rotate-45');
        newLine1.classList.toggle('translate-y-1');
        newLine2.classList.toggle('-rotate-45');
        newLine2.classList.toggle('-translate-y-1');
      }
    });
  }
}


function setupInteraction() {
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');

  if (form && result) {

    form.onsubmit = function(e) {
      e.preventDefault(); 
      
      const formData = new FormData(form);
      const msgSending = form.dataset.msgSending;
      const msgSuccess = form.dataset.msgSuccess;
      const msgError = form.dataset.msgError;

      result.classList.remove('hidden');
      result.innerHTML = msgSending;
      result.className = "mt-4 text-sm text-gray-400"; 

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = msgSuccess;
          result.className = "mt-4 text-sm font-bold text-green-500"; 
          form.reset(); 
        } else {
          result.innerHTML = json.message;
          result.className = "mt-4 text-sm font-bold text-red-500";
        }
      })
      .catch(error => {
        result.innerHTML = msgError;
        result.className = "mt-4 text-sm font-bold text-red-500";
      })
      .then(function() {
        setTimeout(() => {
          result.classList.add('hidden');
        }, 5000);
      });
    };
  }
}

function inicializarVistaProyectos() {
  const container = document.getElementById('projects-container');
  const btnGrid = document.getElementById('btn-grid');
  const btnList = document.getElementById('btn-list');

  if (container && btnGrid && btnList) {
    

    const cambiarVista = (tipoVista) => {
      container.setAttribute('data-view', tipoVista);
      
      if (tipoVista === 'list') {
        btnList.classList.replace('text-gray-500', 'text-white');
        btnList.classList.add('bg-white/10');
        btnGrid.classList.replace('text-white', 'text-gray-500');
        btnGrid.classList.remove('bg-white/10');
      } else {
        btnGrid.classList.replace('text-gray-500', 'text-white');
        btnGrid.classList.add('bg-white/10');
        btnList.classList.replace('text-white', 'text-gray-500');
        btnList.classList.remove('bg-white/10');
      }
    };

    btnList.addEventListener('click', () => {

      if (document.startViewTransition) {
        document.startViewTransition(() => cambiarVista('list'));
      } else {
        // Fallback para navegadores antiguos
        cambiarVista('list');
      }
    });

    btnGrid.addEventListener('click', () => {
      if (document.startViewTransition) {
        document.startViewTransition(() => cambiarVista('grid'));
      } else {
        cambiarVista('grid');
      }
    });
  }
}

function modalCarousel(){
// 1. Variables Globales
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeModal');
  const thumbContainer = document.getElementById('thumb-container');
  const carousel = document.getElementById('proyecto-carrusel');
  const modalBackground = document.getElementById('modalBackground');
  const prevBtn = document.getElementById('prevThumb');
  const nextBtn = document.getElementById('nextThumb');

  // Solo ejecuta esto si el carrusel y el modal existen en la página
  if (carousel && modal) {
    const projectImages = Array.from(carousel.querySelectorAll('img'));

    // 2. Función maestra para cambiar imágenes en el modal
    const updateMainImage = (src) => {
      // Pequeño fade-out para que el cambio no sea brusco
      modalImg.style.opacity = '0';
      setTimeout(() => {
        modalImg.src = src;
        modalImg.style.opacity = '1';
      }, 150); // Tiempo del fade

      // Actualizar qué miniatura tiene el marco brillante
      const thumbs = thumbContainer.querySelectorAll('img');
      thumbs.forEach(t => {
        if (t.src === src) t.classList.add('thumb-active');
        else t.classList.remove('thumb-active');
      });
    };

    // 3. Inicializar el clic en el carrusel original
    projectImages.forEach((img) => {
      // Le damos feedback visual a la imagen en la página para que sepan que es clicable
      img.classList.add('cursor-pointer', 'hover:opacity-80', 'transition-all');
      
      img.addEventListener('click', () => {
        // A) Vaciamos las miniaturas del modal (por si se abren otras)
        thumbContainer.innerHTML = '';

        // B) Construimos las nuevas miniaturas basadas en el proyecto
        projectImages.forEach((pImg) => {
          const thumb = document.createElement('img');
          thumb.src = pImg.src;
          // Estilos de la miniatura + Animación "thumb-pulse"
          thumb.className = "h-16 md:h-20 aspect-video object-cover rounded-lg cursor-pointer opacity-50 hover:opacity-100 transition-all thumb-pulse shrink-0 snap-center";
          
          // Si hacen clic en una miniatura, actualiza la imagen principal
          thumb.addEventListener('click', () => updateMainImage(thumb.src));
          thumbContainer.appendChild(thumb);
        });

        // C) Mostramos la imagen a la que se le hizo clic
        updateMainImage(img.src);
        
        // D) Abrimos el Modal
        modal.showModal();
        document.body.style.overflow = 'hidden'; // Bloquear scroll externo
        setTimeout(toggleArrows, 50);
      });
    });
  }

  // 4. LÓGICA DE CIERRE A PRUEBA DE BALAS
  const closeModal = () => {
    modal.close();
    document.body.style.overflow = ''; // Restaurar scroll
  };

  // 4.1 Cerrar con la X
  if(closeBtn) closeBtn.addEventListener('click', closeModal);

  // 4.2 Cerrar al hacer clic AFUERA (Fondo oscuro, dialog nativo o modalBackground)
  if(modal) {
    modal.addEventListener('click', (e) => {
      // Si el usuario hace clic exactamente en el <dialog> (el backdrop oscuro nativo)
      // O si hace clic en nuestro contenedor 'modalBackground' que envuelve a la foto
      if (e.target === modal || e.target.id === 'modalBackground') {
        closeModal();
      }
    });

    // 4.3 Cerrar con la tecla ESC (El dialog ya lo hace, pero esto restaura el scroll de la web)
    modal.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  }

  // LÓGICA INTELIGENTE PARA FLECHAS DEL CARRUSEL


  // Función para mostrar/ocultar flechas según el contenido
  const toggleArrows = () => {
    if (!thumbContainer || !prevBtn || !nextBtn) return;
    
    // Comparamos el ancho total del contenido vs el ancho visible del contenedor
    const isScrollable = thumbContainer.scrollWidth > thumbContainer.clientWidth;
    
    if (isScrollable) {
      // Si hay scroll, mostramos las flechas (usando flex para escritorio)
      prevBtn.classList.remove('md:hidden');
      nextBtn.classList.remove('md:hidden');
      prevBtn.classList.add('md:flex');
      nextBtn.classList.add('md:flex');
    } else {
      // Si caben todas las fotos, ocultamos las flechas a la fuerza
      prevBtn.classList.remove('md:flex');
      nextBtn.classList.remove('md:flex');
      prevBtn.classList.add('md:hidden');
      nextBtn.classList.add('md:hidden');
    }
  };

  // Cantidad de píxeles a mover (aprox. el ancho de 2 miniaturas)
  const scrollAmount = 300; 

  if (prevBtn && thumbContainer) {
    prevBtn.addEventListener('click', () => {
      thumbContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn && thumbContainer) {
    nextBtn.addEventListener('click', () => {
      thumbContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Ejecutamos la comprobación cada vez que se redimensiona la ventana
  window.addEventListener('resize', toggleArrows);
}

document.addEventListener('astro:page-load', () => {
  setupMenu();
  setupInteraction();
  inicializarVistaProyectos();
  modalCarousel();
});