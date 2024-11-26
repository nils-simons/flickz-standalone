const db = require('../../index').db;

exports.get = (app) => {
    app.get('/api/downloads/movies', async (req, res) => {
        // const downloads = getDownloads();

        const movies = await db.getData('/downloads/movies');

        res.status(200).json({
            status: 200,
            data: movies
        });
        return
    })
}