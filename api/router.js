exports.router = (app) => {
    require('./search/search').get(app);
    require('./trending/trending').get(app);
}