const comingSoon = () => {

  var canvas;
  var canvasContext;


  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font = "80px sans-serif";

    var framesPerSecond = 30;
    setInterval(function() {
      draw();
    }, 1000/framesPerSecond);
  }

  function draw() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    canvasContext.fillStyle = 'white';
    canvasContext.fillText("COMING SOON", 100, 200);
  }

  function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
  }
};

export { comingSoon };
