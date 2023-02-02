const timeDisplay = document.querySelector(".time-display"); // Time display 

const startButton = document.querySelector(".start-btn"); // Start timer button
const stopButton = document.querySelector(".stop-btn"); // Stop timer button
const lapButton = document.querySelector(".lap-btn"); // Lap button
const resetButton = document.querySelector(".reset-btn") // Reset button

const lapsSection = document.querySelector(".laps-section"); // Laps section to display all lapped times

let intervalId = null; // Interval ID used to change the timer display
let startTime = 0; // Time when start button is clicked (in milliseconds)
let currentTime = 0; // Current time displayed on time display (in milliseconds)
let stopTime = 0; // Time when stop button is clicked (in milliseconds)

// Starts timer
function startTimer() {
    if (!intervalId) {
        startTime = Date.now();
        intervalId = setInterval(updateTimer, 10);
    }
    startState();
}

// Updates timer
function updateTimer() {
	currentTime = stopTime + (Date.now() - startTime);
    updateTimeDisplay();
}

// Stops timer
function stopTimer() {
    stopTime = currentTime;
    clearInterval(intervalId);
    intervalId = null;
    stopState();
}

// Resets timer
function resetTimer() {
    stopTime = 0;
    startTime = Date.now();
    clearInterval(intervalId);
    intervalId = null;
    updateTimer();
    stopState();
}

// Adds a new lapped time to the laps section
function addLappedTime() {
    let newLappedTime = document.createElement("p");
    newLappedTime.classList.add("lap");
    newLappedTime.textContent = getFormattedTime(currentTime);
    lapsSection.appendChild(newLappedTime);
}

// Returns a formatted version of a time (time is in milliseconds)
function getFormattedTime(milliseconds) {
    let centiseconds = Math.floor(milliseconds / 10) % 100;
    let seconds = Math.floor(milliseconds / 1000) % 60;
    let minutes = Math.floor(seconds / 60) % 60;

    let centisecondsFormat = "";
    if (centiseconds < 10) {
        centisecondsFormat += "0";
    }
    centisecondsFormat += centiseconds;

    let secondsFormat = "";
    if (seconds < 10) {
        secondsFormat += "0";
    }
    secondsFormat += seconds;

    let minutesFormat = "";
    if (minutes < 10) {
        minutesFormat += "0";
    }
    minutesFormat += minutes;

    return `${minutesFormat}:${secondsFormat}:${centisecondsFormat}`;
}

// Updates time display
function updateTimeDisplay() {
    timeDisplay.textContent = getFormattedTime(currentTime);
}

// Changes the timer to its start state
function startState() {
    enableLapButton();
    enableResetButton();

    hideStartButton();
    displayStopButton();
}

// Changes the timer to its stop state
function stopState() {
    disableLapButton();
    disableResetButton();

    hideStopButton();
    displayStartButton();
}

// Enables reset button, allowing it to be clicked
function enableResetButton() {
    resetButton.classList.add("enabled");
    resetButton.disabled = false;
}

// Disables reset button
function disableResetButton() {
    resetButton.classList.remove("enabled");
    resetButton.disabled = true;
}

// Enables lap button, allowing it to be clicked
function enableLapButton() {
    lapButton.classList.add("enabled");
    lapButton.disabled = false;
}

// Disables lap button
function disableLapButton() {
    lapButton.classList.remove("enabled");
    lapButton.disabled = true;
}

// Displays start button
function displayStartButton() {
    startButton.parentElement.classList.remove("hide");
}

// Hides start button
function hideStartButton() {
    startButton.parentElement.classList.add("hide");
}

// Displays stop button
function displayStopButton() {
    stopButton.parentElement.classList.remove("hide");
}

// Hides stop button
function hideStopButton() {
    stopButton.parentElement.classList.add("hide");
}

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", stopTimer);

resetButton.addEventListener("click", resetTimer);

lapButton.addEventListener("click", addLappedTime);

// Initialize timer display
timeDisplay.textContent = "00:00:00";

// Hide stop button when page is opened
stopButton.parentElement.classList.add("hide");

// Initialize state of start button
startButton.classList.add("enabled");

// Enable stop button
stopButton.classList.add("enabled");

// Disables lap and reset button
lapButton.disabled = true;
resetButton.disabled = true;