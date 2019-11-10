const pongGame = () => {

  var canvas;
  var canvasContext;

  var ballX = 800/2;
  var ballY = 600/2;

  var ballSpeedX = 10;
  var ballSpeedY = 4;

  var player1Score = 0;
  var player2Score = 0;

  var paddle1Y = 250;
  var paddle2Y = 250;
  const PADDLE_HEIGHT = 100;

  var paddle1Thickness = 10;
  var paddle2Thickness = 10;

  // 0 => Menu
  // 1 => Game
  // 2 => Game Over
  var gameState = 0;

  function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
      x:mouseX,
      y:mouseY
    };

  }

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font = "40px sans-serif";

    var framesPerSecond = 30;
    setInterval(function() {
      game();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove',
            function(evt){
              var mousePos = calculateMousePos(evt);
              paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
            });
  }

  function ballReset() {
      ballSpeedX = -ballSpeedX;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
  }

  function game() {
    moveEverything();
    drawEverything();
  }

  function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35) {
      paddle2Y += 5;
    } else if(paddle2YCenter > ballY + 35){
      paddle2Y -= 5;
    }
  }

  function moveEverything() {
    if (gameState === 1) {
      computerMovement();

      ballX = ballX + ballSpeedX;
      ballY = ballY + ballSpeedY;
      if (ballX < 0) {
        if(ballY > paddle1Y &&
           ballY < paddle1Y + PADDLE_HEIGHT) {

             ballSpeedX *= -1;

           } else {
            ballReset();
            player2Score++;
           }
      }
      if (ballX > canvas.width) {
        if(ballY > paddle2Y &&
           ballY < paddle2Y + PADDLE_HEIGHT) {

             ballSpeedX *= -1;

           } else {
            ballReset();
            player1Score++;
           }
      }
      if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }
      if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      var winScore = 3;
      if (player1Score === winScore || player2Score === winScore) {
        gameState = 2;
      }
    } else if (gameState === 0) {
      canvas.addEventListener('click', (e) => {
        gameState = 1;
      });
    } else if (gameState === 2) {
      canvas.addEventListener('click', (e) => {
        player1Score = 0;
        player2Score = 0;
        ballReset();
        gameState = 1;
      });
    }
  }

  function drawEverything() {
    if (gameState === 1) {
      // Draw the canvas
      colorRect(0, 0, canvas.width, canvas.height, 'black');

      // Draw the left paddle
      colorRect(0, paddle1Y, paddle1Thickness, PADDLE_HEIGHT, 'white');

      // Draw the right paddle
      colorRect(canvas.width - paddle2Thickness, paddle2Y, paddle1Thickness, PADDLE_HEIGHT, 'white');

      // Draw the ball
      colorCircle(ballX, ballY, 10, 'white');

      canvasContext.fillText(player1Score, 100, 100);
      canvasContext.fillText(player2Score, canvas.width - 100, 100);
    } else if (gameState === 0) {

      colorRect(0, 0, canvas.width, canvas.height, 'black');
      colorRect(0, paddle1Y, paddle1Thickness, PADDLE_HEIGHT, 'white');
      colorRect(canvas.width - paddle2Thickness, paddle2Y, paddle1Thickness, PADDLE_HEIGHT, 'white');
      colorCircle(ballX, ballY, 10, 'white');

      canvasContext.fillStyle = 'white';
      canvasContext.fillText("Welcome to Pong!", 250, 100);
      canvasContext.fillText("Click the screen to start", 200, 175);
      canvasContext.fillText("Score 3 to win!", 270, 240);
    } else if (gameState === 2) {

      colorRect(0, 0, canvas.width, canvas.height, 'black');
      colorRect(0, paddle1Y, paddle1Thickness, PADDLE_HEIGHT, 'white');
      colorRect(canvas.width - paddle2Thickness, paddle2Y, paddle1Thickness, PADDLE_HEIGHT, 'white');
      colorCircle(ballX, ballY, 10, 'white');

      canvasContext.fillStyle = 'white';
      if (player1Score > player2Score) {
        canvasContext.fillText("You Win!", 320, 150);
      } else {
        canvasContext.fillText("You Lose", 320, 150);
      }
      canvasContext.fillText("Click the screen to play again", 180, 200);
      canvasContext.fillText(player1Score, 100, 100);
      canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }
  }

  function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
  }

  function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }

};

export { pongGame };
