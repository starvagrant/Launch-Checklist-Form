function getFormFields() {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let fuelLevel = document.getElementById('fuelLevel').value;
    let cargoMass = document.getElementById('cargoMass').value;
    let pilotName = document.getElementById('pilotName').value;
    let copilotName = document.getElementById('copilotName').value;
    return [fuelLevel, cargoMass, pilotName, copilotName];
}

function getValidity(formFields) {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let invalidFields = ['','','',''];
    if (isNaN(Number(formFields.fuelLevel))) invalidFields[2] = "Fuel must be a number";
    if (isNaN(Number(formFields.cargoMass))) invalidFields[3] = "Fuel must be a number";
    if (!isNaN(Number(formFields.fuelLevel))) invalidFields[2] = "Pilot name must be a string";
    if (!isNaN(Number(formFields.cargoMass))) invalidFields[3] = "Co-Pilot name must be a string";
    if (formFields.fuelLevel < 10000) invalidFields[2] = "Fuel must be over 10000";
    if (formFields.cargo > 10000) invalidFields[3] = "Cargo must be under 10000";
    if (formFields[0] === undefined) invalidFields[0] = "Fill in pilot name";
    if (formFields[1] === undefined) invalidFields[1] = "Fill in cargo weight";
    if (formFields[2] === undefined) invalidFields[2] = "Fill in fuel level";
    if (formFields[3] === undefined) invalidFields[3] = "Fill in cargo weight";
    return invalidFields;
}

function toggleVisibility(element) {
    element.style.visibility = "visible";
}

window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
        response.json().then(function(json) {
            let planet = Math.round(Math.random() * 5);
            let missionTarget = document.getElementById('missionTarget');
            missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                   <li>Name: ${json[planet].name}</li>
                   <li>Diameter: ${json[planet].diameter}</li>
                   <li>Star: ${json[planet].star}</li>
                   <li>Distance from Earth: ${json[planet].distance}</li>
                   <li>Number of Moons: ${json[planet].moons}</li>
                </ol>
                <img src="${json[planet].image}">
            `;
        });
    });

    let form = document.querySelector('form');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let formFields = getFormFields();
        let validity = getValidity(formFields);
        let formIsValid = true;

        let faultyItems = document.getElementById("faultyItems");
        let listItems = document.getElementsByTagName('li');
        let launchStatus = document.getElementById("launchStatus");

        faultyItems.style.visibility = "visible";

        for (i=0; i<validity.length; i++) {
            if (validity[i] !== '') {
                listItems.innerHTML = validity;
                formIsValid = false;
            }
        }

        if (!formIsValid) {
            launchStatus.innerHTML = "Shuttle not ready for launch";
        } else {
            launchStatus.innerHTML = "Shuttle ready for launch";
        }
    });

});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!

*/
