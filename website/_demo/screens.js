/* Screen templates — faithful markup of each GitWallet screen, English only.
   Each SCREENS[name]() returns the inner HTML of one .layer (no wrapper). */
(function () {
  const L = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains';
  const logo = {
    btc: L + '/bitcoin/info/logo.png',
    eth: L + '/ethereum/info/logo.png',
    bnb: L + '/smartchain/info/logo.png',
    sol: L + '/solana/info/logo.png',
    trx: L + '/tron/info/logo.png',
    usdt: L + '/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  };

  // icon set (lucide-style, stroked)
  const S = (p, o) => `<svg class="i" width="${(o && o.s) || 22}" height="${(o && o.s) || 22}" viewBox="0 0 24 24" fill="${(o && o.fill) || 'none'}" stroke="${(o && o.fill) ? 'none' : 'currentColor'}" stroke-width="${(o && o.w) || 1.9}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ic = {
    caretDown: S('<path d="M12 15 6 9h12z"/>', { fill: 1, s: 15 }),
    expand: S('<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>', { s: 21 }),
    eye: S('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7"/><circle cx="12" cy="12" r="3"/>', { s: 22, w: 1.8 }),
    up: S('<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>', { s: 23, w: 2 }),
    down: S('<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>', { s: 23, w: 2 }),
    swap: S('<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>', { s: 23, w: 2 }),
    more: S('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>', { s: 23, w: 2.4 }),
    filter: S('<line x1="4" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="6" y1="18" x2="14" y2="18"/>', { s: 16, w: 2 }),
    back: S('<path d="m15 18-6-6 6-6"/>', { s: 24, w: 2 }),
    qr: S('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v7M14 21h7"/>', { s: 20 }),
    check: S('<path d="M20 6 9 17l-5-5"/>', { w: 2 }),
    warn: S('<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
    lock: S('<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', { s: 18 }),
    spark: S('<path d="M12 2c.4 4.6 2.4 7.6 8 10-5.6 2.4-7.6 5.4-8 10-.4-4.6-2.4-7.6-8-10 5.6-2.4 7.6-5.4 8-10Z"/>', { fill: 1, s: 20 }),
    mic: S('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>', { s: 22 }),
    sendmsg: S('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', { s: 20 }),
    muted: S('<path d="M16 9a5 5 0 0 1 .95 2.9"/><path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6a1.4 1.4 0 0 1-1 .4H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/><line x1="22" y1="2" x2="2" y2="22"/>', { s: 20 }),
    gear: S('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', { s: 20 }),
    chat: S('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>', { s: 18 }),
    chart: S('<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>', { s: 18 }),
    play: S('<path d="m6 3 14 9-14 9z"/>', { fill: 1, s: 18 }),
    stop: S('<rect x="5" y="5" width="14" height="14" rx="2"/>', { s: 18 }),
    search: S('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', { s: 18 }),
  };

  // bottom tab bar, active = wallet|swap|history|contracts|settings
  function tabbar(active) {
    const t = [
      ['wallet', 'Wallet', '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'],
      ['swap', 'Swap', '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>'],
      ['history', 'History', '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>'],
      ['contracts', 'Contracts', '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'],
      ['settings', 'Settings', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'],
    ];
    return '<div class="tb">' + t.map(([k, lab, p]) =>
      `<div class="t${k === active ? ' on' : ''}">${S(p, { s: 22, w: 1.8 })}${lab}</div>`).join('') + '</div>';
  }

  const SCREENS = {
    home: () => `
      <div class="screen">
        <div class="top">
          <img class="cat" src="assets/cat.png" alt="">
          <div class="wn">Wallet 2</div><span class="cr">${ic.caretDown}</span>
          <div class="spacer"></div><span class="exp">${ic.expand}</span>
        </div>
        <div class="bal">
          <div class="amt" data-bal><span data-amt>$48,219.29</span> <span class="eye">${ic.eye}</span></div>
          <div class="chg">+$1,284.30 · +2.74% <span class="m">24h</span></div>
        </div>
        <div class="acts">
          <div class="act p" data-act="send"><div class="c">${ic.up}</div><div class="l">Send</div></div>
          <div class="act"><div class="c">${ic.down}</div><div class="l">Receive</div></div>
          <div class="act" data-act="swap"><div class="c">${ic.swap}</div><div class="l">Swap</div></div>
          <div class="act"><div class="c">${ic.more}</div><div class="l">More</div></div>
        </div>
        <div class="tabs">
          <div class="tab on">Assets<b>16</b></div><div class="tab">NFT</div>
          <div class="nf">All networks ${ic.filter}</div>
        </div>
        <div class="list" data-refreshable>
          ${row(logo.btc, 'BTC', '$80,261.46', 'g', '+0.79%', '$18,462.35', '0.2301')}
          ${row(logo.eth, 'ETH', '$2,332.42', 'g', '+1.14%', '$11,662.10', '5.0010')}
          ${row(logo.bnb, 'BNB', '$743.81', 'g', '+0.75%', '$7,438.10', '10.00')}
          ${row(logo.sol, 'SOL', '$100.70', 'd', '-0.24%', '$5,035.00', '50.00')}
          ${row(logo.trx, 'TRX', '$0.3285', 'd', '-0.76%', '$3,285.00', '10,000')}
          ${rowErc(logo.usdt, 'USDT', 'ERC-20', '$0.9984', '$2,336.74', '2,340.5')}
        </div>
        <div class="spacer"></div>
      </div>${tabbar('wallet')}`,

    swap: () => `
      <div class="screen">
        <div class="hdr"><div class="ctr">GitWallet</div></div>
        <div class="seg"><div class="thumb"></div>
          <div class="opt on">${ic.swap} Dex</div><div class="opt">${ic.chart} Hyperliquid</div></div>
        <div class="swapbox">
          <div class="top"><span>You give</span><span class="maxv">Balance: 0 <b>Max</b></span></div>
          <div class="mid"><div class="tokpick"><img src="${logo.bnb}"><div><div class="tk">BNB</div><div class="tn">BNB Smart Chain</div></div> <span class="cr">${ic.caretDown}</span></div>
            <div class="swapamt" data-give>0</div></div>
        </div>
        <div class="swapdir" data-dir>${S('<path d="M7 10 3 14l4 4"/><path d="M3 14h14a4 4 0 0 0 4-4"/><path d="m17 14 4-4-4-4"/><path d="M21 10H7a4 4 0 0 0-4 4"/>', { s: 20, w: 1.9 })}</div>
        <div class="swapbox">
          <div class="top"><span>You get</span></div>
          <div class="mid"><div class="tokpick"><img src="${logo.usdt}"><div><div class="tk">USDT</div><div class="tn">BEP-20</div></div> <span class="cr">${ic.caretDown}</span></div>
            <div class="swapamt" data-get>0</div></div>
        </div>
        <div class="chip-row"><span class="label" style="margin:0">Slippage</span>
          <div class="chips"><span class="chip on" data-slip="0.5">0.5%</span><span class="chip" data-slip="1">1%</span><span class="chip" data-slip="3">3%</span></div></div>
        <div class="spacer"></div>
        <button class="btn btn-green" style="margin-bottom:14px">${ic.swap} Swap</button>
      </div>${tabbar('swap')}`,

    send: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>Send USDT</h1></div>
        <div class="label" style="margin-top:6px">Amount</div>
        <div class="field big" style="font-size:30px;font-weight:600"><span data-amt>250.00</span><span class="suffix" style="font-size:16px">USDT ${ic.caretDown}</span></div>
        <div style="display:flex;justify-content:space-between;margin:9px 2px 0;font-size:13px;color:var(--muted)"><span>≈ $250.00</span><span>Balance 24,905.10 USDT</span></div>
        <div class="label">To</div>
        <div class="field" data-to><span style="font-family:ui-monospace,Consolas,monospace">TJ8xk…Qf29vL</span><span class="suffix">${ic.qr}</span></div>
        <div class="flash ok" data-flash1>${ic.check}<div><b>Address checked.</b> Not similar to a scam address, used before.</div></div>
        <div class="flash warn" data-flash2>${ic.warn}<div>Double-check: this address must be on the <b>Tron</b> network.</div></div>
        <div class="card pad2" style="margin-top:16px">
          <div class="rowline"><span class="k">Network</span><span class="v">Tron · TRC-20</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Network fee</span><span class="v">≈ 1.1 TRX</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">You send</span><span class="v">250.00 USDT</span></div>
        </div>
        <div class="spacer"></div>
        <button class="btn btn-green" style="margin-bottom:14px" data-review>${ic.up} Review & confirm</button>
      </div>`,

    history: () => `
      <div class="screen">
        <div class="hdr"><h1>History</h1><div class="r"><span class="pill-net">All networks</span></div></div>
        <div data-refreshable>
          <div class="hgroup">Today</div>
          ${hrow('in', ic.down, 'Received USDT', 'Tron · 14:21', '+1,200.00', 'up', 'from TQn9…b7Rk')}
          ${hrow('out', ic.up, 'Sent ETH', 'Ethereum · 11:05', '−0.250', 'down', 'to 0x8a3…21Ce')}
          <div class="hgroup">Yesterday</div>
          ${hrow('swap', ic.swap, 'Swap ETH → BNB', 'Cross-chain · 19:40', '0.5 → 2.78', '', 'done')}
          ${hrow('in', ic.down, 'Received SOL', 'Solana · 16:12', '+8.0', 'up', 'from 7xKp…Dw3')}
          ${hrow('out', ic.up, 'Sent USDT', 'Polygon · 09:28', '−340.00', 'down', 'to 0x19c…77Af')}
        </div>
        <div class="flash info" style="margin-top:16px">${ic.spark}<div>Hold any item — the assistant explains it in plain words.</div></div>
        <div class="spacer"></div>
      </div>${tabbar('history')}`,

    token: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>EVM contract</h1></div>
        <div class="card" style="background:rgba(163,113,247,.1);border:1px solid rgba(163,113,247,.25)">
          <div style="display:flex;align-items:center;gap:9px;font-weight:600;font-size:15px;color:#d2b4ff">${ic.spark}Describe the token in words</div>
          <div style="font-size:12.5px;color:var(--muted);margin-top:5px">Claude fills in the form, and you check and adjust it.</div>
          <div class="field area" data-prompt style="margin-top:12px;font-size:14px"><span class="ph" data-ph>For example: a Gold Cat token, 1 million, 2% of transfers to my wallet, no new minting</span></div>
          <button class="btn btn-ghost" data-fill style="margin-top:12px">${ic.spark} Fill in the form</button>
        </div>
        <div class="label" style="font-size:16px;color:var(--text);font-weight:600;margin-top:18px">Basics</div>
        <div class="hint" style="margin-top:0">Everyone will see this in wallets and on exchanges.</div>
        <div class="label">Name</div>
        <div class="field" data-f-name><span class="ph">For example, Gold Cat</span></div>
        <div class="label">Ticker</div>
        <div class="field" data-f-ticker><span class="ph">GCAT</span></div>
        <div class="spacer"></div>
      </div>`,

    tokenfeatures: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>EVM contract</h1></div>
        ${tg('Mint new tokens', 'Create more coins any time. Buyers are wary of this: it dilutes their share.')}
        ${tg('Max supply', 'A ceiling the supply can never exceed — not even for the owner.')}
        ${tg('Pause transfers', 'Stop all transfers, e.g. after a hack. Buyers see it as a risk.')}
        ${tg('Transfer tax', 'A percentage of every transfer goes to a wallet you choose.')}
        <div class="spacer"></div>
      </div>`,

    assistant: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>AI</h1><div class="r">${ic.muted}${ic.gear}</div></div>
        <div class="seg"><div class="thumb"></div>
          <div class="opt on">${ic.chat} Assistant</div><div class="opt">${ic.chart} Trading bot</div></div>
        <div class="chatarea" data-chat>
          <div class="aiavatar"><img src="assets/cat.png" alt=""></div>
          <div class="aititle">Ask about your wallet</div>
          <div class="aidesc">The AI sees balances, addresses and recent operations and can prepare a transfer. You always send it yourself — after the address check and the PIN.</div>
          <div class="sugg">
            <div class="q">How much money do I have and in what?</div>
            <div class="q">How much have I spent on fees?</div>
            <div class="q">Swap 0.1 ETH for BNB</div>
          </div>
        </div>
        <div class="composer">
          <div class="mic" data-mic>${ic.mic}</div>
          <div class="inp" data-inp>For example: swap 0.1 ETH for BNB</div>
          <div class="send" data-send>${ic.sendmsg}</div>
        </div>
      </div>`,

    aikeys: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>AI for the assistant</h1></div>
        <div class="hint" style="margin:2px 2px 12px;font-size:13px;line-height:1.5">Choose who powers the assistant. Gemini is free. Your API key stays on the device.</div>
        <div class="plist">
          <div class="prow"><div class="pic" style="background:#1a73e8">G</div><div class="pm"><div class="pt">Gemini <span class="tag g">free</span></div><div class="ps">Connected · answers now</div></div><span class="up">${ic.check}</span></div>
          <div class="rl-sep"></div>
          <div class="prow"><div class="pic" style="background:#4d6bfe">D</div><div class="pm"><div class="pt">DeepSeek</div><div class="ps">API key</div></div><span class="tag b">Connect</span></div>
          <div class="rl-sep"></div>
          <div class="prow"><div class="pic" style="background:#10a37f">C</div><div class="pm"><div class="pt">ChatGPT</div><div class="ps">API key</div></div><span class="tag b">Connect</span></div>
          <div class="rl-sep"></div>
          <div class="prow"><div class="pic" style="background:#d97757">✦</div><div class="pm"><div class="pt">Claude</div><div class="ps">API key</div></div><span class="tag b">Connect</span></div>
        </div>
        <div class="label">Gemini API key</div>
        <div class="field" data-key style="font-family:ui-monospace,Consolas,monospace;font-size:14px"><span data-keytx></span><span class="suffix" data-keysuffix style="color:var(--accent)">Paste</span></div>
        <button class="btn btn-green" data-save style="margin-top:16px">Save key</button>
        <div class="spacer"></div>
      </div>`,

    bot: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>AI</h1></div>
        <div class="seg right"><div class="thumb"></div>
          <div class="opt">${ic.chat} Assistant</div><div class="opt on">${ic.chart} Trading bot</div></div>
        <div class="card botstat">
          <div style="font-size:13px;color:var(--muted)">Bot balance · Binance</div>
          <div class="botbig" data-botbal>$5,240.18</div>
          <div class="up" style="font-weight:600;font-size:14px;margin-top:2px">+$108.40 · +2.1% today</div>
          <div style="display:inline-flex;align-items:center;gap:7px;margin-top:10px;background:rgba(63,185,80,.14);color:var(--green);border-radius:999px;padding:5px 13px;font-size:12px;font-weight:600"><span style="width:7px;height:7px;border-radius:50%;background:var(--green);display:inline-block"></span>Running · training mode</div>
        </div>
        <div class="statrow">
          <div class="statcell"><div class="sl">Trades</div><div class="sv">27</div></div>
          <div class="statcell"><div class="sl">Win rate</div><div class="sv">63%</div></div>
          <div class="statcell"><div class="sl">Leverage</div><div class="sv">≤ 5×</div></div>
        </div>
        <div class="hgroup" style="margin-top:18px">Recent trades · decided by Claude</div>
        ${hrow('in', ic.up, 'BTC · Long 3×', 'Entry 67,240 → 68,910', '+$74.20', 'up', 'closed')}
        ${hrow('out', ic.down, 'ETH · Short 2×', 'Entry 3,480 → 3,512', '−$12.80', 'down', 'stop hit')}
        ${hrow('in', ic.up, 'SOL · Long 2×', 'open · +1.9%', '+$31.40', 'up', 'running')}
        <div class="spacer"></div>
        <button class="btn btn-ghost" data-botset style="margin-bottom:14px">${ic.gear} Bot settings</button>
      </div>`,

    botsettings: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>Bot settings</h1></div>
        <div class="label" style="margin-top:4px">Exchange</div>
        <div class="chips" style="flex-wrap:wrap"><span class="chip on">Binance</span><span class="chip">Bybit</span><span class="chip">OKX</span><span class="chip">+7</span></div>
        <div class="label">Risk limits</div>
        <div class="card pad2">
          <div class="rowline"><span class="k">Max leverage</span><span class="v">5×</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Max position</span><span class="v">10% of equity</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Daily loss cap</span><span class="v">3%</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Stop-loss</span><span class="v">Always on</span></div>
        </div>
        <div class="card" style="margin-top:16px;display:flex;align-items:center;gap:14px">
          <div style="flex:1"><div style="font-weight:600;font-size:15px">Training mode</div><div style="font-size:12.5px;color:var(--muted);margin-top:3px">Paper trades, no real money</div></div>
          <div class="switch on" data-train><i></i></div>
        </div>
        <div class="spacer"></div>
        <button class="btn btn-green" style="margin-bottom:14px">Save & run</button>
      </div>`,

    hl: () => `
      <div class="screen">
        <div class="hdr">${wrapBack()}<h1>ETH-USD</h1><div class="r" style="text-align:right;color:var(--text)"><div class="px up" data-px>$3,412.8</div><div class="up" style="font-size:12px;font-weight:600">+2.6%</div></div></div>
        <div class="card" style="padding:10px 12px">
          <div class="chartwrap" data-chart>
            <svg viewBox="0 0 360 150" preserveAspectRatio="none"><g class="grid" data-grid></g><g class="candles" data-candles></g></svg>
            <i class="vx"></i><i class="hx"></i><span class="ptag" data-ptag></span>
          </div>
          <div class="tfrow"><span class="tf" data-tf="1m">1m</span><span class="tf on" data-tf="15m">15m</span><span class="tf" data-tf="1h">1h</span><span class="tf" data-tf="1D">1D</span></div>
        </div>
        <div class="card pad2" style="margin-top:12px">
          <div class="rowline"><span class="k">Position</span><span class="v up">Long 2× · 0.8 ETH</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Entry / Mark</span><span class="v">3,310.0 / 3,412.8</span></div><div class="rl-sep"></div>
          <div class="rowline"><span class="k">Unrealized PnL</span><span class="v up">+$164.48 (+6.2%)</span></div>
        </div>
        <div class="lsbtns" data-ls><div class="b long">Long</div><div class="b short">Short</div></div>
        <div class="spacer"></div>
      </div>`,

    settings: () => `
      <div class="screen">
        <div class="hdr"><div class="ctr">GitWallet</div></div>
        <div style="font-weight:600;font-size:26px;margin:4px 2px 10px">Settings</div>
        <div class="label" style="margin-top:4px">General</div>
        <div class="card pad2">
          <div class="setrow"><div class="sic">${ic.gear}</div><div class="pm"><div class="pt">Language</div><div class="ps">English</div></div><span class="cr">${ic.back}</span></div>
        </div>
        <div class="label">Artificial intelligence</div>
        <div class="card pad2">
          <div class="setrow"><div class="sic" style="background:rgba(163,113,247,.15);color:var(--purple)">${ic.chat}</div><div class="pm"><div class="pt">AI for the assistant</div><div class="ps">Gemini (free), DeepSeek, ChatGPT…</div></div><span class="cr">${ic.back}</span></div>
          <div class="rl-sep"></div>
          <div class="setrow"><div class="sic" style="background:rgba(63,185,80,.15);color:var(--green)">${ic.chart}</div><div class="pm"><div class="pt">Claude for the trading bot</div><div class="ps">The key the bot makes its decisions with</div></div><span class="cr">${ic.back}</span></div>
        </div>
        <div class="spacer"></div>
      </div>${tabbar('settings')}`,
  };

  function row(src, sym, price, dir, pct, val, amt) {
    return `<div class="r"><div class="lg"><img src="${src}"></div><div class="md"><div class="sym">${sym}</div><div class="pr">${price} <span class="${dir}">${pct}</span></div></div><div class="rt"><div class="v">${val}</div><div class="a">${amt}</div></div></div>`;
  }
  function rowErc(src, sym, tag, price, val, amt) {
    return `<div class="r"><div class="lg"><img src="${src}"><div class="ov-net" style="background:#627EEA"></div></div><div class="md"><div class="sym">${sym} <span class="erc">${tag}</span></div><div class="pr">${price}</div></div><div class="rt"><div class="v">${val}</div><div class="a">${amt}</div></div></div>`;
  }
  function hrow(kind, icon, title, sub, val, dir, note) {
    return `<div class="hrow"><div class="hic ${kind}">${icon}</div><div class="hm"><div class="ht">${title}</div><div class="hs">${sub}</div></div><div class="hr"><div class="hv ${dir}">${val}</div><div class="ha">${note}</div></div></div>`;
  }
  function tg(title, desc) {
    return `<div class="tgrow"><div class="tm"><div class="tt">${title}</div><div class="td">${desc}</div></div><div class="switch"><i></i></div></div>`;
  }
  function wrapBack() { return `<span class="back">${ic.back}</span>`; }

  window.SCREENS = SCREENS;
  window.ICONS = ic;
})();
