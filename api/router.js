exports.router = (app) => {
    require('./search/search').get(app);
}