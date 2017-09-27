// Setup initial game stats
var score = 0;
var lives = 2;
var power_pellets = 4;
var dots = 240;
var score_per_dot = 10;
var base_score_per_ghost_eaten = 200;
var number_of_ghost_eaten = 0;

// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
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
  console.log('Score: ' + score + '           Lives: ' + lives);
  console.log('\n\nPower-Pellets: ' + power_pellets + '   Dots: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots > 0) {
    console.log('(d) Eat Dot');
  } else {
    console.log('!!!!! NO MORE DOTS LEFT !!!!!');
  }
  if (dots < 10) {
    console.log('!!!!! NOT ENOUGH DOTS! CANNOT EAT 10 AT A TIME !!!!!');
  } else {
    console.log('(t) Eat 10 Dot');
  }
  if (dots < 100) {
    console.log('!!!!! NOT ENOUGH DOTS! CANNOT EAT 100 AT A TIME !!!!!');
  } else {
    console.log('(h) Eat 100 Dot');
  }
  if (dots === 0) {
    console.log('!!!!! NO MORE DOTS LEFT !!!!!');
  } else {
    console.log('(a) Eat ALL Dot');
  }
  if (power_pellets > 0) {
  console.log('(p) Eat Power-Pellet');
  } else {
  console.log('!!!!! NO MORE POWER PELLET !!!!!');
  }
  for (var i=0; i < ghosts.length; i++) {
    console.log('(' + (i+1) + ')' + ' Eat ' + ghosts[i].name + ' ' + '(' + checkEdible(ghosts[i]) + ')');
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
  score += score_per_dot;
  dots -= 1;
}

function eatTenDot() {
  console.log('\nChomp!');
  score += (score_per_dot * 10);
  dots -= 10;
}

function eatHundredDot() {
  console.log('\nChomp!');
  score += (score_per_dot * 100);
  dots -= 100;
}

function eatAllDot() {
  console.log('\nChomp!');
  score += (score_per_dot * dots);
  dots -= dots;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log(ghost.name + ' the ' + ghost.colour + ' ghost killed Pac-Man.');
    checkLives();
  } else {
    console.log('Pac-Man devours the ' + ghost.character + ' ghost ' + ghost.name + '! Yum yum yum ...');
    number_of_ghost_eaten += 1;
    score += (base_score_per_ghost_eaten * (Math.pow(2, (number_of_ghost_eaten - 1))));
    ghost.edible = false;
  }
}

function eatPowerPellet() {
  if (power_pellets > 0) {
    console.log('\nPac-Man devours a Power-Pellet...');
    score += 50;
    for (var i=0; i < ghosts.length; i++) {
      ghosts[i].edible = true;
      console.log(ghosts[i].name + ' is now edible ...');
    }
    power_pellets -= 1;
  }
}

// Check number of live and see if still alive
function checkLives() {
  if (lives < 0 ) {
    console.log('Pac-Man is dead ...');
    process.exit();
  }
}

function checkEdible(ghost) {
  if (ghost.edible === false) {
    return 'inedible';
  } else {
    return 'edible';
  }
}


// Process Player's Input
function processInput(key) {
  // for (var i=0; i < ghosts.length; i++) {
  //   if (ghosts[i].menu_option === key) {
  //     eatGhost(ghosts[i])
  //     return
  //   }
  // }
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      if (power_pellets > 0) {
        eatPowerPellet();
        break;
      } else {
        console.log('Pac-Man ran out of Power Pellet!');
      }
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
    case 'd':
      if (dots > 0) {
        eatDot();
        break;
      } else {
        console.log('NO ENOUGH DOTS!');
      }
    case 't':
      if (dots >= 10) {
        eatTenDot();
        break;
      } else {
        console.log('NO ENOUGH DOTS!');
      }
    case 'h':
      if (dots >= 100) {
        eatHundredDot();
        break;
      } else {
        console.log('NO ENOUGH DOTS!');
      }
    case 'a':
      if (dots > 0) {
        eatAllDot();
        break;
      } else {
        console.log('NO ENOUGH DOTS!');
      }
    default:
      console.log('\nInvalid Command!');
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
