import axios from 'axios';

let inputValue;
function logSubmit(event) {
    //log.textContent = `Form Submitted!`;
    event.preventDefault();
    inputValue = document.getElementById("inputField").value;
    searchCountry(inputValue);
}

const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', logSubmit);




async function searchCountry(country) {

    try {

        const countryURL = `https://restcountries.com/v2/name/${country}`;
        const countryInformation = await axios.get(countryURL);
        const flags = countryInformation.data[0].flags;
        const searchFlagUrl = Object.values(flags)[1];
        const newLine = document.createElement('br');
        const currencies = countryInformation.data[0].currencies;
        const languages = countryInformation.data[0].languages;

        console.log(searchFlagUrl);
        const imgSearchTag = document.createElement('img');
        imgSearchTag.setAttribute('src', searchFlagUrl);
        imgSearchTag.setAttribute('alt', countryInformation.data[0].name + ' Flag');
        imgSearchTag.setAttribute('class', 'searchFlagImages');

        const countryName = document.createElement('h2');
        countryName.setAttribute('class', countryName);
        countryName.textContent = `${countryInformation.data[0].name}`;

        const displayInformationField = document.getElementById('country-information');
        displayInformationField.appendChild(imgSearchTag);
        displayInformationField.appendChild(countryName);

        console.log(imgSearchTag);
        displayInformationField.setAttribute('class', countryInformation.data[0].name);
        const textField = document.createTextNode(` ${countryInformation.data[0].name} is situated in ${countryInformation.data[0].subregion}. It has a population of ${countryInformation.data[0].population} people. `);
        displayInformationField.appendChild(textField);

        displayInformationField.appendChild(newLine);
        const textFieldCapital = document.createTextNode(`The capital is ${countryInformation.data[0].capital}.`);
        displayInformationField.appendChild(textFieldCapital);

        displayInformationField.appendChild(newLine);

        for (let i = 0; i < languages.length; i++) {
            if (i === 0) {
                const language = languages[i].name;
                const textFieldLanguage = document.createTextNode(`They speak ${language}`);
                displayInformationField.appendChild(textFieldLanguage);
            } else {
                const language = languages[i].name;
                const textFieldLanguage = document.createTextNode(` and ${language}`);
                displayInformationField.appendChild(textFieldLanguage);
            }
        }

        for (let i = 0; i < currencies.length; i++) {
            if (i === 0) {
                const currency = currencies[i].name;
                const textFieldCurrency = document.createTextNode(` and you can pay with ${currency}'s`);
                displayInformationField.appendChild(textFieldCurrency);
            } else {
                const currency = currencies[i].name;
                const textFieldCurrency = document.createTextNode(` and ${currency}'s.`);
                displayInformationField.appendChild(textFieldCurrency);
            }
        }
    }catch (e) {
        if(e.response.status === 404){
            log.textContent = `${inputValue} is not a valid country`;
        }else if(e.response.status === 500){
            log.textContent = `Something went wrong on server side`;
        }else{
            log.textContent = `Status code ${e.response.status}. Find out what went wrong on the internet using your status code`
        }

    }
}


//searchCountry('panama');