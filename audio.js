/* ============================================================
   邦多利 FAN SITE — audio.js
   原创合成音乐：不包含任何原曲录音。
   背景 BGM 是 8 小节循环；每首歌的「试听」按乐队风格生成。
   ============================================================ */
(() => {
  "use strict";

  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) {
    window.BandoriAudio = { supported: false };
    return;
  }

  /* ───────────── 基础 ───────────── */

  const BGM_BPM = 108;
  const BGM_STEP = 60 / BGM_BPM / 4; // 16 分音符
  const BGM_BARS = 8;
  const BGM_TOTAL = BGM_BARS * 16;

  // Fmaj7 → G7 → Em7 → Am7 → F → G → C → C
  const BGM_CHORDS = [
    { notes: [53, 57, 60, 64], root: 41 },
    { notes: [55, 59, 62, 65], root: 43 },
    { notes: [52, 55, 59, 62], root: 40 },
    { notes: [57, 60, 64, 67], root: 45 },
    { notes: [53, 57, 60, 64], root: 41 },
    { notes: [55, 59, 62, 65], root: 43 },
    { notes: [52, 55, 60, 64], root: 36 },
    { notes: [52, 55, 60, 64], root: 36 },
  ];

  const PRESETS = {
    popipa: { bpm: 128, minor: false, root: 0, wave: "triangle", lp: 3800 },
    afterglow: { bpm: 132, minor: true, root: 2, wave: "sawtooth", lp: 2400 },
    pasupare: { bpm: 124, minor: false, root: 5, wave: "sine", lp: 6000 },
    roselia: { bpm: 146, minor: true, root: 4, wave: "sawtooth", lp: 3000 },
    hhw: { bpm: 138, minor: false, root: 7, wave: "square", lp: 3200 },
    morfonica: { bpm: 96, minor: false, root: 9, wave: "triangle", lp: 4200 },
    ras: { bpm: 152, minor: true, root: 0, wave: "square", lp: 2600 },
    mygo: { bpm: 126, minor: true, root: 7, wave: "triangle", lp: 3400 },
    avemujica: { bpm: 100, minor: true, root: 3, wave: "sawtooth", lp: 2000 },
  };

  const MAJOR = {
    chords: [
      [0, 4, 7, 12],
      [7, 11, 14, 19],
      [9, 12, 16, 21],
      [5, 9, 12, 17],
    ],
    roots: [0, 7, 9, 5],
  };
  const MINOR = {
    chords: [
      [0, 3, 7, 12],
      [8, 12, 15, 20],
      [3, 7, 10, 15],
      [10, 14, 17, 22],
    ],
    roots: [0, 8, 3, 10],
  };
  const MOTIFS = [
    [0, 2, 1, 3],
    [1, 2, 3, 0],
    [0, 3, 2, 1],
    [2, 1, 3, 2],
  ];

  let ctx = null;
  let master = null;
  let comp = null;
  let bgmBus = null;
  let sfxBus = null;
  let delay = null;
  let noiseBuf = null;

  const bgm = { on: false, timer: null, step: 0, next: 0 };
  const preview = { key: null, timer: null, gain: null };
  let onChange = () => {};

  const nToF = (m) => 440 * Math.pow(2, (m - 69) / 12);

  function emit() {
    try {
      onChange({ bgm: bgm.on, preview: preview.key });
    } catch {
      /* 忽略 UI 回调错误 */
    }
  }

  function init() {
    if (ctx) {
      if (ctx.state === "suspended") ctx.resume();
      return;
    }
    ctx = new AC();
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.9;
    bgmBus = ctx.createGain();
    bgmBus.gain.value = 1;
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.95;

    bgmBus.connect(master);
    sfxBus.connect(master);
    master.connect(comp);
    comp.connect(ctx.destination);

    // 一点点回声，让合成音色不那么干
    delay = ctx.createDelay(0.6);
    delay.delayTime.value = 0.27;
    const fb = ctx.createGain();
    fb.gain.value = 0.24;
    const wet = ctx.createGain();
    wet.gain.value = 0.16;
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(master);

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }

  /* ───────────── 音色 ───────────── */

  function tone({ bus, t, freq, dur, type = "sine", gain = 0.1, attack = 0.008, release = 0.12, detune = 0, lp = 0, echo = 0 }) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.detune.value = detune;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(gain, 0.0002), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + release);

    let node = o;
    if (lp) {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(lp, t);
      f.Q.value = 0.6;
      node.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(bus);
    if (echo) {
      const send = ctx.createGain();
      send.gain.value = echo;
      g.connect(send);
      send.connect(delay);
    }
    o.start(t);
    o.stop(t + dur + release + 0.05);
  }

  function kick(t, bus, gain = 0.45) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(155, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.11);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    o.stop(t + 0.32);
  }

  function snare(t, bus, gain = 0.14) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1900;
    f.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
    src.connect(f);
    f.connect(g);
    g.connect(bus);
    src.start(t);
    src.stop(t + 0.2);
  }

  function hat(t, bus, gain = 0.028) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 7200;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    src.connect(f);
    f.connect(g);
    g.connect(bus);
    src.start(t);
    src.stop(t + 0.08);
  }

  /* ───────────── BGM ───────────── */

  function bgmStep(step, t) {
    const bar = Math.floor(step / 16) % BGM_BARS;
    const s = step % 16;
    const chord = BGM_CHORDS[bar];

    if (s === 0) {
      chord.notes.forEach((n, i) => {
        tone({ bus: bgmBus, t, freq: nToF(n), dur: 1.7, type: "triangle", gain: 0.032, attack: 0.25 + i * 0.02, release: 0.7 });
        tone({ bus: bgmBus, t, freq: nToF(n + 12), dur: 1.2, type: "sine", gain: 0.012, attack: 0.3, release: 0.6 });
      });
    }

    // 琶音
    if (s % 2 === 0) {
      const idx = (s / 2) % chord.notes.length;
      tone({
        bus: bgmBus,
        t,
        freq: nToF(chord.notes[idx] + 12),
        dur: 0.1,
        type: "sine",
        gain: 0.045,
        release: 0.22,
        echo: 0.25,
        lp: 5200,
      });
    }

    // 贝斯
    if (s % 4 === 0) {
      tone({ bus: bgmBus, t, freq: nToF(chord.root), dur: 0.28, type: "triangle", gain: 0.16, release: 0.08 });
    } else if (s % 4 === 2) {
      tone({ bus: bgmBus, t, freq: nToF(chord.root + 7), dur: 0.18, type: "triangle", gain: 0.09, release: 0.06 });
    }

    // 鼓
    if (s === 0 || s === 8) kick(t, bgmBus, 0.4);
    if (s === 4 || s === 12) snare(t, bgmBus, 0.1);
    if (s % 2 === 0) hat(t, bgmBus, s % 4 === 0 ? 0.026 : 0.016);
    if (bar === 7 && s >= 12) snare(t, bgmBus, 0.05 + (s - 12) * 0.012);

    // 偶尔加一颗高音星尘
    if (bar % 4 === 3 && s === 10) {
      tone({ bus: bgmBus, t, freq: nToF(chord.notes[3] + 24), dur: 0.4, type: "sine", gain: 0.018, release: 0.9, echo: 0.4 });
    }
  }

  function pump() {
    if (!ctx || !bgm.on) return;
    if (bgm.next < ctx.currentTime) bgm.next = ctx.currentTime + 0.05;
    while (bgm.next < ctx.currentTime + 0.4) {
      bgmStep(bgm.step, bgm.next);
      bgm.step = (bgm.step + 1) % BGM_TOTAL;
      bgm.next += BGM_STEP;
    }
  }

  function startBgm() {
    init();
    if (bgm.on) return;
    bgm.on = true;
    bgm.step = 0;
    bgm.next = ctx.currentTime + 0.08;
    bgmBus.gain.cancelScheduledValues(ctx.currentTime);
    bgmBus.gain.setTargetAtTime(1, ctx.currentTime, 0.15);
    pump();
    bgm.timer = setInterval(pump, 120);
    emit();
  }

  function stopBgm() {
    if (!bgm.on) return;
    bgm.on = false;
    clearInterval(bgm.timer);
    bgm.timer = null;
    if (ctx) {
      bgmBus.gain.cancelScheduledValues(ctx.currentTime);
      bgmBus.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
    }
    emit();
  }

  /* ───────────── 歌曲试听 ───────────── */

  function stopPreview() {
    if (preview.timer) {
      clearTimeout(preview.timer);
      preview.timer = null;
    }
    if (preview.gain && ctx) {
      preview.gain.gain.cancelScheduledValues(ctx.currentTime);
      preview.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.06);
      const g = preview.gain;
      setTimeout(() => {
        try {
          g.disconnect();
        } catch {
          /* ignore */
        }
      }, 500);
    }
    preview.gain = null;
    preview.key = null;
    if (bgm.on && ctx) bgmBus.gain.setTargetAtTime(1, ctx.currentTime, 0.2);
    emit();
  }

  function previewBar(bar, t, stepDur, preset, key, out, motif) {
    const scale = preset.minor ? MINOR : MAJOR;
    const base = 45 + preset.root;
    const chordRel = scale.chords[bar % 4];
    const chord = chordRel.map((n) => base + n);
    const root = base - 12 + scale.roots[bar % 4];

    // 铺底
    chord.forEach((n, i) => {
      tone({
        bus: out,
        t,
        freq: nToF(n),
        dur: stepDur * 15,
        type: "triangle",
        gain: 0.028,
        attack: 0.12 + i * 0.02,
        release: 0.4,
      });
    });

    for (let s = 0; s < 16; s++) {
      const at = t + s * stepDur;

      // 旋律
      if (s % 2 === 0) {
        const idx = motif[(s / 2) % motif.length];
        const note = chord[idx % chord.length] + 24 + (s >= 8 && bar === 3 ? 12 : 0);
        tone({
          bus: out,
          t: at,
          freq: nToF(note),
          dur: 0.11,
          type: preset.wave,
          gain: 0.085,
          release: 0.18,
          lp: preset.lp,
          echo: 0.3,
        });
      }

      // 琶音
      if (s % 4 === 2) {
        tone({ bus: out, t: at, freq: nToF(chord[s % chord.length] + 12), dur: 0.08, type: "sine", gain: 0.03, release: 0.12, echo: 0.2 });
      }

      // 贝斯
      if (s % 4 === 0) {
        tone({ bus: out, t: at, freq: nToF(root), dur: stepDur * 2.4, type: "triangle", gain: 0.17, release: 0.08 });
      } else if (s % 4 === 2) {
        tone({ bus: out, t: at, freq: nToF(root + 7), dur: stepDur * 1.2, type: "triangle", gain: 0.09, release: 0.06 });
      }

      // 鼓
      if (s === 0 || s === 6 || s === 8) kick(at, out, 0.4);
      if (s === 4 || s === 12) snare(at, out, 0.13);
      if (s % 2 === 0) hat(at, out, s % 4 === 0 ? 0.03 : 0.018);
      if (bar === 3 && s >= 12) snare(at, out, 0.05 + (s - 12) * 0.015);
    }
  }

  function playPreview(key, bandId) {
    init();
    stopPreview();
    const preset = PRESETS[bandId] || PRESETS.popipa;
    const stepDur = 60 / preset.bpm / 4;
    const bars = 4;

    preview.key = key;
    preview.gain = ctx.createGain();
    preview.gain.gain.value = 0.9;
    preview.gain.connect(sfxBus);

    // 试听时把 BGM 压下去
    if (bgm.on) bgmBus.gain.setTargetAtTime(0.18, ctx.currentTime, 0.15);

    let seed = 0;
    for (const ch of key) seed = (seed * 31 + ch.charCodeAt(0)) % 997;
    const motif = MOTIFS[seed % MOTIFS.length];

    const start = ctx.currentTime + 0.08;
    for (let bar = 0; bar < bars; bar++) {
      previewBar(bar, start + bar * 16 * stepDur, stepDur, preset, key, preview.gain, motif);
    }

    const total = bars * 16 * stepDur;
    preview.timer = setTimeout(() => {
      if (preview.key === key) {
        preview.key = null;
        preview.timer = null;
        if (preview.gain) {
          preview.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.1);
          const g = preview.gain;
          preview.gain = null;
          setTimeout(() => {
            try {
              g.disconnect();
            } catch {
              /* ignore */
            }
          }, 600);
        }
        if (bgm.on) bgmBus.gain.setTargetAtTime(1, ctx.currentTime, 0.3);
        emit();
      }
    }, (total + 0.5) * 1000);
    emit();
  }

  /* ───────────── 对外接口 ───────────── */

  window.BandoriAudio = {
    supported: true,
    toggleBgm() {
      if (bgm.on) stopBgm();
      else startBgm();
    },
    isBgmOn: () => bgm.on,
    togglePreview(key, bandId) {
      if (preview.key === key) stopPreview();
      else playPreview(key, bandId);
    },
    stop: () => {
      stopBgm();
      stopPreview();
    },
    onChange(fn) {
      onChange = typeof fn === "function" ? fn : () => {};
    },
  };
})();
