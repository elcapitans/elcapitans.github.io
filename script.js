const gameButton = document.getElementById('gameButton');
const reloadButton = document.getElementById('reload');
const shotsDisplay = document.getElementById('shots-taken');
const ducksDisplay = document.getElementById('ducks');
const missedDisplay = document.getElementById('missed');
const winnerDisplay = document.querySelector('.winner');
const loserDisplay = document.querySelector('.loser');
const tryAgainButton = document.querySelector('.tryAgainButton');
const shell1 = document.querySelector('.shell1');
const shell2 = document.querySelector('.shell2');
const shell3 = document.querySelector('.shell3');
const shell4 = document.querySelector('.shell4');
const shell5 = document.querySelector('.shell5');
const shell6 = document.querySelector('.shell6');
const shell7 = document.querySelector('.shell7');
const countdownDisplay = document.getElementById('countdown');
const accuracyDisplay = document.getElementById('accuracy');
const currentScoreElement = document.getElementById('currentScore');
const highScoreElement = document.getElementById('highScore');


let gameStarted = false;
let ammoLeft = 7;
let shotsTaken = 0;
let speed = 4;
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;
let isHoveringGameButton = false;
let isHoveringReloadButton = false;
let outOfAmmo = false;
let animationFrameId;
let isAudioPlaying = false;
let timer =60;
let currentScore = 0;
let highScore = 0;
let interval;





function resetGame() {
  gameStarted = true;
  ducksMissed = 0;
  duckCounter = 0;
  shotsTaken = 0;
  speed = 4;
  ammoLeft = 7;
  outOfAmmo = false;
  currentScore = 0;
  timer = 60;
  shotsDisplay.textContent=shotsTaken;
  accuracyDisplay.textContent = 0;
  currentScoreElement.textContent =0;
  let shells = [shell1, shell2, shell3, shell4, shell5, shell6, shell7];
  shells.forEach(shell => {
    shell.classList.remove('hide');  
    shell.classList.add('show');     
  });

  if(gameStarted){
    tryAgainButton.classList.add('hidden');
  }
   newButton();
   startTimer();
}


function newButton() {
  const x = Math.floor(Math.random() * (window.innerWidth - gameButton.clientWidth));
  const y = Math.floor(Math.random() * (window.innerHeight - gameButton.clientHeight));

  gameButton.style.position = 'absolute';
  gameButton.style.left = `${x}px`;
  gameButton.style.top = `${y}px`;

  posX = x;
  posY = y;
  directionX = 1;
  directionY = 1;

  cancelAnimationFrame(animationFrameId);
  moveButton();
  updateDisplay();
}



function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(interval);
      countdownDisplay.textContent = 'Time is up!';
      tryAgainButton.classList.remove('hidden');
      gameStarted = false;
    } else if (gameStarted === true) {
      timer--;
      updateDisplay(); 
    }
  }, 1000);
}

function updateDisplay() {
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}




function moveButton() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const buttonWidth = gameButton.offsetWidth;
  const buttonHeight = gameButton.offsetHeight;
  posX += directionX * speed;
  posY += directionY * speed;
  if (posX + buttonWidth > viewportWidth) {
    posX = viewportWidth - buttonWidth;
    directionX *= -1;
    quack('duckSound1')
  } else if (posX < 0) {
    posX = 0;
    directionX *= -1;
  }
  if (posY + buttonHeight > viewportHeight) {
    posY = viewportHeight - buttonHeight;
    directionY *= -1;
    quack('duckSound2')
  } else if (posY < 0) {
    posY = 0;
    directionY *= -1;
  }
  const angle = Math.atan2(directionY, directionX) * (180 / Math.PI);
  gameButton.style.left = `${posX}px`;
  gameButton.style.top = `${posY}px`;
  gameButton.style.transform = `rotate(${angle}deg)`;
  animationFrameId = requestAnimationFrame(moveButton);
}


function updateAccuracy() {
  const accuracy = (shotsTaken > 0) ? ((currentScore / shotsTaken) * 100).toFixed(2) : 0;
  accuracyDisplay.textContent = `${accuracy}%`;
}


function updateScore() {
  speed += 5;
  currentScore ++;
  
  currentScoreElement.textContent = currentScore;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreElement.textContent = highScore;
  }
  const newScore = currentScore + Math.floor(Math.random() * 10) + 1;
}








function quack(input) {
  const audio = document.getElementById(input);
  audio.play();
}


function reloadSound(input) {
  const audio = document.getElementById(input);
  audio.play();
  isAudioPlaying = true;
  audio.onended = () => {
    isAudioPlaying = false;
  };
}

function playSound(input) {
  const audio = document.getElementById(input);
  audio.play();
  isAudioPlaying = true;
  audio.onended = () => {
    isAudioPlaying = false;
  };
}










function reloadAmmo() {
  ammoLeft = 7;
  outOfAmmo = false;
  let shells = [shell1, shell2, shell3, shell4, shell5, shell6,shell7];
  let delay = 400;
  function showShell(index) {
    setTimeout(() => {
      shells[index].classList.remove('hide');
      shells[index].classList.add('show');
      if (index < shells.length - 1) {
        showShell(index + 1);
      }
    }, delay);
  }
  showShell(0);
}
 


function reduceAmmo() {
  ammoLeft--;
  shotsTaken ++;
  shotsDisplay.textContent=shotsTaken;

  if (ammoLeft === 0) {
    outOfAmmo = true;
    shell7.classList.remove('show');
    shell7.classList.add('hide');
  }else if(ammoLeft === 6){
    shell1.classList.remove('show');
    shell1.classList.add('hide');

  }else if(ammoLeft === 5){
    shell2.classList.remove('show');
    shell2.classList.add('hide');

  }else if(ammoLeft === 4){
    shell3.classList.remove('show');
    shell3.classList.add('hide');
    

  }else if(ammoLeft === 3){
    shell4.classList.remove('show');
    shell4.classList.add('hide');

  }else if(ammoLeft === 2){
    shell5.classList.remove('show');
    shell5.classList.add('hide');

  }else if(ammoLeft === 1){
    shell6.classList.remove('show');
    shell6.classList.add('hide');    
 
  }
}




document.addEventListener('DOMContentLoaded', () => {
  const ambianceAudio = document.getElementById('ambiance1');
  ambianceAudio.play();

  
  tryAgainButton.classList.remove('hidden');

  countdownDisplay.textContent = '0:00:00';

  gameButton.addEventListener('mouseover', () => {
    isHoveringGameButton = true;
  });

  gameButton.addEventListener('mouseout', () => {
    isHoveringGameButton = false;
  });

  document.addEventListener('keydown', event => {
    if (!gameStarted) return;
    if (event.code === 'Space') {
      if (isAudioPlaying) return;

      if (isHoveringGameButton && !outOfAmmo) {
        newButton();
        reduceAmmo();
        playSound('shotgun');
        playSound('shell');        
        updateScore();
        updateAccuracy();

      } else if (!isHoveringGameButton && !outOfAmmo) {
        playSound('shotgun');
        playSound('shell');
        reduceAmmo();
        updateAccuracy();
        

      }
    }else if(event.code ==='KeyR'){
      if (!isAudioPlaying) {
      reloadSound('reloadSound');
      reloadAmmo();
    }
    }
  }); 


  tryAgainButton.addEventListener('click', () => {
    resetGame();
  });

});
