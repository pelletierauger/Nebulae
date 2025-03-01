drawTexture = function(selectedProgram, selectedTexture, alpha = 1) {
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // gl.viewport(0, 0, cnvs.width, cnvs.height);
    gl.bindTexture(gl.TEXTURE_2D, selectedTexture);
    gl.useProgram(selectedProgram);
    // aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([
        -1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    let positionLocation = gl.getAttribLocation(selectedProgram, "a_position");
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    let textureLocation = gl.getUniformLocation(selectedProgram, "u_texture");
    gl.uniform1i(textureLocation, 0);
    let alphaLocation = gl.getUniformLocation(selectedProgram, "alpha");
    gl.uniform1f(alphaLocation, alpha);
    let timeLocation = gl.getUniformLocation(selectedProgram, "time");
    gl.uniform1f(timeLocation, drawCount);
    let resolutionLocation = gl.getUniformLocation(selectedProgram, "resolution");
    gl.uniform1f(resolutionLocation, resolutionScalar);
    let texcoordLocation = gl.getAttribLocation(selectedProgram, "a_texcoord");
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
};

blendTextures = function(
    selectedTexture1, selectedFrameBuf1, 
    selectedTexture2, selectedFrameBuf2) {
    currentProgram = blenderProgram.program;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // bindFrameBuffer(selectedTexture1, selectedFrameBuf1);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, selectedTexture1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, selectedTexture2);
// 
    gl.useProgram(currentProgram);
// 
    // currentProgram.aVertexPosition = gl.getAttribLocation(currentProgram, "a_position");
    // gl.enableVertexAttribArray(currentProgram.aVertexPosition);
    // gl.vertexAttribPointer(currentProgram.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);
// 
    let vertices = new Float32Array([
        -1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    let positionLocation = gl.getAttribLocation(currentProgram, "a_position");
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
// 
    textureLocation = gl.getUniformLocation(currentProgram, "u_texture");
    gl.uniform1i(textureLocation, 0);
    let textureLocation2 = gl.getUniformLocation(currentProgram, "u_texture2");
    gl.uniform1i(textureLocation2, 1);
    let resolutionLocation = gl.getUniformLocation(currentProgram, "resolution");
    gl.uniform1f(resolutionLocation, resolutionScalar);
    let timeLocation = gl.getUniformLocation(currentProgram, "time");
    gl.uniform1f(timeLocation, drawCount * 0.01);
// 
    let texcoordLocation = gl.getAttribLocation(currentProgram, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
// 
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
};