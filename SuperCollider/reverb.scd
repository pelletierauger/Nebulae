~reverbBus = Bus.audio(s, 2);

(
x.set(\gate, 0, \fadeTime, 0.1);
x = {
    | freeze = 0 |
    var sig = In.ar(~reverbBus, 2);
    var verb = MiClouds.ar(
        inputArray: sig,        pit: 0,            pos: 0,
        size: 0.5,             dens: 0.0,         tex: 0.25,
        drywet: 1,              in_gain: 1,        spread: 1,
        rvb: 1,                 fb: 0.25,          freeze: freeze,
        mode: 1,                lofi: 0
    );
    verb = ~v.(verb, 2000, 0, 1) * 0.5;
    // verb = ~v.(verb, 100, 0, 5) * 1.5;
    sig + verb;
}.play;
)