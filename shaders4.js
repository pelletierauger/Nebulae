let textureShader = new ShaderProgram("textu");

// With a centered glow
textureShader.vertText = `
// beginGLSL
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  vec4 position = vec4(a_position, 1.0);
  position.xy = position.xy * 2.0 - 1.0;
  gl_Position = position;
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
// endGLSL
`;
textureShader.fragText = `
// beginGLSL
precision mediump float;
uniform float time;
uniform float alpha;
uniform float resolution;
varying vec2 v_texcoord;
uniform sampler2D u_texture;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}
${blendingMath}
${rand}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1280., 720.);
    uv -= 0.5;
    uv.x *= 16./9.;
    // uv *= 0.5;
    gl_FragColor = texture2D(u_texture, v_texcoord);
    // gl_FragColor.rgb *= 0.5;
    float g = max(0., 1.0-length(uv*1.25));
    // g = 1./(length(uv*4.)+0.5)*0.9;
    // g = g * 0.5 + pow(g, 1.5);
    g = smoothstep(0., 1., g);
    g -= rand(uv+time*1e-2)*0.05;
    vec3 glow = vec3(g, pow(g, 3.)*0.125, pow(g, 3.)*0.25);
    gl_FragColor.rgb = BlendScreen(gl_FragColor.rgb, glow);
    // gl_FragColor.rgb = glow;
    // float l = luma(gl_FragColor.rgb);
    // l = pow(l*2., 15.);
    // gl_FragColor.rgb = hueShift2(gl_FragColor.rgb, 2.5);
    // gl_FragColor.rgb = hueShift2(gl_FragColor.rgb, l*0.25);;
    // gl_FragColor.rgb = hueShift2(gl_FragColor.rgb, l*0.2);
    // gl_FragColor.rgb=vec3(l);
    gl_FragColor.a *= alpha;
}
// endGLSL
`;
textureShader.init();

// Interesting with rosaceConchoid
// With a centered glow
textureShader.vertText = `
// beginGLSL
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  vec4 position = vec4(a_position, 1.0);
  position.xy = position.xy * 2.0 - 1.0;
  gl_Position = position;
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
// endGLSL
`;
textureShader.fragText = `
// beginGLSL
precision mediump float;
uniform float time;
uniform float alpha;
uniform float resolution;
varying vec2 v_texcoord;
uniform sampler2D u_texture;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}
${blendingMath}
${rand}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1280., 720.);
    uv -= 0.5;
    uv.x *= 16./9.;
    // uv *= 0.5;
    gl_FragColor = texture2D(u_texture, v_texcoord);
    // gl_FragColor.rgb *= 0.5;
    float g = max(0., 1.0-length(uv*2.));
    // g = 1./(length(uv*4.)+0.5)*0.9;
    // g = g * 0.5 + pow(g, 1.5);
    g = smoothstep(0., 1., g);
    g -= rand(uv+time*1e-2)*0.05;
    vec3 glow = vec3(g, pow(g, 3.)*0.125, pow(g, 3.)*0.25)*0.75;
    float l = luma(gl_FragColor.rgb);
    // gl_FragColor.rgb = glow;
    // l = pow(l*2., 15.);
    // gl_FragColor.rgb = hueShift2(gl_FragColor.rgb, 2.5);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, hueShift2(gl_FragColor.rgb, 0.-l*5.) * 1.6, 0.5);
    gl_FragColor.rgb = BlendScreen(gl_FragColor.rgb, glow);
    // gl_FragColor.rgb = hueShift2(gl_FragColor.rgb, l*0.2);
    // gl_FragColor.rgb=vec3(l);
    gl_FragColor.a *= alpha;
}
// endGLSL
`;
textureShader.init();

textureShader.vertText = `
// beginGLSL
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  vec4 position = vec4(a_position, 1.0);
  position.xy = position.xy * 2.0 - 1.0;
  gl_Position = position;
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
// endGLSL
`;
textureShader.fragText = `
// beginGLSL
precision mediump float;
uniform float time;
uniform float alpha;
uniform float resolution;
varying vec2 v_texcoord;
uniform sampler2D u_texture;
void main() {
    gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor.a *= alpha;
}
// endGLSL
`;
textureShader.init();

let blenderProgram = new ShaderProgram("blender-program");

blenderProgram.vertText = `
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  // Multiply the position by the matrix.
  vec4 positionVec4 = vec4(a_position, 1.0);
  // gl_Position = a_position;
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;
blenderProgram.fragText = `
// beginGLSL
precision mediump float;
// Passed in from the vertex shader.
uniform float resolution;
uniform float time;
varying vec2 v_texcoord;
uniform sampler2D u_texture;
uniform sampler2D u_texture2;
${blendingMath}
${rand} 
void main() {
//     
//     Beautiful, subtle blue and purple
//     vec2 uv = vec2(gl_FragCoord.xy) / vec2(1600, 1600);
//     vec4 texture = texture2D(u_texture, v_texcoord);
//     vec4 texture2 = texture2D(u_texture2, v_texcoord);
//     vec3 levels = LevelsControlInputRange(texture2.rgb, 0.2, 0.95);
//     vec3 blender = BlendSoftLight(texture.rgb, levels);
//     float blendMix = 0.95;
//     vec3 blend = (texture.rgb * (1.0 - blendMix)) + (blender * blendMix);
//     vec3 col = blend + vec3(0.24, -0.12, -0.12);
//     col = LevelsControlInputRange(col, 0.0, 0.95);
//     gl_FragColor = vec4(col, 1.0);
//     gl_FragColor = vec4((col * 0.5) + texture.rgb * 0.5, 1.01);
//     
// // A wilder, pinker version
//     vec2 uv = vec2(gl_FragCoord.xy) / vec2(1600, 1600);
//     if (resolution == 1.0) {
//         uv *= 0.5;
//     }
    vec2 uv = gl_FragCoord.xy / vec2(1280., 720.);
    uv -= 0.5;
    uv.x *= 16./9.;
    // uv *= 0.5;
    // gl_FragColor = texture2D(u_texture, v_texcoord);
    // gl_FragColor.rgb *= 0.5;
    float circ = max(0., 1.0-length(uv*1.25));
    circ = smoothstep(0., 1.8, circ);
    float morphX = uv.x;
    float sy = smoothstep(0., 1., 1.0-abs(uv.y*1.2));
    float syOri = smoothstep(0., 1., 1.0-abs(uv.y*1.2));
    sy = pow(sy * 1.15, 18.);
    morphX *= sy;
    morphX = 1.0-abs(morphX)-0.;
    morphX = smoothstep(0., 1., morphX);
    // uv.x *= 1.0-abs(uv.y);
    morphX *= 12.;
    morphX *= circ;
    vec4 texture = texture2D(u_texture, v_texcoord);
    vec4 texture2 = texture2D(u_texture2, v_texcoord);
    float g = morphX;
    g -= rand(uv+time*1e-2)*0.125;
    vec3 glow = vec3(g, g * 0.125, g * 0.125) * 0.0625;
    // glow = 1. - exp( -glow );
    // glow = glow - 0.25;
    // glow *= sy;
    // glow = hueShift2(glow, 5.);
    texture.rgb = BlendScreen(texture.rgb, glow);
    vec3 bc = vec3(1.0, 1.0-abs(uv.y), sy)*0.5;
    // texture.rgb = mix(texture.rgb, BlendLinearDodge(texture.rgb, bc), sy);
    // texture.rgb = 1. - exp(-texture.rgb*4.);
    // texture.rgb = mix(texture.rgb, 1. - exp(-texture.rgb*4.), pow(syOri,7.));
    vec3 t1 = BlendScreen(texture2.rgb, texture.rgb);
    gl_FragColor = vec4(t1, 1.);
    // gl_FragColor = vec4(texture2.rgb, 1.);
    // gl_FragColor = vec4(glow, 1.);
}
// endGLSL
`;
blenderProgram.init();

let snakeScale = new ShaderProgram("snake-scale");

snakeScale.vertText = `
    // beginGLSL
    ${pi}
    attribute vec4 coordinates;
    uniform float time;
    varying float alpha;
    varying float t;
    varying vec3 posUnit;
    void main(void) {
        alpha = coordinates.z;
        t = time;
        vec4 pos = vec4(coordinates.xyw, 1.0);
        posUnit = pos.xyz;
        pos.x *= 9./16.;
        // gl_Position = vec4(pos.x, pos.y, 0.0, 1.);
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 125.0 * alpha;
        // gl_PointSize = 15.0;
    }
    // endGLSL
`;
snakeScale.fragText = `
    // beginGLSL
    precision mediump float;
    varying float alpha;
    varying float t;
    varying vec3 posUnit;
    ${mapFunction}
    ${rand}
    ${pi}
    ${blendingMath}
    vec2 rotateUV(vec2 uv, float rotation, float mid) {
        return vec2(
          cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
          cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }
    void main(void) {
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float rando = rand(pos);
        pos = rotateUV(pos, (cos((posUnit.x/0.5)*5.+t*0.05))*(-0.25*pi), 0.);
        // pos = rotateUV(pos, pi * 0.5, 0.);
        pos.y = pos.y+sign(pos.y)*0.25;
        float l = length(pos*3.);
        float x = l;
        float a = 24.*alpha;
        float al = (x < 1.) ? 1.: 0.;
        al = (x < 1.) ? 1. : abs((x-(0.9))*24.)*-1.+1.;
        al = max(0., al)*0.3;
        // al = 1.;
        float inner = al;
        al = (1.-l*0.55)*1.+al;
        al = smoothstep(0., 1., al);
        x = abs((x-(1.-(1./a)))*a)*-1.+1.;
        x = max(0., x);
        // x = 1./x;
        x = smoothstep(0., 1., x);
        float eyeGlow = pow(max(0.,(abs(((posUnit.x-0.699)-0.5)*2.)*-1.+1.)),3.);
                // gl_FragColor.rgb *= vec3(pow(max(0.,posUnit.x),3.));
                // x += (pow(max(0.,posUnit.x),3.))*0.25;
        x += eyeGlow*0.5;
        gl_FragColor = vec4(vec3(x,0.,pow(x,6.)*0.5),al);
        gl_FragColor.r += pow(alpha*4.*(1.*(sin(posUnit.x*1.123e6+alpha*332123.+t*0.05)*0.5+0.5)),3.)*5.;
        gl_FragColor.b += pow(alpha*4.*(1.*(sin(posUnit.x*1.123e6+alpha*332123.+t*0.05)*0.5+0.5)),7.)*5.;
        gl_FragColor.r += pow(alpha*4.*(1.*(sin(posUnit.x*4.+t*0.1)*0.5+0.5)),3.)*3.;
        gl_FragColor.b += pow(alpha*4.*(1.*(sin(posUnit.x*4.+t*0.1)*0.5+0.5)),7.)*3.;
        // gl_FragColor.a = 1.;
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * alpha * 4. * al, 0.25);
        float shine = map(sin(posUnit.x*3.+t*0.1),-1., 1., 0., 1.);
        gl_FragColor.rgb *= map(sin((alpha*32100.)*200.),-1.,1.,0.6,1.);
        gl_FragColor.rgb *= map(cos((alpha*32100.)*12532.),-1.,1.,0.6, 1.);
        gl_FragColor.b += map(cos((alpha*32100.)*500.+11245125.),-1.,1.,0., 1.)*0.25*al;
        // gl_FragColor.rgb = gl_FragColor.brg;
                        // gl_FragColor.rgb = vec3();
        // gl_FragColor.rgb = hueShift(gl_FragColor.rgb, pi * 1.);
    }
    // endGLSL
`;
snakeScale.init();