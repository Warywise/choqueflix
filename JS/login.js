const getFocus = document.querySelectorAll('.imgFocus');
const perfilImg = (url => url);

function removeActive(e) {
  getFocus.forEach(
    (element) => element.classList.remove('imgActive')
  ); localStorage.setItem('perfil', e.target.src)
}

getFocus.forEach((element) => element.addEventListener('click', removeActive));

export { perfilImg };