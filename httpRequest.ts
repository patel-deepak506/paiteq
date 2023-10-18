import * as http from 'http';

// Define a function to make an HTTP request and return a Promise
function makeHttpRequest(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const request = http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`Error fetching data from ${url}, Status Code: ${response.statusCode}`);
        response.resume();
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    });

    request.on('error', (error) => {
      reject(`Error fetching data from ${url}, ${error.message}`);
    });

    request.end();
  });
}

// Define the main function to fetch and process data
async function fetchRickAndMortyData() {
  try {
    // Fetch all episodes
    const episodesUrl = 'https://rickandmortyapi.com/api/episode/';
    const episodesData = await makeHttpRequest(episodesUrl);

    // Parse the JSON response
    const episodes = JSON.parse(episodesData).results;

    // Replace character URLs with character JSON objects
    for (const episode of episodes) {
      const characterPromises = episode.characters.map((characterUrl: string) => makeHttpRequest(characterUrl));
      episode.characters = await Promise.all(characterPromises);
    }

    // Log the final array to the console
    console.log(episodes);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

// Call the main function to fetch and process data
fetchRickAndMortyData();
