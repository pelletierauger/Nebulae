//     gl.drawArrays(gl.POINTS, 0, 147456 * 0.75);
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 2e-2;
        float ratio = 16.0 / 9.0;
        float id = vertexID;
        float x = ((fract(id / 325.)) - 0.5) * 2.3;
        float y = ((floor(id / 325.) / 288.) - 0.5) * 2.3;
        x += rand(vec2(x, y)) * 0.1;
        y += rand(vec2(x + 2., y + 2.)) * 0.1;
        vec2 pos = vec2(x, y);
        float turb = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
            float xd = sin(distance(pos, vec2(cos(t + i * 0.1) * 1.2, sin(t + i * 0.1) * 1.2)) * 20.) * 0.02;
            float yd = sin(distance(pos, vec2(sin(t + i * 0.1) * 1.2, cos(t + i * 0.1) * 1.2)) * 20.) * 0.02;
            pos.x += xd;
            pos.y += yd;
            turb += xd + yd;
        }
        gl_Position = vec4(pos.x * 0.95, pos.y * 0.95, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();


// Le meilleur étang
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 2e-2;
        float id = vertexID;
        float x = ((fract(id / 325.)) - 0.5) * 2.3;
        float y = ((floor(id / 325.) / 288.) - 0.5) * 2.3;
        x += rand(vec2(x, y)) * 0.1;
        y += rand(vec2(x + 2., y + 2.)) * 0.1;
        vec2 pos = vec2(x, y);
        for (float i = 0.0; i < 20.0; i++) {
            float a = cos(t + i * 0.1) * 1.2;
            float b = sin(t + i * 0.1) * 1.2;
            float xd = sin(distance(pos, vec2(a, b)) * 20.) * 0.02;
            float yd = sin(distance(pos, vec2(b, a)) * 20.) * 0.02;
            pos.x += xd;
            pos.y += yd;
        }
        gl_Position = vec4(pos.x * 0.95, pos.y * 0.95, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();

// Rotation dans l'étang
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main(void) {
        float t = time * 2e-2;
        float ratio = 16.0 / 9.0;
        float id = vertexID;
        float x = ((fract(id / 325.)) - 0.5) * 2.3;
        float y = ((floor(id / 325.) / 288.) - 0.5) * 2.3;
        x += rand(vec2(x, y)) * 0.1;
        y += rand(vec2(x + 2., y + 2.)) * 0.1;
        vec2 pos = vec2(x, y);
        float turb = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
            float a = cos(t + i * 0.1) * 1.2;
            float b = sin(t + i * 0.1) * 1.2;
            float xd = sin(distance(pos, rotateUV(vec2(a, b), t, 0.)) * 20.) * 0.02;
            float yd = sin(distance(pos, rotateUV(vec2(b, a), t, 0.)) * 20.) * 0.02;
            pos.x += xd;
            pos.y += yd;
            turb += xd + yd;
        }
        gl_Position = vec4(pos.x * 0.95, pos.y * 0.95, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();

// Zoom sur l'étang
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
    void main(void) {
        float t = time * 2e-2;
        float ratio = 16.0 / 9.0;
        float id = vertexID;
        float x = ((fract(id / 325.)) - 0.5) * 2.3;
        float y = ((floor(id / 325.) / 288.) - 0.5) * 2.3;
        x += rand(vec2(x, y)) * 0.1;
        y += rand(vec2(x + 2., y + 2.)) * 0.1;
        vec2 pos = vec2(x, y);
        float turb = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
            float a = cos(t + i * 0.1) * 3.2;
            float b = sin(t + i * 0.1) * 3.2;
            float xd = sin(distance(pos, vec2(a, b)) * 10.) * 0.05;
            float yd = sin(distance(pos, vec2(b, a)) * 10.) * 0.05;
            pos.x += xd;
            pos.y += yd;
            turb += xd + yd;
        }
        gl_Position = vec4(pos.x * 0.95, pos.y * 0.95, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();

// Nombril de l'étang
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main(void) {
        float t = time * 2e-2;
        float ratio = 16.0 / 9.0;
        float id = vertexID;
        float x = ((fract(id / 325.)) - 0.5) * 2.3;
        float y = ((floor(id / 325.) / 288.) - 0.5) * 2.3;
        x += rand(vec2(x, y)) * 0.1;
        y += rand(vec2(x + 2., y + 2.)) * 0.1;
        vec2 pos = vec2(x, y);
        float turb = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
            float fi = i * 7e-2;
            float ts = 0.02;
            vec2 a = vec2(cos(fi + -time * 1e-2 * 1.) * fi, sin(fi + -time * 1e-2 * 1.) * fi);
            float d = distance(pos, a) * 0.5;
            d = tan(d) * 20.;
            float xd = cos(d + t) * ts;
            float yd = sin(d + t) * ts;
            pos.x += xd;
            pos.y += yd;
            turb += xd + yd;
        }
        gl_Position = vec4(pos.x * 0.95, pos.y * 0.95, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();

// Oeufs dans oeufs
newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 2e-2;
        float id = vertexID;
        float a = tan(id * 1e-3) / sin(id * 1e-5);
        float x = cos(id * 1e-3 + a) * id * 1.2e-5;
        float y = cos(x*100.+id * 1e-3 + a) * id * 1.2e-5;
        x += rand(vec2(x, y)) * 0.015;
        y += rand(vec2(x + 2., y + 2.)) * 0.015;
        vec2 pos = vec2(x, y);
        float f = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
            float a = cos(-t + i * 0.005) * 0.2;
            float b = sin(-t + i * 0.005) * 0.2;
            float xd = cos(distance(pos, vec2(a, b)) * 5. + f - t) * 0.01;
            float yd = sin(distance(pos, vec2(b, a)) * 5. + f - t) * 0.01;
            pos.x += xd;
            pos.y += yd;
            f += (xd + yd) * 10.;
        }
        gl_Position = vec4(pos.x * 0.85, pos.y * 0.85, 0.0, 1.0);
        gl_PointSize = 25.;
    }
    // endGLSL
`;
newFlickeringVert.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 1. + alpha * 0.8
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
// newFlickeringVert.init();
newFlickeringVert.vertText = newFlickeringVert.vertText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.fragText = newFlickeringVert.fragText.replace(/[^\x00-\x7F]/g, "");
newFlickeringVert.init();