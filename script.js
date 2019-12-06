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

window.addEventListener("load", function() {
    validateForm()
    let form = document.querySelector('form');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        validateForm();
        console.log('form validates!');
    });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
