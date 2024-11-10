const tmdb = require('../../app/tmdb');

exports.get = (app) => {
    app.get('/api/movie/:id', async (req, res) => {
        const results = await tmdb.getMovie(req.params.id)
        res.status(200).json({
            status: 200,
            data: results
        });
        return
    });
}