/* Scene engine: renders one real app screen into #stage and plays a real, code-driven
   animation on it (taps, typing, pull-to-refresh, screen transitions, live chart).
   Controlled by the parent page via postMessage {play}/{stop}; autoplays when standalone. */
(function () {
  const stage = document.getElementById('stage');
  const qs = new URLSearchParams(location.search);
  const SNAME = qs.get('s') || 'home';
  const SEQ = qs.get('seq') || SNAME;
  const STATIC = qs.get('static'); // render the finished frame instantly (for screenshots)

  let run = null; // current run token

  function newRun() { return { alive: true, timers: [] }; }
  const sleep = (ms) => new Promise((ok, no) => {
    if (!run || !run.alive) return no('stop');
    const r = run;
    const t = setTimeout(() => (r.alive ? ok() : no('stop')), ms);
    r.timers.push(t);
  });

  // (re)build the base screen layer
  function mountBase() {
    stage.innerHTML = '';
    const layer = document.createElement('div');
    layer.className = 'layer base';
    layer.innerHTML = SCREENS[SNAME] ? SCREENS[SNAME]() : '';
    stage.appendChild(layer);
    if (SNAME === 'hl') {
      const ch = layer.querySelector('[data-chart]');
      if (ch) {
        candles(ch, 3412.8, 11);
        if (STATIC) { const cg = ch.querySelector('[data-candles]'); cg.style.transition = 'none'; cg.style.clipPath = 'inset(0 0 0 0)'; ch.classList.add('drawn'); }
        else requestAnimationFrame(() => ch.classList.add('drawn'));
      }
    }
    return layer;
  }

  // the finger lives in <body> (viewport space) so getBoundingClientRect coords map directly to it
  const fingerEl = document.createElement('div');
  fingerEl.className = 'finger';
  document.body.appendChild(fingerEl);
  const finger = () => fingerEl;

  let base = mountBase();

  // ---- gesture kit (coordinates are real px in the 390×844 frame) ----
  const kit = {
    wait: sleep,
    async tap(x, y) {
      const f = finger();
      f.className = 'finger';
      void f.offsetWidth;
      f.style.left = x + 'px'; f.style.top = y + 'px';
      f.classList.add('tap');
      await sleep(330);
    },
    async tapEl(el, dx = 0, dy = 0) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      await kit.tap(r.left + r.width / 2 + dx, r.top + r.height / 2 + dy);
    },
    async holdEl(el, ms) {
      if (!el) return;
      const f = finger(), r = el.getBoundingClientRect();
      f.className = 'finger';
      void f.offsetWidth;
      f.style.left = (r.left + r.width / 2) + 'px'; f.style.top = (r.top + r.height / 2) + 'px';
      f.classList.add('hold');
      await sleep(ms);
      f.className = 'finger';
    },
    async type(el, text, ms = 60) {
      for (const ch of text) { el.textContent += ch; await sleep(ms); }
    },
    async count(el, from, to, ms, fmt) {
      const steps = Math.round(ms / 35);
      for (let i = 0; i <= steps; i++) {
        const p = 1 - (1 - i / steps) ** 3;
        el.textContent = fmt(from + (to - from) * p);
        await sleep(35);
      }
    },
    // pull-to-refresh: a spinner drops in over the scrollable body and springs back
    async refresh(cur) {
      const ptr = document.createElement('div');
      ptr.className = 'ptr'; ptr.innerHTML = '<span class="spin"></span>';
      cur.appendChild(ptr);
      const area = cur.querySelector('[data-refreshable]');
      void ptr.offsetWidth;
      ptr.classList.add('show');
      if (area) { area.style.transition = 'transform .35s cubic-bezier(.2,.8,.2,1)'; area.style.transform = 'translateY(26px)'; }
      await sleep(900);
      ptr.classList.remove('show');
      if (area) { area.style.transform = ''; }
      await sleep(450);
      ptr.remove();
    },
    // transition to another screen (push|pop|tab|scroll), becomes the new base
    async goTo(name, mode = 'push') {
      const cur = stage.querySelector('.layer.base');
      const next = document.createElement('div');
      next.className = 'layer next go-' + mode + '-next';
      next.innerHTML = SCREENS[name]();
      cur.classList.add('go-' + mode + '-cur');
      stage.insertBefore(next, stage.querySelector('.finger'));
      void next.offsetWidth;
      await sleep(30);
      next.classList.add('go'); cur.classList.add('go');
      await sleep(520);
      cur.remove();
      next.className = 'layer base';
      return next;
    },
    toggle(sw, mode) { // mode: 'on' | 'nope'
      sw.classList.add(mode);
      if (mode === 'nope') setTimeout(() => sw.classList.remove('nope'), 500);
    },
  };

  // ---- candlestick generator for the Hyperliquid chart ----
  function candles(chart, startPrice, seedN) {
    const VW = 360, VH = 150, N = 42, S = VW / N;
    const hi = startPrice * 1.012, lo = startPrice * 0.988, rng = hi - lo;
    const yOf = (p) => VH - ((p - lo) / rng) * VH;
    let seed = seedN;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const C = []; let c = startPrice;
    for (let i = N - 1; i >= 0; i--) {
      const o = Math.min(hi, Math.max(lo, c + (rnd() - 0.5) * rng * 0.28));
      const h = Math.max(o, c) + rnd() * rng * 0.08, l = Math.min(o, c) - rnd() * rng * 0.08;
      C[i] = { o, h, l, c }; c = o;
    }
    const grid = [0.2, 0.4, 0.6, 0.8].map((f) => `<line x1="0" x2="${VW}" y1="${VH * f}" y2="${VH * f}"/>`).join('');
    const bars = C.map((q, i) => {
      const x = i * S + S / 2, up = q.c >= q.o, col = up ? '#3fb950' : '#f0524f';
      const top = yOf(Math.max(q.o, q.c)), bh = Math.max(1.2, Math.abs(yOf(q.o) - yOf(q.c)));
      return `<line x1="${x}" x2="${x}" y1="${yOf(q.h)}" y2="${yOf(q.l)}" stroke="${col}" stroke-width="1"/>` +
        `<rect x="${x - 2.4}" y="${top}" width="4.8" height="${bh}" fill="${col}"/>`;
    }).join('');
    chart.querySelector('[data-grid]').innerHTML = grid;
    chart.querySelector('[data-candles]').innerHTML = bars;
    return { C, N, S, yOf, pOf: (y) => lo + (1 - y / VH) * rng, VW, VH };
  }

  // ---- scenes ----
  const SCENES = {
    async hero(cur) {
      const push = document.createElement('div');
      push.className = 'pushnote';
      push.innerHTML = `<img src="../icon.png" alt=""><div class="pn"><div class="pnt">GitWallet<em>now</em></div><div class="pns">Received +20 TRX on Tron</div></div>`;
      cur.appendChild(push);
      void push.offsetWidth; push.classList.add('in');
      await sleep(850);
      const amt = cur.querySelector('[data-amt]');
      const base0 = 48199.29, money = (v) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      await kit.count(amt, base0, base0 + 20, 850, money);
      amt.style.color = 'var(--green)'; amt.style.transition = 'color .4s';
      await sleep(600);
      push.classList.remove('in');
      await sleep(350);
      await kit.tapEl(cur.querySelector('[data-act=swap]'));
      await kit.goTo('swap', 'push');
    },
    async home(cur) {
      await kit.refresh(cur);
      await sleep(250);
      await kit.tapEl(cur.querySelectorAll('.t')[4]);
      await kit.goTo('settings', 'tab');
    },
    async swap(cur) {
      const give = cur.querySelector('[data-give]'), get = cur.querySelector('[data-get]');
      await kit.tapEl(give);
      give.classList.add('has'); get.classList.add('has');
      await kit.count(give, 0, 0.5, 700, (v) => v.toFixed(3));
      await kit.count(get, 0, 182.4, 700, (v) => v.toFixed(2));
      await sleep(400);
      const chips = cur.querySelectorAll('[data-slip]');
      await kit.tapEl(chips[1]);
      chips.forEach((c) => c.classList.remove('on')); chips[1].classList.add('on');
      await sleep(900);
    },
    async send(cur) {
      await sleep(500);
      const f2 = cur.querySelector('[data-flash2]');
      f2.style.transition = 'box-shadow .5s'; f2.style.boxShadow = '0 0 0 2px var(--yellow)';
      await sleep(900); f2.style.boxShadow = '';
      await sleep(500);
      const btn = cur.querySelector('[data-review]');
      await kit.tapEl(btn);
      btn.style.transition = 'filter .2s'; btn.style.filter = 'brightness(1.25)';
      await sleep(260); btn.style.filter = '';
      await sleep(900);
    },
    async history(cur) {
      await kit.refresh(cur);
      await sleep(250);
      const rows = cur.querySelectorAll('.hrow');
      const target = rows[0];
      target.classList.add('press');
      await kit.holdEl(target, 650);
      const sheet = document.createElement('div');
      sheet.className = 'sheet';
      sheet.innerHTML = `<div class="grab"></div><div class="sh">${ICONS.spark}Assistant</div><p>An incoming transfer of 1,200 USDT on Tron from TQn9…b7Rk. The sender looks like an exchange payout address.</p>`;
      cur.appendChild(sheet);
      void sheet.offsetWidth; sheet.classList.add('up');
      await sleep(2000);
      target.classList.remove('press');
    },
    async assistant(cur) {
      const inp = cur.querySelector('[data-inp]'), chat = cur.querySelector('[data-chat]');
      await kit.tapEl(cur.querySelector('[data-mic]'));
      const mic = cur.querySelector('[data-mic]'); mic.classList.add('rec');
      inp.textContent = ''; inp.classList.add('typed');
      await kit.type(inp, 'How much money do I have?', 45);
      mic.classList.remove('rec');
      await sleep(250);
      await kit.tapEl(cur.querySelector('[data-send]'));
      chat.innerHTML = '';
      chat.style.justifyContent = 'flex-end';
      const me = add(chat, 'bub me', 'How much money do I have?');
      inp.textContent = 'For example: swap 0.1 ETH for BNB'; inp.classList.remove('typed');
      await sleep(500);
      const dots = add(chat, 'bub ai', '<span class="typing"><b></b><b></b><b></b></span>');
      await sleep(1200);
      dots.innerHTML = 'About <b>$48,219</b> in total — BTC $18,462, ETH $11,662, BNB $7,438, plus others. Want a full breakdown?';
      await sleep(2200);
    },
    async aikeys(cur) {
      const key = cur.querySelector('[data-key]'), tx = cur.querySelector('[data-keytx]'), suf = cur.querySelector('[data-keysuffix]');
      await kit.tapEl(key);
      key.classList.add('focus'); suf.style.display = 'none';
      tx.innerHTML = '';
      await kit.type(tx, 'AIzaSy', 55);
      await kit.type(tx, '••••••••••••••••', 20);
      tx.insertAdjacentHTML('beforeend', '<span class="caret"></span>');
      await sleep(300);
      const btn = cur.querySelector('[data-save]');
      await kit.tapEl(btn);
      btn.innerHTML = '<span class="spin w"></span> Checking…';
      await sleep(1100);
      btn.innerHTML = ICONS.check + ' Key saved';
      key.classList.remove('focus');
      await sleep(1200);
    },
    async bot(cur) {
      const bal = cur.querySelector('[data-botbal]');
      const money = (v) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      await kit.count(bal, 5131.78, 5240.18, 900, money);
      await sleep(600);
      await kit.tapEl(cur.querySelector('[data-botset]'));
      await kit.goTo('botsettings', 'push');
    },
    async botsettings(cur) {
      const chips = cur.querySelectorAll('.chip');
      await kit.tapEl(chips[1]);
      chips.forEach((c) => c.classList.remove('on')); chips[1].classList.add('on');
      await sleep(600);
      const sw = cur.querySelector('[data-train]');
      await kit.tapEl(sw);
      sw.classList.remove('on');
      await sleep(900);
      await kit.tapEl(sw);
      sw.classList.add('on');
      await sleep(900);
    },
    async hl(cur) {
      const chart = cur.querySelector('[data-chart]');
      const px = cur.querySelector('[data-px]');
      let geo = candles(chart, 3412.8, 11);
      void chart.offsetWidth; chart.classList.add('drawn');
      // live ticking price
      (async () => {
        let p = 3412.8;
        for (let i = 0; i < 20 && run && run.alive; i++) {
          await sleep(560);
          const d = Math.round((Math.random() - 0.45) * 8 * 10) / 10;
          p += d;
          px.textContent = '$' + p.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          px.className = 'px ' + (d >= 0 ? 'up' : 'down');
        }
      })().catch(() => {});
      await sleep(1100);
      // switch timeframe 15m -> 1h : redraw
      const tfs = cur.querySelectorAll('[data-tf]');
      await kit.tapEl(tfs[2]);
      tfs.forEach((t) => t.classList.remove('on')); tfs[2].classList.add('on');
      chart.classList.remove('drawn');
      await sleep(60);
      geo = candles(chart, 3412.8, 29);
      void chart.offsetWidth; chart.classList.add('drawn');
      await sleep(1000);
      // crosshair drag across candles
      const box = chart.getBoundingClientRect();
      const ptag = chart.querySelector('[data-ptag]');
      chart.classList.add('cross');
      const f = finger();
      f.className = 'finger'; void f.offsetWidth; f.classList.add('hold');
      const steps = 46;
      for (let i = 0; i <= steps && run && run.alive; i++) {
        const p = i / steps, e = p < .5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        const cx = 0.14 + e * 0.72; // fraction across chart
        const yFrac = 0.35 + 0.3 * Math.sin(e * 6);
        chart.style.setProperty('--cx', (cx * 100) + '%');
        chart.style.setProperty('--cy', (yFrac * 100) + '%');
        f.style.left = (box.left + box.width * cx) + 'px';
        f.style.top = (box.top + box.height * yFrac) + 'px';
        ptag.style.top = (yFrac * 100) + '%';
        ptag.textContent = geo.pOf(geo.VH * yFrac).toFixed(1);
        await sleep(36);
      }
      f.className = 'finger';
      chart.classList.remove('cross');
      await sleep(400);
      // Long -> Short
      const ls = cur.querySelector('[data-ls]');
      const long = ls.querySelector('.long'), short = ls.querySelector('.short');
      await kit.tapEl(short);
      long.className = 'b long'; long.style.background = 'transparent'; long.style.color = 'var(--green)'; long.style.border = '1px solid var(--line)';
      short.style.background = 'var(--red)'; short.style.color = '#fff'; short.style.border = 'none';
      await sleep(1400);
    },
    async token(cur) {
      const pr = cur.querySelector('[data-prompt]'), ph = cur.querySelector('[data-ph]');
      await kit.tapEl(pr);
      pr.classList.add('focus'); ph.remove();
      const tx = document.createElement('span'); tx.innerHTML = ''; pr.appendChild(tx);
      tx.insertAdjacentHTML('afterend', '<span class="caret"></span>');
      await kit.type(tx, 'A Gold Cat token, 1 million, 2% of transfers to my wallet', 32);
      await sleep(300);
      const btn = cur.querySelector('[data-fill]');
      await kit.tapEl(btn);
      btn.innerHTML = '<span class="spin w"></span> Claude is filling in the form…';
      await sleep(1200);
      btn.innerHTML = ICONS.spark + ' Fill in the form';
      cur.querySelector('[data-f-name]').innerHTML = 'Gold Cat';
      cur.querySelector('[data-f-ticker]').innerHTML = 'GCAT';
      await sleep(900);
      await kit.goTo('tokenfeatures', 'scroll');
    },
    async tokenfeatures(cur) {
      const sws = cur.querySelectorAll('.switch');
      for (const sw of [sws[1], sws[3]]) {
        await kit.tapEl(sw);
        sw.classList.add('on');
        await sleep(600);
      }
      await sleep(800);
    },
  };

  function add(chat, cls, html) {
    const b = document.createElement('div');
    b.className = cls; b.innerHTML = html;
    chat.appendChild(b);
    return b;
  }

  // ---- control ----
  function stop() {
    if (run) { run.alive = false; run.timers.forEach(clearTimeout); run = null; }
    fingerEl.className = 'finger';
    base = mountBase();
  }
  async function play() {
    stop();
    run = newRun();
    const fn = SCENES[SEQ];
    if (!fn) return;
    try { await fn(stage.querySelector('.layer.base')); }
    catch (e) { /* stopped */ }
  }

  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.gw === 'play') play();
    else if (d.gw === 'stop') stop();
  });

  if (window.top === window.self && !STATIC) {
    // standalone: autoplay in a loop so the file can be opened directly
    const loop = async () => { await play(); setTimeout(loop, 1600); };
    setTimeout(loop, 500);
  } else if (window.top === window.self) {
    // static: render the clean base screen once, no scene (for screenshots)
  } else {
    // embedded: tell the parent we're ready to receive play/stop
    try { parent.postMessage({ gw: 'ready', seq: SEQ }, '*'); } catch (e) { /* noop */ }
  }
})();
