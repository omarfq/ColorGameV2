// This program will do the following:
// Once the user clicks the Easy / Medium / Hard mode button:
// 1. a random rgb color will be displayed (below the menu) 
// 2. circles will appear with random colors (one of them will have the value of the random rgb color displayed above). 
// 3. The "Click to play" button should change its text to say "New colors"
//      3a. when clicked, a new random rgb color should be displayed
//      3b. the circles should also change accordingly. 
// If the user chooses the wrong circle:
// 1. the circle should turn to its other side where the word "Incorrect" with a red background should be displayed
//      1a. the circle will disappear. 
// If the user guesses correctly: 
// 1. the remaining circles will change colors to the same rgb color guessed by the user (rgb color displayed above) 
// 2. the background of the body should also change to that particular color 
// 3. the text on the main button should display "Play again?" and if clicked: 
//      3a. it should reset everything
// 4. below the random rgb color a mesage saying "Correct!" in green should be displayed.

// Random color
function randomColor() {
    // Generate red
    const red = Math.floor(Math.random() * 256);
    // Generate green
    const green = Math.floor(Math.random() * 256);
    // Generate blue
    const blue = Math.floor(Math.random() * 256);
    // Return string with random color
    return (`(${red}, ${green}, ${blue})`);
}

// Display random color
function displayColor() {
    const color = document.querySelector('.color__random');
    color.innerHTML = `RGB${randomColor()}`;
}

// Remove random color
function removeColor() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__close')) {
            document.querySelector('.color__random').textContent = '';
        }
    });
}
removeColor();

// 1. a random rgb color will be displayed (below the menu) 
function triggerColor() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('selected')) {
            displayColor();
        }
    });
}
triggerColor();

// 2. circles will appear with random colors (one of them will have the value of the random rgb color displayed above). 
// If game mode is Easy then 3 circles will appear, if game mode is Medium then 6 circles will appear,
// and finally if game mode is Hard then 9 circles will appear
// For this to work, I need: 
// a. a numberOfSquares variable

let numberOfSquares = 6;
const mode = document.querySelectorAll('.menu__btn');

const selected = document.addEventListener('click', (e) => {
    if (e.target.classList.contains('selected')) {
        console.log('clicked');
    }
});

console.log(mode);
function setupGameMode() {
    for (let i = 0; i < mode.length; i++) {
        mode[i].addEventListener('click', () => {
            mode[0].classList.remove('selected');
            mode[1].classList.remove('selected');
            mode[2].classList.remove('selected');
            mode[i].classList.add('selected');
            if (mode[i].textContent === 'Easy') {
                numberOfSquares = 3;
            } else if (mode[i].textContent === 'Medium') {
                numberOfSquares = 6;
            } else {
                numberOfSquares = 9;
            }
        });

    }
}
setupGameMode();

// 2a. Generate random colors for the circles
colors = [];
function generanteRandomColors(numSquares) {
    // Create an array
    const colorArray = [];

    // Add how many number of sqaures there are to array
    for (let i = 0; i < numSquares; i++) {
        // Get random color and push into array
        colorArray.push(randomColor());
    }
    console.log(colorArray);
    // Return that array
    return colorArray;   
}
generanteRandomColors(numberOfSquares);

