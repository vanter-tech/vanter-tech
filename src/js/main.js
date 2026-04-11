
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

document.addEventListener('astro:page-load', () => {
  setupMenu();
  setupInteraction();
  inicializarVistaProyectos();
});