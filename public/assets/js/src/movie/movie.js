const searchParams = new URLSearchParams(window.location.search);


let MOVIE = null;

const loadMovie = async (id) => {

    const resp = await fetch(`/api/movie/${id}`);
    const data = await resp.json();

    MOVIE = data.data;
    MOVIE.type = 'movie';
    if (data.data.poster_path) {
        document.getElementById('card-poster').src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.data.poster_path}`;
    }

    document.getElementById('card-title').innerText = data.data.original_title || data.data.title;
    document.getElementById('header-title').innerText = data.data.original_title || data.data.title;
    document.getElementById('card-desc').innerText = data.data.overview;

    document.getElementById('opt-query').value = (data.data.original_title || data.data.title).toLowerCase();
}

if (searchParams.has('id')) {
    const id = searchParams.get('id');
    loadMovie(id);
}