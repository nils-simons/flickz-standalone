const tmdb = require('../../app/tmdb');

exports.get = (app) => {
    app.get('/api/search/:query', async (req, res) => {

        if (!req.params.query) {
            res.status(400).json({
                status: 400,
                error: 'missing query'
            });
            return
        }

        const results = await tmdb.searchQuery(req.params.query.replaceAll(' ', '+'))
        res.status(200).json({
            status: 200,
            data: results
        });
        return
    });
}