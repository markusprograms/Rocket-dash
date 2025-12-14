/*
>>> Rocket dash <<<
by Infinite coder

started:  17-09-2022
finished: 17-09-2022
released: 17-09-2022

How to play:
    1. Click the 'Play' button
    2. Hold and drag mouse to move
    3. Dodge the asteroids
    4. Send me your score in Tips&Thanks to get on the leaderboard

Credits:
    Khan Academy - Background space image
*/

new Q5("global");

createCanvas(windowWidth, windowHeight);
let canvasTooSmall = false;
let minCanvasWidth = 400;
let minCanvasHeight = 600;
if (windowWidth < minCanvasWidth || windowHeight < minCanvasHeight) {
	canvasTooSmall = true;
}

angleMode(DEGREES);

function str(value) {
	return String(value);
}

/* Source: chatgpt.com */
function isFullscreen() {
  return document.fullscreenElement !== null;
}
/* End source: chatgpt.com */

let pointerX, pointerY;

let backgroundImage = loadImage("https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/space/background.png");
let rocketPosition = width / 2;
let rocketEmoji = "🚀";
let mouse = false;
let asteroids = [];
let meteorCount = 10;
let isAlive = true;
let isPlaying = false;
let how = false;
let leaderboardShow = false;
let score = 0;
let rocketSpeed = 3;
let leaderboard = [
	4160, "Ace Rogers",
	3942, "Alexander Brooks",
	3878, "ASBackup",
	3672, "▪JustZoul▪",
	2502, "✰JustZoul✰",
	2462, "ΣerieЩolf",
	1912, "Ashlyn (leafers)",
	1653, "kitty (kittygirl nicole)",
	841, "mooman",
	0, "Could be you",
];

textFont("monospace");
textAlign(CENTER, CENTER);

for (let i = 0; i < width * height / 24000; i ++) {
	asteroids.push(round(random(0, width)));
	asteroids.push(round(random(-height, 0)));
}

function drawRocket() {
	pushMatrix();
	translate(rocketPosition, height - 140);
	rotate(-45);
	textSize(40);
	noStroke();
	text(rocketEmoji, 0, 0);
	popMatrix();

	if (mouse === true) {
		rocketPosition = pointerX;
	}

	rocketSpeed += 1 / 600;
}

function drawAsteroids() {
	for (let i = 0; i < asteroids.length; i += 2) {
		pushMatrix();
		translate(asteroids[i], asteroids[i + 1]);
		rotate(frameCount);
		fill(13, 13, 13);
		noStroke();
		rect(-20, -20, 40, 40);
		popMatrix();

		asteroids[i + 1] += rocketSpeed;
		if (asteroids[i + 1] > height + 40) {
			asteroids[i + 1] = -40;
			asteroids[i] = round(random(0, width));
		}

		if (dist(rocketPosition, height - 140, asteroids[i], asteroids[i + 1]) < 40) {
			isAlive = false;
		}
	}
}

function showScore() {
	score++;
	fill(255, 255, 255);
	textSize(20);
	textAlign(RIGHT, CENTER);
	noStroke();
	text("Score: " + score, width - 5, 15);
	textAlign(CENTER, CENTER);
}

function retry() {
	textSize(50);
	fill(255, 255, 255);
	noStroke();
	text("You lost", width / 2, 50);

	textSize(30);
	text("Your score was: " + score, width / 2, 100);

	let positionOnLeaderboard = -1;
	for (let i = 0; i < leaderboard.length; i += 2) {
		if (score > leaderboard[i]) {
			positionOnLeaderboard = i / 2;
			i = leaderboard.length;
		}
	}

	textSize(20);
	if (positionOnLeaderboard !== -1) {
		text("You are " + str(positionOnLeaderboard + 1) + ". \nSend me your score in Tips&Thanks\nto get on the leaderboard. ", width / 2, 160);
	}

	textSize(100);
	text(rocketEmoji, width / 2, 300);

	fill(255, 77, 0);
	stroke(255, 0, 0);
	strokeWeight(5);
	rect(50, 430, width - 100, 50);
	rect(50, 500, width - 100, 50);

	fill(0, 0, 0);
	textSize(30);
	noStroke();
	text("Retry", width / 2, 455);
	text("Menu", width / 2, 525);

	if (pointerX > 50 && pointerX < width - 50 && pointerY > 430 && pointerY < 480) {
		cursor(HAND);
		if (mouse === true) {
			score = 0;
			mouse = false;
			isAlive = true;
			rocketSpeed = 3;

			asteroids = [];
			for (let i = 0; i < width * height / 24000; i++) {
				asteroids.push(round(random(0, width)));
				asteroids.push(round(random(-height, 0)));
			}
		}
	}
	if (pointerX > 50 && pointerX < width - 50 && pointerY > 500 && pointerY < 550) {
		cursor(HAND);
		if (mouse === true) {
			score = 0;
			mouse = false;
			isAlive = true;
			rocketSpeed = 3;
			isPlaying = false;

			asteroids = [];
			for (let i = 0; i < 10; i++) {
				asteroids.push(round(random(0, width)));
				asteroids.push(round(random(-height, 0)));
			}
		}
	}
}

function howPage() {
	fill(255, 255, 255);
	noStroke();
	textSize(50);
	text("How", width / 2, 50);

	textSize(20);
	textAlign(LEFT, TOP);
	text("1. Click the 'Play' button\n2. Hold and drag mouse to move the rocket\n3. Dodge the asteroids\n4. Send me your score in Tips&Thanks to get on the leaderboard", 5, 100, (width - 10) / 12, (height - 105) / 20);
	textAlign(CENTER, CENTER);

	fill(255, 77, 0);
	stroke(255, 0, 0);
	strokeWeight(5);
	rect(10, 10, 100, 30);

	textSize(20);
	fill(0, 0, 0);
	noStroke();
	text("< Back", 60, 25);

	if (pointerX > 10 && pointerX < 110 && pointerY > 10 && pointerY < 40) {
		cursor(HAND);
		if (mouse === true) {
			how = false;
		}
	}
}

function leaderboardPage() {
	fill(255, 255, 255);
	noStroke();
	textSize(50);
	text("Leaderboard", width / 2, 50);

	textSize(20);
	textAlign(LEFT, TOP);
	for (let i = 0; i < leaderboard.length; i += 2) {
		if (i !== 18) {
			text(" " + str(i / 2 + 1) + ". " + leaderboard[i + 1], 10, 100 + i * 15);
		} else {
			text(str(i / 2 + 1) + ". " + leaderboard[i + 1], 10, 100 + i * 15);
		}

		textAlign(RIGHT, TOP);
		text(leaderboard[i], width - 10, 100 + i * 15);
		textAlign(LEFT, TOP);
	}
	textAlign(CENTER, CENTER);

	fill(255, 77, 0);
	stroke(255, 0, 0);
	strokeWeight(5);
	rect(10, 10, 100, 30);

	textSize(20);
	fill(0, 0, 0);
	noStroke();
	text("< Back", 60, 25);

	if (pointerX > 10 && pointerX < 110 && pointerY > 10 && pointerY < 40) {
		cursor(HAND);
		if (mouse === true) {
			leaderboardShow = false;
		}
	}
}

function drawFullscreenButton() {
	fill(255);
	textSize(13);
	noStroke(); 
	textAlign(CENTER, BOTTOM);
	text("Press and hold the fullscreen button to enter/exit fullscreen mode", width / 2, height - 10, (width - 120) / 8); 
	textAlign(CENTER, CENTER);
	
	stroke(255); 
	strokeWeight(3); 

	if (isFullscreen()) {
		/* Right bottom corner */
		line(width - 30, height - 30, width - 20, height - 30); 
		line(width - 30, height - 30, width - 30, height - 20); 
	
		/* Left bottom corner */
		line(width - 40, height - 30, width - 50, height - 30); 
		line(width - 40, height - 30, width - 40, height - 20); 
	
		/* Right top corner */
		line(width - 30, height - 40, width - 20, height - 40); 
		line(width - 30, height - 40, width - 30, height - 50); 
	
		/* Left top corner */
		line(width - 40, height - 40, width - 50, height - 40); 
		line(width - 40, height - 40, width - 40, height - 50); 
	}
	else {
		/* Right bottom corner */
		line(width - 20, height - 20, width - 30, height - 20); 
		line(width - 20, height - 20, width - 20, height - 30); 
	
		/* Left bottom corner */
		line(width - 50, height - 20, width - 40, height - 20); 
		line(width - 50, height - 20, width - 50, height - 30); 
	
		/* Right top corner */
		line(width - 20, height - 50, width - 30, height - 50); 
		line(width - 20, height - 50, width - 20, height - 40); 
	
		/* Left top corner */
		line(width - 50, height - 50, width - 40, height - 50); 
		line(width - 50, height - 50, width - 50, height - 40); 
	}

	if (pointerX >= width - 50 && pointerX <= width - 20 && pointerY >= height - 50 && pointerY <= height - 20) {
		cursor(HAND); 
		if (mouse) {
			mouse = false; 
			fullscreen(!isFullscreen()); 
		}
	}
}

draw = function() {
	let pointerKeys = Object.keys(pointers); 
	pointerKeys.forEach((pointerKey) => {
		if (pointers[pointerKey] !== undefined && pointers[pointerKey].event.detail === 0) { // If any pointer is detected
			pointerX = pointers[pointerKey].x;
			pointerY = pointers[pointerKey].y;
		}
	}); 

	cursor(ARROW);

	let backgroundSize = Math.max(width, height) + 10;
	let backgroundOffsetX = -(backgroundSize - width) / 2;
	let backgroundOffsetY = -(backgroundSize - height) / 2;
	image(backgroundImage, backgroundOffsetX, backgroundOffsetY, backgroundSize, backgroundSize);

	if (canvasTooSmall) {
		fill(255);
		noStroke();
		textSize(20);
		textAlign(CENTER, CENTER);
		text("Wrong screen orientation", width / 2, height / 2 - 50);
		text("This game only works in portrait mode", width / 2, height / 2 + 50, (width - 10) / 12, (height - 10) / 20);
		return;
	}

	if (isPlaying === true) {
		if (isAlive === true) {
			drawRocket();
			drawAsteroids();
			showScore();
		} else {
			retry();
		}
	} else {
		if (how === true) {
			howPage();
		} else if (leaderboardShow === true) {
			leaderboardPage();
		} else {
			fill(0, 0, 0);
			noStroke();
			textSize(40);
			text(rocketEmoji + "Rocket dash" + rocketEmoji, width / 2, 100);

			fill(255, 77, 0);
			stroke(255, 0, 0);
			strokeWeight(5);
			rect(50, 200, width - 100, 50);
			rect(50, 270, width - 100, 50);
			rect(50, 340, width - 100, 50);

			fill(0, 0, 0);
			noStroke();
			textSize(30);
			text("Play", width / 2, 225);
			text("How", width / 2, 295);
			text("Leaderboard", width / 2, 365);

			if (pointerX > 50 && pointerX < width - 50 && pointerY > 200 && pointerY < 250) {
				cursor(HAND);
				if (mouse === true) {
					isPlaying = true;
				}
			}

			if (pointerX > 50 && pointerX < width - 50 && pointerY > 270 && pointerY < 320) {
				cursor(HAND);
				if (mouse === true) {
					how = true;
				}
			}

			if (pointerX > 50 && pointerX < width - 50 && pointerY > 340 && pointerY < 390) {
				cursor(HAND);
				if (mouse === true) {
					leaderboardShow = true;
				}
			}

			textSize(100);
			text(rocketEmoji, width / 2, height - 120);

			drawFullscreenButton(); 
		}
	}
};

function mousePressed() {
	mouse = true;
}

function mouseReleased() {
	mouse = false;
}

function touchStarted() {
	mouse = true;
}

function touchEnded() {
	mouse = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (windowWidth < minCanvasWidth || windowHeight < minCanvasHeight) {
		canvasTooSmall = true;
	} else {
		canvasTooSmall = false;
	}
}