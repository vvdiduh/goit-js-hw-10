import { countyInfo, markupList } from '../index'
import Notiflix from 'notiflix';

const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(counrty => {
            if (counrty.length >= 10) {
                console.log(counrty.length);
                countryDiv.innerHTML = '';
                countryList.innerHTML = '';
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
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
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        })  
}

export {fetchCountries};