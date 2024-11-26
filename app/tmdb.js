

exports.searchQuery = (query) => {
    return new Promise(async (r) => {
        // var resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query.replaceAll('+', '%20')}&include_adult=false&language=en-US`, {
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


        f_res = [];

        for (let i = 0; i < results.length; i++) {
            const elm = results[i];
            
            if (elm.media_type == 'movie') {
                f_res.push(elm);
            }

            continue

        }

        r(f_res)
    })
}

exports.getMovie = (id) => {
    return new Promise(async (r) => {
        var resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        var resp = await resp.json();
        r(resp)
    })
}