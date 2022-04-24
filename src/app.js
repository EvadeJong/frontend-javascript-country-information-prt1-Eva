import axios from 'axios';

function createULElementWithId(){
    const unorderedList = document.createElement('ul');
    unorderedList.setAttribute('id', 'countryList');
    document.body.appendChild(unorderedList);
    return unorderedList;
}

function setContinentColor(continentName){
    switch(continentName){
        case 'Africa':
            return 'blue';
            break;
        case 'Americas':
            return 'green';
            break;
        case 'Asia':
            return 'red';
            break;
        case 'Europe':
            return 'yellow';
            break;
        case 'Oceania':
            return 'purple';
            break;
        default:
            return 'gray';
    }
}

async function fetchCountries(){
    try{
        //haal alle landen op via rest api restcountries
        const result = await axios.get('https://restcountries.com/v2/all');

        //creeer een unordered list om de landen in te plaatsen
        createULElementWithId();

        //maak een nieuwe array met de landnamen
        const country = result.data.map((country) => {
            return country;
        });

        // sorteer de landen op aantal inwoners
        country.sort((a,b) =>{
          return a.population - b.population;
        });

        //koppel de lijst aan de DOM
        let countryList = document.getElementById('countryList');


        country.forEach((country) => {
        //haal voor ieder land de regio, regiokleur op
            const continent = country.region;
            const textColor = setContinentColor(continent);
        //haal voor ieder land de vlag url op
            const obj = country.flags;
            const flagUrl = Object.values(obj)[1];


        //creeer de img tag voor iedere vlag, en zet daarin de juiste informatie en url
            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', flagUrl);
            imgTag.setAttribute('alt', country.name + ' Flag');
            imgTag.setAttribute('class', 'flagImages');

            //const newLine = document.createElement('br');
            //console.log(imgTag);

            const listItem = document.createElement('li');

            listItem.appendChild(imgTag);

            const countryName = document.createElement('h3');
            countryName.setAttribute('class', textColor);
            countryName.textContent =`${country.name}`;

            const textNodePopulation = document.createTextNode(`Has a population of ${country.population}`);
            listItem.appendChild(countryName);
            //listItem.appendChild(newLine);
            listItem.appendChild(textNodePopulation);

            countryList.appendChild(listItem);
        });
        return result;
    }catch(e){
        console.error(e);
    }


}

fetchCountries();