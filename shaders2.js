let smoothLine3D = new ShaderProgram("smooth-line-3D");

// The correct 3d version that preserves the glow while rotating
smoothLine3D.vertText = `
    // beginGLSL
    #define pi 3.1415926535897932384626433832795
    attribute float index;
    attribute vec3 coordinatesA;
    attribute vec3 coordinatesB;
    attribute vec4 color;
    attribute float width;
    attribute vec2 uv;
    uniform vec2 resolution;
    uniform float time;
    varying vec4 c;
    varying vec2 uvs;
    varying vec2 wh;
    varying float t;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    vec2 rotateUV(vec2 uv, float rotation, float mid) {
        return vec2(
          cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
          cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = (resolution.y / resolution.x);
        vec2 pos = vec2(0., 0.);
        vec4 pos0 = vec4(coordinatesA, 1.);
        vec4 pos1 = vec4(coordinatesB, 1.);
        // pos0 = translate(0.0, 0., 1.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -1.5) * pos0;
        // pos1 = translate(0.0, 0., 1.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -1.5) * pos1;
        // pos0.xyz *= map(sin(time *1e-1+pos0.y*2.), -1., 1., 0.95, 1.0);
        // pos1.xyz *= map(sin(time *1e-1+pos1.y*2.), -1., 1., 0.95, 1.0);
        // pos0.xyz *= 0.15
        // pos1.xyz *= 0.1;
        pos0 = yRotate(-time*0.5e-2) * pos0;
        // pos0 = xRotate(-time*0.5e-2) * pos0;
        pos0 = translate(0.0, 0.0, 1.5) * pos0;
        pos1 = yRotate(-time*0.5e-2) * pos1;
        // pos1 = xRotate(-time*0.5e-2) * pos1;
        pos1 = translate(0.0, 0.0, 1.5) * pos1;
        pos0.xy = pos0.xy / pos0.z;
        pos1.xy = pos1.xy / pos1.z;
        float a = atan(pos1.y - pos0.y, pos1.x - pos0.x);
        float pi75 = pi * 0.75;
        float pi25 = pi * 0.25;
        if (index == 0.) {
            pos = pos0.xy + vec2(cos(a + pi75), sin(a + pi75)) * width;
        } else if (index == 1.) {
            pos = pos0.xy + vec2(cos(a - pi75), sin(a - pi75)) * width;
        } else if (index == 2.) {
            pos = pos1.xy + vec2(cos(a - pi25), sin(a - pi25)) * width;
        } else if (index == 3.) {
            pos = pos1.xy + vec2(cos(a + pi25), sin(a + pi25)) * width;
        }
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, 1.);
        wh = vec2(width * sin(pi75), length(pos1.xy - pos0.xy));
        c = color;
        uvs = uv;
        t = time;
    }
    // endGLSL
`;
smoothLine3D.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec4 c;
    varying vec2 uvs;
    varying vec2 wh;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main(void) {
        vec2 fc = gl_FragCoord.xy;
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        vec2 fwh = vec2(wh.x*2., wh.y+(wh.x*2.));
        vec2 uv = uvs * fwh;
        uv -= fwh * 0.5;
        float radius = wh.x;
        vec2 size = fwh * 0.5 - radius;
        radius *= 2.;
        float col = length(max(abs(uv), size) - size) - radius;
        col = min(col * -1. * (1. / radius), 1.0);
        col = pow(col, 3.) * 0.75 + pow(col, 43.);
        col = smoothstep(0., 1., col);
        // col = mix(pow(col, 10.)*0.25, col, sin(time*0.1+pos.y*0.5e1)*0.5+0.5);
                // c2l =x(pow(col, 10.)*0.2, col, sin(t*0.1+pos.y*0.5e1)*0.5+0.5);
                // col = mix(pow(col, 10.)*0.2, col, sin(-t*0.1+length(pos * vec2(16./9.,1.))*0.5e1)*0.5+0.5);
        gl_FragColor = vec4(c.rgb, c.a * (max(col, 0.) - (rando * 0.05)));
        gl_FragColor.g = pow(col, 2.) *  0.2;
        gl_FragColor.b = pow(col, 2.) *  0.2;
        gl_FragColor.a = min(1., gl_FragColor.a + pow(col, 2.) *  0.25);
        // gl_FragColor.rgb = gl_FragColor.gbr;
    }
    // endGLSL
`;
smoothLine3D.vertText = smoothLine3D.vertText.replace(/[^\x00-\x7F]/g, "");
smoothLine3D.fragText = smoothLine3D.fragText.replace(/[^\x00-\x7F]/g, "");
smoothLine3D.init();
if (shadersReadyToInitiate) {
    currentProgram = getProgram("smooth-line-3D");
    gl.useProgram(currentProgram);
}

let smoothDots3D = new ShaderProgram("smooth-dots-3D");

smoothDots3D.vertText = `
    // beginGLSL
    attribute vec3 coordinates;
    uniform float time;
    uniform vec2 resolution;
    varying float t;
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        vec4 pos = vec4(coordinates, 1.);
        // pos = translate(0.0, 0., 0.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -0.5) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 15.;
        // gl_PointSize += (sin((length(coordinates*20.)*0.2-time*2e-1))*0.5+0.5)*14.;
    }
    // endGLSL
`;
smoothDots3D.fragText = `
    // beginGLSL
    precision mediump float;
    // uniform float time;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 0.5;
        float l = 1.0 - length(pos - vec2(0.5)) * 4.;
        // l += (1.0 - length(pos - vec2(0.5)) * 2.) * 0.125;
        // l += distSquared * 0.25;
        distSquared -= 1.2;
        l += (distSquared - (l * distSquared));
        float halo = (1.0 - length(pos - vec2(0.5)) * 2.)*0.5;
        l = smoothstep(0., 1., l);
        l = pow(l, 3.);
        float noise = rand(pos - vec2(cos(t), sin(t))) * 0.0625;
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.75, 0.25), (l+halo-noise)*0.5);
    }
    // endGLSL
`;
smoothDots3D.vertText = smoothDots3D.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.fragText = smoothDots3D.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.init();

// A version of smoothDots3D that adjusts the dot size according to its Z value
smoothDots3D.vertText = `
    // beginGLSL
    attribute vec3 coordinates;
    uniform float time;
    uniform vec2 resolution;
    varying float t;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        vec4 pos = vec4(coordinates, 1.);
        // pos = translate(0.0, 0., 0.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -0.5) * pos;
        // pos.xyz *= map(sin(time *1e-1+pos.y*2.), -1., 1., 0.95, 1.0);
        pos = yRotate(-time*0.5e-2) * pos;
        // pos = xRotate(-time*0.5e-2) * pos;
        pos = translate(0.0, 0.0, 1.5) * pos;
        // pos = rotate()
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 45. / pos.z;
        // gl_PointSize += (sin((length(coordinates*20.)*0.2-time*2e-1))*0.5+0.5)*14.;
    }
    // endGLSL
`;
smoothDots3D.fragText = `
    // beginGLSL
    precision mediump float;
    // uniform float time;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 0.5;
        float l = 1.0 - length(pos - vec2(0.5)) * 4.;
        // l += (1.0 - length(pos - vec2(0.5)) * 2.) * 0.125;
        // l += distSquared * 0.25;
        distSquared -= 1.2;
        l += (distSquared - (l * distSquared));
        float halo = (1.0 - length(pos - vec2(0.5)) * 2.)*0.5;
        l = smoothstep(0., 1., l);
        l = pow(l, 3.);
        float noise = rand(pos - vec2(cos(t), sin(t))) * 0.0625;
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.25, 0.25), (l+halo-noise)*0.5);
        // gl_FragColor.rgb = gl_FragColor.bgr;
    }
    // endGLSL
`;
smoothDots3D.vertText = smoothDots3D.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.fragText = smoothDots3D.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.init();


let pointillism = new ShaderProgram("pointillism");

pointillism.vertText = `
    // beginGLSL
    attribute vec3 coordinates;
    void main(void) {
        // gl_Position = vec4(coordinates, 1.0);
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, coordinates.z);
        gl_PointSize = (15.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 2.) * 0.9;
    }
    // endGLSL
`;
pointillism.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // vec2 uv = gl_PointCoord.xy / vec2(1600, 1600);
        vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
        // uv.x = uv.x + 1.0;
        uv = uv * 2.0;
        uv = uv + 0.5;
        // uv = uv * 1.0;
        float ALPHA = 0.75;
        vec2 pos = (gl_PointCoord - vec2(0.5, 0.5)) * 0.9;
        float dist_squared = dot(pos, pos);
        float alpha;
        if (dist_squared < 0.25) {
            alpha = ALPHA;
        } else {
            alpha = 0.0;
        }
        alpha = smoothstep(0.015, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., (3. - dist_squared * 12.0 - (rando * 0.1)) * 0.045 + alpha) * 1.25;
        // if (gl_FragColor.a < 0.01) {
        //     discard;
        // }
//         gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));
        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
    }
    // endGLSL
`;
pointillism.vertText = pointillism.vertText.replace(/[^\x00-\x7F]/g, "");
pointillism.fragText = pointillism.fragText.replace(/[^\x00-\x7F]/g, "");
pointillism.init();

pointillism.vertText = `
    // beginGLSL
    ${pi}
    attribute vec3 coordinates;
    uniform float time;
    ${matrixTransforms}
    void main(void) {
        // gl_Position = vec4(coordinates, 1.0);
        vec4 pos = vec4(coordinates, 1.0);
        pos.z /= 80000.;
        pos.z += 0.5;
        // pos = translate(0.0, -3., 2.0) * xRotate(pi * 0.5) * zRotate(time * 2e-2) * pos;
        pos = translate(0.0, -0.5, 0.0) * pos;
        // pos = xRotate(pi * 0.1) * yRotate(time * 1e-1) * pos;
        // pos = pos;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = (15.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 2.) * 0.9;
    }
    // endGLSL
`;
pointillism.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // vec2 uv = gl_PointCoord.xy / vec2(1600, 1600);
        vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
        // uv.x = uv.x + 1.0;
        uv = uv * 2.0;
        uv = uv + 0.5;
        // uv = uv * 1.0;
        float ALPHA = 0.75;
        vec2 pos = (gl_PointCoord - vec2(0.5, 0.5)) * 0.9;
        float dist_squared = dot(pos, pos);
        float alpha;
        if (dist_squared < 0.25) {
            alpha = ALPHA;
        } else {
            alpha = 0.0;
        }
        alpha = smoothstep(0.015, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., (3. - dist_squared * 12.0 - (rando * 0.1)) * 0.045 + alpha) * 1.25;
        // if (gl_FragColor.a < 0.01) {
        //     discard;
        // }
//         gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));
        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
    }
    // endGLSL
`;
pointillism.vertText = pointillism.vertText.replace(/[^\x00-\x7F]/g, "");
pointillism.fragText = pointillism.fragText.replace(/[^\x00-\x7F]/g, "");
pointillism.init();

pointillism.vertText = `
    // beginGLSL
    ${pi}
    attribute vec3 coordinates;
    uniform float time;
    varying float i;
    ${matrixTransforms}
    void main(void) {
        i = coordinates.z;
        // gl_Position = vec4(coordinates, 1.0);
        vec4 pos = vec4(coordinates.xy, 1.0, 1.0);
        // pos.z /= 12000.;
        // pos.z += 1.0;
        // pos = translate(0.0, -3., 2.0) * xRotate(pi * 0.5) * zRotate(time * 2e-2) * pos;
        
        // pos = xRotate(pi * 0.1) * yRotate(time * 1e-1) * pos;
        // pos = pos;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = (15.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 2.) * 0.9;
    }
    // endGLSL
`;
pointillism.fragText = `
    // beginGLSL
    precision mediump float;
    varying float i;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = (gl_PointCoord - vec2(0.5, 0.5)) * 0.9;
        float dist_squared = dot(pos, pos);
        float alpha = smoothstep(0.015, 0.0, dist_squared) * 0.5;
        // float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        float luma = (1.0 + (0.2 - dist_squared) + (alpha * 120.)) * 0.006;
        gl_FragColor = vec4(1.0, luma, luma, (3. - dist_squared * 24.0) * 0.045 + alpha) * 1.;
        // gl_FragColor.a *= sin(i*0.5e-4)*0.5+0.5;
        if (gl_FragColor.a < 0.01) {
            discard;
        }
        // gl_FragColor.rgb = gl_FragColor.gbr;
    }
    // endGLSL
`;
pointillism.vertText = pointillism.vertText.replace(/[^\x00-\x7F]/g, "");
pointillism.fragText = pointillism.fragText.replace(/[^\x00-\x7F]/g, "");
pointillism.init();

if (true) {

pointillism.vertText = `
    // beginGLSL
    ${pi}
    attribute vec3 coordinates;
    uniform float time;
    varying float i;
    ${matrixTransforms}
    void main(void) {
        i = coordinates.z;
        // gl_Position = vec4(coordinates, 1.0);
        vec4 pos = vec4(coordinates.xy, 1.0, 1.0);
        // pos.z /= 12000.;
        // pos.z += 1.0;
        // pos = translate(0.0, -3., 2.0) * xRotate(pi * 0.5) * zRotate(time * 2e-2) * pos;
        
        // pos = xRotate(pi * 0.1) * yRotate(time * 1e-1) * pos;
        // pos = pos;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        // gl_PointSize = (15.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 2.) * 0.9;
        gl_PointSize = 25.0;
    }
    // endGLSL
`;
pointillism.fragText = `
    // beginGLSL
    precision mediump float;
    varying float i;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float dist_squared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, dist_squared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - dist_squared, 
            alpha * 1., 
            // (0.25 - dist_squared * 3.0 - (rando * 0.1)) * 0.25 + alpha
            (1. - dist_squared * 3.0 - (rando * 0.1)) * 0.0625 + alpha * 0.8
            // (0.25 - dist_squared * 3.0 - (rando * 0.1)) * 0.25
            // alpha
        );
        gl_FragColor.a *= 0.5;
        // gl_FragColor.a *= sin(i*0.5e-4)*0.5+0.5;
        // gl_FragColor = mix(gl_FragColor, vec4(1.0), 0.5);
    }
    // endGLSL
`;
pointillism.vertText = pointillism.vertText.replace(/[^\x00-\x7F]/g, "");
pointillism.fragText = pointillism.fragText.replace(/[^\x00-\x7F]/g, "");
pointillism.init();

}