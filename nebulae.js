let simpleChaoticSpiral = new Nebula(75000, 3);

simpleChaoticSpiral.update = function(count, alpha = 1) {
    let t = count * 1e-1;
    let x = 1, y = 1, a = 0, fx = 1, fy = 1;
    for (let i = 0; i < 75000; i += 1) {
        a = Math.tan(i * 1e2) + i * 1e-5 + t * 0.1;
        x = Math.sin(a) * i * 0.5e-4;
        y = Math.cos(a) * i * 1.5e-4;
        x += Math.sin(fx * 4 + fy * 2) * 0.1;
        y += Math.sin(fy * 4 + fy * 2) * 0.1;
        fx = x;
        fy = y;
        // dotPositions.push(x * 0.18, y * 0.18, alpha);
        this.vertices[i * 3] = x * 0.18;
        this.vertices[i * 3 + 1] = y * 0.18;
        this.vertices[i * 3 + 2] = alpha;
    }
};

let divineSpiral = new Nebula(75000, 3);

divineSpiral.update = function(count, alpha = 1) {
    let t = count * 0.00125 * 0.00005 * 1.5;
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
        // dotPositions.push(x * 0.18, y * 0.18, z);
        this.vertices[i * 3] = x * 0.18;
        this.vertices[i * 3 + 1] = y * 0.18;
        this.vertices[i * 3 + 2] = alpha;
    }
};