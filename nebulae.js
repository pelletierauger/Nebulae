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

let formuleMagique = new Nebula(1000, 3);

formuleMagique.update = function(count, alpha = 1) {
    var m = Math.sin(count / 20) / 100;
    for (let i = 0; i < this.size; i++) {
        let t = i / 10;
        let x = Math.cos(t) * Math.sin(t / 2) * (Math.sin(t * (2 + m)) / 4) * 2400 * i / 1000;
        let y = Math.pow(Math.sin(t / 2), 3) * Math.cos(t / 20) * 350;
        this.vertices[i * 3] = x * 2.65e-3;
        this.vertices[i * 3 + 1] = y * 2.65e-3;
        this.vertices[i * 3 + 2] = alpha;
    }
};

formuleMagique.displayProgram = drawPointillismBig;

let spiraleEnvoutante = new Nebula(3000, 3);

spiraleEnvoutante.update = function(count, alpha = 1) {
    count *= 1e-1;
    var m = Math.sin(count / 20) / 100;
    for (let i = 0; i < this.size; i++) {
        let t = i / 10;
        let x = Math.sin(t * (2 + m)) * Math.asin(t * (m / 4)) * 800 * i / 1000;
        let y = Math.cos(t * (2 + m)) * Math.asin(t * (m / 4)) * 350;
        this.vertices[i * 3] = x * 8e-3;
        this.vertices[i * 3 + 1] = y * 8e-3;
        this.vertices[i * 3 + 2] = alpha;
    }
};

spiraleEnvoutante.displayProgram = drawPointillismBig;



let aaaHaaa = new Nebula(5000, 3);

aaaHaaa.update = function(count, alpha = 1) {
    // count *= 1e-1;
    var m = Math.sin(count / 57000) * 2;
    for (let i = 0; i < this.size; i++) {
        let t = i / 300;
        let x = Math.tan(t * (-50 + (m / 20))) * Math.sin(t * 16 * m) * Math.sin(t) * 200 * i / 5000;
        let y = Math.cos(t * (-50 + (m / 20))) * Math.tan(t * 4 * m / 2) * m * i * 100;
        this.vertices[i * 3] = x * 8e-3;
        this.vertices[i * 3 + 1] = y * 8e-3;
        this.vertices[i * 3 + 2] = alpha;
    }
};

aaaHaaa.update = function(count, alpha = 1) {
    // count *= 1e-1;
    
    let zoom = map(count, 0, 1000, 1, 2);
    count += 2000;
    var m = Math.sin(count / 57000) * 2;
    for (let i = 0; i < this.size; i++) {
        let t = i / 3000;
        let x = Math.tan(t * 1e2 * (-50 + m)) * Math.sin(t * 16 * m) * 100 * i / 5000;
        let y = Math.cos(t * 1e2 * (-50 + m)) * Math.tan(t * 4 * m) * i * 1e-1;
        this.vertices[i * 3] = x * 8e-3 * zoom;
        this.vertices[i * 3 + 1] = y * 8e-3 * zoom;
        this.vertices[i * 3 + 2] = alpha;
    }
};

aaaHaaa.update = function(count, alpha = 1) {
    // count *= 1e-1;
    
    let zoom = map(count, 0, 1000, 1, 2);
    count += 2000;
    var m = Math.sin(count / 57000) * 2;
    for (let i = 0; i < this.size; i++) {
        let t = i / 3000;
        let x = Math.sin(t * 1e2 * (-50 + m)) * 100 * i / 5000;
        let y = Math.cos(t * 1e2 * (-50 + m)) * Math.tan(t * 4 * m) * i * 4e-1;
        this.vertices[i * 3] = x * 8e-3 * zoom;
        this.vertices[i * 3 + 1] = y * 8e-3 * zoom;
        this.vertices[i * 3 + 2] = alpha;
    }
};

aaaHaaa.displayProgram = drawPointillismBig;
