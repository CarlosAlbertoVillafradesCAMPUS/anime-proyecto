const API =
  "https://anime-db.p.rapidapi.com/anime?page=1&size=50&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc";
const animeList = null || document.querySelector(".anime-list");
const list = null || document.querySelector(".list-types");
const search = null || document.querySelector(".search");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b776fbfe3amsh0048685753f14b8p1432c1jsn68c4b0ee05ac",
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  },
};

//llamado a la API
const fetchData = async (urlAPI) => {
  const response = await fetch(urlAPI, options);
  const data = await response.json();

  return data;
};

//peticiones a la API

const anotherFunc = async (urlAPI) => {
  try {
    const animes = await fetchData(`${urlAPI}`);
    const viewAnimes = `
        ${animes.data
          .map(
            (anime) => `
        <div class="pokemon">
        <a href="${anime.link}">
              <p>${anime.title}</p>
              <img src="${anime.image}" alt="${anime.title}" />
              <p>Genero: ${anime.genres[0]}</p>
              </a>       
            </div>`
          )
          .slice(0, 50)
          .join("")} `;

    const viewName = `
        ${animes.data
          .map(
            (anime) => `
        <li>
        <a href="${anime.link}">
                <img src="./assets/icons/pokeball.png" alt="">
                <p>${anime.title}</p>
                </a>         
            </li>
            `
          )
          .slice(0, 50)
          .join("")} `;

    animeList.innerHTML = viewAnimes;
    list.innerHTML = viewName;
  } catch (error) {
    console.error(error);
  }
};
anotherFunc(API);

//creando filtrado en el search

const searchInterno = () => {
  const filter = search.value.toUpperCase();
  const li = list.getElementsByTagName("li");

  //recorriendo los elementos a filtrar
  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    const textValue = a.textContent || a.innerText;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};
document.querySelector(".search").addEventListener("keyup", searchInterno);
