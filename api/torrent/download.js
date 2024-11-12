const download = require('../../app/torrent/download');

exports.post = (app) => {
    app.post('/api/torrent/download', async (req, res) => {

        const resp = await download.download(req.body.media, req.body.torrent);
        res.status(200).json({
            status: 200,
            data: resp
        });
        return
    });
}