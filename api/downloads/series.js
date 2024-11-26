const db = require('../../index').db;

exports.get = (app) => {
    app.get('/api/downloads/series', async (req, res) => {
        // const downloads = getDownloads();

        const series = await db.getData('/downloads/series');

        res.status(200).json({
            status: 200,
            data: series
        });
        return
    })
}