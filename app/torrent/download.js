var db = require('../../index').db
const { v4: uuidv4 } = require('uuid');

exports.download = async (media, torrent) => {
    let download_path = process.env.MOVIES_DL_PATH + `/${media.title}`

    if (media.type == 'serie') {
        download_path = process.env.SERIES_DL_PATH
    }

    let db_path, stored_data = null;
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
            status: "added",
            added_at: new Date()
        }
    }

    if (media.type == 'serie') {
        db_path = `/downloads/series/${media.id}`
    }


    await db.push(db_path, stored_data)

    // using this method because Webtorrent is module based
    const WebTorrent = (await import('webtorrent')).default;

    const client = new WebTorrent();

    client.add(torrent.magnet, { path: download_path }, async (torrent) => {
        console.log(`${torrent.name} > ${download_path}`);
        let progress = 0;

        await db.push(db_path+'/torrent/', {
            progress: progress,
            speed: 0,
            peers: 0,
            length: torrent.length,
            downloaded: 0,
        }, false)


        torrent.on('download', async () => {
            prog_decim = Number((torrent.progress * 100).toFixed(0));
            if (prog_decim > progress) {
                progress = Number(prog_decim);

                await db.push(db_path, {
                    status: 'downloading',
                }, false)

                await db.push(db_path+'/torrent/', {
                    progress: progress,
                    speed: (torrent.downloadSpeed / 100000).toFixed(2),
                    downloaded: torrent.downloaded
                }, false)

                if (progress == 100) {
                    await db.push(db_path, {
                        status: 'finished',
                    }, false)
                }
            }
        });

        torrent.on('error', async (err) => {
            await db.push(db_path, {
                status: 'error',
            }, false)

            await db.push(db_path+'/torrent/', {
                error: err.toString(),
            }, false)

            client.destroy(); // Clean up
        });

        torrent.on('done', async () => {
            await db.push(db_path, {
                status: 'finished',
            }, false)
            client.destroy(); // Clean up
        });
    });
}