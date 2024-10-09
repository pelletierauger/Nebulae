// Le meilleur étang
let mysticalPond = new ShaderProgram("mystical-pond");

mysticalPond.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    ${rand}
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
mysticalPond.fragText = `
    // beginGLSL
    precision mediump float;
    ${rand}
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
mysticalPond.init();


if (false) {

// Oeufs dans oeufs
mysticalPond.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    ${rand}
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
mysticalPond.fragText = `
    // beginGLSL
    precision mediump float;
    ${rand}
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
mysticalPond.init();

}

let witchyTerrain = new ShaderProgram("witchy-terrain");

witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(0.0, 0.49 / ratio, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 10.;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (312. * 1.75))) - 0.5) * 4.5 + 0.;
        float y = ((floor(id / (312. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 4. - 0.7;
        x += rand(vec2(x, y)) * 0.02;
        y += rand(vec2(x + 2., y + 2.)) * 0.02;
        vec2 pos2 = vec2(x, y);
        for (float i = 0.0; i < 25.0; i++) {
            float fi = i * 0.5e-2;
            float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
            vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
            float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            // xd += sin(pos2.x * 1e3) * 0.00008;
            pos2.x += xd * 1.6;
            pos2.y += yd * 1.6;
        }
        float z = fbm((vec2(x, y) + 10.0) * 1. + 5990. * 0.0625e-1) * 1.;
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        gl_Position = vec4(pos.x / ratio * 20., pos.y * 20., 0.0, pos.z * 1.);
        gl_PointSize = 15.;
    }
    // endGLSL
`;
witchyTerrain.fragText = `
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
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
witchyTerrain.init();


witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(0.0, 0.49 / ratio, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 10.;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (552. * 1.75))) - 0.5) * 3. + 0.;
        float y = ((floor(id / (552. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 12. + 1.25;
        x += rand(vec2(x, y)) * 0.02;
        y += rand(vec2(x + 2., y + 2.)) * 0.02 + 0.7;
        vec2 pos2 = vec2(x, y);
        for (float i = 0.0; i < 25.0; i++) {
            float fi = i * 0.5e-2;
            float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
            vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
            float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            // xd += sin(pos2.x * 1e3) * 0.00008;
            pos2.x += xd * 1.6;
            pos2.y += yd * 1.6;
        }
        float z = fbm((vec2(x, y) + 10.0) * 1. + 5990. * 0.0625e-1) * 1.;
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        float zoom = 1.45;
        gl_Position = vec4(pos.x / ratio * 20. * zoom, pos.y * 20. * zoom, 0.0, pos.z * 1.);
        gl_PointSize = 15. * zoom;
    }
    // endGLSL
`;
witchyTerrain.fragText = `
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
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
witchyTerrain.init();

witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(-0.1, 0.59 / ratio, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 2.5;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (552. * 1.75))) - 0.5) * 3. + 0.;
        float y = ((floor(id / (552. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 12. + 1.25;
        // x += rand(vec2(x, y)) * 0.01;
        // y += rand(vec2(x + 2., y + 2.)) * 0.01 + 0.7;
        vec2 pos2 = vec2(x+0., y+0.5);
        for (float i = 0.0; i < 25.0; i++) {
            float fi = i * 0.5e-2;
            float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
            vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
            float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            // xd += sin(pos2.x * 1e3) * 0.00008;
            // pos2.x += xd * 0.6;
            // pos2.y += yd * 0.6;
        }
       // x += rand(vec2(x, y)) * 0.01;
        // y += rand(vec2(x + 2., y + 2.)) * 0.01 + 0.7;
        // float nn = rand(vec2(x + 2., y + 2.)) * 0.1 + 0.;
        // float nn2 = rand(vec2(x + 20., y + 20.)) * 0.1 + 0.;
        vec2 polar = vec2(abs(atan(y+0.5,x+0.))+time*2e-2*0., pow(length(vec2(x+0., y+0.5)),0.125)*10.+1e4 - (time * 2e-2));
        float z = fbm((polar)) * -1. * (length(vec2(x, y))) * 0.5 + 0.75;
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        float zoom = 1.75;
        gl_Position = vec4(pos.x / ratio * 20. * zoom, pos.y * 20. * zoom, 0.0, pos.z * 1.);
        gl_PointSize = 15. * zoom;
        // Lozenge mask
        // if (abs(pos.x/ratio/pos.z) + abs(pos.y/pos.z) > 0.034) {
        //     gl_PointSize = 0.;
        // }
    }
    // endGLSL
`;
witchyTerrain.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        if (distSquared > 0.25) {
            discard;
        }
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
witchyTerrain.init();

witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    ${mapFunction}
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25*1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(-0., 0.59 / ratio - 0.3, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 2.5;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (322. * 1.75))) - 0.5) * 2.1 + 0.;
        float y = ((floor(id / (322. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 12. + 1.1;
        // float nx = cos(id * 0.35e-2-time*1e-1) * id * 10e-6 + 0.;
        // float ny = sin(id * 0.35e-2-time*1e-1) * id * 10e-6 - 0.5;
        // x = mix(x, nx,1.);
        // y = mix(y, ny,1.);
        // x += rand(vec2(x * 1e3, y * 2.4e3)) * 0.01;
        // y += rand(vec2(x * 1e5 + 200., y * 1e2 + 2.)) * 0.01;
        vec2 pos2 = vec2(x+0., y+0.5);
        // for (float i = 0.0; i < 25.0; i++) {
        //     float fi = i * 0.5e-2;
        //     float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
        //     vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
        //     float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
        //     float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
        //     // xd += sin(pos2.x * 1e3) * 0.00008;
        //     // pos2.x += xd * 0.6;
        //     // pos2.y += yd * 0.6;
        // }
       // x += rand(vec2(x, y)) * 0.01;
        // y += rand(vec2(x + 2., y + 2.)) * 0.01 + 0.7;
        // float nn = rand(vec2(x + 2., y + 2.)) * 0.1 + 0.;
        // float nn2 = rand(vec2(x + 20., y + 20.)) * 0.1 + 0.;
        vec2 polar = vec2(abs(atan(y+1.,x+0.))+time*2e-2*0., pow(length(vec2(x+0., y+1.)),0.125)*10.+1e4 - (time * 2e-2));
        float z = fbm((polar)) * -1. * (length(vec2(x, y))) * 0.5 + 0.75;
        if (length(vec2(x, y+1.)) < 0.4) {
            // z *= 0.;
            float nz = map(length(vec2(x, y+1.)), 0.4, 0., z, 0.7);
            // nz = smoothstep(0., 0.7, nz);
            z = nz;
        }
        // float z = fbm((vec2(x*0.5,y+1.25)*7.));
        // float z = fbm(vec2(x, y) + 37.);
        // float z = fbm(vec2(x, y) + 20.);
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        float zoom = 1.75;
        gl_Position = vec4(pos.x / ratio * 20. * zoom, pos.y * 20. * zoom, 0.0, pos.z * 1.);
        gl_PointSize = 15. * zoom;
        // Lozenge mask
        // if (abs(pos.x/ratio/pos.z) + abs(pos.y/pos.z) > 0.034) {
        //     gl_PointSize = 0.;
        // }
    }
    // endGLSL
`;
witchyTerrain.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        if (distSquared > 0.25) {
            discard;
        }
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.35;
    }
    // endGLSL
`;
witchyTerrain.init();

witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    ${mapFunction}
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25*1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(-0., 0.59 / ratio, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 2.5;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (552. * 1.75))) - 0.5) * 3. + 0.;
        float y = ((floor(id / (552. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 12. + 1.25;
        // float nx = cos(id * 0.35e-2-time*1e-1) * id * 10e-6 + 0.;
        // float ny = sin(id * 0.35e-2-time*1e-1) * id * 10e-6 - 0.5;
        // x = mix(x, nx,1.);
        // y = mix(y, ny,1.);
        // x += rand(vec2(x * 1e3, y * 2.4e3)) * 0.01;
        // y += rand(vec2(x * 1e5 + 200., y * 1e2 + 2.)) * 0.01;
        vec2 pos2 = vec2(x+0., y+0.5);
        // for (float i = 0.0; i < 25.0; i++) {
        //     float fi = i * 0.5e-2;
        //     float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
        //     vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
        //     float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
        //     float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
        //     // xd += sin(pos2.x * 1e3) * 0.00008;
        //     // pos2.x += xd * 0.6;
        //     // pos2.y += yd * 0.6;
        // }
       // x += rand(vec2(x, y)) * 0.01;
        // y += rand(vec2(x + 2., y + 2.)) * 0.01 + 0.7;
        // float nn = rand(vec2(x + 2., y + 2.)) * 0.1 + 0.;
        // float nn2 = rand(vec2(x + 20., y + 20.)) * 0.1 + 0.;
        float l = length(vec2(x, y+0.5));
        vec2 polar = vec2(abs(atan(y+0.5,x))+time*2e-2*0., pow(l,0.125)*10.+1e4 - (time * 2e-2));
        float z = fbm((polar)) * -1. * (length(vec2(x, y))) * 0.5 + 0.75;
        if (l < 0.4) {
            float lm = map(l, 0., 0.4, 0., 1.);
            float sm = smoothstep(0., 1., lm);
            float nz = map(sm, 0., 1., 0.7, z);
            z = nz;
        }
        // float z = fbm((vec2(x*0.5,y+1.25)*7.));
        // float z = fbm(vec2(x, y) + 37.);
        // float z = fbm(vec2(x, y) + 20.);
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        float zoom = 1.75;
        gl_Position = vec4(pos.x / ratio * 20. * zoom, pos.y * 20. * zoom, 0.0, pos.z * 1.);
        gl_PointSize = 15. * zoom;
        // Lozenge mask
        // if (abs(pos.x/ratio/pos.z) + abs(pos.y/pos.z) > 0.034) {
        //     gl_PointSize = 0.;
        // }
    }
    // endGLSL
`;
witchyTerrain.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        if (distSquared > 0.25) {
            discard;
        }
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.35;
    }
    // endGLSL
`;
witchyTerrain.init();

witchyTerrain.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    uniform float resolution;
    varying float alph;
    varying vec3 cols;
    #define cx_mul(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
    float roundedRectangle (vec2 uv, vec2 pos, vec2 size, float radius, float thickness) {
        float d = length(max(abs(uv - pos),size) - size) - radius;
        return smoothstep(0.66, 0.33, d / thickness * 5.0);
    }
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        float t = time * 0.5e-2;
        float ratio = 16.0 / 9.0;
        float vertexCount = 147456.0;
        float id = vertexID;
        float ra = 1.25;
        vec2 r = vec2(cos(ra), sin(ra));
        vec3 tr = vec3(0.0, 0.49 / ratio, 18.9);
        mat4 tm4 = mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            tr.x, tr.y, tr.z, 1.0
        );
        mat4 yr = mat4(
           r.x, 0.0, r.y, 0.0,
           0.0, 1.0, 0.0, 0.0,
           -r.y, 0.0, r.x, 0.0,
           0.0, 0.0, 0.0, 1.0
        );
        float a = 10.;
        vec2 zz = vec2(cos(a), sin(a));
        mat4 zr2 = mat4(
           zz.x, -zz.y, 0.0, 0.0, // first column 
           zz.y, zz.x, 0.0, 0.0, // second column
           0.0, 0.0, 1.0, 0.0,  // third column
           0.0, 0.0, 0.0, 1.0
        );
        float x = ((fract(id / (552. * 1.75))) - 0.5) * 3. + 0.;
        float y = ((floor(id / (552. * 1.75)) / (512. * 1.75)) - 0.5 / ratio) * 12. + 1.25;
        x += rand(vec2(x, y)) * 0.02;
        y += rand(vec2(x + 2., y + 2.)) * 0.02 + 0.7;
        vec2 pos2 = vec2(x, y);
        for (float i = 0.0; i < 25.0; i++) {
            float fi = i * 0.5e-2;
            float ts = 0.001 * sin((x+0.1) * y * 1.5e1) * 3.;
            vec2 a = vec2(cos(fi * 1000. + t * 5.1) * fi, sin(fi * 1000. + t * 0.001) * fi);
            float xd = cos(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            float yd = sin(distance(pos2+vec2(0.1,0.), a) * 50.75 - time * 20.5e-2) * ts;
            // xd += sin(pos2.x * 1e3) * 0.00008;
            pos2.x += xd * 1.6;
            pos2.y += yd * 1.6;
        }
        float z = fbm((vec2(x, y) + 10.0) * 1. + 5990. * 0.0625e-1) * 1.;
        vec4 pos = vec4(pos2.y, z, pos2.x, 1.0);
        pos = zr2 * pos;
        pos = yr * pos;
        pos = tm4 * pos;
        float zoom = 1.45;
        gl_Position = vec4(pos.x / ratio * 20. * zoom, pos.y * 20. * zoom, 0.0, pos.z * 1.);
        gl_PointSize = 15. * zoom;
        // Lozenge mask
        // if (abs(pos.x/ratio/pos.z) + abs(pos.y/pos.z) > 0.034) {
        //     gl_PointSize = 0.;
        // }
    }
    // endGLSL
`;
witchyTerrain.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float distSquared = dot(pos, pos);
        if (distSquared > 0.25) {
            discard;
        }
        float alpha = smoothstep(0.005, 0.0, distSquared);
        float rando = rand(pos);
        gl_FragColor = vec4(
            1.0,
            0.2 - distSquared, 
            alpha * 0.5,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 * 0.85 + alpha * 1.
        );
        gl_FragColor.a *= 0.25;
    }
    // endGLSL
`;
witchyTerrain.init();