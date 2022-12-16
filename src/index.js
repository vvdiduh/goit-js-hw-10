import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries'
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');


input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    const nameCountry = e.target.value.trim();
    fetchCountries(nameCountry)
        .then(counrty => {
            console.log(counrty);
            if (counrty.length >= 10) {
                console.log(counrty.length);
                clearDiv();
                countryList.innerHTML = '';
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
            }
            if (counrty.length >= 2 && counrty.length <= 10) {
                console.log(counrty.length);
                const list = markupList(counrty);
                countryList.innerHTML = list;
                clearDiv();
            }
            if (counrty.length === 1) {
                const countryBlock = countyInfo(counrty);
                countryDiv.innerHTML = countryBlock;
                clearList();
            }   
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })
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
        const lang = Object.values(languages);
        return `
            <div>
                <img src="${flags.svg}" height="40px" alt="${name.common}"> <span class="country-name">${name.common}</span>
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
                <span class="properties">Languages: </span><span class="value">${lang}</span>
                </p>
            </div>
        `
})
}


function clearDiv() {
    countryDiv.innerHTML = '';
}

function clearList() {
    countryList.innerHTML = '';
}