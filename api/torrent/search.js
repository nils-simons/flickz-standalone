const torrent = require('../../app/torrent/torrent');

exports.get = (app) => {
    app.get('/api/torrent/search/:query/:search_type/:lang/:quality/:params', async (req, res) => {
        const torrents = await torrent.search(req.params.query.replaceAll('+', ' '), req.params.search_type, req.params.lang, req.params.quality, req.params.params)
        res.status(200).json({
            status: 200,
            data: torrents
        });
        return
    });
}