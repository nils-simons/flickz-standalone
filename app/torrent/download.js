var Transmission = require('transmission')

var transmission = new Transmission({
    host : process.env.TRANS_HOST || '127.0.0.1',
    port : Number(process.env.TRANS_PORT) || 9091,
    username: process.env.TRANS_USER || '',
    password: process.env.TRANS_PASS || '',
    ssl: (/true/).test(process.env.TRANS_SSL) || false,
    url: process.env.TRANS_URL || '/transmission/rpc',
});

exports.download = (torrent, media_type='movie') => {
    return new Promise(async (r) => {
        let download_path = process.env.MOVIES_DL_PATH

        if (media_type == 'serie') {
            download_path = process.env.SERIES_DL_PATH
        }
    
        await transmission.addUrl(torrent.magnet, { "download-dir" : download_path }, async (err, tor) => {
            console.log(tor)
            await transmission.start(tor.id, (err, resp) => {
                console.log(resp)
                r()
            })
        });
    });
}