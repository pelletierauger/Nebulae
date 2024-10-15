xs = {
    ailleurs0: {
        d: 300,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.ailleurs0);
            implosion7.updateAndDisplay(drawCount);
        }
    },
    ailleurs: {
        d: 300,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.ailleurs0);
            var coFade = cosineFade(sum, 100);
            implosion6.mix(rN, implosion7, rN, coFade);
        }
    },
    ailleurs2: {
        d: 600,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.ailleurs0);
            var coFade = cosineFade(sum, 400);
            implosion5.mix(rN, implosion6, rN, coFade);
        }
    },
    ailleurs3: {
        d: 600,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.ailleurs0);
            var coFade = cosineFade(sum, 400);
            implosion6.mix(rN, implosion5, rN, coFade);
        }
    },
    cavern3: {
        d: 1200,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.cavern3);
            tancave2.updateAndDisplay(rN);
        }
    },
    lemRi5: {
        d: 300,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.lemRi5);
            // logJavaScriptConsole(rN);
            lemonRibbon5.updateAndDisplay(rN);
        }
    },
    lemRib: {
        d: 6000,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.lemRi5);
            var rN2 = drawCount - getSum(xs, xs.lemRib);
            var coFade = cosineFade(sum, 400);
            selfDigestingCircle.mix(rN2 - 400, lemonRibbon5, rN, coFade);
        }
    },
    liquef: {
        d: 60000,
        f: function(sum) {
            var rN = drawCount - getSum(xs, xs.liquef);
            var coFade = cosineFade(sum, 200);
            // liquefieur.mix(0, tangentField, 0, coFade);
            // liquefieur.updateAndDisplay(rN);
            implosion26.updateAndDisplay(rN);
        }
    },
    // cavern2: {
    //     d: 200,
    //     f: function(sum) {
    //         var rN = getSum(xSheet, xSheet.cavern2);
    //         var coFade = cosineFade(sum, 100);
    //         grotte2.mix(rN + 100, nouvelleGrotte, 0, coFade);
    //     }
    // },
    // // cavern: {
    // //     d: 600,
    // //     f: function(sum) {
    // //         var rN = getSum(xSheet, xSheet.cavern2);
    // //         var coFade = cosineFade(sum, 100);
    // //         grotte.mix(rN + 400, grotte2, rN + 100, coFade);
    // //     }
    // // },
    // lemRi5: {
    //     d: 300,
    //     f: function(sum) {
    //         var rN = getSum(xSheet, xSheet.lemRi5);
    //         lemonRibbon5.update(rN);
    //     }
    // },
    // lemRib: {
    //     d: 400,
    //     f: function(sum) {
    //         var rN = getSum(xSheet, xSheet.lemRi5);
    //         var rN2 = getSum(xSheet, xSheet.lemRib);
    //         var coFade = cosineFade(sum, 200);
    //         selfDigestingCircle.mix(rN2 + 200, lemonRibbon5, rN, coFade);
    //     }
    // },
    // lemRi4: {
    //     d: 300,
    //     f: function(sum) {
    //         var rN2 = getSum(xSheet, xSheet.lemRib);
    //         var coFade = cosineFade(sum, 100);
    //         lemonRibbon4.mix(0, selfDigestingCircle, rN2 + 200, coFade);
    //     }
    // },
    // lemRi1: {
    //     d: 300,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 200);
    //         lemonRibbon.mix(0, lemonRibbon4, 0, coFade);
    //     }
    // },
    // tanFie: {
    //     d: 200,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 200);
    //         tangentField.mix(0, lemonRibbon, 0, coFade);
    //     }
    // },
    // liquef: {
    //     d: 300,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 200);
    //         liquefieur.mix(0, tangentField, 0, coFade);
    //     }
    // },
    // pasMal1: {
    //     d: 100,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 80);
    //         pasMalCool.mix(0, liquefieur, 0, coFade);
    //     }
    // },
    // spiToE2: {
    //     d: 100,
    //     f: function(sum) {
    //         // info2.html(coFade);
    //         // info3.html("spiraToupEntre.x : " + spiraToupEntre.x);
    //         var coFade = cosineFade(sum, 80);
    //         spiraToupEntre.mix(0, pasMalCool, 0, coFade);
    //     }
    // },
    // // spiToE: {
    // //     d:  100,
    // //     f:  function(sum){
    // //             var rS = getSum(xSheet,xSheet.spiToE);
    // //             var coFade = cosineFade(sum, 80);
    // //             // info2.html(coFade);
    // //             // info3.html("spiraToupEntre.x : " + spiraToupEntre.x);
    // //             spiraToupEntre.mix(rS, pasMalCool, 0, coFade);
    // //         }
    // // },
    // intere: {
    //     d: 300,
    //     f: function(sum) {
    //         // var rS = getSum(xSheet,xSheet.spiToE);
    //         var coFade = cosineFade(sum, 200);
    //         // info3.html("interessant.x : " + interessant.x);
    //         interessant.mix(0, spiraToupEntre, 0, coFade);
    //     }
    // },
    // jusDeb: {
    //     d: 200,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 100);
    //         justeDebile.mix(0, interessant, 0, coFade);
    //     }
    // },
    // spiExt: {
    //     d: 100,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 100);
    //         spiraleExtraMagique2.mix(0, justeDebile, 0, coFade);
    //     }
    // },
    // spiTou: {
    //     d: 200,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 100);
    //         spiraleToupie.mix(0, spiraleExtraMagique2, 0, coFade);
    //     }
    // },
    // // forMag: {
    // //     d:  300,
    // //     f:  function(sum){
    // //             var coFade = cosineFade(sum, 50);
    // //             formuleMagique.mix(0, spiraleToupie, 0, coFade);
    // //         }
    // // },
    // newDim: {
    //     d: 200,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 50);
    //         var rN = getSum(xSheet, xSheet.newDim);
    //         nouvelleDimension.mix(rN, spiraleToupie, 0, coFade);
    //     }
    // },
    // spiEt: {
    //     d: 150,
    //     f: function(sum) {
    //         var rS = getSum(xSheet, xSheet.spiEt);
    //         var rN = getSum(xSheet, xSheet.newDim);
    //         var coFade = cosineFade(sum, 50);
    //         spiraleEtrange.mix(rS + 20, nouvelleDimension, rN, coFade);
    //     }
    // },
    // newDim2: {
    //     d: 400,
    //     f: function(sum) {
    //         var rS = getSum(xSheet, xSheet.spiEt);
    //         var coFade = cosineFade(sum, 30);
    //         nouvelleDimension2.mix(0, spiraleEtrange, rS + 20, coFade);
    //     }
    // },
    // modDim: {
    //     d: 2050,
    //     f: function(sum) {
    //         var coFade = cosineFade(sum, 50);
    //         modulatedDimension.mix(0, nouvelleDimension2, 0, coFade);
    //     }
    // },
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
};

var xSheet2 = {
    1: {
        d: 2000,
        f: function(sum) {
            modulatedDimension.update();
            simple.output(modulatedDimension, 1);
        }
    },
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
};

Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function cosineFade(sum, dur) {
    var fade = map(drawCount, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function runXSheet(sheet) {
    var tL = Object.size(sheet);

    if (drawCount < sheet.key(0).d) {
        sheet.key(0).f();
    } else {
        for (var i = 1; i < tL; i++) {
            var sum = 0;
            for (var ii = 0; ii < i; ii++) {
                sum += sheet.key(ii).d;
            }

            if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
                sheet.key(i).f(sum);
            }
        }
    }
}

function getSum(sheet, prop) {
    var tL = Object.size(sheet);
    var propLocation = 0;
    var sum = 0;
    for (var i = 0; i <  tL; i++) {
        if (sheet.key(i) === prop) {
            propLocation = i;
        }
    }
    for (var ii = 0; ii < propLocation; ii++) {
        sum += sheet.key(ii).d;
    }
    return sum;
}

function queryXSheet(sheet) {
    var tL = Object.size(sheet);

    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            return ("Scene #" + i + ", " + name[i]);
        }
    }
}

function sumXSheet(sheet) {
    var tL = Object.size(sheet);
    var sum = 0;
    for (var i = 0; i < tL - 1; i++) {
        sum += sheet.key(i).d;
    }
    return sum;
}


// Restart the xSheet at the beginning of the scene that is currently playing.
rs = function(sheet, delta = 0) {
    var tL = Object.size(sheet);
    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            let d = getSum(sheet, sheet.key(ii));
            drawCount = d + delta;
        }
    }
};

// Set the xSheet at the beginning of the next scene.
ns = function(sheet, delta = 0) {
    var tL = Object.size(sheet);
    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            let d = getSum(sheet, sheet.key(i));
            drawCount = d + sheet.key(i).d + delta;
            break;
        }
    }
};

// Set the xSheet at the beginning of the previous scene.
ps = function(sheet, delta){
    rs(sheet, -1);
    rs(sheet, delta);
};