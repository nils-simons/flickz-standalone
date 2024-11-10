


const search = async () => {

    title_query = `${MOVIE.original_title || MOVIE.title}`.replaceAll(' ', '+').toLowerCase();

    const lang = document.getElementById('select-language').value

    const resp = await fetch(`/api/torrent/search/${title_query}/basic/${lang}/fhd/null`);
    const data = await resp.json();

    console.log(data);

}