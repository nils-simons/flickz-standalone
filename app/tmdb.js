

exports.searchQuery = (query) => {
    return new Promise(async (r) => {
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


exports.getTrendings = () => {
    return new Promise(async (r) => {
        var respPage1 = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        var respPage1 = await respPage1.json();

        var respPage2 = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=2`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        var respPage2 = await respPage2.json();

        results = respPage1.results.concat(respPage2.results)

        r(results)
    })
}