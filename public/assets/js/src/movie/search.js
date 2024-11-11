


const search = async () => {

    title_query = `${MOVIE.original_title || MOVIE.title}`;

    const lang = document.getElementById('select-language').value
    const quality = document.getElementById('select-quality').value

    const query = `${MOVIE.original_title || MOVIE.title} ${lang} ${quality}`.replaceAll(' ', '+').toLowerCase().replace(/\++$/, '');
    console.log(query);

    const resp = await fetch(`/api/torrent/search/basic/${query}/`);
    const data = await resp.json();

    console.log(data);


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
            <td><button>Download</button></td>
        </tr>
        `

        
    }

}