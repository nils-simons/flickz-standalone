const TorrentSearchApi = require('torrent-search-api');



exports.search = (query, search_type='basic', lang='', quality='', params='', limit=20) => {
    return new Promise(async (r) => {

        if (params == 'null') { params = '' }

        const searchQuery = `${query.toLowerCase()} ${params}`;

        let results = [];
        if (search_type == 'basic') {
            basic_results = await basicSearch(searchQuery)
        }
        r(basic_results)
    });
};


const basicSearch = (query) => {
    return new Promise(async (r) => {
        TorrentSearchApi.enableProvider('ThePirateBay');
        const torrents = await TorrentSearchApi.search(query);

        results = [];
        for (let i = 0; i < torrents.length; i++) {
            const tor = torrents[i];
            results.push({
                name: tor.title,
                date: tor.time,
                magnet: tor.magnet,
                provider: tor.provider,
                size: tor.size,
                seeds: tor.seeds,
                peers: tor.peers,
                numFiles: tor.numFiles
            })
        }

        r(results)
    });
};