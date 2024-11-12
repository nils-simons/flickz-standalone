var Transmission = require('transmission')
var db = require('../../index').db

var transmission = new Transmission({
    host : process.env.TRANS_HOST || '127.0.0.1',
    port : Number(process.env.TRANS_PORT) || 9091,
    username: process.env.TRANS_USER || '',
    password: process.env.TRANS_PASS || '',
    ssl: (/true/).test(process.env.TRANS_SSL) || false,
    url: process.env.TRANS_URL || '/transmission/rpc',
});

exports.download = (media, torrent) => {
    return new Promise(async (r) => {
        
        let download_path = process.env.MOVIES_DL_PATH

        if (media.type == 'serie') {
            download_path = process.env.SERIES_DL_PATH
        }
    
        await transmission.addUrl(torrent.magnet, { "download-dir" : download_path }, async (err, tor) => {
            console.log(tor)
            await transmission.start(tor.id, async (err, resp) => {


                let db_path, stored_data = null;
                torrent.trans_id = tor.id
                torrent.trans_hash = tor.hashString
                if (media.type == 'movie') {
                    db_path = `/downloads/movies/${media.id}`

                    stored_data = {
                        media: {
                            type: media.type,
                            backdrop_path: media.backdrop_path,
                            poster_path: media.poster_path,
                            imdb_id: media.imdb_id || null,
                            language: media.original_language || null,
                            title: media.original_title || media.title,
                            description: media.overview || null,
                            release_date: media.release_date || null,
                            vote_average: media.vote_average || null,
                            vote_count: media.vote_count || null,
                            popularity: media.popularity || null,
                            tagline: media.tagline || null,
                        },
                        torrent: torrent,
                        status: "downloading",
                        added_at: new Date()
                    }
                }

                if (media.type == 'serie') {
                    db_path = `/downloads/series/${media.tmdb.id}`
                }


                await db.push(db_path, stored_data)


                await transmission.get(tor.id, (err, re) =>{
                    console.log(re)
                });


                console.log(resp)
                r()
            })
        });
    });
}