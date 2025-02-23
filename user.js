class User {

	constructor(x_, y_, w_, h_, img_) {
		this.pos = {
			"x": x_,
			"y": y_,
			"a": 0
		};
		this.ded = false;
		this.w = w_;
		this.h = h_;    
		this.gravity = {
			"g": 0,
			"spd": 0.05
		};
		this.img = {
			"current": (img_) ? img_ : null,
			"original": (img_) ? img_ : null
		};
	}

	update() {
		this.pos.y += this.gravity.g;
		this.gravity.g += this.gravity.spd;
		this.pos.a = map(this.gravity.g, -6, 6, -PI/2, PI/2);
	}

	jump() {
		if (keyIsPressed && keyCode == 32) {
			this.gravity.g = -2.5;
		}
	}

	edges() {
		if (this.pos.y > height || this.pos.y < 0) {
			this.ded = true;
		}
	}

	render() {
		if (this.img.current) {
			push();
			translate(this.pos.x, this.pos.y);
			rotate(this.pos.a);
			image(
				this.img.current, 
				0, 0, 
				this.h, this.w
			);
			pop();
		} else {
			push();
			translate(this.pos.x, this.pos.y);
			rotate(this.pos.a);
			fill(255);
			image(
				userImg,
				0, 0,
				this.w, this.h
			);
/*
			rect(
				0, 0, 
				this.h, this.w
			);
*/
			pop();
		}
		if (user.ded) {background(255,0,0, 50);}
	}
		
}