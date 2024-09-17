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