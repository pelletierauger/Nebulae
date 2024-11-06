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
        timbre: x, color: Rand(0.0, 1.0), model: 42
    );
    sig = VadimFilter.ar(sig, 20000 - (x*19000), 0, 1);
    sig = Balance2.ar(sig, sig, Rand(-0.2, 0.2));
    Out.ar(~reverbBus, sig * 0.1 * ((2-x)*2));
}).add;
)

(
SynthDef.new(\voice, {
    arg segmentPosition = 0, note = 57;
    var sig, high;
    var x = segmentPosition;
    x = abs((x-0.5)*2) * -1 + 1;
    // x = x * x;
    x = pow(x, 0.25);
    // var sig = LFTri.ar(220) * 0.1!2;
    sig = MiBraids.ar(note + Rand(0.0, 0.5),
        timbre: Rand(0.0, 1.0), color: 1-x, model: 44
    );
    high = VadimFilter.ar(sig, 6000, 0, 5) * 3 * (1-x);
    sig = VadimFilter.ar(sig, 20000 - (x*19000), 0, 1);
    sig = sig + high;
    sig = Balance2.ar(sig, sig, Rand(-0.2, 0.2));
    Out.ar(~reverbBus, sig * 0.1 * ((2-x)*2));
}).add;
)

(
~voices.do({|item| item.free});
~voices = Array.fill(16, {arg i; Synth.new(\voice)});
)
s.mute;
s.unmute;
(
var values = [-12,-5,0,2,3,7,10].wrapExtend(16);
values = values + 47 + ((0!7)++(12!7)++((24)!2));
values.postln;
values.do({ arg item, i; ~voices[i].set(\note, item) });
)


(
~chords = Pseq([
[-12,-5,0,2,3,7,10],
// [-12,-5,0,2,5,7,10],
[-12,-4, -2, 2, 3, 5, 8]
], inf).asStream;
)
~chords.next

(
~twinkleClusters = Task {
{
var values = ~chords.next.wrapExtend(16);
values = values + 47 + ((0!7)++(12!7)++(24!2));
values.postln;
values.do({ arg item, i; ~voices[i].set(\note, item) });
4.wait;}.loop;}.start;
)

~twinkleClusters.stop;