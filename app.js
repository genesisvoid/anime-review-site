const seasonSelect = document.getElementById('season-select');
const yearSelect = document.getElementById('year-select');
const animeList = document.getElementById('anime-list');

// Populate years
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 2000; y--) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.textContent = y;
  yearSelect.appendChild(opt);
}
yearSelect.value = currentYear;

// Load anime
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
            <p>${anime.aired.prop.from.year || '?'} | Episodes: ${anime.episodes || '?'}</p>
          </div>
        `;
        animeList.appendChild(card);
      });
    });
}

// Trigger load on selection change
seasonSelect.addEventListener('change', () => {
  loadAnime(yearSelect.value, seasonSelect.value);
});
yearSelect.addEventListener('change', () => {
  loadAnime(yearSelect.value, seasonSelect.value);
});

// Initial load
loadAnime(currentYear, 'spring');
