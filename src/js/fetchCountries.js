import {countyInfo, markupList} from '../index'

const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');

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

export {fetchCountries};