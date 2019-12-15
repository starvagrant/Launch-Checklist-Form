function getFormFields() {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let pilotName = document.getElementById('pilotName').value;
    let copilotName = document.getElementById('copilotName').value;
    let fuelLevel = document.getElementById('fuelLevel').value;
    let cargoMass = document.getElementById('cargoMass').value;
    console.log([pilotName, copilotName, fuelLevel, cargoMass]);
    return [pilotName, copilotName, fuelLevel, cargoMass];
}

function getValidity(formFields) {
    // 0: pilot 1: co-pilot 2: fuel level 3: cargon mass
    let invalidFields = ['','','',''];
    if (!isNaN(Number(formFields[0]))) invalidFields[0] = "Fuel must be a string";
    if (!isNaN(Number(formFields[1]))) invalidFields[1] = "Cargo must be a string";
    if (isNaN(Number(formFields[2]))) invalidFields[2] = "Fuel must be a number";
    if (isNaN(Number(formFields[3]))) invalidFields[3] = "Cargo must be a number";
    if (formFields[2] < 10000) invalidFields[2] = "Fuel must be over 10000";
    if (formFields[3] > 10000) invalidFields[3] = "Cargo must be under 10000";
    if (formFields[0] === "") invalidFields[0] = "Fill in blank field";
    if (formFields[1] === "") invalidFields[1] = "Fill in blank field";
    if (formFields[2] === "") invalidFields[2] = "Fill in blank field";
    if (formFields[3] === "") invalidFields[3] = "Fill in blank field";
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
        alert('submitted');
        let formFields = getFormFields();
        let validity = getValidity(formFields);
        let formIsValid = true;
        let faultyItems = document.getElementById("faultyItems");
        let listItems = document.getElementsByClassName('shuttleStatus');
        let launchStatus = document.getElementById("launchStatus");
        let correctStatus = ["Pilot Ready","Co-pilot Ready","Fuel level high enough for launch","Cargo mass low enough for launch"];

        faultyItems.style.visibility = "visible";
        for (i=0; i<validity.length; i++) {
            if (validity[i] !== '') {
                document.getElementsByClassName('shuttleStatus')[i].innerHTML = validity[i];
                formIsValid = false;
            } else {
                document.getElementsByClassName('shuttleStatus')[i].innerHTML = correctStatus[i];
            }
        }

        if (!formIsValid) {
            launchStatus.innerHTML = "Shuttle not ready for launch";
        } else {
            launchStatus.innerHTML = "Shuttle ready for launch";
        }
    });

});
