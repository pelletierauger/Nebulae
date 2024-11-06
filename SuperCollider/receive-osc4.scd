s.boot;

(
SynthDef.new(\voice, {
    arg freq = 57, amp = 1;
    var sig;
    var x = \segmentPosition.kr(0, 0.1);
    // x = abs((x-0.5)*2) * -1 + 1;
    x = pow(x, 2);
    sig = SinOsc.ar(freq) * x * amp;
    Out.ar(0, sig!2);
}).add;
)


(
~voices.do({|item| item.free});
~voices = Array.fill(81, {arg i; Synth.new(\voice, [\freq, 55 * 0.5 * (1 + i) * rrand(0.95, 1.05), \amp, 1])});
)


(
~js = {
    | s |
    ~toOSC.sendMsg("/eval", s);
}
)

~toOSC = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr
~toOSC.sendMsg("/eval", "tl()");

(
~twinkleClusters = Task {
var frames = Array.fill(4, {arg i; rrand(0,10000)});
var frameSeq = Pseq(frames, inf).asStream;
{
var frame = frameSeq.next;
~js.("seqCount = " ++ frame);
2.wait;}.loop;}.start;
)

~twinkleClusters.stop;