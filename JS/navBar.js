import { listaDeFilmes, apiKey, urlImg, getFilmList, getTrailerLink, createImg, createElement, createHtml, addBtnsWatchlistEventListener, createMovieCard } from './main.js';
import { removeBanner } from './banner.js';

let intervalId;
let index = 1;
const text = 'Em Breve . . .';

const genresObj = {// Chaves são conteúdo das opções de categoria e valores são Ids de gêneros
  'Ação': 28,
  'Aventura': 12,
  'Comédia': 35,
  'Drama': 18,
  'Suspense': 53,
  'Terror': 27
}

const pageUrl = (url, page) => `${url}&page=${page}`;

function pageEvent() {
  document.querySelector('#page-list')
    .innerHTML = `<span><</span>
    <span class="page">1</span>
    <span class="page">2</span>
    <span class="page">3</span>
    <span class="page">4</span>
    <span class="page">5</span>
    <span class="page">6</span>
    <span class="page">7</span>
    <span class="page">8</span>
    <span class="page">9</span>
    <span class="page">10</span>
    <span>></span>`
  if (intervalId) clearInterval(intervalId);
}

// Recebe uma Id de um gênero e retorna a URL para requisição da Api
const urlByGenre = (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=prelease_date.desc`;

// Responsável por listar filmes por gênero
function listByGenre(event) {
  removeBanner();
  const genre = event.target.innerText;
  const keyId = genresObj[genre];
  listaDeFilmes(urlByGenre(keyId), genre);
  pageEvent();
  const genrePages = (eventPage) => listaDeFilmes(pageUrl(urlByGenre(keyId), eventPage.target.innerHTML), genre);
  document.querySelectorAll('.page').forEach((page) => {
    page.addEventListener('click', genrePages);
  })
}

const urlByRank = () => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_count.desc`;
const listByRank = () => {
  removeBanner();
  listaDeFilmes(urlByRank(), 'Filmes Mais Votados');
}

const urlBySuccess = () => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=revenue.desc`
const listBySuccess = () => {
  removeBanner();
  listaDeFilmes(urlBySuccess(), "Sucessos de Bilheteria");
}

const randomId = () => parseInt((Math.random() * 62) * 1000);
const randomUrl = () => `https://api.themoviedb.org/3/movie/${randomId()}?api_key=${apiKey}`;

async function getRandomChoice() {
  const tryUrl = randomUrl();
  const tries = await fetch(tryUrl);
  const itemJson = await tries.json();
  (itemJson.poster_path) ? await createMovieCard(itemJson) : tryAgain();
  document.querySelector('#page-list').style.display = 'none';
  document.querySelector('.filme').style.margin = 'auto';
}

const tryAgain = () => getRandomChoice();

function about() {
  const comming = document.createElement('p');
  comming.id = 'waiting';
  getFilmList.innerHTML = ''
  getFilmList.appendChild(comming);
  intervalId = setInterval(() => {
    comming.innerText = text.slice(0, index);
    index += 1;
    if (index === 16) {
      setTimeout(() => {
        comming.innerText = '';
        index = 1;
      }, 1000);
    }
  }, 200);
  removeBanner();
  document.querySelector('#page-list').style = 'display: none';
}

export { genresObj, urlByGenre, listByGenre, listByRank, listBySuccess, getRandomChoice, pageEvent, pageUrl, urlBySuccess, about };
