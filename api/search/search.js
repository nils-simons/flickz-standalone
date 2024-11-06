const tmdb = require('../../app/tmdb');

exports.get = (app) => {
    app.get('/api/search', async (req, res) => {

        if (!req.query.query) {
            res.status(400).json({
                status: 400,
                error: 'missing query'
            });
            return
        }

        const results = await tmdb.searchQuery(req.query.query.replaceAll(' ', '+'))
        res.status(200).json({
            status: 200,
            data: results
        });
        return
    });
}