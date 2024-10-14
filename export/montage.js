var fs = require('fs');
let computedInput = "";
let fileName = "montage";

let sequences = [{
        path: `/Volumes/Volumina/frames/neon-summer/nebulae-03/nebulae-03-`,
        start: 1,
        end: 720,
        copies: 1
    }, {
        path: `/Volumes/Volumina/frames/neon-summer/nebulae-01/nebulae-01-`,
        start: 1,
        end: 600,
        copies: 1
    }, {
        path: `/Volumes/Volumina/frames/neon-summer/nebulae-02/nebulae-02-`,
        start: 1,
        end: 480,
        copies: 1
    }, {
        path: `/Volumes/Volumina/frames/neon-summer/nebulae-04/nebulae-04-`,
        start: 1,
        end: 480,
        copies: 1
    }, {
        path: `/Volumes/Volumina/frames/neon-summer/nebulae-05/nebulae-05-`,
        start: 1,
        end: 720,
        copies: 1
    }
];


for (s of sequences) {
    for (let f = s.start; f <= s.end; f++) {
        var formattedF = "" + f;
        while (formattedF.length < 5) {
            formattedF = "0" + formattedF;
        }
        let line = `file '${s.path}${formattedF}.png'\n`;
        for (let i = 0; i < s.copies; i++) {
            computedInput += line;
        }
    }
}

fs.writeFile(fileName + '.txt', computedInput, function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log(fileName + '.txt written successfully.');
    }
});