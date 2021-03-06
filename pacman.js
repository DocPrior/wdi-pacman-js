// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  'menuOption': '1',
  'name': 'Inky',
  'colour': 'Red',
  'character': 'Shadow',
  'edible': false
};

var blinky = {
  'menuOption': '2',
  'name': 'Blinky',
  'colour': 'Cyan',
  'character': 'Speedy',
  'edible': false
};

var pinky = {
  'menuOption': '3',
  'name': 'Pinky',
  'colour': 'Pink',
  'character': 'Bashful',
  'edible': false
};

var clyde = {
  'menuOption': '4',
  'name': 'Clyde',
  'colour': 'Orange',
  'character': 'Pokey',
  'edible': false
};

var ghosts = [inky, blinky, pinky, clyde]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log(' ');
  console.log(' ');
  console.log('Power-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  for (i = 0; i < ghosts.length; i++) {
    if (ghosts[i].edible === true) {
        console.log('(' + ghosts[i].menuOption + ')' + ' Eat ' + ghosts[i].name + ' ' + ' (edible)');
    } else {
      console.log('(' + ghosts[i].menuOption + ')' + ' Eat ' + ghosts[i].name + ' ' + ' (inedible)');
    }
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
 if (ghost.edible === false) {
   lives -= 1
   console.log('\nEeewwweww blop blop!');
   gameOver(lives);
 } else {
   score += 200
   console.log('\nChomp!');
   ghost.edible = false;
 }
}

function eatPowerPellet() {
  score += 50
  if (powerPellets > 0) {
    for (i = 0; i < ghosts.length; i++) {
      ghosts[i].edible = true;
    }
    powerPellets -= 1;
  } else {
    console.log('\nNo Power-Pellets left! ');
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

// Exit if out of lives
function gameOver(lives) {
  if (lives <= 0) {
    process.exit()
    console.log('\nGame Over!');
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
