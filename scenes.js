drawAlligatorQuiet = function(selectedProgram) {
    dotPositions = [];
    for (let i = 0; i < 4; i++) {
        let x = Math.cos(i-drawCount * 1e-2) * i * 9e-2;
        let y = Math.sin(i-drawCount * 1e-2) * i * 9e-2;
        dotPositions.push(x, y, 0);
    }
}

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = ((drawCount * 0.00125) + 1e3) * 5e-5 + 10;
    let fx = 1, fy = 1, x = 1, y = 1;
    let num = 70000;
    let n = 0;
    // dotPositions.push(0,0,1);
    for (let i = 0; i < num; i += 1) {
        let g = Math.tan(i * 50 + t * 1e4) + Math.cos(fx * 1e-4 + i * 1e-4);
        g = g * Math.sin(i * 1e-4-t*4e5) + i * 1e-5 + t * 2.4;
        x = Math.sin(g * 0.01 * g+t) * i * 0.00005 * 1.5;
        y = Math.cos(g * 0.01 * g+t) * i * 0.00015 * 1.5;
        x += Math.sin(fx * 1.5) * 0.5 * Math.cos(fx * 0.1);
        y += Math.sin(fy * 1.5) * 0.5 * Math.cos(fx * 0.1);
        fx = x;
        fy = y;
            // x += Math.cos(t * 6e5) * i * 0.5e-4;
            // y += Math.sin(t * 6e5) * i * 0.5e-4;
        // x += Math.cos(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * x) * x * 0.1;
        // y += Math.sin(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * y) * y * 0.1;
        if (x < 3.7 && y < 2.5) {
            dotPositions.push(x * 1.5 * 0.18 + 0, y * 0.8 * 0.15 + 0.7, 1.0);
        }
    }
}

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = ((drawCount * 0.00125) + 1e3) * 5e-5 + 10;
    let fx = 1, fy = 1, x = 1, y = 1;
    let num = 70000;
    let n = 0;
    // dotPositions.push(0,0,1);
    for (let i = 0; i < num; i += 1) {
        let g = Math.tan(i * 50 + t * 1e4) + Math.cos(fx * 1e-4 + i * 1e-4);
        g = g * Math.sin(i * 1e-4-t*4e5) + i * 1e-5 + t * 2.4;
        x = Math.sin(g * 0.01 * g+t) * i * 0.00005 * 1.5;
        y = Math.cos(g * 0.01 * g+t) * i * 0.00015 * 1.5;
        x += Math.sin(fx * 1.5) * 0.5 * Math.cos(fx * 0.1);
        y += Math.sin(fy * 1.5) * 0.5 * Math.cos(fx * 0.1);
        fx = x;
        fy = y;
            // x += Math.cos(t * 6e5) * i * 0.5e-4;
            // y += Math.sin(t * 6e5) * i * 0.5e-4;
        // x += Math.cos(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * x) * x * 0.1;
        // y += Math.sin(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * y) * y * 0.1;
        // if (x < 3.7 && y < 2.5) {
            dotPositions.push(x * 1.5 * 0.18 + 0, y * 0.8 * 0.15 + 0.7, i);
        // }
    }
}

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = ((drawCount * 0.001) + 1e3) + 10;
    let fx = 1, fy = 1, x = 1, y = 1;
    let num = 85000;
    let n = 0;
    let t2 = t * 2e-1;
    let t3 = t * 4e-2;
    let t4 = t * 1.5e1;
    let cfx;
    for (let i = 0; i < num; i += 1) {
        let g = Math.tan(i * 50) + Math.cos(1e-4 + i * 1e-5);
        g = g * Math.sin(i * 1e-5 - t3) + i * 1e-6 - t * 2.4e-2;
        x = Math.sin(g * 0.1 * g - t4) * i * 0.75e-4;
        y = Math.cos(g * 0.1 * g - t4) * i * 0.225e-3;
        x += Math.sin(fx * 1.5) * 0.5;
        y += Math.sin(fy * 1.5) * 0.5;
        fx = x;
        fy = y;
        dotPositions.push(x * 0.1, y * 0.1, i*0.5-drawCount*1e3);
    }
};

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = ((drawCount * 0.001) + 1e3) + 10;
    let fx = 1, fy = 1, x = 1, y = 1;
    let num = 74000;
    let t2 = t * 2e-1;
    let t3 = t * 4e-2;
    let t4 = t * 1.5e1;
    let t5 = t * 5;
    for (let i = 0; i < num; i += 1) {
        let g = Math.tan(i * 50) + Math.cos(1e-4 + i * 1e-5);
        g = g * Math.sin(i * 1e-5 - t5) + i * 1e-6 - t * 2.4e-2;
        x = Math.sin(g * 0.1 * g - t4) * i * 0.75e-4;
        y = Math.cos(g * 0.1 * g - t4) * i * 0.225e-3;
        x += Math.sin(fx * 1.5) * 0.5;
        y += Math.sin(fy * 1.5) * 0.5;
        fx = x;
        fy = y;
        dotPositions.push(x * 0.12, y * 0.12, i*0.5-drawCount*1e3);
    }
};

drawAlligatorQuiet = function() {
    dotPositions = [];
    // let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    // let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00125 * 0.00005 * 1.5 + 10;
    let t2 = t * 1e1 * 2000;
    let xOffset = openSimplex.noise2D(t2, t2 + 1000);
    let yOffset = openSimplex.noise2D(t2 - 1000, t2 + 500);
    t2 = (t2 + 5000) * 100;
    let xOffset2 = openSimplex.noise2D(t2, t2 + 1000);
    let yOffset2 = openSimplex.noise2D(t2 - 1000, t2 + 500);
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    // let al = map(sin(t * 1e6), -1, 1, 0.1, 1);
    let t3 = t * 1e5;
    let al = map(openSimplex.noise2D(t3, t3 + 1000), -1, 1, 0.5, 1);
    for (let i = 0; i < 60000; i += 1) {
        let ax = Math.pow(Math.cos(fx * 1e-4 + i * 1e-4), -1);
        let ay = Math.pow(Math.cos(fx * 1e-4 + i * 1e-4), -1);
        let aax = 0.5 - ax;
        let aay = 0.5 - ay;
        x = Math.sin(Math.tan(i * 24.9 + t * 1e-1) * aax * Math.sin(i * 1e-10 + ax * 0.35) + i * 1e-5 + t * 11e4) * i * 0.00005 * 1.5;
        y = Math.cos(Math.tan(i * 24.9 + t * 1e-1) * aay * Math.sin(i * 1e-10 + ax * 0.35) + i * 1e-5 + t * 11e4) * i * 0.00015 * 1.5;
        x *= Math.sin(fx * 0.05) + Math.cos(fy * 0.05);
        y *= Math.sin(fy * 0.05) + Math.cos(fy * 0.05);
        fx = x;
        fy = y;
        x += Math.cos(t * -1e6 * 0.25) * i * 0.125e-4 * 2;
        y += Math.sin(t * -1e6 * 0.25) * i * 0.125e-4 * 3;
        dotPositions.push(x * 1.5 * 0.15, y * 0.8 * 0.15 * 1.1, i);
    }
};

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = drawCount * 0.00125 * 0.00005 * 1.5 + 10;
    let x = 0, y = 0, fx = 0, fy = 0;
    let a = 0, b = 0, c = 0;
    for (let i = 0; i < 70000; i += 1) {
        let ax = Math.pow(Math.cos(fx * 1e-4 + i * 1e-4), -1);
        let aax = 0.5 - ax;
        a = Math.tan(i * 24.9 + t * 1e-1);
        b = a * aax * Math.sin(i * 1e-10 + ax * 0.35);
        x = Math.sin(b + i * 1e-5 + t * 11e4) * i * 0.00005 * 1;
        y = Math.cos(b + i * 1e-5 + t * 11e4) * i * 0.00015 * 1;
        c = Math.cos(fy * 0.05);
        x *= Math.sin(fx * 0.05) + c;
        y *= Math.sin(fy * 0.05) + c;
        fx = x;
        fy = y;
        // x += Math.cos(t * -2.5e5) * i * 2.25e-5;
        // y += Math.sin(t * -2.5e5) * i * 2.25e-5;
        dotPositions.push(x * 0.18, y * 0.18, i);
    }
};

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = drawCount * 0.00125 * 0.00005 * 1.5;
    let x = 0, y = 0, fx = 0, fy = 0;
    let a = 0, b = 0, c = 0;
    for (let i = 0; i < 70000; i += 1) {
        let ax = Math.pow(Math.cos(i * 1e-4), -1);
        let aax = 0.5 - ax;
        a = Math.tan(i * 24.9);
        b = a * aax * Math.sin(i * 1e-10 + ax * 0.35);
        x = Math.sin(b + t * 1e5) * i * 0.5e-4;
        y = Math.cos(b + t * 1e5) * i * 1.5e-4;
        c = Math.cos(fy * 0.05);
        x *= fx * 0.05 + c;
        y *= fy * 0.05 + c;
        fx = x;
        fy = y;
        dotPositions.push(x * 0.18, y * 0.18, i);
    }
};

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = drawCount * 0.00125 * 0.00005 * 1.5;
    let x = 0, y = 0, fx = 0, fy = 0;
    let a = 0, b = 0, c = 0;
    for (let i = 0; i < 80000; i += 1) {
        let ax = Math.pow(Math.cos(i * 1e-4), -1);
        let aax = 0.5 - ax;
        a = Math.tan(i * 2.9);
        b = a * aax * Math.sin(i * 1e-10 + ax * 0.35);
        x = Math.sin(b + t * 1e5) * i * 0.5e-4;
        y = Math.cos(b + t * 1e5) * i * 1.5e-4;
        c = Math.cos(fy * 0.05);
        x *= fx * 0.05 + c;
        y *= fy * 0.05 + c;
        fx = x;
        fy = y;
        dotPositions.push(x * 0.18, y * 0.18, i);
    }
};

if (false) {

drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = drawCount * 0.00125 * 0.00005 * 1.5;
    let x = 0, y = 0, z = 0, fx = 0, fy = 0;
    let a = 0, b = 0, c = 0;
    for (let i = 0; i < 80000; i += 1) {
        let ax = Math.pow(Math.cos(i * 1e-4), -1);
        let aax = 0.5 - ax;
        a = Math.tan(i * 2.9);
        b = a * aax * Math.sin(i * 1e-10 + ax * 0.35);
        x = Math.sin(b + t * 1e5) * i * 0.5e-4;
        y = Math.cos(b + t * 1e5) * i * 1.5e-4;
        z = Math.cos(t * 1e5) * i * 1.5e-5;
        c = Math.cos(fy * 0.05);
        x *= fx * 0.05 + c;
        y *= fy * 0.05 + c;
        z *= fy;
        fx = x;
        fy = y;
        dotPositions.push(x * 0.18, y * 0.18, z);
    }
};

}