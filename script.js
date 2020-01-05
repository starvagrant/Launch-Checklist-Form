function getFormFields() {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let pilotName = document.getElementById('pilotName').value;
    let copilotName = document.getElementById('copilotName').value;
    let fuelLevel = document.getElementById('fuelLevel').value;
    let cargoMass = document.getElementById('cargoMass').value;
    return [pilotName, copilotName, fuelLevel, cargoMass];
}

function getValidity(formFields) {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let invalidFields = ['','','',''];
    if (!isNaN(Number(formFields[0]))) invalidFields[0] = "Fuel must be a string";
    if (!isNaN(Number(formFields[1]))) invalidFields[1] = "Cargo must be a string";
    if (isNaN(Number(formFields[2]))) invalidFields[2] = "Fuel must be a number";
    if (isNaN(Number(formFields[3]))) invalidFields[3] = "Cargo must be a number";
    if (formFields[0] === "") invalidFields[0] = "Fill in blank field";
    if (formFields[1] === "") invalidFields[1] = "Fill in blank field";
    if (formFields[2] === "") invalidFields[2] = "Fill in blank field";
    if (formFields[3] === "") invalidFields[3] = "Fill in blank field";
    return invalidFields;
}

function toggleVisibility(element) {
    element.style.visibility = "visible";
}

function isNotEmptyString(argument) {
    return (argument !== "");
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
        if (validity.includes('Fill in blank field')) {
            alert('All fields are required');
            return;
        }
        if (validity.filter(isNotEmptyString).length > 0){
            alert('Make sure to enter valid information for each field!');
            return;
        }

        let launchStatus = document.getElementById("launchStatus");
        let correctStatus = ["Pilot Ready","Co-pilot Ready","Fuel level high enough for launch","Cargo mass low enough for launch"];

        shuttleReady = true;

        document.getElementsByClassName('shuttleStatus')[0].innerHTML = document.getElementById('pilotName').value + " ready";
        document.getElementsByClassName('shuttleStatus')[1].innerHTML = document.getElementById('copilotName').value + " ready";

        let fuelLevel = document.getElementById('fuelLevel').value;
        let cargoMass = document.getElementById('cargoMass').value;

        if (fuelLevel <= 10000) {
            document.getElementsByClassName('shuttleStatus')[2].innerHTML = "Fuel level too low for launch";
            shuttleReady = false;
        } else {
            document.getElementsByClassName('shuttleStatus')[2].innerHTML = "Fuel level high enough for launch";
        }

        if (cargoMass > 10000) {
            document.getElementsByClassName('shuttleStatus')[3].innerHTML = "Cargo Mass too high for launch";
            shuttleReady = false;
        } else {
            document.getElementsByClassName('shuttleStatus')[3].innerHTML = "Cargo Mass low enough for launch";
        }

        if (!shuttleReady) {
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else {
            launchStatus.innerHTML = "Shuttle ready for launch";
            launchStatus.style.color = "green";
        }

        faultyItems.style.visibility = "visible";
    });
});
