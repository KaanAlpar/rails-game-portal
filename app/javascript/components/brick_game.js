const brickGame = () => {
  var ballX = 75;
  var ballY = 75;
  var ballSpeedX = 5;
  var ballSpeedY = 7;

  const BRICK_W = 80;
  const BRICK_H = 20;
  const BRICK_GAP = 2;
  const BRICK_COLS = 10;
  const BRICK_ROWS = 15;
  var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
  var bricksLeft = 0;

  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_DIST_FROM_EDGE = 60;
  var paddleX = 400;

  var canvas, canvasContext;

  var mouseX = 0;
  var mouseY = 0;

  // 0 => Menu
  // 1 => Game
  // 2 => Game over
  var gameState = 0;

  function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;

    // cheat / hack to test ball in any position
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballSpeedY = -4;
  }

  function brickReset() {
    bricksLeft = 0;
    var i;
    for(i=0; i< 3*BRICK_COLS; i++) {
      brickGrid[i] = false;
    }
    for(; i<BRICK_COLS * BRICK_ROWS; i++) {
      brickGrid[i] = true;
      bricksLeft++;
    } // end of for each brick
  } // end of brickReset func

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font = "40px sans-serif";

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
    ballReset();
  }

  function updateAll() {
    moveAll();
    drawAll();
  }

  function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
  }

  function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < 0 && ballSpeedX < 0.0) { //left
      ballSpeedX *= -1;
    }
    if(ballX > canvas.width && ballSpeedX > 0.0) { // right
      ballSpeedX *= -1;
    }
    if(ballY < 0 && ballSpeedY < 0.0) { // top
      ballSpeedY *= -1;
    }
    if(ballY > canvas.height) { // bottom
      // ballReset();
      // brickReset();
      gameState = 2;
    }
  }

  function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS &&
      row >= 0 && row < BRICK_ROWS) {
       var brickIndexUnderCoord = rowColToArrayIndex(col, row);
       return brickGrid[brickIndexUnderCoord];
    } else {
      return false;
    }
  }

  function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

      if(isBrickAtColRow( ballBrickCol,ballBrickRow )) {
        brickGrid[brickIndexUnderBall] = false;
        bricksLeft--;

        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevBrickCol = Math.floor(prevBallX / BRICK_W);
        var prevBrickRow = Math.floor(prevBallY / BRICK_H);

        var bothTestsFailed = true;

        if(prevBrickCol != ballBrickCol) {
          if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
            ballSpeedX *= -1;
            bothTestsFailed = false;
          }
        }
        if(prevBrickRow != ballBrickRow) {
          if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
            ballSpeedY *= -1;
            bothTestsFailed = false;
          }
        }

        if(bothTestsFailed) { // armpit case, prevents ball from going through
          ballSpeedX *= -1;
          ballSpeedY *= -1;
        }

      } // end of brick found
    } // end of valid col and row
  } // end of ballBrickHandling func

  function ballPaddleHandling() {
    console.log(bricksLeft);

    var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    if( ballY > paddleTopEdgeY && // below the top of paddle
      ballY < paddleBottomEdgeY && // above bottom of paddle
      ballX > paddleLeftEdgeX && // right of the left side of paddle
      ballX < paddleRightEdgeX) { // left of the left side of paddle

      ballSpeedY *= -1;

      var centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
      var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * 0.35;

    } // ball center inside paddle
    if(bricksLeft === 0) {
      gameState = 2;
      console.log('bricksLeft = 0');
    }
  } // end of ballPaddleHandling

  function moveAll() {
    if (gameState === 1) {
      ballMove();

      ballBrickHandling();

      ballPaddleHandling();
    } else if (gameState === 0) {
      canvas.addEventListener('click', (e) => {
        gameState = 1;
      });
    } else if (gameState === 2) {
      canvas.addEventListener('click', (e) => {
        brickReset();
        ballReset();
        gameState = 1;
      });
    }
  }

  function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
  }

  function drawBricks() {

    for(var eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
      for(var eachCol=0;eachCol<BRICK_COLS;eachCol++) {

        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

        if(brickGrid[arrayIndex]) {
          colorRect(BRICK_W*eachCol,BRICK_H*eachRow,
            BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP, 'blue');
        } // end of is this brick here
      } // end of for each brick
    } // end of for each row

  } // end of drawBricks func

  function drawAll() {
    colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
    if (gameState === 1) {

      colorCircle(ballX,ballY, 10, 'white'); // draw ball

      colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
            PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

      drawBricks();
    } else if (gameState === 0) {
      colorText('Welcome to brick breaker!', 200, 220, 'white');
      colorText('Click the screen to start playing', 150, 280, 'white');
    } else if (gameState === 2) {
      if (bricksLeft === 0) {
        colorText('You win!', 320, 180, 'white');
        colorText('Click the screen to play again', 170, 250, 'white');
      } else {
        colorText('You lose!', 320, 180, 'white');
        colorText('Click the screen to try again', 170, 250, 'white');
      }
    }
  }

  function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
  }

  function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
    canvasContext.fill();
  }

  function colorText(showWords, textX,textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
  }
};

export { brickGame };
