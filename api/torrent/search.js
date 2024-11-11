const search = require('../../app/torrent/search');

exports.get = (app) => {
    app.get('/api/torrent/search/:search_type/:query', async (req, res) => {
        const torrents = await search.search(req.params.query.replaceAll('+', ' '), req.params.search_type)
        res.status(200).json({
            status: 200,
            data: torrents
        });
        return
    });
}