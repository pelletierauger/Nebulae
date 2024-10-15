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
    count += 3e3;
    
    let zoom = map(count, 0, 1000, 1, 2);
    count += 2000;
    var m = Math.sin(count / 57000) * 2;
    for (let i = 0; i < this.size; i++) {
        let t = i / 3000;
        let x = Math.sin(t * 1e2 * (-50 + m)) * 100 * i / 5000;
        let y = Math.cos(t * 1e2 * (-50 + m)) * Math.tan(t * 4 * m) * i * 4e-1;
        this.vertices[i * 3] = x * 2e-3 * zoom;
        this.vertices[i * 3 + 1] = y * 2e-3 * zoom;
        // this.vertices[i * 3 + 2] = 0.75;
        let al = map(i, 0, this.size, 0, 1);
        al = Math.pow(al * 2, 0.5);
        // al = Math.pow(al * 6, 0.28);
        this.vertices[i * 3 + 2] = al;
    }
};

aaaHaaa.displayProgram = drawPointillismBig;

let implosion5 = new Nebula(5000, 3);

implosion5.update = function(count, alpha = 1) {
    var m = -count / 70;
    for (let i = 0; i < this.size; i++) {
        let t = i;
        let x = Math.pow(Math.cos(Math.cos(t + m)), 0.5) * Math.tan(t + m) * 120;
        let y = Math.pow(Math.sin(Math.sin(t + m)), 1) * Math.tan(t + m) * 0.1 * t;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0);
    }
};

implosion5.displayProgram = drawPointillismBig;

let implosion6 = new Nebula(5000, 3);

implosion6.update = function(count, alpha = 1) {
    var m = -count / 70;
    for (let i = 0; i < this.size; i++) {
        let t = i;
        let x = Math.pow(Math.sin(Math.sin(t + m)), 1) * Math.tan(t + m) * 0.1 * t;
        let y = Math.pow(Math.cos(Math.cos(t * t + m)), 0.5) * Math.tan(t + m) * 120;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0);
    }
};

implosion6.displayProgram = drawPointillismBig;

let implosion7 = new Nebula(5000, 3);

implosion7.update = function(count, alpha = 1) {
    // count *= 0.25e-1;
    
    let zoom = map(count, 0, 1000, 1, 2);
    // count += 2000;
    var m = -count / 70;
    for (let i = 0; i < this.size; i++) {
        let t = i / 1;
        let x = Math.pow(Math.sin(Math.sin(t + m)), 1) * Math.tan(t + m) * 0.1 * t;
        let y = Math.pow(Math.cos(Math.cos(t + m)), 0.5) * Math.tan(t) * 120;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0);
    }
};

implosion7.displayProgram = drawPointillismBig;

let nouvelleGrotte = new Nebula(5000, 3);

nouvelleGrotte.update = function(count, alpha = 1) {
    // var m = count / 70;
    var m = Math.sin((count) / 200) / 25;
    for (let i = 0; i < this.size; i++) {
        let t = i / 100;
        let x = Math.pow(Math.cos(t / 20 * (m * 5)), 100) * Math.pow(Math.sin(t / 20), 1) * 1050 - 200;
        let y = Math.pow(Math.sin(t / 2 * (m * 5)), 5) / Math.sin(t * 10) * Math.cos(t * m * 300) * 150;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 1);
    }
};

nouvelleGrotte.displayProgram = drawPointillismBig;
nouvelleGrotte.setSize(1000);

let tremplin7 = new Nebula(3000, 3);

tremplin7.update = function(count, alpha = 1) {
    // var m = count / 70;
    let m = Math.sin(count / 20);
    for (let i = 0; i < this.size; i++) {
        let t = i / 2000;
        let x = Math.tan(t * -200) / Math.cos(t * m) * Math.sin(t + m) * 200 * i / 8000;
        let y = Math.sin(t * -100) / Math.sin(t * m) * Math.tan(t / 10) * m * i / 1;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 1);
    }
};

tremplin7.update = function(count, alpha = 1) {
    // var m = count / 70;
    let c = count * 1e-2;
    // let m = Math.sin(count / 20);
    // m = count * 1e-4;
    let m = 1;
    for (let i = 0; i < this.size; i++) {
        let t = i * 0.0005;
        let x = Math.tan(t * -200 + c) / Math.cos(t * m) * 200 * i * 1.25e-4;
        let y = Math.sin(t * -100) / Math.sin(t * m) * Math.tan(t * 0.1) * m * i;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 0.65, 1.5);
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1.1, 0.5);
    }
};

tremplin7.displayProgram = drawPointillismBig;
tremplin7.setSize(3000);

if (false) {

implosion7.update = function(count, alpha = 1) {
    var m = count / 70;
    for (let i = 0; i < this.size; i++) {
        let t = i / 1;
        let x = Math.pow(Math.sin(Math.sin(t + m)), 1) * Math.tan(t + m) * 0.1 * t;
        let y = Math.pow(Math.cos(Math.cos(t + m)), 4) * Math.tan(t) * 120;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0);
    }
};

implosion7.setSize(25000);

}

let iterative001 = new Nebula(75000, 3);

iterative001.update = function(count, alpha = 1) {
    // count *= 0.25e-1;
    let vals = [1, 1, 1.1, 1, 2, 1];
    vals[0] = Math.sin(count * 0.0167);
    vals[1] = Math.cos(count * 0.0167);
    let x = 0, y = 0, z = 0;
    var m = count / 70;
    for (let i = 0; i < this.size; i++) {
        let newX = Math.sin(vals[0] * x) + Math.tan(vals[1] * y) - Math.tan(vals[2] * z);
        let newY = Math.sin(vals[3] * x) - Math.tan(vals[5] * z);
        x = newX, y = newY, z += 0.1;
        this.vertices[i * 3] = x * 0.5e-3 * 4;
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0);
    }
};


let tancave2 = new Nebula(3000, 3);

tancave2.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    let m = Math.sin((count) / 20000) * 1;
    for (let i = 0; i < this.size; i++) {
        let t = i / 10;
        let x = Math.sin(t * (2 + m)) * Math.cos(t * (m / 4)) * 800 * i / 4000;
        let y = Math.cos(t * (2 + m)) * Math.cos(t * (m / 4)) * 350;
        this.vertices[i * 3] = x * 0.5e-3 * 4 * (9/16);
        this.vertices[i * 3 + 1] = y * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 0.75, 1);
    }
};

tancave2.displayProgram = drawPointillismBig;
tancave2.setSize(3000);

if (false) {

tancave2.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    let m = Math.sin((count) / 20000) * 1;
    for (let i = 0; i < this.size; i++) {
        let t = i / 10;
        let x = Math.sin(t * (2 + m)) * Math.cos(t * (m / 4)) * 800 * i / 4000;
        let y = Math.cos(t * (2 + m)) * Math.cos(t * (m / 4)) * 350;
        this.vertices[i * 3] = y * 0.65e-3 * 4 * (9/16);
        this.vertices[i * 3 + 1] = x * 1e-3 * 4;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 0.75, 1);
    }
};

}


let lemonRibbon5 = new Nebula(3000, 3);

lemonRibbon5.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    var m = Math.sin(count / 15000) / 10;
    for (let i = 0; i < this.size; i++) {
        let t = i / 20;
        let x = Math.cos(t * (m * 10)) * Math.sin(t) * 600;
        let y = Math.sin(t * (m * 10)) / Math.sin(t) / Math.cos(t) * 150;
        this.vertices[i * 3] = x * 0.5e-3 * 3.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 3.1;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0.5);
    }
};

lemonRibbon5.displayProgram = drawPointillismBig;

lemonRibbon5.setSize(3000);


let selfDigestingCircle = new Nebula(3000, 3);

selfDigestingCircle.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    var m = Math.sin(count / 20000) / 15;
    for (let i = 0; i < this.size; i++) {
        let t = i / 20;
        let x = Math.pow(Math.cos(t * (m * 10)), 3) * Math.sin(t) * 550;
        let y = Math.pow(Math.cos(t * (m * 10)), 10) * Math.cos(t) * 350;
        this.vertices[i * 3] = x * 0.5e-3 * 3.3 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 0.85, 0.65);
        this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

selfDigestingCircle.displayProgram = drawPointillismBig;


let liquefieur = new Nebula(3000, 3);

liquefieur.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    var m = Math.sin(count / 300) / 5;
    m = count * 1e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 2;
        let x = Math.cos(t + (m * 10)) * 250 * t / 1000;
        let y = Math.sin(t + (m * 40)) * 250;
        this.vertices[i * 3] = x * 0.5e-3 * 3.3 * 1.3 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5 * 1.3;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 1);
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

liquefieur.displayProgram = drawPointillismBig;
liquefieur.displayProgram = drawPointillism;




let citronVar1 = new Nebula(3000, 3);

citronVar1.update = function(count, alpha = 1) {
    // var m = count / 70;
    // var m = Math.sin((count) / 200) / 25;
    var m = Math.sin(count / 700) / 5;
    m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 2;
        let x = Math.sin(t + (m * 50)) * Math.tan(t + (m * 2)) * 400 * t / 1000;
        let y = Math.pow(Math.sin(t - (m * 50)), 1) * Math.cos(t) * 350;
        this.vertices[i * 3] = x * 0.5e-3 * 3.3 * 1.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5 * 1;
        this.vertices[i * 3 + 2] = map(i, 0, this.size, 1, 0.5);
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

citronVar1.displayProgram = drawPointillismBig;


let nouvelleDimension = new Nebula(3000, 3);

nouvelleDimension.update = function(count, alpha = 1) {
    var m = Math.sin(-count / 700) / 5;
    m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 2;
        let x = Math.tan(t + (m * 50)) * 400 * t / 1000;
        let y = Math.pow(Math.sin(t - (m * 50)), 3) * 350;
        this.vertices[i * 3] = x * 0.25e-3 * 3.3 * 1.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5 * 1;
        let a = map(i, 0, this.size, 0, 1);
        a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

nouvelleDimension.displayProgram = drawPointillismBig;


let nouvelleDimension2 = new Nebula(3000, 3);

nouvelleDimension2.update = function(count, alpha = 1) {
    var m = Math.sin(-count / 700) / 5;
    m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 2;
        let x = Math.tan(t + (m * 50)) * 400 * t / 1000;
        let y = Math.pow(Math.tan(t - (m * 50)), 3) * 350;
        this.vertices[i * 3] = x * 0.25e-3 * 3.3 * 1.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5 * 1;
        let a = map(i, 0, this.size, 1, 0);
        a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

nouvelleDimension2.displayProgram = drawPointillismBig;


let plantesFormidables = new Nebula(3000, 3);

plantesFormidables.update = function(count, alpha = 1) {
    var m = Math.sin(-count / 700) / 5;
    // m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 100;
        let x = (Math.sin(t + (m * 50)) * 5) * (Math.cos(t - m) / m) * 400 * t / 1000;
        let y = Math.pow(Math.tan(t - (m * 50)), 3) * Math.sin(t - m) * 350;
        this.vertices[i * 3] = x * 0.25e-3 * 3.3 * 1.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 2.5 * 1;
        let a = map(i, 0, this.size, 1, 0);
        // a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

plantesFormidables.displayProgram = drawPointillismBig;
plantesFormidables.setSize(3000)


let grandlointain = new Nebula(3000, 3);

grandlointain.update = function(count, alpha = 1) {
    var m = Math.sin(count / 700) * 2;
    let z = 20 + Math.sin(m / 10) * 100;
    // m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 30;
        let x = Math.asin(constrain((t + m + i / 10000), -1, 1)) * Math.tan(t + m * 15) * Math.cos(t + m) * i / z;
        let y = Math.asin(constrain((t + m + i / 10000), -1, 1)) * Math.tan(t + m * 15) * Math.sin(t + m) * i / z;
        this.vertices[i * 3] = x * 0.25e-3 * 16 * 1.1 * (9/16);
        this.vertices[i * 3 + 1] = y * -1e-3 * 16 * 1;
        let a = map(i, 0, this.size, 1, 0);
        // a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

grandlointain.displayProgram = drawPointillismBig;
grandlointain.setSize(3000)


let implosion26 = new Nebula(3000, 3);

implosion26.update = function(count, alpha = 1) {
    var m = Math.sin(count / 7000) * 2;
    m = count * 5e-4;
    m = 254.03;
    var z = 5 + Math.sin(m / 10) * 100;
    // m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 30;
        let x = Math.cos(t + m + i / 10000) * Math.tan(t + m * 15) * Math.cos(t + m + i * 10) * i / z;
        let y = Math.cos(t + m + i / 10000) * Math.tan(t + m * 15) * Math.sin(t + m + i * 10) * i / z;
        this.vertices[i * 3] = x * 0.3e-3 * 16 * 1;
        this.vertices[i * 3 + 1] = y * -1e-3 * 16 * 1;
        let a = map(i, 0, this.size, 1, 0.5);
        // a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

implosion26.update = function(count, alpha = 1) {
    var m = Math.sin(count / 7000) * 2;
    m = count * 5e-4;
    m = 254.03;
    var z = 5 + Math.sin(m / 10) * 100;
    // m = count * 0.25e-3;
    for (let i = 0; i < this.size; i++) {
        let t = i / 30;
        let b = Math.cos(t + i / 1000 + count * 1e-2);
        let x = b * Math.cos(t + i * 10) * i;
        let y = b * Math.sin(t + i * 10) * i;
        this.vertices[i * 3] = x * 0.3e-3 * 0.2 * 1;
        this.vertices[i * 3 + 1] = y * -1e-3 * 0.2 * 1;
        let a = map(i, 0, this.size, 1, 0);
        a = Math.pow(a * 12, 0.28)*0.5;
        this.vertices[i * 3 + 2] = a;
        // this.vertices[i * 3 + 2] = Math.sin(i * 1e-1 + count * 1e-1)*0.5+0.5;
    }
};

implosion26.displayProgram = drawPointillismBig;
implosion26.setSize(5000)