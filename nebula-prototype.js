let Nebula = function(size, components) {
    this.size = size;
    this.components = components;
    this.vertices = new Float32Array(size * components);
    this.displayProgram = drawPointillism;
};

Nebula.prototype.display = function(sum) {
    this.displayProgram(this.vertices);
};

Nebula.prototype.xFade = function(count, otherNebula, otherCount, mix) {
    // Draw this nebula on one texture.
    bindFrameBuffer(texture, framebuf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.update(count);
    this.display();
    // Draw the other nebula on a second texture.
    bindFrameBuffer(texture2, framebuf2);
    gl.clear(gl.COLOR_BUFFER_BIT);
    otherNebula.update(otherCount);
    otherNebula.display();
    // Draw both textures with 0 to 1 transparency on the second one.
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    drawTexture(textureShader.program, texture);
    drawTexture(textureShader.program, texture2, mix);
};

Nebula.prototype.mix = function(count, otherNebula, otherCount, mix) {
    this.update(count, 1 - mix);
    otherNebula.update(otherCount, mix);
    for (let i = 0; i < this.size; i++) {
        for (let j = 0 ; j < this.components; j++) {
            let k = i * this.components + j;
            this.vertices[k] = lerp(this.vertices[k], otherNebula.vertices[k], mix);
        }
    }
    this.display();
};

// Nebula.prototype.update = function(sum) {
//     globalGraph = [];
//     this.graph = [];
//     var sumFix = (sum) ? sum : 0;
//     for (var i = 0; i < this.i; i++) {
//         this.x = this.eq(i, sumFix).x;
//         this.y = this.eq(i, sumFix).y;
//         var v = createVector(this.x, this.y);
//         this.graph.push(v);
//     }
//     globalGraph = this.graph.slice();
// };

// Nebula.prototype.mix = function(sum, oO, sumO, mR) {
//     globalGraph = [];
//     this.graph = [];
//     for (var i = 0; i < this.i; i++) {
//         this.x = lerp(this.eq(i, sum).x, oO.eq(i, sumO).x, mR);
//         this.y = lerp(this.eq(i, sum).y, oO.eq(i, sumO).y, mR);
//         var v = createVector(this.x, this.y);
//         this.graph.push(v);
//     }
//     globalGraph = this.graph.slice();
// };