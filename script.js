function validateForm() {
    let form = document.querySelector('form');
    for(i=0; i<4;i++) {
        if (form[i].value === "") {
            alert('Fill in All Fields');
            return;
        }
    }

    let fuelLevel = document.getElementById('fuelLevel');
    if (!isNaN(Number(fuelLevel))) {
        alert('Make sure to enter valid information for each field');
        return;
    }
    let cargoMass = document.getElementById('cargoMass');
    if (!isNaN(Number(fuelLevel))) {
        alert('Make sure to enter valid information for each field');
        return;
    }
}

function insertNames() {
    let pilotName = document.getElementById('pilotName').value;
    let copilotName = document.getElementById('copilotName').value;
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    pilotStatus.innerHTML = `${pilotName}`;
    copilotStatus.innerHTML = `${copilotName}`;
}

function alertShuttleNeeds() {
    let fuelLevel = document.getElementById('fuelLevel').value;
    let cargoMass = document.getElementById('cargoMass').value;
    let fuelGood = true;
    let cargoGood = true;
    if (fuelLevel <= 10000) fuelGood = false;
    if (cargoMass >= 10000) cargoGood = false;
    let faultyItems = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");
    if (!fuelGood || !cargoGood) {
        faultyItems.style.visibility = "visible";
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        if (!fuelGood) {
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
        }
        if (!cargoGood) {
            cargoStatus.innerHTML = "There is too much mass for takeoff.";
        } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
        }
    } else {
        faultyItems.style.visibility = "hidden";
        launchStatus.style.color = "";
        launchStatus.innerHTML = "Awaiting Information Before Launch";
    }
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
        validateForm();
        insertNames();
        alertShuttleNeeds();
        console.log('program complete!');
    });

});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!

*/
