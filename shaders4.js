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