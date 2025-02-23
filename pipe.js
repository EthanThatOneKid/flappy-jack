class Pipe {

	constructor(x_, y_, w_) {
		this.gap = height * 0.6;
		this.rect1 = {
			"x": x_,
			"y": y_,
			"w": w_,
			"h": height - y_
		};
		this.rect2 = {
			"x": x_,
			"y": 0,
			"w": w_,
			"h": y_ - this.gap
		};
		
		this.spd = -1;
	}

	update() {
		this.rect1.x += this.spd;
		this.rect2.x += this.spd;
	}
	
	render() {
		fill(0);
		rect(this.rect1.x, this.rect1.y, this.rect1.w, this.rect1.h);
		rect(this.rect2.x, this.rect2.y, this.rect2.w, this.rect2.h);
	}

		
}