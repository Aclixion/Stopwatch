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