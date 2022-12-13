import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info')

input.addEventListener('input', searchCountry);

function searchCountry(e) {
    const nameCountry = e.target.value.trim();
    fetchCountries(nameCountry)
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {   
            return response.json();
        })
        .then(counrty => {
            if (counrty.length >= 10) {
                console.log(counrty.length);
                countryDiv.innerHTML = '';
                countryList.innerHTML = '';
                console.log("Too many matches found. Please enter a more specific name.");
            }
            if (counrty.length >= 2 && counrty.length <= 10) {
                console.log(counrty.length);
                const list = markupList(counrty);
                countryList.innerHTML = list;
                countryDiv.innerHTML = '';
            }
            if (counrty.length === 1) {
                const countryBlock = countyInfo(counrty);
                countryDiv.innerHTML = countryBlock;
                countryList.innerHTML = '';
            }   
        })
}

// function generateMarking(length) {
//     if
// }

function markupList(responses) {
    return responses.map(({ name, flags }) => {
        return `
        <li>
            <img src="${flags.svg}" height="40px" alt="${name}"> ${name}
        </li>`}).join('');
}

function countyInfo(responses) {
    return responses.map(({ name, capital, flags, population, languages }) => {
        let langName;
        languages.map(({ name }) => {
            langName = name;
        });
        return `
            <div>
                <img src="${flags.svg}" height="40px" alt="${name}"> <span class="country-name">${name}</span>
            </div>
            <div>
                <p>
                <span class="properties">Capital: </span><span class="value">${capital}</span>
                </p>
            </div>
            <div>
                <p>
                <span class="properties">Populatin: </span><span class="value">${population}</span>
                </p>
            </div>
            <div>
                <p>
                <span class="properties">Languages: </span><span class="value">${langName}</span>
                </p>
            </div>
        `
})
}
