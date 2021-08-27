// import {  } from "./watchlist.js";
import { addBtnsWatchlistEventListener, createElement, createImg } from "./main.js";

const getSearch = document.querySelector('.searchbar')
const getFilmList = document.getElementById('film-list');

/* function createElement(element, className, content, id) {
  const el = document.createElement(element);
  el.className = className;
  if (content) el.innerHTML = content;
  if (id) el.id = id;
  return el;
};

function createImg(className, source, alt) {
  const img = document.createElement('img');
  img.className = className;
  img.src = source;
  img.alt = alt;
  return img;
};
*/

const createHtml = (nota, description) =>
  `<div class='description'>
    <div class='nota'>Classificação: 
      <span class='nota--value'>${nota}</span>
    </div>
    <div class='description'>Descrição: 
      <spam class='description--text'>${description.slice(0, 300) + '...'}<span>
    </div>
  </div>`

const createFilme = async (Title, Poster, imdbRating, Plot, imdbID) => {
  getFilmList.innerHTML = '';
  // Criando uma section para cada filme e adicionando section a imagem e a descrições do filme
  const createSection = createElement('section', 'filme', false, imdbID);
  const thumbnail = Poster;
  const background = createImg('imgTest', thumbnail, Plot); // Cria o background
  const description = createElement('div', 'description', ''); // Cria a div de descrição
  createSection.appendChild(background); createSection.appendChild(description); // Adiciona a imagem e a div à section

  // Criando os botões, a classificação, e o overview a ser adicionados na descrição
  const trailerBtn = createElement('a', 'btn-trailer ui inverted red button', 'Ver Trailer'); trailerBtn.target = '_blank';
  const netflixBtn = createElement('a', '', ''); trailerBtn.target = '_blank';
  const watchlistBtn = createElement('button', `btn-watchlist ui inverted blue button`, '', imdbID);
  const btnsDiv = createElement('div', `btnsDiv`, '');
  netflixBtn.innerHTML = `<i class="play circle huge icon"></i>`
  netflixBtn.href = `https://www.netflix.com/search?q=${Title}`; netflixBtn.target = '_blank'
  watchlistBtn.innerHTML = `<i class="plus square outline icon"></i>&nbsp;List`;
  description.innerHTML = createHtml(imdbRating, Plot); // Adicionando a classificação e o overview
  btnsDiv.appendChild(trailerBtn); btnsDiv.appendChild(watchlistBtn); // Inclui os botões
  description.appendChild(btnsDiv); description.appendChild(netflixBtn);
  console.log(imdbID)
  console.log(`https://www.imdb.com/video/vi155694361?playlistId=${imdbID}&ref_=tt_ov_vi`)
  trailerBtn.href = `https://www.youtube.com/results?search_query=${Title + ' trailer'}`;

  getFilmList.appendChild(createSection); // Adiciona a section à lista de filmes;
  addBtnsWatchlistEventListener()
}

getSearch.addEventListener('keyup', async (e) => {
  if (e.keyCode === 13) {
    const data = await fetch(`https://www.omdbapi.com/?t=${getSearch.value}&apikey=1b999e04`)
    const dataJson = await data.json()
    const { Title, Poster, imdbRating, Plot, imdbID } = dataJson
    createFilme(Title, Poster, imdbRating, Plot, imdbID);
  }
})

  
