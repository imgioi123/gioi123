let canvas = document.getElementById("myCanvas");

let currentPoint = 0; // điểm lượt chơi hiện tại
let lastHighestPoint = localStorage.getItem("LAST_HIGHEST_POINT"); // lấy điểm cao nhất từ bộ nhớ trình duyệt

class MyRect {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  moveLeft = function () {
    this.x -= 10;
  };

  moveRight = function () {
    this.x += 10;
  };

  draw = function () {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.height, this.width);
    context.fill();
  };
}

class GameScreen {
  clear = function () {
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth);
  };

  showText = function (text) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText(text, 200, 200);
  };

  showHighestPoint = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Điểm cao nhất: " + lastHighestPoint, 200, 250);
  };
}

let rect1 = new MyRect(0, 0, 50, 60, "red");
let rect2 = new MyRect(200, 0, 50, 60, "green");
let screen = new GameScreen(500, 500);

function startGame() {
  rect1.draw();
  rect2.draw();
}

function moveLeft() {
  rect1.moveLeft();
  redraw();
  recheck();
}

function moveRight() {
  rect1.moveRight();
  redraw();
  recheck();
}

// vẽ lại toàn bộ canvas
function redraw() {
  screen.clear();
  rect1.draw();
  rect2.draw();
}

// Kiểm tra va chạm. Nếu va chạm thì cộng điểm vào biến currentPoint.
// So sánh với điểm cao nhất trong các lượt chơi (lastHighestPoint).
// Nếu điểm hiện tại lớn hơn thì lưu vào bộ nhớ trình duyệt.
function recheck() {
  if (collisionDetect()) {
    currentPoint += 1;
    screen.showText("Điểm: " + currentPoint);
    screen.showHighestPoint();

    if (currentPoint > lastHighestPoint) {
      lastHighestPoint = currentPoint;
      localStorage.setItem("LAST_HIGHEST_POINT", currentPoint); // lưu điểm cao nhất vào bộ nhớ trình duyệt
    }
  }
}

// Hàm phát hiện va chạm giữa 2 đối tượng rect1 và rect2
// Tham khảo: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collisionDetect() {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }
  return false;
}
