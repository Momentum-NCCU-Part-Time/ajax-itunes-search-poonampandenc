const itunesUrl = "https://itunes.apple.com/search?term=";
const previewUrl = "https://geo.itunes.apple.com/us/album/";
let inputForm = document.getElementById('inputForm');
let inputField = document.getElementById('inputField');
let results = document.getElementById('results');
let button = document.getElementById('inputButton');
let container = document.getElementById("container");

// audio = document.createElement('audio'),
// audioSource = document.createElement('source')

// audioSource.src = results.previewUrl;
// audio.controls = true;

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let term = inputField.value;

  document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i=0; i < audio.length ; i++){
        if(audio[i] |=event.target){
            audio[i].pause();
        }
    }
  })
  
  while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
  

  fetch(itunesUrl + term + "&media=music" + "&limit=42" + "&country=us").then((response) => {
    if (response.status === 200){
      return response.json();
    } else {
      let errorMsg = document.createElement('h2');
      errorMsg.innerText = 'API call failed, please try again.';
      results.appendChild(errorMsg);
    }
  }).then((parsedJsonResponse) => {
    console.log(parsedJsonResponse);
    const songs = parsedJsonResponse.results;
    return songs.map(results => {
        const songCard = document.createElement("div"),    
        artist = document.createElement('h2'),
        track = document.createElement('h2'),
        img = document.createElement('img'),
        audio = document.createElement('audio'),
        audioSource = document.createElement('source')

    artist.innerHTML = results.artistName;
    track.innerHTML = results.trackName;
    img.src = results.artworkUrl100;
    audioSource.src = results.previewUrl;
    audio.controls = true;

    songCard.appendChild(img);
    songCard.appendChild(artist);
    songCard.appendChild(track);
    songCard.appendChild(audio);
    audio.appendChild(audioSource);

    container.appendChild(songCard);
})
})
  })