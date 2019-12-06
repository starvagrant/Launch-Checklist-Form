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
        alert('Set fuel Level to a Number');
        return;
    }
    let cargoMass = document.getElementById('cargoMass');
    if (!isNaN(Number(fuelLevel))) {
        alert('Set cargoMass to a Number');
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
            let missionTarget = document.getElementById('missionTarget');
            missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                   <li>Name: ${json[0].name}</li>
                   <li>Diameter: ${json[0].diameter}</li>
                   <li>Star: ${json[0].star}</li>
                   <li>Distance from Earth: ${json[0].distance}</li>
                   <li>Number of Moons: ${json[0].moons}</li>
                </ol>
                <img src="${json[0].image}">
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
