let looping = false;
let grimoire = false;
let tabsLoaded = false;
let gr;
let mode = 0;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "/Volumes/Volumina/frames/neon-summer/nebulae-03/nebulae-03";
let maxFrames = 20;
let gl, currentProgram;
let drawCount = 0;
let field = [];
let makeField;
let reached, unreached;
let amplitude = 0;
let amplitude2 = 0;
let dotsVBuf;
let termVBuf, dotsCBuf;
const openSimplex = openSimplexNoise(10);
let fmouse = [0, 0];
let pmouse = [0, 0];
let smouse = [0, 0];
let resolutionScalar = 0.5;
let resolutionBG;
let texture, texture2, framebuf, framebuf2;
let noPainting = true;
// let batchExport = false;
// ------------------------------------------------------------
// Grimoire Animate
// ------------------------------------------------------------

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;
var animationStart;
var framesRendered = 0;
var framesOfASecond = 0;
var secondStart, secondFrames;
var fps = 24;
var envirLooping = false;

startAnimating = function() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animationStart = Date.now();
    secondStart = Date.now();
    startTime = then;
    framesRendered = 0;
    envirLooping = true;
    animate();
}

function queryFrameRate() {
    let timeElapsed = Date.now() - animationStart;
    let seconds = timeElapsed / 1000;
    logJavaScriptConsole(framesRendered / seconds);
    // logJavaScriptConsole(timeElapsed);
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

    // request another frame
    if (envirLooping) {

        requestAnimationFrame(animate);


        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here
            draw();
            framesRendered++;
            framesOfASecond++;
            if (framesOfASecond == fps) {
                secondFrames = fps / ((Date.now() - secondStart) * 0.001);
                // logJavaScriptConsole(secondFrames);
                framesOfASecond = 0;
                secondStart = Date.now();
            }
        }
    }
}

function setup() {
    socket = io.connect('http://localhost:8080');
    socket.on('receiveOSC', receiveOSC);
    pixelDensity(1);
    // cnvs = createCanvas(windowWidth, windowWidth / 16 * 9, WEBGL);

    // cnvs = createCanvas(windowWidth, windowHeight, WEBGL);
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvas.getContext('webgl');

    noCanvas();
    cnvs = document.getElementById('my_Canvas');
    // gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl = cnvs.getContext('webgl', {antialias: false, depth: false});
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });
    dotsVBuf = gl.createBuffer();
    dotsCBuf = gl.createBuffer();
    termVBuf = gl.createBuffer();

    vertex_buffer = gl.createBuffer();
    indices2_buffer = gl.createBuffer();
    Index_Buffer = gl.createBuffer();
    color_buffer = gl.createBuffer();
    width_buffer = gl.createBuffer();
    uv_buffer = gl.createBuffer();
    dots_buffer = gl.createBuffer();
    vertex_bufferA = gl.createBuffer();
    vertex_bufferB = gl.createBuffer();
    vbuffer = gl.createBuffer();

    shadersReadyToInitiate = true;
    initializeShaders();

    texture = createTexture();
    framebuf = createFrameBuffer(texture);
    texture2 = createTexture();
    framebuf2 = createFrameBuffer(texture2);
    

    currentProgram = getProgram("smooth-line");
    gl.useProgram(currentProgram);

    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
          // gl.enable(gl.DEPTH_TEST);
                  // gl.depthFunc(gl.LEQUAL);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);

    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);


    frameRate(30);
    background(0);
    fill(255, 50);
    noStroke();
    if (!looping) {
        noLoop();
    }
    setTimeout( function() {
        keysControl.addEventListener("mouseenter", function(event) {
            document.body.style.cursor = "none";
            document.body.style.backgroundColor = "#000000";
            appControl.setAttribute("style", "display:none;");
            let tabs = document.querySelector("#file-tabs");
            tabs.setAttribute("style", "display:none;");
            cinemaMode = true;
            scdArea.style.display = "none";
            scdConsoleArea.style.display = "none";
            jsArea.style.display = "none";
            jsConsoleArea.style.display = "none";
        }, false);
        keysControl.addEventListener("mouseleave", function(event) {
            if (!grimoire) {
                document.body.style.cursor = "default";
                document.body.style.backgroundColor = "#1C1C1C";
                appControl.setAttribute("style", "display:block;");
                let tabs = document.querySelector("#file-tabs");
                tabs.setAttribute("style", "display:block;");
                // let slider = document.querySelector("#timeline-slider");
                // slider.setAttribute("style", "display:block;");
                // slider.style.display = "block";
                // canvasDOM.style.bottom = null;
                if (displayMode === "both") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                } else if (displayMode == "scd") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                } else if (displayMode == "js") {
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                }
                cinemaMode = false;
                clearSelection();
            }   
        }, false);
    }, 1);
    if (batchExport) {
        exportCount = batchMin;
        exporting = true;
        // redraw();
        // songPlay = false;
        noLoop();
        looping = false;
    }
    socket.on('getNextImage', function(data) {
        if (exportCount <= batchMax) {
            // redraw();
            window.setTimeout(function() {
                redraw();
            }, 3);
        }
    });
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    bindFrameBuffer(texture, framebuf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // rosaceConchoid.update(drawCount);
    // rosaceConchoid.display();
    // rosaceConchoid2.update(drawCount);
    // rosaceConchoid2.display();
    // rosaceConchoid3.update(drawCount);
    // rosaceConchoid3.display();
    implosion6.update(drawCount);
    implosion6.display();
        // galaxy.display();
    // galaxy3.display();
    // currentProgram = getProgram("smooth-ray-3D");
    // gl.useProgram(currentProgram);
    // draw3DLines();
    // galaxy2.display();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    bindFrameBuffer(texture2, framebuf2);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTerminal(roundedSquare.program);
    blendTextures(texture, framebuf, texture2, framebuf2);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    bindFrameBuffer(texture, framebuf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // divineSpiral.update(drawCount);
    // divineSpiral.display();
    simpleChaoticSpiral.update(drawCount);
    simpleChaoticSpiral.display();
    // divineSpiral.xFade(drawCount, simpleChaoticSpiral, drawCount, Math.sin(drawCount*1e-2)*0.5+0.5);
    // drawVertexID(mysticalPond.program, 90000);
    // drawVertexID(witchyTerrain.program, 442368);
    // drawVertexID(witchyTerrain.program, 200000);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    drawTexture(textureShader.program, texture);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    bindFrameBuffer(texture, framebuf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // currentProgram = getProgram("smooth-dots-3D");
    // currentProgram = pointillism.program;
    // gl.useProgram(currentProgram);
    // drawAlligatorQuiet(currentProgram);
    // draw3DDots(currentProgram);
    // drawPointillism(currentProgram);
    divineSpiral.update(drawCount);
    divineSpiral.display();
    
    bindFrameBuffer(texture2, framebuf);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    simpleChaoticSpiral.update(drawCount);
    simpleChaoticSpiral.display();
    // divineSpiral.xFade(drawCount, simpleChaoticSpiral, drawCount, Math.sin(drawCount*1e-2)*0.5+0.5);
    // drawVertexID(mysticalPond.program, 90000);
    // drawVertexID(witchyTerrain.program, 442368);
    // drawVertexID(witchyTerrain.program, 200000);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    drawTexture(textureShader.program, texture);
    drawTexture(textureShader.program, texture2, Math.sin(drawCount*1e-2)*0.5+0.5);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    divineSpiral.xFade(drawCount, simpleChaoticSpiral, drawCount, Math.sin(drawCount*1e-2)*0.5+0.5);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    tancave2.xFade(drawCount, simpleChaoticSpiral, drawCount, Math.sin(drawCount*1e-2)*0.5+0.5);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    simpleChaoticSpiral.update(drawCount);
    simpleChaoticSpiral.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // spiraleEnvoutante.update(drawCount);
    // spiraleEnvoutante.display();
    implosion7.update(drawCount);
    implosion7.display();
    aaaHaaa.update(drawCount);
    aaaHaaa.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    runXSheet(xs);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    tancave2.update(drawCount);
    tancave2.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    pleiades.update(drawCount);
    pleiades.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // simpleChaoticSpiral.update(drawCount);
    // simpleChaoticSpiral.display();
    // rosaceConchoid2.update(drawCount);
    // rosaceConchoid2.display();
    rosaceConchoid3.update(drawCount);
    rosaceConchoid3.display();
    snake.update(drawCount);
    snake.display();
    pleiadesEye.update(drawCount);
    pleiadesEye.display();
    rosaceConchoid.update(drawCount);
    rosaceConchoid.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    galaxy.display();
    galaxy3.display();
    currentProgram = getProgram("smooth-ray-3D");
    gl.useProgram(currentProgram);
    draw3DLines();
    galaxy2.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    rosaceConchoid.update(drawCount);
    rosaceConchoid.display();
    rosaceConchoid2.update(drawCount);
    rosaceConchoid2.display();
    rosaceConchoid3.update(drawCount);
    rosaceConchoid3.display();
    // rosaceConchoid4.update(drawCount);
    // rosaceConchoid4.display();
    // rosaceConchoid.xFade(drawCount, tancave2, drawCount, 0.2);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

seqCount = 0, seqCountInc = 0.25;
draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    diagram001.update(drawCount);
    diagram001.display();
    // diagram001.xFade(drawCount, simpleChaoticSpiral, drawCount, 0.2);
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
    seqCount += seqCountInc;
};

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    implosion6.update(drawCount);
    implosion6.display();
    drawTerminal(roundedSquare.program);
    if (exporting && exportCount < batchMax) {
        frameExport();
    }
    drawCount++;
};

receiveOSC = function(data) {
    // console.log(data.args[0].value);
    if (data.address == "/amplitude") {
        amplitude = data.args[0].value;
    }
}

if (false) {

socket.off('receiveOSC');
socket.on('receiveOSC', receiveOSC);


receiveOSC = function(s) {
    // logJavaScriptConsole(s);
    // console.log(s);
    if (s.address == "/eval") {
        eval(s.args[0].value);
    }
};

}


tl = function(d = 0) {
    setTimeout(function() {
                if (envirLooping) {
                envirLooping = false;
            } else {
                envirLooping = true;
                startAnimating();
            }
    }, d * 1e3);
};

gr = function() {
    grimoire = !grimoire;
}

printTexture = function() {
       gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    // 
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 
    gl.clearColor(0, 0, 0, 1); // clear to white
    // 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 
    var textureShader = getProgram("textu");
    gl.useProgram(textureShader);
    // 
    aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    itemSize = 2;
    numItems = vertices.length / itemSize;
    let positionAttribLocation = gl.getAttribLocation(textureShader, "a_position");
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, itemSize, gl.FLOAT, false, 0, 0);
    // 
    var textureLocation = gl.getUniformLocation(textureShader, "u_texture");
    gl.uniform1i(textureLocation, 0);
    var timeLocation = gl.getUniformLocation(textureShader, "time");
    gl.uniform1f(timeLocation, drawCount * 0.01);
    // 
    var scalar = gl.getUniformLocation(textureShader, "resolution");
    gl.uniform1f(scalar, resolutionScalar);
    // 
    var texcoordLocation = gl.getAttribLocation(textureShader, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLocation);
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    gl.drawArrays(gl.TRIANGLES, 0, numItems);
};

setTabs = function() {
};


keyDown = function(e) {
    if (keysActive) {
        if (ge.recording) {
            ge.recordingSession.push([drawCount, {
                name: "keyDown",
                key: e.key,
                keyCode: e.keyCode,
                altKey: e.altKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey
            }]);
        }
        // console.log(event.keyCode);
        // if (e.keyCode == 27 && ge.activeTab !== null) {
        //     mode = (mode + 1) % 3;
        // }
        if (e.keyCode == 27 && ge.activeTab !== null) {
            if (noPainting) {
                mode = (mode + 1) % 2;
            } else {
                mode = (mode + 1) % 3;
            }
        }
        if (mode == 0) {
                if (vtActive) {
                    vt.update(e);
                    // ljs(event.keyCode);
                }
            updateDrawing(e);
        } else if (mode == 1) {
            ge.update(e);
        } else if (mode == 2) {
            paintingKeys(e);
        }
    }
}

document.onkeydown = keyDown;