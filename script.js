const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
audioElement.volume = 0.5;

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '23b0904b002d4aff995805b2b58d54f0',
        src: joke,
        hl: 'en-gb',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        // Turn the response into json once it's ready
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    }
    catch (error) {
        // Catch errors here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);