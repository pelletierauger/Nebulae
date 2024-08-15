s.boot;
s.quit;
~ticks.stop;

~toOSC = NetAddr.new("127.0.0.1", 57121); 
~amplitudeBus = Bus.control(s, 1);
~amplitudeBus2 = Bus.control(s, 1);

(
~listen = OSCdef(\listener, {|msg|
        var data = msg[3..];
        // data.postln;
        ~toOSC.sendMsg("/amplitude", data[0]);
}, '/amplitudeListener');
~listen2 = OSCdef(\listener2, {|msg|
        var data = msg[3..];
        // data.postln;
        ~toOSC.sendMsg("/amplitude2", data[0]);
}, '/amplitudeListener2');
~amplitudeCatcher.free;
~amplitudeCatcher = {
    var amp = In.kr(~amplitudeBus, 1);
    // var amp = Amplitude.kr(sig);
    SendReply.kr(Impulse.kr(60), '/amplitudeListener', amp, 1);
}.play;
~amplitudeCatcher2.free;
~amplitudeCatcher2 = {
    var amp = In.kr(~amplitudeBus2, 1);
    // var amp = Amplitude.kr(sig);
    SendReply.kr(Impulse.kr(60), '/amplitudeListener2', amp, 1);
}.play;
)


//------------------------------------
// Inquiet
//------------------------------------
// 
(
~kick.free;
~kick = {
    var sp = 0.125;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(4*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 1, 0, 1], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0
    ], inf));
        var b1 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0], inf));
    var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [2, 3, 5, 8]+2], inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.4), gate: b0);
    var rel = Demand.kr(b, 0, Dwrand([0.1, 0.7], [0.7, 0.3], inf));
    var env2 = EnvGen.kr(Env.perc(0.001, rel), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24, timbre: 0.85, color: 0.5,
        model: 34, trig: b0,
        resamp: 2, ws: 1
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 2
    ], inf));
    sig = ~v.(MiBraids.ar(
        pitch: 62+0+chords-12, timbre: ~lfo.(4,0,0.1), color: 0.5,
        model: 25, trig: t  
    ).sum, 1000, 0, 3) * 0.4 + sig;
    env2 = env2 + CombC.kr(env2, 1, 0.25, 4);
    b = b + CombC.kr(b, 1, 0.25, 4);
    sig = MiBraids.ar(
        pitch:62+melo+12, timbre: 0.5, color: 0.75,
        model: 12, trig: b,
                resamp: 2, decim: 2, bits: 1, ws: Demand.kr(b,0,Dwhite(0, 1, inf))
    ) * env2 * 0.5 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.75, in_gain: 1, spread: 0,
        rvb: 0.8, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.3, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig * 0.5);
}.play;
)
//------------------------------------
// Roucoulant
//------------------------------------
(
~kick.free;
~kick = {
    var sp = 0.125;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(16*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 1, 0, 1], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0
    ], inf));
        var b1 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0], inf));
    // var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [-2, 3, 5, 8]], inf));
    var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [-4, 2, 5, 8]], inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.4), gate: b0);
    var rel = Demand.kr(b, 0, Dwrand([0.1, 0.7], [0.7, 0.3], inf));
    var env2 = EnvGen.kr(Env.perc(0.001, rel), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24-7, timbre: 0.85, color: 0.5,
        model: 34, trig: b0,
        resamp: 2, ws: 1
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 2
    ], inf));
    sig = ~v.(MiBraids.ar(
        pitch: 62+0+chords-12-7, timbre: ~lfo.(4,0,0.1), color: 0.45,
        model: 25, trig: t  
    ).sum, 500, 0, 3) * 0.4 + sig;
    env2 = env2 + CombC.kr(env2, 1, 0.25, 0.5);
    sig = MiBraids.ar(
        pitch:62+melo+36-7, timbre: 0.5, color: 0.5,
        model: 12, trig: b,
                resamp: 0, decim: 12, bits: 2, ws: 0
    ) * env2 * 0.5 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.75, in_gain: 1, spread: 0,
        rvb: 0.8, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.3, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig * 0.5);
}.play;
)

//------------------------------------
// Boueux
//------------------------------------
(
~kick.free;
~kick = {
    var sp = 0.125;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(16*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 1, 0, 1], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0
    ], inf));
        var b1 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0], inf));
    // var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [-2, 3, 5, 8]], inf));
    var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [-4, 2, 5, 8]], inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.4), gate: b0);
    var rel = Demand.kr(b, 0, Dwrand([0.1, 0.7], [0.7, 0.3], inf));
    var env2 = EnvGen.kr(Env.perc(0.001, rel), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24-7, timbre: 0.85, color: 0.5,
        model: 34, trig: b0,
        resamp: 2, ws: 1
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 2
    ], inf));
    sig = ~v.(MiBraids.ar(
        pitch: 62+0+chords-7, timbre: ~lfo.(4,0,0.1), color: 0.45,
        model: 25, trig: t  
    ).sum, 1000, 0, 3) * 0.4 + sig;
    env2 = env2 + CombC.kr(env2, 1, 0.25, 0.5);
    sig = MiBraids.ar(
        pitch:62+melo+12-7, timbre: 0.5, color: 0.5,
        model: 12, trig: b,
                resamp: 0, decim: 12, bits: 2, ws: 0
    ) * env2 * 2 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.75, in_gain: 1, spread: 0,
        rvb: 0.8, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.3, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig * 0.5);
}.play;
)

//------------------------------------



~amplitudeBus = Bus.control(s, 1);
(
~amplitudeCatcher.free;
~amplitudeCatcher = {
    var sig = In.kr(~amplitudeBus, 1);
    var amp = Amplitude.kr(sig);
    SendReply.kr(Impulse.kr(60), '/amplitudeListener', amp, 1);
}.play;
)

~amplitudeBus2 = Bus.control(s, 1);
(
~amplitudeCatcher2.free;
~amplitudeCatcher2 = {
    var sig = In.kr(~amplitudeBus2, 1);
    var amp = Amplitude.kr(sig);
    SendReply.kr(Impulse.kr(60), '/amplitudeListener2', amp, 1);
}.play;
)
~nT.tempo = 1
~ticks.stop
(
~amplitudePlotter.free;
~amplitudePlotter = {
    var sig = In.kr(~amplitudeBus, 1);
    var amp = Amplitude.kr(sig);
    // amp = ;
    amp;
    // SendReply.kr(Impulse.kr(30), '/amplitudeListener', amp, 1);
}.plot(5);
)

(
~kick.free;
~kick = {
    var t = Impulse.kr(0.5);
    var sig = MiBraids.ar(
        pitch: 48, timbre: 0.5, color: 0.5,
        model: 33, trig: t  
    );
        var amp = Amplitude.kr(sig);
        amp;
}.plot(10);
)


(
~kick.free;
~kick = {
    var sp = 0.125;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(16*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 1, 0, 1], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0
    ], inf));
        var b1 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0], inf));
    var chords = Demand.kr(b1, 0, Dseq([[0, 2, 3, 7], [-2, 3, 5, 8]], inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.4), gate: b0);
    var rel = Demand.kr(b, 0, Dwrand([0.1, 0.7], [0.7, 0.3], inf));
    var env2 = EnvGen.kr(Env.perc(0.001, rel), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24, timbre: 0.85, color: 0.5,
        model: 34, trig: b0,
        resamp: 2, ws: 1
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 2
    ], inf));
    sig = ~v.(MiBraids.ar(
        pitch: 62+0+chords-12, timbre: ~lfo.(4,0,0.1), color: 0.45,
        model: 25, trig: t  
    ).sum, 1000, 0, 3) * 0.4 + sig;
    // env2 = env2 + CombC.kr(env2, 1, 0.125, 1);
    sig = ~v.(MiBraids.ar(
        pitch:62+melo+24, timbre: 0.25, color: 0.25,
        model: 25, trig: b,
        resamp: 0, decim: 32, bits: 4, ws: 0
    ), 1000, 0, 5) * env2 * 0.5 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.5, in_gain: 1, spread: 0,
        rvb: 1, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.3, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig!2 * 0.1);
}.play;
)


(
~kick.free;
~kick = {
    var sp = 1;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(4*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 1, 0, 1], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1]++(0!31), inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.5), gate: b0);
    var env2 = EnvGen.kr(Env.perc(0.001, 0.1), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24, timbre: 1, color: 0.95,
        model: 34, trig: b0,
        resamp: 2, decim: 32, bits: 2, ws: 0
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 5,
    0, 2, 3, 2
    ], inf));
    // sig = MiBraids.ar(
    //     pitch: 62+melo-24, timbre: 0.75, color: 0.95,
    //     model: 37, trig: t  
    // ) * env * 4 + sig;
    sig = MiBraids.ar(
        pitch: 47+melo+12+0, timbre: env2, color: env2,
        model: 14, trig: b,
                resamp: 0, decim: 12, bits: 2, ws: 0
    ) * env2 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.75, in_gain: 1, spread: 0,
        rvb: 0.8, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.1, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig!2 * 0.1);
}.play;
)

(
~kick.free;
~kick = {
    var sp = 0.25;
    var t = Impulse.kr(1*sp);
    var t2 = Impulse.kr(4*sp);
    var t3 = Impulse.kr(4*sp);
    var b = t3 * Demand.kr(t3, 0, Dseq([0, 0, 1, 0], inf));
    var b0 = t2 * Demand.kr(t2, 0, Dseq(
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0
    ], inf));
    var env = EnvGen.kr(Env.perc(0.001, 0.4), gate: b0);
    var env2 = EnvGen.kr(Env.perc(0.001, 0.9), gate: b);
    var sig = MiBraids.ar(
        pitch: 62-24-12, timbre: 0.85, color: 0.5,
        model: 34, trig: b0,
        resamp: 2, ws: 1
    );
    var melo = Demand.kr(t, 0, Dseq(
    [0, 2, 3, 5,
    0, 2, 3, 2
    ], inf));
    // sig = MiBraids.ar(
    //     pitch: 62+melo-24, timbre: 0.75, color: 0.95,
    //     model: 37, trig: t  
    // ) * env * 4 + sig;
    sig = MiBraids.ar(
        pitch: 12+melo+ -24, timbre: 0.85, color: 0.125,
        model: 37, trig: b,
                resamp: 2, decim: 12, bits: 3, ws: 0
    ) * env2 + sig;
    sig = MiClouds.ar(
        inputArray: sig, pit: 0, pos: 0,
        size: 0, dens: 0.01, tex: 0.25,
        drywet: 0.75, in_gain: 1, spread: 0,
        rvb: 0.8, fb: 0, freeze: 0,
        mode: 1, lofi: 0
    );
    sig = DelayN.ar(sig, 0.1, 0.05);
    Out.kr(~amplitudeBus, env);
    Out.kr(~amplitudeBus2, env2);
    Out.ar(0, sig!2 * 0.1);
}.play;
)


(
~clean.free;
~clean = {
    Out.kr(~amplitudeBus, 0);
    Out.kr(~amplitudeBus2, 0);
}.play;
)

~toOSC = NetAddr.new("127.0.0.1", 57121); 

(
~listen = OSCdef(\listener, {|msg|
        var data = msg[3..];
        // data.postln;
        ~toOSC.sendMsg("/amplitude", data[0]);
}, '/amplitudeListener');
)
~listen.free;
(
~listen2 = OSCdef(\listener2, {|msg|
        var data = msg[3..];
        // data.postln;
        ~toOSC.sendMsg("/amplitude2", data[0]);
}, '/amplitudeListener2');
)
~listen2.free;
//---------------------------------------------------------------------------



(
~sourceGroup = Group.new;
~fxGroup = Group.after(~sourceGroup);
~volumeBus = Bus.audio(s, 2);
~reverbBus = Bus.audio(s, 2);
)

(
SynthDef.new(\volumeSynth, {
    arg in, out = 0;
    var sig, amp, pitch;
    sig = In.ar(in, 2);
    amp = Amplitude.kr(sig);
//     pitch = Pitch.kr(sig);
    SendReply.kr(Impulse.kr(30), '/amplitudeListener', amp, 1);
    // sig = FreeVerb.ar(sig, 0.5, 0.8, 0.001);
//     sig = sig * 0.9;
//     Out.ar(out, sig);
}).add;
)

(
// ~volSynth.free;
~volSynth = Synth.new(\volumeSynth, [\in, ~volumeBus, \out, 0], ~fxGroup);
)

(
~kick.free;
~kick = {
    var t = Impulse.kr(1);
    var sig = MiBraids.ar(
      pitch: 36, timbre: 0.5, color: 0.5,
        model: 34, trig: t  
    );
    sig!2 * 0.1;
}.play;
)

(
SynthDef.new(\reverb, {
    arg in, out = 0;
    var sig, del;
    sig = In.ar(in, 2);
    del = CombC.ar(in: sig,
    maxdelaytime: 0.1,
    delaytime: [0.25, 0.26],
    decaytime: 20,
    mul: 1, add: 0);
	sig = sig + (del * 0.125);
    Out.ar(out, sig);
    Out.ar(0, sig);
}).add;
)

(
~reverbSynth.free;
~reverbSynth = Synth.new(\reverb, [\in, ~reverbBus, \out, ~volumeBus], ~fxGroup);
)


~reverbSynth;


(
~toOSC = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr
~listen = OSCdef(\listener, {|msg|
        var data = msg[3..];
    // var data = msg;
        // data.postln;
        ~toOSC.sendMsg("/amplitude", data[0]);
}, '/amplitudeListener');
)
~listen.free;


~toOSC = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr
~toOSC.sendMsg("/hello", 0);    // send the application the message "hello" with the parameter "there"



(
~mic = {
    var sig;
    sig = In.ar(2!2);
    sig = sig * 0.1;
	Out.ar(~volumeBus, sig);
}.play;
)
~mic.free;

s.record;
s.stopRecording;


~clock = TempoClock.new(1).permanent_(true);

(
~pulse.stop;
~pulse = Task {
    {
    Synth.new(\lines);
        ~toOSC.sendMsg("/pulse", 0);
        ~toOSC.sendMsg("/newcolor", 0);
        1.wait;
    }.loop;
}.start(~clock, quant: [4]);
)
~pulse.stop;


(
SynthDef.new(\lines, {
var sig;
    sig = Line.ar(1, 0, 0.3, doneAction: 2);
	Out.ar(~volumeBus, sig);
}).add;
)