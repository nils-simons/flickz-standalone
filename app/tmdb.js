

const searchQuery = (query) => {
    return new Promise(async (r) => {
        console.log(`Searching ${query}`);
        var resp = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query.replaceAll('+', '%20')}&include_adult=false&language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        var resp = await resp.json();

        r(resp.results)
    })
}

exports.searchQuery = searchQuery