exports.router = (app) => {
    require('./search/search').get(app);
    require('./trending/trending').get(app);
    require('./movie/movie').get(app);
    require('./torrent/search').get(app);
    require('./torrent/download').post(app);
    require('./downloads/movies').get(app);
    require('./downloads/series').get(app);
}