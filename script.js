// Ativa os estilos de animação (sem JS, tudo continua visível)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Revela os elementos conforme a rolagem
  var itens = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduzir) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    itens.forEach(function (el) { obs.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add('in'); });
  }

  // Foto dos produtos inclina levemente com o mouse
  var foto = document.getElementById('foto');
  if (foto && !reduzir && window.matchMedia('(hover: hover)').matches) {
    foto.addEventListener('mousemove', function (ev) {
      var r = foto.getBoundingClientRect();
      var x = (ev.clientX - r.left) / r.width - 0.5;
      var y = (ev.clientY - r.top) / r.height - 0.5;
      foto.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    foto.addEventListener('mouseleave', function () {
      foto.style.transform = '';
    });
  }
});
