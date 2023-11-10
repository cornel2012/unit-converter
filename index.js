/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const bodyThemeEl = document.getElementById('body-theme');
const conversionsEl = document.getElementById('conversions');
const numberToConvert = document.getElementById('number-to-convert');
const convertBtnEl = document.getElementById('convert-btn');
let themeColor = localStorage.getItem('color');

const setBodyThemeClass = () => {
    if (bodyThemeEl.classList.contains('light')) {
        bodyThemeEl.classList.remove('light');
    } else {
        bodyThemeEl.classList.remove('dark');
    }

    bodyThemeEl.classList.add(themeColor);
}

const setThemeColor = (aColor) => {
    localStorage.setItem('color', aColor);
    themeColor = localStorage.getItem('color');

    setBodyThemeClass();
}
setBodyThemeClass();

const setInitialThemeColor = () => {
    if (!themeColor) {
        setThemeColor('light');
    }
}
setInitialThemeColor();

const setInitialCheckboxState = () => {
    if (themeColor !== 'light') {
        toggleThemeBtn.children[0].checked = true;
    } else {
        toggleThemeBtn.children[0].checked = false;
    }
}
setInitialCheckboxState();

toggleThemeBtn.addEventListener('change', (e) => {
    if (e.currentTarget.children[0].checked === false) {
        setThemeColor('light')
    } else {
        setThemeColor('dark')
    }
});

const convertByUnitAndValue = (type, value) => {
    /*
    1 meter = 3.281 feet
    1 liter = 0.264 gallon
    1 kilogram = 2.204 pound
    */

    let conversion = value;

    if (type === 'meter') {
        conversion = value * 3.28084; // convert to feets
    } else if (type === 'feet') {
        conversion = value / 3.28084; // convert to meters
    } else if (type === 'liter') {
        conversion = value * 0.264172; // convert to galoons
    } else if (type === 'gallon') {
        conversion = value / 0.264172; // convert to liters
    } else if (type === 'kilogram') {
        conversion = value * 2.20462262185; // convert to pounds
    } else {
        conversion = value / 2.20462262185; // convert to kilograms
    }

    return conversion.toFixed(3); // round to three decimal places
}

const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
}

const convertAll = () => {
    const conversions = [
        { 'type': 'length', 'title': 'Meter/Feet' },
        { 'type': 'volume', 'title': 'Liters/Gallons' },
        { 'type': 'mass', 'title': 'Kilograms/Pounds' }
    ];

    const inputValue = numberToConvert.value;
    let li = '';
    
    conversions.map((conversion) => {
        const conversionByType = (type) => {
            let spanContent = '';

            if (type === 'length') {
                const metersToFeets = convertByUnitAndValue('meter', inputValue);
                const feetsToMeters = convertByUnitAndValue('feet', inputValue);
                spanContent = `${inputValue} meters = ${metersToFeets} feet | ${inputValue} feet = ${feetsToMeters} meters`;
            } else if (type === 'volume') {
                const litersToGallons = convertByUnitAndValue('liter', inputValue);
                const gallonsToLiters = convertByUnitAndValue('gallon', inputValue);
                spanContent = `${inputValue} liters = ${litersToGallons} gallons | ${inputValue} gallons = ${gallonsToLiters} liters`;
            } else {
                const kilogramsToPounds = convertByUnitAndValue('kilogram', inputValue);
                const poundsToKilograms = convertByUnitAndValue('pound', inputValue);
                spanContent = `${inputValue} kilos = ${kilogramsToPounds} pounds | ${inputValue} pounds = ${poundsToKilograms} kilos`;
            }

            return spanContent;
        }

        li += `
            <li>
				<label>${capitalize(conversion.type)} (${conversion.title})</label>
				<span>${conversionByType(conversion.type)}</span>
            </li>
        `;
    })

    conversionsEl.innerHTML = li;
}

convertBtnEl.addEventListener('click', convertAll);
// conversionsEl