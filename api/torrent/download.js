const download = require('../../app/torrent/download');

exports.post = (app) => {
    app.post('/api/torrent/download', async (req, res) => {

        if (!req.body.media.type) {
            return res.status(400).json({
                status: 'error',
                error: 'missing media type'
            })
        }


        const resp = await download.download(req.body.media, req.body.torrent);
        res.status(200).json({
            status: 200,
            data: resp
        });
        return
    });
}