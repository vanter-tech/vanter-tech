document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('burger-btn');
  const menu = document.getElementById('mobile-menu');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');

  const menuItems = document.querySelectorAll('.menu-item');

  if (btn && menu) {
    btn.addEventListener('click', () => {

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

      line1.classList.toggle('rotate-45');
      line1.classList.toggle('translate-y-1');
      line2.classList.toggle('-rotate-45');
      line2.classList.toggle('-translate-y-1');
    });
  }
});

const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');

  form.addEventListener('submit', function(e) {

    e.preventDefault(); 
    
    const formData = new FormData(form);


    result.classList.remove('hidden');
    result.innerHTML = "Enviando mensaje...";
    result.className = "mt-4 text-sm text-gray-400"; // Color neutro

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {

        result.innerHTML = "¡Mensaje enviado con éxito! Te contactaremos pronto.";
        result.className = "mt-4 text-sm font-bold text-green-500"; 
        form.reset(); 
      } else {

        result.innerHTML = json.message;
        result.className = "mt-4 text-sm font-bold text-red-500";
      }
    })
    .catch(error => {

      result.innerHTML = "Hubo un error de conexión al enviar el mensaje.";
      result.className = "mt-4 text-sm font-bold text-red-500";
    })
    .then(function() {

      setTimeout(() => {
        result.classList.add('hidden');
      }, 10000);
    });
  });

