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

// drawCount = 28050;
drawAlligatorQuiet = function() {
    dotPositions = [];
    let t = ((drawCount * 0.001) + 1e3) + 10;
    let fx = 1, fy = 1, x = 1, y = 1;
    let num = 70000;
    let n = 0;
    let t2 = t * 2e-1;
    let t3 = t * 4e-2;
    let t4 = t * 1.5e1;
    let cfx;
    // dotPositions.push(0,0,1);
    for (let i = 0; i < num; i += 1) {
        let g = Math.tan(i * 50) + Math.cos(1e-4 + i * 1e-5);
        g = g * Math.sin(i * 1e-5 - t3) + i * 1e-6 - t * 2.4e-2;
        x = Math.sin(g * 0.1 * g - t4) * i * 0.75e-4;
        y = Math.cos(g * 0.1 * g - t4) * i * 0.225e-3;
        // cfx = Math.cos(fx * 0.1);
        x += Math.sin(fx * 1.5) * 0.5;
        y += Math.sin(fy * 1.5) * 0.5;
        fx = x;
        fy = y;
            // x += Math.cos(t * 6e5) * i * 0.5e-4;
            // y += Math.sin(t * 6e5) * i * 0.5e-4;
        // x += Math.cos(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * x) * x * 0.1;
        // y += Math.sin(t * (map(Math.sin(t * 1e6), -1, 1, 0, 0.2)) * y) * y * 0.1;
        // if (x < 3.7 && y < 2.5) {
            dotPositions.push(x * 0.14 * (16/9), y * 0.14, i*0.5-drawCount*1e3);
        // }
    }
}