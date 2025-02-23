var user;
const pipes = [];
const imgs = [];
var userImg;
var pnts, name;
var score;
var instanceOfDeath = true;

function preload() {
	userImg = loadImage('jack.png');
}
function setup() {
	var cnv = createCanvas(400, 400);
	cnv.parent('canvas-container');
	user = new User(width * 0.5, height * 0.5, 30, 30);
	pnts = 0;
}

function uploadScore(name, score) {
	/* Uploading to Database */
	writeScoreData(name, score);
}

function rnd(first, second) {
	let d = second - first;
	let r = Math.random() * d;
	return r + first;
}

function killScreen() {
	if (instanceOfDeath) {
		name = prompt("Please enter your name");
		uploadScore(name, pnts);
		instanceOfDeath = false;
	} else {
		background(255);
		textAlign(CENTER);
		textSize(40);
		text(pnts, width * 0.5, height * 0.5);
	}
}	

function points() {
	pnts += 1;
	fill(255);
	rect(width * 0.9, height * 0.95, width * 0.1, height * 0.05);
	fill(0); textAlign(CENTER);
	text(pnts, width * 0.95, height * 0.98);
}

function draw() {	
	background(255);
	if (frameCount % 200 === 0) {
		//console.log('new pipe');
		pipes.push(new Pipe(width, rnd(height * 0.5, height * 0.75), width * 0.1));
	}
	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].update();
		pipes[i].render();
		let colliding = collideRectRect(user.pos.x, user.pos.y, user.w, user.h, pipes[i].rect1.x, pipes[i].rect1.y, pipes[i].rect1.w, pipes[i].rect1.h) || collideRectRect(user.pos.x, user.pos.y, user.w, user.h, pipes[i].rect2.x, pipes[i].rect2.y, pipes[i].rect2.w, pipes[i].rect2.h);
		if (colliding) {
			user.ded = true;
		}
		if (pipes[i].rect1.x + pipes[i].rect1.w < 0) {
			//console.log('spliced pipe');
			pipes.splice(i, 1);
		}
	}
	user.update();
	user.render();
	user.jump();
	user.edges();

	if (!user.ded) {
		points();
	} else {
		killScreen();
	}
}
	