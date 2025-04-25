// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCc2QmcywNYkvT0cvjnbGDK-oNe8iOp9xsWBG9BXYkkVL1pL4QscMg4mcfyMn9GCRjymTfMqr1suedFenHCwKqSpAB2ylnSkO8uIf9e-Ek1ak4URmL5zhPVhkVYf-uNiwpjaB56pIP5IYjp5b4EuhCbK6aZDovqCUoGmZ923oooBM_VSRx4YXzBXUnt9D3b__w8eohF-4dUhSBPvIgVpSMftuhH3dQoLAHHd06G0BBZHouCjZ4JnVYHqpk58MU-RkuI6O8JAaTOgZ60wTPOEmJSCKkwnT9dE9zvTEJ1DrjmNmFHmDwY5IlTUpdxCHXl';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();

console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

async function getCurrentlyPlaying(){
  return (await fetchWebApi(
    'v1/me/player/currently-playing', 'GET'
  )).items;
}

const currentlyPlaying = await getCurrentlyPlaying();

console.log(
  currentlyPlaying?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
