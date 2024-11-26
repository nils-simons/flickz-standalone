let url = new URL(window.location.href);

document.getElementById('navbar-search').addEventListener('keyup', (e) => {
    if (e.key !== 'Enter' || e.code !== 'Enter') { return }
    const query = e.target.value;

    if (query.replaceAll(' ', '').length == 0) {
        let url = new URL(window.location.href);
        url.searchParams.delete("q");
        window.history.pushState({}, "", url);

        loadTrendings();

        return
    }

    search(query);
})

const search = async (query) => {

    var url_query = encodeURIComponent(query);

    let url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url);

    const resp = await fetch(`/api/search/${url_query}`);
    const data = await resp.json();
    console.log(data);

    document.getElementById('results-container').innerHTML = ''
    for (let i = 0; i < data.data.length; i++) {
        const item = data.data[i];

        if (item.media_type !== 'movie' && item.media_type !== 'tv') {
            continue;
        }

        var url_path = 'movie'

        if (item.media_type == 'tv') {
            var url_path = 'serie'
        }

        var poster_url = `/assets/img/backpath-no-img.png`
        if (item.poster_path !== null) {
            var poster_url = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
        } else {
            var poster_url = `/assets/img/backpath-no-img.png`
        }

        var display_title = item.original_title || item.title

        if (item.media_type == 'tv') {
            var display_title = item.original_name || item.name
            
        }

        document.getElementById('results-container').innerHTML += `
        <div class="grid-item">
            <a href="/${url_path}?id=${item.id}">
                <img src="${poster_url}">
                <div>
                    <span>${display_title}</span>
                </div>
            </a>
        </div>
        `

    }

}

let q = url.searchParams.get('q')
console.log(q);
if (q !== null) {

    if (q.replaceAll(' ', '').length == 0) {
        let url = new URL(window.location.href);
        url.searchParams.delete("q");
        window.history.pushState({}, "", url);

        loadTrendings();
    } else {
        document.getElementById('navbar-search').value = q
        search(q);

    }
} else {
    loadTrendings();
}