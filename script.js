// cities.json file
// Filter this data with the search form.  Matching cities & states will be displayed.
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

// Fetch API returns promises. Different from GET HTTP requests in that the fetch API is built into the browser. Don't need to use something like jQuery.getJSON().
fetch(endpoint)
  // Convert raw data to json
  .then(blob => blob.json())
  // this returns another promise, which we call .then on to get the raw data in json format
  .then(data => cities.push(...data)); //data is SPREAD into cities array
  //now we have a cities array with 1000 cities and their info

function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    //figure out if the city or state matches what was searched
    //g = global(search entire string)
    //i = insensitive(not case sensitive)
  const regex = new RegExp(wordToMatch, 'gi')
  return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;

}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
