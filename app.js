const seasonSelect = document.getElementById('season-select');
const yearSelect = document.getElementById('year-select');
const animeList = document.getElementById('anime-list');

const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 2000; y--) {
  const option = document.createElement('option');
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}
yearSelect.value = currentYear;

function loadAnime(year, season) {
  animeList.innerHTML = "Loading...";
  fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}`)
    .then(res => res.json())
    .then(data => {
      animeList.innerHTML = "";
      data.data.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <div class="anime-info">
            <h3>${anime.title}</h3>
            <p>${anime.aired.prop.from.month || '?'} ${anime.aired.prop.from.day || ''}, ${anime.aired.prop.from.year || '?'}<br>
            Episodes: ${anime.episodes || 'Unknown'}</p>
          </div>
        `;
        animeList.appendChild(card);
      });
    })
    .catch(() => {
      animeList.innerHTML = "<p>Failed to load anime. Please try again.</p>";
    });
}

seasonSelect.addEventListener('change', () => {
  loadAnime(yearSelect.value, seasonSelect.value);
});
yearSelect.addEventListener('change', () => {
  loadAnime(yearSelect.value, seasonSelect.value);
});

loadAnime(currentYear, 'spring');
