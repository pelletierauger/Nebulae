let vertex_buffer, indices2_buffer, Index_Buffer, color_buffer, width_buffer, uv_buffer, dots_buffer;
let vertex_bufferA, vertex_bufferB;

let indices = [], indices2 = [], verticesA = [], verticesB = [];
let colors = [], widths = [], uvs = [], lineAmount = 0;

let vertices = [];

let dotPositions = [];

let fvertices = [];
for (let i = 0; i < 1000000; i++) {
    fvertices.push(i);
}
fvertices = new Float32Array(fvertices);

reset3DLines = function() {
    indices = [];
    indices2 = [];
    verticesA = [];
    verticesB = [];
    colors = [];
    widths = [];
    uvs = [];
    lineAmount = 0;
};

add3DLine = function(x0, y0, z0, x1, y1, z1, w, r, g, b, a) {
    let ii = [0, 1, 2, 0, 2, 3];
    let iii = [0, 1, 2, 3];
    for (let k = 0; k < ii.length; k++) {
        indices.push(ii[k] + (lineAmount*4));
    }        
    for (let k = 0; k < iii.length; k++) {
        indices2.push(iii[k]);
    }
    let vv = [
        x0, y0, z0,
        x0, y0, z0,
        x0, y0, z0,
        x0, y0, z0
    ];
    for (let k = 0; k < vv.length; k++) {
        verticesA.push(vv[k]);
    }
    let vvv = [
        x1, y1, z1,
        x1, y1, z1,
        x1, y1, z1,
        x1, y1, z1
    ];
    for (let k = 0; k < vvv.length; k++) {
        verticesB.push(vvv[k]);
    }
    let cc = [
        r, g, b, a, 
        r, g, b, a, 
        r, g, b, a, 
        r, g, b, a
    ];
    for (let k = 0; k < cc.length; k++) {
        colors.push(cc[k]);
    }
    widths.push(w, w, w, w);
    let uv = [
        0, 0, 
        1, 0, 
        1, 1, 
        0, 1
    ];
    for (let k = 0; k < uv.length; k++) {
        uvs.push(uv[k]);
    }
    lineAmount++;
};

draw3DLines = function() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_bufferA);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesA), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_bufferB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesB), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, indices2_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(indices2), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, width_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(widths), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW); 
    // setShaders();
    /* ======== Associating shaders to buffer objects =======*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_bufferA);
    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    // Get the attribute location
    var coordA = gl.getAttribLocation(currentProgram, "coordinatesA");
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coordA, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coordA);
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_bufferB);
    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    // Get the attribute location
    var coordB = gl.getAttribLocation(currentProgram, "coordinatesB");
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coordB, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coordB);
    // bind the indices2 buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, indices2_buffer);
    // get the attribute location
    var indices2AttribLocation = gl.getAttribLocation(currentProgram, "index");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(indices2AttribLocation, 1, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(indices2AttribLocation);
    // bind the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    // get the attribute location
    var color = gl.getAttribLocation(currentProgram, "color");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(color);
    // bind the width buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, width_buffer);
    // get the attribute location
    var widthAttribLocation = gl.getAttribLocation(currentProgram, "width");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(widthAttribLocation, 1, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(widthAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    var uvAttribLocation = gl.getAttribLocation(currentProgram, "uv");
    // point attribute to the volor buffer object
    gl.vertexAttribPointer(uvAttribLocation, 2, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(uvAttribLocation);
    resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);    
    timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
};

draw3DDots = function(selectedProgram) {
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dotPositions), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    let resolutionUniformLocation = gl.getUniformLocation(selectedProgram, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
    gl.drawArrays(gl.POINTS, 0, dotPositions.length/3);
};

drawPointillism = function(selectedProgram) {
    // console.log(selectedProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dotPositions), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    gl.drawArrays(gl.POINTS, 0, dotPositions.length/3);
};

drawPointillism = function(v) {
    let currentProgram = pointillism.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

drawPointillismBig = function(v) {
    let currentProgram = pointillismBig.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

drawSnake = function(v) {
    let currentProgram = snakeScale.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 4);
};

drawSnake2 = function(v) {
    let currentProgram = snakeScale2.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 4);
};

drawSnakeEye = function(v) {
    let currentProgram = snakeEye.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 4);
};

drawCloudy = function(v) {
    let currentProgram = cloudyPoints.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

drawCloudy2 = function(v) {
    let currentProgram = cloudyPoints2.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

drawCloudySmall = function(v) {
    let currentProgram = cloudyPointsSmall.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

drawDiagram = function(v) {
    let currentProgram = diagramDots.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, v.length / 3);
};

if (false) {

drawPointillismBig = function(v) {
    let currentProgram = pointillismBig.program;
    gl.useProgram(currentProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dots_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    let timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeUniformLocation, drawCount);
    gl.drawArrays(gl.POINTS, 0, 1);
};

}

function randomPointInSphere() {
    var d, x, y, z;
    do {
        x = Math.random() * 2.0 - 1.0;
        y = Math.random() * 2.0 - 1.0;
        z = Math.random() * 2.0 - 1.0;
        d = x * x + y * y + z * z;
    } while(d > 1.0);
    return [x, y, z];
}

function randomPointOnSphere(x0 = 0, y0 = 0, z0 = 0, radius = 1) {
   var y = Math.random() * 2 - 1;  // random y from -1 to 1
   var r = Math.sqrt(1 - y*y);     // radius on xz plane at y
   var long = Math.random() * 2 * Math.PI;  // random longitude
   return [x0 + radius * r * Math.sin(long),
           y0 + radius * y,
           z0 + radius * r * Math.cos(long)];
};

drawVertexID = function(selectedProgram, amountOfDots) {
    gl.useProgram(selectedProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, fvertices, gl.STATIC_DRAW);
    var coord = gl.getAttribLocation(selectedProgram, "vertexID");
    gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    var time = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(time, drawCount);
    gl.drawArrays(gl.POINTS, 0, amountOfDots);
};