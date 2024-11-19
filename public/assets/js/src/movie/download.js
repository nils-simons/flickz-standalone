


const download = async (elm, id) => {
    elm.innerText = '...'
    elm.disabled = true;

    console.log(TORRENTS[id])

    const resp = await fetch('/api/torrent/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            media: MOVIE,
            torrent: TORRENTS[id]
        })
    })

    if (!resp.ok) {
        console.error('Error downloading torrent:', resp.statusText)
        elm.innerText = 'Download'
        elm.disabled = false;
        return
    }

    const data = await resp.json()
    console.log(data)

    elm.innerText = 'Success'
    elm.disabled = false;
}