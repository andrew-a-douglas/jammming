const clientId = 'b8127b61a96a4787aaf6f3d8bfc56ab8';
//const redirectUri = 'http://localhost:3000/';
const redirectUri = 'https://jammming-andrewdouglas.netlify.app/';
let accessToken;

const Spotify = {

    getAccessToken(){
        //Set a session value to say we've authenticated
        sessionStorage.setItem("spotifyAuth", "true");

        if(accessToken){
            return accessToken;
        }

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        //console.log('grabs: ' + accessTokenMatch, expiresInMatch);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            //console.log(accessToken);
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
            
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            const returnPackage = jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track.preview_url
            }));

            console.log(returnPackage);

            return returnPackage;
        });
    },

    savePlaylist(name, trackUris){
        if(!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })
    }


};

export default Spotify;
