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
    case 'Amerikas':
        return 'green';
        break;
    case 'Asia':
        return 'red';
        break;
    case 'Europa':
        return 'yellow';
        break;
    case 'Oceania':
        return 'purple';
        break;
    default:
        return 'orange';
}
}

async function fetchCountries(){
    try{
        const result = await axios.get('https://restcountries.com/v2/all');

        createULElementWithId();

        const country = result.data.map((country) => {
            return country;
        });
        country.sort((a,b) =>{
          return a.population - b.population;
        });

        let countryList = document.getElementById('countryList');
        country.forEach((country) => {
            const continent = country.region;

            const textColor = setContinentColor(continent);

            const obj = country.flags;
            const flagUrl = Object.values(obj)[1];
            console.log(flagUrl);

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', flagUrl);
            imgTag.setAttribute('alt', country.name + ' Flag');
            imgTag.setAttribute('class', 'flagImages');

            const newLine = document.createElement('br');
            console.log(imgTag);
            const listItem = document.createElement('li');


            listItem.appendChild(imgTag);

            const countryName = document.createElement('h3');
            countryName.setAttribute('class', textColor);
            countryName.textContent =`${country.name}`;

            const textNodePopulation = document.createTextNode(`Has a population of ${country.population}`);
            listItem.appendChild(countryName);
            listItem.appendChild(newLine);
            listItem.appendChild(textNodePopulation);

            countryList.appendChild(listItem);
        });
        return result;
    }catch(e){
        console.error(e);
    }


}

fetchCountries();