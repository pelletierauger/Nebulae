newFlickeringVert.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform float time;
    float map(float value, float min1, float max1, float min2, float max2) {
        float perc = (value - min1) / (max1 - min1);
        return perc * (max2 - min2) + min2;
    }
    void main(void) {
        float t = time * 0.25e-1;
        float i = vertexID * 1e-1 + 500.;
        float x = cos(pow(i, 3.75) * 0.1e-8) * cos(pow(i, 0.29) - t) * i * 2e-4;
        float y = sin(pow(i, 3.75) * 0.1e-8) * sin(pow(i, 0.29) - t) * i * 2e-4;
        gl_Position = vec4(x * (9./16.), y, 0.0, 1.0);
        gl_PointSize = 25.0;
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
            alpha,
            (1. - distSquared * 3.0 - (rando * 0.1)) * 0.0625 + alpha * 0.8
        );
        gl_FragColor.a *= 0.125;
    }
    // endGLSL
`;
newFlickeringVert.init();