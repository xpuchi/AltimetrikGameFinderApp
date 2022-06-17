window.onload = () => showGames(1);

let currentPage = 1;
let gameNumber = 1;

window.addEventListener("scroll", onScroll);

/**
 * @description Funcion que se ejecuta con cada scroll. Si llega al fondo, carga otra pagina
 */
function onScroll() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    currentPage++;
    showGames(currentPage);
  }
}

/**
 * @description Funcion que obtiene los juegos de la API
 * @returns JSON con los juegos
 */
async function getGames(page) {
  const endpoint = `https://api.rawg.io/api/games?key=9ce6301da3b6406bb83603cb20a95481&page=${page}&page_size=20`;

  try {
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Funcion que muestra los juegos en el DOM
 *
 */
async function showGames(page) {
  const cards = document.querySelector(".cards");
  const data = await getGames(page);
  const games = data.results;

  games.forEach((game) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const genreNames = game.genres.map((genre) => genre.name);
    const genresString = genreNames.join(", ");

    const platforms = game.parent_platforms.map((parent_platform) => {
      const platformName = parent_platform.platform.name;
      if (platformName === "PlayStation") {
        return '<img src="../img/icons/playstation.svg" />';
      } else if (platformName === "Xbox") {
        return '<img src="../img/icons/xbox.svg" />';
      } else if (platformName === "PC") {
        return '<img src="../img/icons/windows.svg" />';
      } else if (platformName === "Nintendo") {
        return '<img src="../img/icons/switch.svg" />';
      }
    });
    const platformsString = platforms.join("\n");

    card.innerHTML = `
      <div class="card-background" style="background: url(${game.background_image}) no-repeat center; background-size: cover;" >
        <div class="heart">
        <img src="./img/icons/heart.svg" />
        </div>
      </div>
      <div class="card-details">
        <div class="game-title">
          <h2>${game.name}</h2>
          <p class="number">#${gameNumber}</p>
        </div>
        <div class="game-info">
          <div class="info-title">
            <p>Release date:</p>
            <p>Genres:</p>
          </div>
          <div>
            <p>${game.released}</p>
            <p>${genresString}</p>
          </div>
          <div class="platforms">
            ${platformsString}
          </div>
        </div>
      </div>
    `;

    cards.appendChild(card);
    gameNumber++;
  });
}
