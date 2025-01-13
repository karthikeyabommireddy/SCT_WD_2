let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    lapsList.appendChild(lapElement);
  }
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', recordLap);
