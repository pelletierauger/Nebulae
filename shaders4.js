let textureShader = new ShaderProgram("textu");

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