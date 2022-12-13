import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    const nameCountry = e.target.value.trim();
    fetchCountries(nameCountry)
}

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

export {countyInfo, markupList}
