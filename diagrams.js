let diagram001 = new Nebula(75000, 3);

diagram001.update = function(count, alpha = 1) {
    let vertices = [];
    let num = 0;
    let nnn = 1500;
    let sides = 5;
    let inc = (Math.PI * 2) / sides;
    let st = -drawCount * 1e-2;
    // for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
    //     let p0 = [Math.cos(i), Math.sin(i)];
    //     let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
    //     for (let p = 0; p < 1; p += 0.01) {
    //         for (let k = 0; k < 25; k += 5) {
    //         let d = Math.pow(dist(0, p, 1, Math.sin(p * 1.5)), k) * 0.65;
    //         let x = lerp(p0[0], p1[0], p) * 0.5 * d;
    //         let y = lerp(p0[1], p1[1], p) * 0.5 * d;
    //         // vertices.push(x, y, 1);
    //         // num++;
    //         }
    //     }
    // }
    sides = 9;
    inc = (Math.PI * 2) / sides;
    st = -drawCount * 1e-2 - Math.PI;
    st = Math.PI/9/2;
    // st = Math.PI / (sides * 2);
    // Nonafoil Knot
    // Noeud premier à 9 croisements
    // https://katlas.org/wiki/9_1
    for (let i = st; i <= (Math.PI * 2.001) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let pp = 0;
        for (let p = 0; p < 1; p += 0.0075) {
            let d = dist(0, p, 0, 0.5) * 1;
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            for (let m = 0; m < 2; m++) {
                let test = (m) ? 
                    (pp < 30 || pp > 38) : 
                    (pp < 38 || pp > 45);
                if (test) {
                    let sca = Math.pow(0.85, m);
                    sca *= map(Math.abs((p-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
                    // sca *= 1-Math.pow(Math.sin(p * Math.PI),15)*0.2*m;
                    vertices.push(x * sca, y * sca, 1);
                    num++;
                }
            }
            pp++;
        }
    }
        sides = 3;
    inc = (Math.PI * 2) / sides;
    st = Math.PI * 0.5;
    for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
        for (let p = 0; p < 1; p += 0.0025) {
            let x = lerp(p0[0], p1[0], p) * 1;
            let y = lerp(p0[1], p1[1], p) * 1;
            // vertices.push(x * 1.08, -y * 1.08, 1);
            // num++;
            // vertices.push(x * 1.08 * 1.07, -y * 1.08 * 1.07, 1);
            // num++;
        }
    }
    function nonafoilSequencer(offset = 0, speed = 1) {
        let sides = 9;
        let inc = (Math.PI * 2) / sides;
        let st = Math.PI/9/2;
        let nonaClock = Math.PI*2 - ((drawCount * speed * 2e-3 + offset) % (Math.PI * 2));
        let nonaClockDivider = (Math.PI * 2) / sides;
        let nonaSegment = Math.floor(nonaClock / (Math.PI*2/sides))*2;
        let nonaInsideSegment = (nonaClock / (Math.PI*2/sides)) % 1;
        let i = Math.PI*2/sides * nonaSegment + st;
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let x = lerp(p0[0], p1[0], nonaInsideSegment) * 0.5;
        let y = lerp(p0[1], p1[1], nonaInsideSegment) * 0.5;
        let d = dist(0, nonaInsideSegment, 0, 0.5) * 1;
        let m = 0, n = 1;
        let sca = Math.pow(0.85, m);
        sca *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
        let sca2 = Math.pow(0.85, n);
        sca2 *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1, 0.5-n*0.1);
        x = lerp(x * sca, x * sca2, 0.5);
        y = lerp(y * sca, y * sca2, 0.5);
        if (nonaInsideSegment < 0.25 || nonaInsideSegment > 0.32) {
            for (let i = 0; i < 2; i++) {
                vertices.push(x, y, 1);
                num++;
            }
        }
    }
    for (let i = 0; i < Math.PI*2; i += Math.PI*2/32) {
        let speed = map(i, 0, Math.PI*2, 1, 1.5);
        nonafoilSequencer(i, speed*4);
    }
    inc = (Math.PI * 2) / 500;
    for (let i = 0 ; i < Math.PI * 2; i += inc) {
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        vertices.push(x, y, 1);
        num++;
        vertices.push(x * 1.07, y * 1.07, 1);
        num++;
    }
    // Moons
    inc = (Math.PI * 2) / 450;
    for (let i = Math.PI * 0.5 ; i < Math.PI * 2.5; i += inc) {
        // let x = Math.cos(i) * ((i < Math.PI * 1.5) ? 1 : -0.5) * 0.5;
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        let c = Math.cos(Math.PI * 0.65) * 0.8;
        x = (x * 2 > c) ? x : -x + c;
        vertices.push(x * 0.75 + 1.2, y * 0.75 + 0.5, 1);
        num++;
        vertices.push(-x * 0.75 - 1.2, y * 0.75 + 0.5, 1);
        num++;
    }
    // aaa = 1000;
    // teardrop equation
    // http://paulbourke.net/geometry/teardrop/
    inc = (Math.PI * 2) / 250;
    for (let i = 0; i < Math.PI * 2; i += inc) {
        let sc = 0.25;
        // let x = 0.5 * (4 * Math.cos(i * 0.5) * Math.pow(Math.sin(i * 0.5), 4)) * sc; 
        let x = 1.3 * ( Math.cos(i * 0.5)) * Math.pow(Math.sin(i * 0.5), 4) * sc; 
        let y = Math.cos(i) * 0.25;
        // let y2 = Math.cos(i*0.5+Math.PI*0.5) * 0.25 + 0.25;
        // let x2 = Math.sin(i*0.5+Math.PI*0.5) * 0.54;
        // x = lerp(x, x2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // y = lerp(y, y2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // x = x2, y = y2;
        let alpha = map(Math.cos(i), -1, 1, 1, 0);
        // alpha = Math.pow(alpha * 32., 0.2)*0.5;
        // alpha = 1;
        alpha = Math.min(1, alpha * 20);
        
        // alpha = Math.pow(alpha * 10000., 0.075) * 0.5;
        vertices.push(x + 1.2, y - 0.47 - 0.24, alpha);
        num++;
        vertices.push(x - 1.2, y - 0.47 - 0.24, alpha);
        num++;
    }
    inc = PI / 500;
     for (let i = Math.PI / 4; i < Math.PI / 4 * 3; i += inc) {
         let sc = 0.75;
    let x = (Math.cos(i) * sc);
    let y = (Math.sin(i) * sc) - Math.sin(Math.PI/4) * sc;
    // ellipse(x + 60, y, 1);
    // vertex(x + 60, y);
         vertices.push(x - 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x - 1.2, -y - 0.25, 1);
         num++;
         vertices.push(x + 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x + 1.2, -y - 0.25, 1);
         num++;
    // ellipse(x - 55, y, 1);
    // ellipse(x + 60, y * -1 + 300 - 17, 1);
    // ellipse(x - 55, y * -1 + 300 - 17, 1);
  }
    for (let i = 0; i < Math.PI*2; i+=(Math.PI*2)/200) {
        let x = Math.cos(i + drawCount) * 0.15;
        let y = Math.sin(i + drawCount) * 0.15;
        vertices.push(x + 1.2, -y - 0.25, 1);
        num++;
        vertices.push(x - 1.2, -y - 0.25, 1);
        num++;
    }
    for (let i = 0; i < vertices.length; i+=3) {
        vertices[i+1] += 0.1;
    }
    this.vertices = new Float32Array(vertices);
    this.size = num;
    this.components = 3;
};


diagram001.update = function(count, alpha = 1) {
    let vertices = [];
    let num = 0;
    let nnn = 1500;
    let sides = 5;
    let inc = (Math.PI * 2) / sides;
    let st = -drawCount * 1e-2;
    // for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
    //     let p0 = [Math.cos(i), Math.sin(i)];
    //     let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
    //     for (let p = 0; p < 1; p += 0.01) {
    //         for (let k = 0; k < 25; k += 5) {
    //         let d = Math.pow(dist(0, p, 1, Math.sin(p * 1.5)), k) * 0.65;
    //         let x = lerp(p0[0], p1[0], p) * 0.5 * d;
    //         let y = lerp(p0[1], p1[1], p) * 0.5 * d;
    //         // vertices.push(x, y, 1);
    //         // num++;
    //         }
    //     }
    // }
    sides = 9;
    inc = (Math.PI * 2) / sides;
    st = -drawCount * 1e-2 - Math.PI;
    st = Math.PI/9/2;
    // st = Math.PI / (sides * 2);
    // Nonafoil Knot
    // Noeud premier à 9 croisements
    // https://katlas.org/wiki/9_1
    for (let i = st; i <= (Math.PI * 2.001) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let pp = 0;
        for (let p = 0; p < 1; p += 0.0075) {
            let d = dist(0, p, 0, 0.5) * 1;
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            for (let m = 0; m < 2; m++) {
                let test = (m) ? 
                    (pp < 30 || pp > 38) : 
                    (pp < 38 || pp > 45);
                if (test) {
                    let sca = Math.pow(0.85, m);
                    sca *= map(Math.abs((p-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
                    // sca *= 1-Math.pow(Math.sin(p * Math.PI),15)*0.2*m;
                    vertices.push(x * sca, y * sca, 1);
                    num++;
                }
            }
            pp++;
        }
    }
        sides = 3;
    inc = (Math.PI * 2) / sides;
    st = Math.PI * 0.5;
    for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
        for (let p = 0; p < 1; p += 0.0025) {
            let x = lerp(p0[0], p1[0], p) * 1;
            let y = lerp(p0[1], p1[1], p) * 1;
            // vertices.push(x * 1.08, -y * 1.08, 1);
            // num++;
            // vertices.push(x * 1.08 * 1.07, -y * 1.08 * 1.07, 1);
            // num++;
        }
    }
    {
        sides = 9;
        inc = (Math.PI * 2) / sides;
        st = Math.PI/9/2;
        let nonaClock = Math.PI*2 - ((drawCount * 7e-3) % (Math.PI * 2));
        let nonaClockDivider = (Math.PI * 2) / sides;
        let nonaSegment = Math.floor(nonaClock / (Math.PI*2/sides))*2;
        let nonaInsideSegment = (nonaClock / (Math.PI*2/sides)) % 1;
        let i = Math.PI*2/sides * nonaSegment + st;
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let x = lerp(p0[0], p1[0], nonaInsideSegment) * 0.5;
        let y = lerp(p0[1], p1[1], nonaInsideSegment) * 0.5;
        let d = dist(0, nonaInsideSegment, 0, 0.5) * 1;
        let m = 0, n = 1;
        let sca = Math.pow(0.85, m);
        sca *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
        let sca2 = Math.pow(0.85, n);
        sca2 *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1, 0.5-n*0.1);
        if (nonaInsideSegment < 0.26 || nonaInsideSegment > 0.32) {
            for (let i = 0; i < 1; i+=(1/20)) {
                let xx = lerp(x * sca, x * sca2, i);
                let yy = lerp(y * sca, y * sca2, i);
                vertices.push(xx, yy, 1);
                num++;
            }
        }
    }
    inc = (Math.PI * 2) / 500;
    for (let i = 0 ; i < Math.PI * 2; i += inc) {
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        vertices.push(x, y, 1);
        num++;
        vertices.push(x * 1.07, y * 1.07, 1);
        num++;
    }
    // Moons
    inc = (Math.PI * 2) / 450;
    for (let i = Math.PI * 0.5 ; i < Math.PI * 2.5; i += inc) {
        // let x = Math.cos(i) * ((i < Math.PI * 1.5) ? 1 : -0.5) * 0.5;
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        let c = Math.cos(Math.PI * 0.65) * 0.8;
        x = (x * 2 > c) ? x : -x + c;
        vertices.push(x * 0.75 + 1.2, y * 0.75 + 0.5, 1);
        num++;
        vertices.push(-x * 0.75 - 1.2, y * 0.75 + 0.5, 1);
        num++;
    }
    // aaa = 1000;
    // teardrop equation
    // http://paulbourke.net/geometry/teardrop/
    inc = (Math.PI * 2) / 250;
    for (let i = 0; i < Math.PI * 2; i += inc) {
        let sc = 0.25;
        // let x = 0.5 * (4 * Math.cos(i * 0.5) * Math.pow(Math.sin(i * 0.5), 4)) * sc; 
        let x = 1.3 * ( Math.cos(i * 0.5)) * Math.pow(Math.sin(i * 0.5), 4) * sc; 
        let y = Math.cos(i) * 0.25;
        // let y2 = Math.cos(i*0.5+Math.PI*0.5) * 0.25 + 0.25;
        // let x2 = Math.sin(i*0.5+Math.PI*0.5) * 0.54;
        // x = lerp(x, x2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // y = lerp(y, y2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // x = x2, y = y2;
        let alpha = map(Math.cos(i), -1, 1, 1, 0);
        // alpha = Math.pow(alpha * 32., 0.2)*0.5;
        // alpha = 1;
        alpha = Math.min(1, alpha * 20);
        
        // alpha = Math.pow(alpha * 10000., 0.075) * 0.5;
        vertices.push(x + 1.2, y - 0.47 - 0.24, alpha);
        num++;
        vertices.push(x - 1.2, y - 0.47 - 0.24, alpha);
        num++;
    }
    inc = PI / 500;
     for (let i = Math.PI / 4; i < Math.PI / 4 * 3; i += inc) {
         let sc = 0.75;
    let x = (Math.cos(i) * sc);
    let y = (Math.sin(i) * sc) - Math.sin(Math.PI/4) * sc;
    // ellipse(x + 60, y, 1);
    // vertex(x + 60, y);
         vertices.push(x - 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x - 1.2, -y - 0.25, 1);
         num++;
         vertices.push(x + 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x + 1.2, -y - 0.25, 1);
         num++;
    // ellipse(x - 55, y, 1);
    // ellipse(x + 60, y * -1 + 300 - 17, 1);
    // ellipse(x - 55, y * -1 + 300 - 17, 1);
  }
    for (let i = 0; i < Math.PI*2; i+=(Math.PI*2)/200) {
        let x = Math.cos(i + drawCount) * 0.15;
        let y = Math.sin(i + drawCount) * 0.15;
        vertices.push(x + 1.2, -y - 0.25, 1);
        num++;
        vertices.push(x - 1.2, -y - 0.25, 1);
        num++;
    }
    for (let i = 0; i < vertices.length; i+=3) {
        vertices[i+1] += 0.1;
    }
    this.vertices = new Float32Array(vertices);
    this.size = num;
    this.components = 3;
};

diagram001.update = function(count, alpha = 1) {
    let vertices = [];
    let num = 0;
    let nnn = 1500;
    let sides = 5;
    let inc = (Math.PI * 2) / sides;
    let st = -drawCount * 1e-2;
    // for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
    //     let p0 = [Math.cos(i), Math.sin(i)];
    //     let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
    //     for (let p = 0; p < 1; p += 0.01) {
    //         for (let k = 0; k < 25; k += 5) {
    //         let d = Math.pow(dist(0, p, 1, Math.sin(p * 1.5)), k) * 0.65;
    //         let x = lerp(p0[0], p1[0], p) * 0.5 * d;
    //         let y = lerp(p0[1], p1[1], p) * 0.5 * d;
    //         // vertices.push(x, y, 1);
    //         // num++;
    //         }
    //     }
    // }
    sides = 9;
    inc = (Math.PI * 2) / sides;
    st = -drawCount * 1e-2 - Math.PI;
    // st = Math.PI / (sides * 2);
    // Nonafoil Knot
    // Noeud premier à 9 croisements
    // https://katlas.org/wiki/9_1
    for (let i = st; i <= (Math.PI * 2.001) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let pp = 0;
        for (let p = 0; p < 1; p += 0.0075) {
            let d = dist(0, p, 0, 0.5) * 1;
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            for (let m = 0; m < 2; m++) {
                let test = (m) ? 
                    (pp < 30 || pp > 38) : 
                    (pp < 38 || pp > 45);
                if (test) {
                    let sca = Math.pow(0.85, m);
                    sca *= map(Math.abs((p-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
                    // sca *= 1-Math.pow(Math.sin(p * Math.PI),15)*0.2*m;
                    vertices.push(x * sca, y * sca, 1);
                    num++;
                }
            }
            pp++;
        }
    }
        sides = 3;
    inc = (Math.PI * 2) / sides;
    st = Math.PI * 0.5;
    for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
        for (let p = 0; p < 1; p += 0.0025) {
            let x = lerp(p0[0], p1[0], p) * 1;
            let y = lerp(p0[1], p1[1], p) * 1;
            // vertices.push(x * 1.08, -y * 1.08, 1);
            // num++;
            // vertices.push(x * 1.08 * 1.07, -y * 1.08 * 1.07, 1);
            // num++;
        }
    }
    inc = (Math.PI * 2) / 500;
    for (let i = 0 ; i < Math.PI * 2; i += inc) {
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        vertices.push(x, y, 1);
        num++;
        vertices.push(x * 1.07, y * 1.07, 1);
        num++;
    }
    // Moons
    inc = (Math.PI * 2) / 450;
    for (let i = Math.PI * 0.5 ; i < Math.PI * 2.5; i += inc) {
        // let x = Math.cos(i) * ((i < Math.PI * 1.5) ? 1 : -0.5) * 0.5;
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        let c = Math.cos(Math.PI * 0.65) * 0.8;
        x = (x * 2 > c) ? x : -x + c;
        vertices.push(x * 0.75 + 1.2, y * 0.75 + 0.5, 1);
        num++;
        vertices.push(-x * 0.75 - 1.2, y * 0.75 + 0.5, 1);
        num++;
    }
    // aaa = 1000;
    // teardrop equation
    // http://paulbourke.net/geometry/teardrop/
    inc = (Math.PI * 2) / 250;
    for (let i = 0; i < Math.PI * 2; i += inc) {
        let sc = 0.25;
        // let x = 0.5 * (4 * Math.cos(i * 0.5) * Math.pow(Math.sin(i * 0.5), 4)) * sc; 
        let x = 1.3 * ( Math.cos(i * 0.5)) * Math.pow(Math.sin(i * 0.5), 4) * sc; 
        let y = Math.cos(i) * 0.25;
        // let y2 = Math.cos(i*0.5+Math.PI*0.5) * 0.25 + 0.25;
        // let x2 = Math.sin(i*0.5+Math.PI*0.5) * 0.54;
        // x = lerp(x, x2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // y = lerp(y, y2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // x = x2, y = y2;
        let alpha = map(Math.cos(i), -1, 1, 1, 0);
        // alpha = Math.pow(alpha * 32., 0.2)*0.5;
        // alpha = 1;
        alpha = Math.min(1, alpha * 20);
        
        // alpha = Math.pow(alpha * 10000., 0.075) * 0.5;
        vertices.push(x + 1.2, y - 0.47 - 0.24, alpha);
        num++;
        vertices.push(x - 1.2, y - 0.47 - 0.24, alpha);
        num++;
    }
    inc = PI / 500;
     for (let i = Math.PI / 4; i < Math.PI / 4 * 3; i += inc) {
         let sc = 0.75;
    let x = (Math.cos(i) * sc);
    let y = (Math.sin(i) * sc) - Math.sin(Math.PI/4) * sc;
    // ellipse(x + 60, y, 1);
    // vertex(x + 60, y);
         vertices.push(x - 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x - 1.2, -y - 0.25, 1);
         num++;
         vertices.push(x + 1.2, y - 0.25, 1);
         num++;         
         vertices.push(x + 1.2, -y - 0.25, 1);
         num++;
    // ellipse(x - 55, y, 1);
    // ellipse(x + 60, y * -1 + 300 - 17, 1);
    // ellipse(x - 55, y * -1 + 300 - 17, 1);
  }
    for (let i = 0; i < Math.PI*2; i+=(Math.PI*2)/200) {
        let x = Math.cos(i + drawCount) * 0.15;
        let y = Math.sin(i + drawCount) * 0.15;
        vertices.push(x + 1.2, -y - 0.25, 1);
        num++;
        vertices.push(x - 1.2, -y - 0.25, 1);
        num++;
    }
    for (let i = 0; i < vertices.length; i+=3) {
        vertices[i+1] += 0.1;
    }
    this.vertices = new Float32Array(vertices);
    this.size = num;
    this.components = 3;
};

// With messages to SCD
diagram001.update = function(count, alpha = 1) {
    let vertices = [];
    let nnn = 1500;
    let sides = 9;
    let inc = (Math.PI * 2) / sides;
    let st = -drawCount * 1e-2;
    st = -drawCount * 1e-2 - Math.PI;
    st = Math.PI / sides / 2;
    // st = Math.PI / (sides * 2);
    // Nonafoil Knot
    // Noeud premier à 9 croisements
    // https://katlas.org/wiki/9_1
    for (let i = st; i <= (Math.PI * 2.001) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let pp = 0;
        for (let p = 0; p < 1; p += 0.0075) {
            let d = dist(0, p, 0, 0.5) * 1;
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            for (let m = 0; m < 2; m++) {
                let test = (m) ? 
                    (pp < 30 || pp > 38) : 
                    (pp < 38 || pp > 45);
                if (test) {
                    let sca = Math.pow(0.85, m);
                    sca *= map(Math.abs((p-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
                    // sca *= 1-Math.pow(Math.sin(p * Math.PI),15)*0.2*m;
                    vertices.push(x * sca, y * sca, 1);
                }
            }
            pp++;
        }
    }
    // sides = 3;
    // inc = (Math.PI * 2) / sides;
    // st = Math.PI * 0.5;
    // for (let i = st; i <= (Math.PI * 2.1) - inc + st; i += inc) {
    //     let p0 = [Math.cos(i), Math.sin(i)];
    //     let p1 = [Math.cos(i + inc), Math.sin(i + inc)];
    //     for (let p = 0; p < 1; p += 0.0025) {
    //         let x = lerp(p0[0], p1[0], p) * 1;
    //         let y = lerp(p0[1], p1[1], p) * 1;
    //         vertices.push(x * 1.08, -y * 1.08, 1);
    //         num++;
    //         vertices.push(x * 1.08 * 1.07, -y * 1.08 * 1.07, 1);
    //         num++;
    //     }
    // }
    function nonafoilSequencer(offset = 0, speed = 1) {
        let sides = 9;
        let inc = (Math.PI * 2) / sides;
        let st = Math.PI / sides / 2;
        let nonaClock = Math.PI * 2 - ((seqCount * speed * 2e-3 + offset) % (Math.PI * 2));
        let nonaClockDivider = (Math.PI * 2) / sides;
        let nonaSegment = Math.floor(nonaClock / inc)*2;
        let nonaInsideSegment = (nonaClock / inc) % 1;
        let i = inc * nonaSegment + st;
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let x = lerp(p0[0], p1[0], nonaInsideSegment) * 0.5;
        let y = lerp(p0[1], p1[1], nonaInsideSegment) * 0.5;
        let d = dist(0, nonaInsideSegment, 0, 0.5) * 1;
        let m = 0, n = 1;
        let sca = Math.pow(0.85, m);
        sca *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1,0.5-m*0.1);
        let sca2 = Math.pow(0.85, n);
        sca2 *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1,0.5-n*0.1);
        x = lerp(x * sca, x * sca2, 0.5);
        y = lerp(y * sca, y * sca2, 0.5);
        if (nonaInsideSegment < 0.25 || nonaInsideSegment > 0.32) {
            for (let i = 0; i < 1; i++) {
                let n = nonaInsideSegment;
                let scaleDot = (n < 0.25 && n > 0.05) ?
                    map(n, 0.05, 0.25, 1, 0.25) :
                    ((n > 0.32 && n < 0.52) ?
                     map(n, 0.32, 0.52, 0.25, 1)
                     : 1);
                vertices.push(x, y, 1 + 3 * scaleDot);
            }
        }
        return nonaInsideSegment;
    }
    let amountOfWalkers = 9*3;
    let segments = [];
    for (let i = 0; i < amountOfWalkers; i++) {
        let ii = i / (Math.PI*2/amountOfWalkers);
        let speed = map(i, 0, amountOfWalkers, 1, 3);
        let s = nonafoilSequencer(ii, 1+i);
        segments.push(s);
    }
    for (let i = 0; i < amountOfWalkers; i++) {
        segments[i] = {type: "f", value: segments[i]};
    }
    msgToSend = {
        address: "/bouncy",
        args: segments
    };
    socket.emit('msgToSCD', msgToSend);
    inc = (Math.PI * 2) / 500;
    for (let i = 0 ; i < Math.PI * 2; i += inc) {
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        vertices.push(x, y, 1);
        vertices.push(x * 1.07, y * 1.07, 1);
    }
    // Moons
    inc = (Math.PI * 2) / 450;
    for (let i = Math.PI * 0.5 ; i < Math.PI * 2.5; i += inc) {
        // let x = Math.cos(i) * ((i < Math.PI * 1.5) ? 1 : -0.5) * 0.5;
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        let c = Math.cos(Math.PI * 0.65) * 0.8;
        x = (x * 2 > c) ? x : -x + c;
        vertices.push(x * 0.75 + 1.2, y * 0.75 + 0.5, 1);
        vertices.push(-x * 0.75 - 1.2, y * 0.75 + 0.5, 1);
    }
    // Teardrop
    // http://paulbourke.net/geometry/teardrop/
    inc = (Math.PI * 2) / 250;
    for (let i = 0; i < Math.PI * 2; i += inc) {
        let sc = 0.25;
        let x = 1.3 * ( Math.cos(i * 0.5)) * Math.pow(Math.sin(i * 0.5), 4) * sc; 
        let y = Math.cos(i) * 0.25;
        // let y2 = Math.cos(i*0.5+Math.PI*0.5) * 0.25 + 0.25;
        // let x2 = Math.sin(i*0.5+Math.PI*0.5) * 0.54;
        // x = lerp(x, x2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // y = lerp(y, y2, Math.cos(drawCount*1e-2)*0.5+0.5);
        // x = x2, y = y2;
        let alpha = map(Math.cos(i), -1, 1, 1, 0);
        // alpha = Math.pow(alpha * 32., 0.2)*0.5;
        // alpha = 1;
        alpha = Math.min(1, alpha * 20);
        // alpha = Math.pow(alpha * 10000., 0.075) * 0.5;
        vertices.push(x + 1.2, y - 0.47 - 0.24, alpha);
        vertices.push(x - 1.2, y - 0.47 - 0.24, alpha);
    }
    inc = Math.PI / 500;
    for (let i = Math.PI / 4; i < Math.PI / 4 * 3; i += inc) {
        let sc = 0.75;
        let x = (Math.cos(i) * sc);
        let y = (Math.sin(i) * sc) - Math.sin(Math.PI/4) * sc;
        vertices.push(x - 1.2,  y - 0.25, 1);
        vertices.push(x - 1.2, -y - 0.25, 1);
        vertices.push(x + 1.2,  y - 0.25, 1);
        vertices.push(x + 1.2, -y - 0.25, 1);
    }
    inc = Math.PI * 2 / 200;
    for (let i = 0; i < Math.PI * 2 - inc; i += inc) {
        let x = Math.cos(i) * 0.15;
        let y = Math.sin(i) * 0.15;
        vertices.push(x + 1.2, -y - 0.25, 1);
        vertices.push(x - 1.2, -y - 0.25, 1);
    }
    for (let i = 0; i < vertices.length; i+=3) {
        vertices[i+1] += 0.1;
    }
    this.vertices = new Float32Array(vertices);
    this.size = vertices.length / 3;
    this.components = 3;
};

// With messages to SCD
diagram001.update = function(count, alpha = 1) {
    let vertices = [];
    let nnn = 1500;
    let sides = 9;
    let inc = (Math.PI * 2) / sides;
    let st = -drawCount * 1e-2;
    st = -drawCount * 1e-2 - Math.PI;
    st = Math.PI / sides / 2;
    // st = Math.PI / (sides * 2);
    // Nonafoil Knot
    // Noeud premier à 9 croisements
    // https://katlas.org/wiki/9_1
    for (let i = st; i <= (Math.PI * 2.001) - inc + st; i += inc) {
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let pp = 0;
        for (let p = 0; p < 1; p += 0.004) {
            let d = dist(0, p, 0, 0.5) * 1;
            let x = lerp(p0[0], p1[0], p) * 0.5;
            let y = lerp(p0[1], p1[1], p) * 0.5;
            for (let m = 0; m < 2; m++) {
                let test = (m) ? 
                    (pp < 56 || pp > 70) : 
                    (pp < 71 || pp > 84);
                if (test) {
                    let sca = Math.pow(0.85, m);
                    sca *= map(Math.abs((p-0.5)*2)*-1+1,0,1,1, 0.5-m*0.1);
                    // sca *= 1-Math.pow(Math.sin(p * Math.PI),15)*0.2*m;
                    vertices.push(x * sca, y * sca, 1);
                }
            }
            pp++;
        }
    }
    function nonafoilSequencer(offset = 0, speed = 1) {
        let sides = 9;
        let inc = (Math.PI * 2) / sides;
        let st = Math.PI / sides / 2;
        let nonaClock = Math.PI * 2 - ((seqCount * speed * 2e-3 + offset) % (Math.PI * 2));
        let nonaClockDivider = (Math.PI * 2) / sides;
        let nonaSegment = Math.floor(nonaClock / inc)*2;
        let nonaInsideSegment = (nonaClock / inc) % 1;
        let i = inc * nonaSegment + st;
        let p0 = [Math.cos(i), Math.sin(i)];
        let a1 = i + (inc * 2) % sides;
        let p1 = [Math.cos(a1), Math.sin(a1)];
        let x = lerp(p0[0], p1[0], nonaInsideSegment) * 0.5;
        let y = lerp(p0[1], p1[1], nonaInsideSegment) * 0.5;
        let d = dist(0, nonaInsideSegment, 0, 0.5) * 1;
        let m = 0, n = 1;
        let sca = Math.pow(0.85, m);
        sca *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1,0.5-m*0.1);
        let sca2 = Math.pow(0.85, n);
        sca2 *= map(Math.abs((nonaInsideSegment-0.5)*2)*-1+1,0,1,1,0.5-n*0.1);
        x = lerp(x * sca, x * sca2, 0.5);
        y = lerp(y * sca, y * sca2, 0.5);
        let amplitude = 0;
        if (nonaInsideSegment < 0.25 || nonaInsideSegment > 0.32) {
            for (let i = 0; i < 1; i++) {
                let n = nonaInsideSegment;
                let scaleDot = (n < 0.25 && n > 0.05) ?
                    map(n, 0.05, 0.25, 1, 0.25) :
                    ((n > 0.32 && n < 0.52) ?
                     map(n, 0.32, 0.52, 0.25, 1)
                     : 1);
                amplitude = scaleDot;
                vertices.push(x, y, 1 + 3 * scaleDot);
            }
        }
        return amplitude;
    }
    let amountOfWalkers = 9*3;
    let segments = [];
    for (let i = 0; i < amountOfWalkers; i++) {
        let ii = i / (Math.PI*2/amountOfWalkers);
        let speed = map(i, 0, amountOfWalkers, 1, 3);
        let s = nonafoilSequencer(ii, 1+i);
        segments.push(s);
    }
    for (let i = 0; i < amountOfWalkers; i++) {
        segments[i] = {type: "f", value: segments[i]};
    }
    msgToSend = {
        address: "/bouncy",
        args: segments
    };
    socket.emit('msgToSCD', msgToSend);
    inc = (Math.PI * 2) / 1500;
    for (let i = 0 ; i < Math.PI * 2 - inc; i += inc) {
        let x = Math.cos(i) * 0.5;
        let y = Math.sin(i) * 0.5;
        vertices.push(x, y, 1);
        vertices.push(x * 1.07, y * 1.07, 1);
    }
    for (let i = 0; i < vertices.length; i+=3) {
        // vertices[i+1] += 0.1;
        vertices[i+0] *= 1.9;
        vertices[i+1] *= 1.9;
    }
    this.vertices = new Float32Array(vertices);
    this.size = vertices.length / 3;
    this.components = 3;
};

diagram001.displayProgram = drawDiagram;
