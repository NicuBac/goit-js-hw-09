function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let intervalId;

document.body.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  const button = event.target;

  if (button.tagName === 'BUTTON' && button.dataset.start !== undefined) {
    startColorChange();
  } else if (button.tagName === 'BUTTON' && button.dataset.stop !== undefined) {
    stopColorChange();
  }
}

function startColorChange() {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
}
