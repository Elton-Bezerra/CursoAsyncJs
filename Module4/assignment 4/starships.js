function run(genFunc) {
    const genObject = genFunc();// criando um objeto generator

    function iterate(iteration) {//recursive function to iterate through promises
        if (iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered        
    }

    try {
        return iterate(genObject.next());// starts the recursive loop;
    } catch (ex) {
        return Promise.reject(ex);
    }

}

function* gen() {
    //check if inputs are valid
    if (document.getElementById("ships1").value == document.getElementById("ships2").value)
        throw new Error("Invalid Input - Select different ships!");

    //fetch starship1
    var starshipResponse1 = yield fetch("https://swapi.co/api/starships/" + document.getElementById("ships1").value + "/");
    var starship1 = yield starshipResponse1.json();

    //fetch starship2
    var starshipResponse2 = yield fetch("https://swapi.co/api/starships/" + document.getElementById("ships2").value + "/");
    var starship2 = yield starshipResponse2.json();

    load([starship1, starship2]);
}

document.getElementById("btnCompare").addEventListener('click', function () {
    run(gen).catch(function (err) {
        alert(err.message);
    });
})

function load(ships) {
    var table = document.getElementById("shipsTable");
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    var name = document.createElement("TR");
    var cost = document.createElement("TR");
    var speed = document.createElement("TR")
    var cargoSize = document.createElement("TR");
    var passengers = document.createElement("TR");

    var nh = document.createElement("TH");
    nh.appendChild(document.createTextNode("Name"));

    var coh = document.createElement("TH");
    coh.appendChild(document.createTextNode("Cost"));

    var sh = document.createElement("TH")
    sh.appendChild(document.createTextNode("Speed"));

    var ch = document.createElement("TH");
    ch.appendChild(document.createTextNode("Cargo Size"));

    var ph = document.createElement("TH");
    ph.appendChild(document.createTextNode("Passengers"));

    name.appendChild(nh);
    cost.appendChild(coh);
    speed.appendChild(sh);
    cargoSize.appendChild(ch);
    passengers.appendChild(ph);

    for (var i = 0; i < 2; i++) {
        var tdName = document.createElement('TD');
        var tdCost = document.createElement('TD');
        var tdSpeed = document.createElement('TD');
        var tdCargoSize = document.createElement('TD');
        var tdPassengers = document.createElement('TD');

        tdName.appendChild(document.createTextNode(ships[i].name));
        tdCost.appendChild(document.createTextNode(ships[i].cost_in_credits));
        tdSpeed.appendChild(document.createTextNode(ships[i].max_atmosphering_speed));
        tdCargoSize.appendChild(document.createTextNode(ships[i].cargo_capacity));
        tdPassengers.appendChild(document.createTextNode(ships[i].passengers));

        name.appendChild(tdName);
        cost.appendChild(tdCost);
        speed.appendChild(tdSpeed);
        cargoSize.appendChild(tdCargoSize);
        passengers.appendChild(tdPassengers);



        if (compare(ships).cost) {
            cost.childNodes[1].style.backgroundColor = "red";
        } else {
            if (cost.childNodes.length > 2 && !(ships[0].cost_in_credits == ships[1].cost_in_credits))
                cost.childNodes[2].style.backgroundColor = "red";
        }

        if (compare(ships).speed) {
            speed.childNodes[1].style.backgroundColor = "red";
        } else {
            if (speed.childNodes.length > 2 && !(ships[0].max_atmosphering_speed == ships[1].max_atmosphering_speed)){                
                speed.childNodes[2].style.backgroundColor = "red";
            }                
        }

        if (compare(ships).cargo) {
            cargoSize.childNodes[1].style.backgroundColor = "red";
        } else {
            if (cargoSize.childNodes.length > 2 && !(ships[0].cargo_capacity == ships[1].cargo_capacity)) 
                cargoSize.childNodes[2].style.backgroundColor = "red";
        }

        if (compare(ships).passengers) {
            passengers.childNodes[1].style.backgroundColor = "red";
        } else {
            if (passengers.childNodes.length > 2 && !(ships[0].passengers == ships[1].passengers))
                passengers.childNodes[2].style.backgroundColor = "red";
        }
    }   

    table.appendChild(name);
    table.appendChild(cost);
    table.appendChild(speed);
    table.appendChild(cargoSize);
    table.appendChild(passengers);
}

function compare(ships) {
    return {
        'cost': parseInt(ships[0].cost_in_credits) > parseInt(ships[1].cost_in_credits),
        'speed': parseInt(ships[0].max_atmosphering_speed) > parseInt(ships[1].max_atmosphering_speed),
        'cargo': parseInt(ships[0].cargo_capacity) > parseInt(ships[1].cargo_capacity),
        'passengers': parseInt(ships[0].passengers) > parseInt(ships[1].passengers)
    };
}