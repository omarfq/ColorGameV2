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

// SELECTORS
const colorDisplay = document.querySelector('.color__random');
const mode = document.querySelectorAll('.menu__btn');
const circles = document.querySelectorAll('.circles__circle');
const message = document.querySelector('.color__message');
const resetButton = document.querySelector('#reset');
const body = document.querySelector('body');

// Random color
function randomColor() {
    // Generate red
    const red = Math.floor(Math.random() * 256);
    // Generate green
    const green = Math.floor(Math.random() * 256);
    // Generate blue
    const blue = Math.floor(Math.random() * 256);
    // Return string with random color
    return (`rgb(${red}, ${green}, ${blue})`);
}

// Remove random color
function removeColor() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__close')) {
            colorDisplay.textContent = '';
        }
    });
}
removeColor();


// 2. circles will appear with random colors (one of them will have the value of the random rgb color displayed above). 
// If game mode is Easy then 3 circles will appear, if game mode is Medium then 6 circles will appear,
// and finally if game mode is Hard then 9 circles will appear
// For this to work, I need: 
// a. a numberOfSquares variable

let numberOfSquares = 6;
function setupGameMode() {
    for (let i = 0; i < mode.length; i++) {
        mode[i].addEventListener('click', () => {
            // Remove the class '.selected' from all elements
            mode[0].classList.remove('selected');
            mode[1].classList.remove('selected');
            mode[2].classList.remove('selected');
            // Add the class to the clicked element only
            mode[i].classList.add('selected');
            // Number of squares to be displayed
            if (mode[i].textContent === 'Easy') {
                numberOfSquares = 3;
            } else if (mode[i].textContent === 'Medium') {
                numberOfSquares = 6;
            } else {
                numberOfSquares = 9;
            }
            reset();
        });

    }
}
setupGameMode();

// 2a. Generate random colors for the circles
let colors = [];
function generanteRandomColors(numSquares) {
    // Create an array
    const colorArray = [];

    // Add how many number of sqaures there are to array
    for (let i = 0; i < numSquares; i++) {
        // Get random color and push into array
        colorArray.push(randomColor());
    }

    // Return that array
    return colorArray;   
}

let pickedColor = pickColor();

// RESET FUNCTION
function reset() {

    // Store all random colors in colors array
    colors = generanteRandomColors(numberOfSquares);
    // Pick a new random color from array
    pickedColor = pickColor();
    console.log(pickedColor);

    // Change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    message.textContent = '';


    // Change colors of squares
    for(let i = 0; i < circles.length; i++) {
        // If the color array exists
        if(colors[i]) {
            // console.log(colors[i]);
            // Then display the circles
            circles[i].style.display = 'inline-block';
            // And apply a random color to each of them
            circles[i].style.backgroundColor = colors[i];
        } else {
            // If there is no array then dont display them
            circles[i].style.display = 'none';
        }
    }
    body.style.backgroundColor = '#099fcc';
}
reset();

resetButton.addEventListener('click', () => {
    resetButton.textContent = 'New Colors';
    reset();
});

// 3. In this step, we're going to setup the squares: We should pick a color from the colors array,
// compare it to the color that the user picked and determine if its correct or not
// The following function will be needed:
// pickColor - will pick a random color from the colors array and return it
// changeColors - it will accept the picked color as an argument and will change the background color
// of the other circles to the picked color
// setupSquares - this function will set up all squares and will call the previous functions

function pickColor() {
    // Pick a position within the colors array (this random position contains a color)
    let random = Math.floor(Math.random() * colors.length);
    // Return the color on index random
    return colors[random];
}



function ChangeColors(color) {
    // Change the color of each of the circles to the picked color
    circles.forEach(el => el.style.backgroundColor = color);
}

function setupCircles() {
    let clickedColor;
    for(let i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', () => {
            // Grab the color of the circle
            clickedColor = circles[i].style.backgroundColor;
            // Compare it with the one that the user clicked
            if(clickedColor === pickedColor) {
                message.textContent = 'Correct!';
                resetButton.textContent = 'Play again?';
                ChangeColors(clickedColor);
                body.style.background = clickedColor;
            } else {
                message.textContent = 'Try again!';
                circles[i].style.backgroundColor = 'transparent';
                circles[i].style.boxShadow = 'none';
            }
            
        });
    }

}
setupCircles();

