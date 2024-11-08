let cloudyPoints = new ShaderProgram("cloudy-points");

cloudyPoints.vertText = `
    // beginGLSL
    ${pi}
    ${matrixTransforms}
    attribute vec3 coordinates;
    uniform float time;
    varying float alpha;
    void main(void) {
        alpha = coordinates.z;
        vec4 pos = vec4(coordinates.xyz, 1.0);
        // pos.x *= 16./9.;
        pos = translate(0., 0., 2.) * yRotate(time*5e-4) * xRotate(time*5e-4) * pos;
        // pos =  * pos;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 256.0;
        // gl_PointSize = 15.0;
    }
    // endGLSL
`;
cloudyPoints.fragText = `
    // beginGLSL
    precision mediump float;
    varying float alpha;
    ${mapFunction}
    ${rand}
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float rando = rand(pos);
        float x = 1.0-length(pos*2.);
        x = 1.0-dot(pos*2., pos*2.);
        x = max(0., x) * max(0., x);
        // x += floor(x+1.)-floor(x+0.99);
        // gl_FragColor = vec4(vec3(1., 0., x).brr, x*0.125);
        gl_FragColor = vec4(vec3(1., 0., x*0.5), x*0.125);
    }
    // endGLSL
`;
cloudyPoints.init();

let cloudyPoints2 = new ShaderProgram("cloudy-points-2");

cloudyPoints2.vertText = `
    // beginGLSL
    ${pi}
    ${matrixTransforms}
    attribute vec3 coordinates;
    uniform float time;
    varying float alpha;
    void main(void) {
        alpha = coordinates.z;
        vec4 pos = vec4(coordinates.xyz, 1.0);
        // pos.x *= 16./9.;
        pos = translate(0., 0., 2.) * yRotate(time*5e-4) * xRotate(time*5e-4) * pos;
        // pos =  * pos;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 256.0;
        // gl_PointSize = 15.0;
    }
    // endGLSL
`;
cloudyPoints2.fragText = `
    // beginGLSL
    precision mediump float;
    varying float alpha;
    ${mapFunction}
    ${rand}
    ${blendingMath}
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float rando = rand(pos);
        float x = 1.0-length(pos*2.);
        x = 1.0-dot(pos*2., pos*2.);
        x = max(0., x) * max(0., x);
        // x += floor(x+1.)-floor(x+0.99);
        // gl_FragColor = vec4(vec3(1., 0., x).gbr, x*0.125);
        gl_FragColor = vec4(hueShift(vec3(1., x*0.5, x*0.5), 3.9), x*0.125*0.75);
    }
    // endGLSL
`;
cloudyPoints2.init();

let cloudyPointsSmall = new ShaderProgram("cloudy-points-mall");

cloudyPointsSmall.vertText = `
    // beginGLSL
    ${pi}
    ${matrixTransforms}
    attribute vec3 coordinates;
    uniform float time;
    varying float alpha;
    void main(void) {
        vec4 pos = vec4(coordinates.xyz, 1.0);
        // pos.x *= 16./9.;
        pos = translate(0., 0., 2.) * yRotate(time*0.25e-2) * xRotate(time*0.25e-2) * pos;
        alpha = 2.0-pos.z * 0.8;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 125.0 * alpha;
        // gl_PointSize = 15.0;
    }
    // endGLSL
`;
cloudyPointsSmall.fragText = `
    // beginGLSL
    precision mediump float;
    varying float alpha;
    ${mapFunction}
    ${rand}
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float rando = rand(pos);
        float x = length(pos);
        float smoothDist = pow(x - 1.01, 60.);
        smoothDist = max(smoothDist, pow(x, 0.015) * -1. + 1.01);
        float xx = (x > 0.25) ? 0.: 1.;
        smoothDist = max(smoothDist, pow(x * 4. -1., 4.) * 0.5 * xx);
        smoothDist = max(smoothDist, pow((x - 0.01), 0.07) * -1. + 0.94);
        smoothDist = max(smoothDist, x * -0.1 + 0.065);
        smoothDist = max(smoothDist, (x - 0.165) * -1.5);
        smoothDist = max(smoothDist, (x * -10.) + 0.63);
        smoothDist = max(smoothDist, (x * -0.9) + 0.19);
        float dist = smoothDist;
        if (alpha > 0.9) {
            dist = 1. / x * 0.01;
        }
        dist *= min(1., (x * 4. - 2.) * -1.);
        dist -= rando * 0.01;
        gl_FragColor = vec4(vec3(1., 0., dist), dist * alpha * alpha);
    }
    // endGLSL
`;
cloudyPointsSmall.init();

if (true) {

cloudyPointsSmall.vertText = `
    // beginGLSL
    ${pi}
    ${mapFunction}
    ${matrixTransforms}
    attribute vec3 coordinates;
    uniform float time;
    varying float alpha;
    varying float flip;
    varying float size;
    float usin(float t) {
        return sin(t)*0.5+0.5;
    }    
    float ucos(float t) {
        return cos(t)*0.5+0.5;
    }
    void main(void) {
        vec4 pos = vec4(coordinates.xyz, 1.0);
        // pos.x *= 16./9.;
        flip = (cos(pos.x * 1423.543)+0.85) > sin(pos.z * 112400.1412) ? 0.0 : 1.0;
        vec3 pos2 = pos.xyz;
        pos = translate(0., 0., 2.) * yRotate(time*5e-4) * xRotate(time*5e-4) * pos;
        alpha = 2.0-pos.z * 0.8;
        pos.x *= 9./16.;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 75.0 * alpha * alpha * 0.5;
        if (gl_PointSize < 60.) {
            alpha *= map(gl_PointSize, 60., 0., 1., 0.35);
        }
        gl_PointSize = max(60., gl_PointSize);
        size = gl_PointSize;
        // gl_PointSize *= 3.0-length(pos2);
        float t = time*0.05;
        // gl_PointSize += sin(pos.x*10.+t) * cos(pos.y*10.+t) * cos(pos.z*10.+t)*120.;
        // gl_PointSize = 15.0;
    }
    // endGLSL
`;
cloudyPointsSmall.fragText = `
    // beginGLSL
    precision mediump float;
    varying float alpha;
    varying float flip;
    varying float size;
    ${mapFunction}
    ${rand}
    ${blendingMath}
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        // pos *= 2.0;
        float rando = rand(pos);
        float x = length(pos);
        float smoothDist = pow(x - 1.01, 60.);
        smoothDist = max(smoothDist, pow(x, 0.015) * -1. + 1.01);
        float xx = (x > 0.25) ? 0.: 1.;
        smoothDist = max(smoothDist, pow(x * 4. -1., 4.) * 0.5 * xx);
        smoothDist = max(smoothDist, pow((x - 0.01), 0.07) * -1. + 0.94);
        smoothDist = max(smoothDist, x * -0.1 + 0.065);
        smoothDist = max(smoothDist, (x - 0.165) * -1.5);
        smoothDist = max(smoothDist, (x * -10.) + 0.63);
        smoothDist = max(smoothDist, (x * -0.9) + 0.19);
        float dist = smoothDist;
        if (alpha > 0.9) {
            dist = 1. / x * 0.01;
        }
        dist *= min(1., (x * 4. - 2.) * -1.);
        if (size < 50.) {
            // dist = 1.0 - length(pos*20.);
        }
        // dist -= rando * 0.01;
        dist = max(0.0, dist - rando * 0.01);
        gl_FragColor = vec4(vec3(1., 0., dist), dist * alpha * alpha * 0.75);
        if (flip == 1.) {
            // gl_FragColor.rgb = gl_FragColor.gbr;
            gl_FragColor.rgb = hueShift(gl_FragColor.rgb, -3.);
            gl_FragColor.a *= alpha;
        }
    }
    // endGLSL
`;
cloudyPointsSmall.init();

}

let galaxy = new Nebula(15, 3);

galaxy.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        this.vertices[i * 3] = (Math.random()*2-1)*1.5;
        this.vertices[i * 3 + 1] = (Math.random()*2-1)*1.5;
        this.vertices[i * 3 + 2] = (Math.random()*2-1)*1.5;
    }
};

galaxy.displayProgram = drawCloudy;
galaxy.setSize(100); galaxy.update(1);

let galaxy3 = new Nebula(15, 3);

galaxy3.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        this.vertices[i * 3] = (Math.random()*2-1)*1.5;
        this.vertices[i * 3 + 1] = (Math.random()*2-1)*1.5;
        this.vertices[i * 3 + 2] = (Math.random()*2-1)*1.5;
    }
};

galaxy3.displayProgram = drawCloudy2;
galaxy3.setSize(45); galaxy3.update(1);


let galaxy2 = new Nebula(150, 3);

galaxy2.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        this.vertices[i * 3] = (Math.random()*2-1)*1.75;
        this.vertices[i * 3 + 1] = (Math.random()*2-1)*1.75;
        this.vertices[i * 3 + 2] = (Math.random()*2-1)*1.75;
    }
};

galaxy2.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        let s = randomPointInSphere();
        this.vertices[i * 3] = s[0]*2.5;
        this.vertices[i * 3 + 1] = s[1]*2.5;
        this.vertices[i * 3 + 2] = s[2]*2.5;
    }
};
galaxy2.setSize(14500); galaxy2.update(1);

galaxy2.displayProgram = drawCloudySmall;

let galaxy4 = new Nebula(150, 3);

galaxy4.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        // let s = randomPointOnSphere();
        this.vertices[i * 3] = Math.cos(i * 4e-2) * i * 1e-3;
        this.vertices[i * 3 + 1] = Math.cos(this.vertices[i * 3]*10)*0.1;
        this.vertices[i * 3 + 2] = Math.sin(i * 4e-2) * i * 1e-3;
    }
};

galaxy4.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < this.size; i += 1) {
        let s = randomPointOnSphere();
        this.vertices[i * 3] = s[0];
        this.vertices[i * 3 + 1] = s[1];
        this.vertices[i * 3 + 2] = s[2];
    }
};
galaxy4.setSize(3000); galaxy4.update(1);

galaxy4.displayProgram = drawCloudySmall;
galaxy4.setSize(3000); galaxy4.update(1);



starsWithRays = function() {
    reset3DLines();
    let amountOfStars = 40;
    for (let i = 0; i < amountOfStars; i++) {
        let star = Math.floor(Math.random()*galaxy2.vertices.length/3);
        let xyz = galaxy2.vertices.subarray(0 + (3 * star), 3 + (3 * star));
        let angleDivider = Math.floor(Math.random()*6)+3;
        let angleOffset = Math.random()*Math.PI*2;
        for (let j = 0; j < angleDivider; j++) {
            let angle = Math.PI / angleDivider * j;
            let length = (j == 0) ? 0.4 : 0.001;
            length = Math.random() * 0.4;
            // length = (j == 0) ? 2.4 : length;
            let alpha = (j == 0) ? 1 : 0.5;
            alpha = Math.random();
            add3DLine(
                xyz[0], xyz[1], xyz[2], 
                angle, length, 0.0, 
                1/2,
                1, 0, 0, alpha
            );
        }
    }
};
starsWithRays();