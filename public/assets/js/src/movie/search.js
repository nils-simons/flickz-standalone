
let TORRENTS = [];

const search = async () => {
    const query = encodeURIComponent(document.getElementById('opt-query').value.replace(/\++$/, ''));
    console.log(query);

    const resp = await fetch(`/api/torrent/search/basic/${query}/`);
    const data = await resp.json();

    console.log(data);

    TORRENTS = data.data;

    document.getElementById('results-table').innerHTML = `
    <tr>
        <th>Name</th>
        <th>Seeds</th>
        <th>Peers</th>
        <th>Size</th>
        <th>Action</th>
    </tr>`

    for (let i = 0; i < data.data.length; i++) {
        const res = data.data[i];

        document.getElementById('results-table').innerHTML += `
        <tr>
            <td>${res.name}</td>
            <td>${res.peers}</td>
            <td>${res.seeds}</td>
            <td>${res.size}</td>
            <td><button onclick="download(this, ${i})">Download</button></td>
        </tr>
        `
    }

}



document.getElementById('select-language').addEventListener('change', (e) => {
    changeQuery()
})

document.getElementById('select-quality').addEventListener('change', (e) => {
    changeQuery()
})


function changeQuery() {
    lang = document.getElementById('select-language').value
    quality = document.getElementById('select-quality').value
    document.getElementById('opt-query').value = `${(MOVIE.original_title || MOVIE.title).toLowerCase()} ${lang.toUpperCase()} ${quality.toLowerCase()}`.replace(/\++$/, '')
}