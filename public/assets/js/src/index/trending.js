

const loadTrendings = async () => {
    const resp = await fetch('/api/trending');
    const data = await resp.json();
    console.log(data);

    document.getElementById('results-container').innerHTML = ''
    for (let i = 0; i < data.data.length; i++) {
        const item = data.data[i];

        if (!item.original_title) { continue; }

        var url_path = 'movie'

        if (item.media_type == 'tv') {
            var url_path = 'serie'
        }

        var poster_url = `/assets/img/backpath-no-img.png`
        if (item.poster_path !== null) {
            var poster_url = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
        }

        document.getElementById('results-container').innerHTML += `
        <div class="grid-item">
            <a href="/${url_path}?id=${item.id}">
                <img src="${poster_url}">
                <div>
                    <span>${item.original_title || item.title}</span>
                </div>
            </a>
        </div>
        `

    }
    return
}