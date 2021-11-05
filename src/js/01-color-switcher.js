const refs = {
    body: document.querySelector("body"),
    startButton: document.querySelector("button[data-start]"),
    stopButton: document.querySelector("button[data-stop]")
};
let colorId = null;

refs.startButton.addEventListener('click', onColorStart);
refs.stopButton.addEventListener('click', onColorStop);

function onColorStart() {
    colorId = setInterval(bodyColor, 1000);
    refs.startButton.disabled = true;
    refs.stopButton.disabled = false;
 };

function onColorStop() {
    clearInterval(colorId);
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;
};
 
function bodyColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
