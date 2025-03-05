draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // simpleChaoticSpiral.update(drawCount);
    // simpleChaoticSpiral.display();
    // rosaceConchoid2.update(drawCount);
    // rosaceConchoid2.display();
    rosaceConchoid3.update(drawCount);
    rosaceConchoid3.display();
    // snake.update(drawCount);
    // snake.display();
    // pleiadesEye.update(drawCount);
    // pleiadesEye.display();
    viper.update();
    viper.display();
    // rosaceConchoid.update(drawCount);
    // rosaceConchoid.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};



let Snake = function() {
    // this.pos = [0, 0];
    // this.heading = 0;
    this.phase = 0;
    this.path = function(p) {
        return [
            Math.cos(p),
            Math.sin(p)
        ]
    };
    this.speed = 0.001;
    this.l = 250;
    this.w = 1;
    this.vertices = new Float32Array(this.l * this.w * 4);
    this.displayProgram = drawSnake2;
};
Snake.prototype.display = function() {
    this.displayProgram(this.vertices);
};

Snake.prototype.update = function(count, alpha = 1) {
    this.phase += this.speed;
    for (let i = 0; i < (this.l * this.w); i++) {
        let pos = this.path(this.phase + this.speed * i * 0.9);
            this.vertices[i * 4] = pos[0] * 0.05;
            this.vertices[i * 4 + 1] = pos[1] * 0.05;
            this.vertices[i * 4 + 2] = 0.125;
            this.vertices[i * 4 + 3] = 0.1;
    }
};

viper = new Snake();

viper.speed = 0.01;


viper.path = function(p) {
    return [
        Math.cos(p) + map(Math.cos(p*7),-1,1,0,1) * 0.1,
        Math.sin(p) + map(Math.sin(p*7),-1,1,0,1) * 0.1
    ]
};

viper.path = function(t) {
    return [
        Math.sin(t * 3) * Math.pow(Math.cos(t * 6),3),
        Math.sin(t * 2) * Math.pow(Math.sin(t * 3),3) * Math.pow(Math.cos(t * 10),3)
    ];
};

