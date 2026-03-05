var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// sky background
ctx.fillStyle = "skyblue";
ctx.fillRect(0, 0, 800, 500);

// ground
ctx.fillStyle = "green";
ctx.fillRect(0, 350, 800, 150);

// sun
ctx.beginPath();
ctx.arc(700, 80, 50, 0, Math.PI * 2);
ctx.fillStyle = "yellow";
ctx.fill();

// house base
ctx.fillStyle = "brown";
ctx.fillRect(300, 250, 200, 150);

// roof
ctx.beginPath();
ctx.moveTo(300, 250);
ctx.lineTo(400, 180);
ctx.lineTo(500, 250);
ctx.closePath();
ctx.fillStyle = "red";
ctx.fill();

// door
ctx.fillStyle = "black";
ctx.fillRect(380, 320, 40, 80);

// windows
ctx.fillStyle = "lightblue";
ctx.fillRect(320, 270, 40, 40);
ctx.fillRect(440, 270, 40, 40);

// caption text (required)
ctx.fillStyle = "black";
ctx.font = "22px Arial";
ctx.fillText("My Cartoon House!", 290, 40);

// repeated fence posts using loop + translate (required)
for (let i = 0; i < 12; i++) {
  ctx.save();
  ctx.translate(i * 65, 360);
  ctx.fillStyle = "tan";
  ctx.fillRect(0, 0, 12, 45);
  ctx.restore();
}
