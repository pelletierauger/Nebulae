(
OSCdef.new(
    \fromnode,
    {
        arg msg, time, addr, port;
        // [msg, time, addr, port].postln;
        var values = msg[1..];
        // values[0].postln;
        values.do({ arg item, i; ~voices[i].set(\segmentPosition, item) });
        // v.set(\segmentPosition, values[0]);
        // d = Synth.new(\pinkTest, [\frequency, msg[1] * 2]);
        // d = Synth.new(\pulseTest, [\frequency, msg[1] * 0.5]);
    },
    '/bouncy'
);
)

v = Synth.new(\voice, [\segmentPosition, 0]);

~voices = Array

~voices = Array.fill(16, {arg i; Synth.new(\voice)});

~voices.do({|item| item.free});


Scale.minor.degrees.wrapExtend(16)
Scale.minor.degrees
(
var values = Scale.minor.degrees.wrapExtend(16);
values = values + 67 + ((0!7)++());
values.do({ arg item, i; ~voices[i].set(\note, item) });
)

v.free;
v.set(\segmentPosition, 0.9)
~toMidi.("A3")

(
SynthDef.new(\voice, {
    arg segmentPosition = 0, note = 57;
    var sig;
    var x = segmentPosition;
    x = abs((x-0.5)*2) * -1 + 1;
    // x = x * x;
    x = pow(x, 0.25);
    // var sig = LFTri.ar(220) * 0.1!2;
    sig = MiBraids.ar(note + Rand(0.0, 0.5),
        timbre: x, color: Rand(0.0, 1.0), model: 14
    );
    sig = VadimFilter.ar(sig, 15000 - (x*14000), 0, 1);
    sig = Balance2.ar(sig, sig, Rand(-0.2, 0.2));
    Out.ar(~reverbBus, sig * 0.1);
}).add;
)


(
SynthDef.new(\voice, {
    arg segmentPosition = 0, note = 57;
    var sig;
    var x = segmentPosition;
    x = abs((x-0.5)*2) * -1 + 1;
    x = x * x;
    sig = LFTri.ar(note.midicps) * 0.1;
    sig = VadimFilter.ar(sig, 15000 - (x*14000), 0, 1);
    sig = Balance2.ar(sig, sig, Rand(-0.2, 0.2));
    Out.ar(0, sig);
}).add;
)

(
~voices.do({|item| item.free});
~voices = Array.fill(16, {arg i; Synth.new(\voice)});
)

((0!7)++(12!7)++(24!2)).size

(
var values = [-12,-5,0,2,3,7,10].wrapExtend(16);
values = values + 47 + ((0!7)++(12!7)++(24!2));
values.postln;
values.do({ arg item, i; ~voices[i].set(\note, item) });
)

[0,1,2][2..]