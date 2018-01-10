//global variables
var started = false;
var time = 0;
var interval;
var recordedTimes;

function setUp() {
    var buttons = document.getElementsByTagName("button");

    buttons[0].addEventListener('click', () =>  startStop());// BUTTON START/STOP
    buttons[1].addEventListener('click', () => reset());// BUTTON RESET
    buttons[2].addEventListener('click', () => recordCurrentTime());// BUTTON RECORD TIME
    

    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() == 's') startStop();
        if (event.key.toLowerCase() == 'r') reset();
        if (event.key.toLowerCase() == 't') recordCurrentTime();
    });
}

function startStop() {
    if (started == false) {
        started = true;
        interval = setInterval(function () {
            time += 0.01;
            document.getElementById("tempo").innerHTML = time.toFixed(2);
        }, 10);
    } else {
        clearInterval(interval);
        started = false;
    }
}


function reset() {
    time = 0;
    started = false;
    document.getElementById("tempo").innerHTML = time.toFixed(2);
    recordedTimes = document.getElementById("recordedTimes").innerHTML = '';
    clearInterval(interval);
}

function recordCurrentTime() {
    if (started) {
        recordedTimes = document.getElementById("recordedTimes");
        var li = document.createElement("li");
        li.textContent = time.toFixed(2);
        recordedTimes.appendChild(li);
    } else {
        return;
    }
}

setUp();