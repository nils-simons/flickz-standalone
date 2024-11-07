const tmdb = require('../../app/tmdb');

exports.get = (app) => {
    app.get('/api/trending/', async (req, res) => {
        const trendingMovies = await tmdb.getTrendings();
        res.status(200).json({
            status: 200,
            data: trendingMovies
        });
        return
    });
}