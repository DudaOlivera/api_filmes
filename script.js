const apiKey = '03b7d63f9c2219eb66ce8ff24ea318cb'; 
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const moviesContainer = document.getElementById('moviesContainer');

// Função para buscar filmes
async function fetchMovies(query) {
    moviesContainer.innerHTML = '<p>Carregando...</p>';
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`);
        const data = await res.json();
        displayMovies(data.results);
        moviesContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        moviesContainer.innerHTML = '<p>Erro ao buscar filmes.</p>';
    }
}

// Exibir filmes no container
function displayMovies(movies) {
    if (!movies || movies.length === 0) {
        moviesContainer.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    moviesContainer.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}" alt="${movie.title}">
            <div class="movie-card-content">
                <h3>${movie.title}</h3>
                <p>${movie.overview ? movie.overview : 'Sem descrição disponível.'}</p>
                <div class="rating">⭐ ${movie.vote_average ? movie.vote_average : 'N/A'}</div>
            </div>
        </div>
    `).join('');
}

// Buscar ao clicar no botão
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchMovies(query);
});

// Buscar ao pressionar Enter
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) fetchMovies(query);
    }
});
