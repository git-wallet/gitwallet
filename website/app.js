// GitWallet site: RU/EN texts, screenshots per language, networks strip, comparison, FAQ, reveal on scroll.
(function () {
  'use strict';

  // Russian lives in the HTML; English replaces it by data-i18n key.
  const EN = {
    'nav.features': 'Features', 'nav.ai': 'AI', 'nav.bot': 'Trading bot', 'nav.builder': 'Tokens', 'nav.security': 'Security', 'nav.faq': 'FAQ', 'nav.get': 'Download',
    'hero.pill.b': 'New', 'hero.pill': 'The AI assistant understands voice',
    'hero.h1a': 'The whole crypto world', 'hero.h1b': 'in one wallet',
    'hero.lead': 'One secret phrase opens 14 networks. Swaps, NFTs, perps, a voice AI assistant, a Claude trading bot and a token builder — no extra apps, and your keys never leave you.',
    'hero.cta': 'Get GitWallet', 'hero.more': 'See features',
    'stat.nets': 'networks in one phrase', 'stat.ai': 'AIs to choose from, Gemini free', 'stat.ex': 'exchanges for the trading bot', 'stat.lang': 'interface languages',
    'float1.t': '+20 TRX received', 'float1.s': 'Transfer notification', 'float2.t': 'Address checked', 'float2.s': "Doesn't look like a scam", 'float3.t': '“Swap 0.1 ETH for BNB”', 'float3.s': 'The assistant prepared the swap',
    'inst.eyebrow': 'Install', 'inst.h2': 'How to install on Android',
    'inst.sub': "The app isn't on Google Play yet, so Android shows a Play Protect warning when you install the .apk — that's normal and safe, the app's code is the same. Download the file, and when this window appears, just two taps:",
    'inst.s1h': 'Download in the browser', 'inst.s1p': 'The browser asks about the .apk file. Tap "Download" — it’s our installer file.',
    'inst.s2h': 'Allow the install', 'inst.s2p': 'Your phone asks to allow installs from this source. Turn the switch on for your browser.',
    'inst.s3h': 'Play Protect — "More"', 'inst.s3p': 'Play Protect says the app wasn’t scanned. It’s a normal warning, not an error — tap "More".',
    'inst.s4h': 'Tap "Install anyway"', 'inst.s4p': 'The "Install anyway" option appears at the bottom — tap it. Done, the app installs.',
    'inst.note': 'The warnings disappear once the app is on Google Play. Your keys and seed phrase always stay only on your phone.',
    'nets.title': 'One phrase — every network',
    'feat.eyebrow': 'Features', 'feat.h2': 'More than just a wallet',
    'feat.sub': 'Usually this takes five apps: a wallet, a swap service, an exchange, a bot and a token builder. In GitWallet they all work together and know your wallet.',
    'b1.h': 'Multi-wallet', 'b1.p': '12 or 24 words — and your addresses on Bitcoin, Ethereum, BNB Chain, Solana, Tron, XRP and 8 more networks are ready. Every wallet gets its own cat.',
    'b2.h': 'Voice AI assistant', 'b2.p': 'Ask “how much did I spend on fees” or say “send 10 USDT”. It prepares the transfer — you sign it.',
    'b3.h': 'Claude trading bot', 'b3.p': 'Trades 24/7 on the server by your strategy and hard limits. Practice mode with no risk.',
    'b4.h': 'Hyperliquid perps', 'b4.p': 'Long and short with leverage straight from the wallet, an exchange-style chart, TP/SL in one tap.',
    'b5.h': 'Your token in minutes', 'b5.p': 'ERC-20 from a template or your own Solidity. Claude checks the code for traps before deployment.',
    'b6.h': 'Cross-chain swaps', 'b6.p': 'Within EVM, between EVM networks and on Solana. Rate, fees and route — all visible up front.',
    'b7.h': 'Recipient check', 'b7.p': 'Catches address poisoning from “empty” transfers, look-alike addresses and sends to a token contract.',
    'b8.h': 'NFTs without spam', 'b8.p': 'Collections from 6 networks. The filter hides phishing airdrops, even disguised ones.',
    'b9.h': 'History that explains', 'b9.p': 'Every transfer from every network on one screen. Hold an operation and the assistant explains it in plain words.',
    'b10.h': '16 languages and your currency', 'b10.p': 'English, Русский, Українська, Español, 中文, 日本語, हिन्दी and more. Amounts in dollars, euros, rubles, hryvnias and 6 more currencies.',
    'w.eyebrow': 'Wallet', 'w.h2': 'Everything you own on one screen',
    'w.sub': 'Balance across all networks with the 24-hour change, tokens, NFTs and quick actions. Add any token by contract address or find the ones already in your wallet.',
    'w.p1': 'Send, receive, swap, buy', 'w.p1s': 'QR address scanner, speed and fee choice, sending the whole balance with the fee taken out.',
    'w.p2': 'Transfer notifications', 'w.p2s': 'The app checks for new incoming coins in the background and lets you know.',
    'w.p3': 'Buy with cards and P2P', 'w.p3s': 'Exchanges’ P2P sections, an exchanger monitor and Visa / Mastercard purchases — with a hint on which network to pick.',
    's.eyebrow': 'Safe transfers', 's.h2': 'A wallet that checks who you’re paying',
    's.sub': 'Before you sign, GitWallet checks the address against your history and warns about common scams. Most wallets don’t do this.',
    's.p1': 'Poisoned addresses', 's.p1s': 'If an address sent you empty transfers to sneak into your history — a red warning.',
    's.p2': 'Look-alike addresses', 's.p2s': 'Same start and end, different middle? The app notices.',
    's.p3': 'Contracts instead of wallets', 's.p3s': 'Warns if you’re sending to the token’s own address or to a smart contract.',
    's.p4': 'Known recipients', 's.p4s': 'Shows how many times you’ve already sent to this address.',
    'a.eyebrow': 'AI assistant', 'a.h2': 'Say it — and it’s ready to sign',
    'a.sub': 'The assistant sees balances, addresses and recent operations. It answers questions, explains transactions and prepares transfers and swaps. You always send it yourself — after the address check and your PIN.',
    'a.c1': 'Swap 0.1 ETH for BNB', 'a.c2': 'Done: 0.1 ETH on Ethereum → BNB on BNB Smart Chain. Check the rate and confirm.', 'a.c2b': 'Open swap',
    'a.c3': 'How much did I spend on fees this month?', 'a.c4': 'About $4.12: most of it went on two transfers on Ethereum.',
    'a.t1': 'Gemini — free', 'a.t2': 'voice input', 'a.t3': 'spoken replies',
    'ax.eyebrow': 'Convenience & AI', 'ax.h2': 'AI woven into the whole app',
    'ax.sub': 'Not a feature tucked in a corner, but a helper on every screen. Speak, and GitWallet understands, suggests and prepares the action — you just check and confirm.',
    'ax1.h': 'Voice instead of typing', 'ax1.p': 'Say “send 10 USDT” or “how much money do I have” — the assistant understands speech and answers out loud. No typing addresses and amounts by hand.',
    'ax2.h': 'It prepares the action', 'ax2.p': 'The assistant sees balances, addresses and history, builds the transfer or swap itself and opens the right screen. The signature and PIN are always yours.',
    'ax3.h': '4 AIs to choose from', 'ax3.p': 'Gemini is free, plus DeepSeek, ChatGPT and Claude. The key stays only on your phone, and you can switch models in one tap.',
    'ax4.h': 'Explains what happened', 'ax4.p': 'Hold any operation in your history — Claude explains in plain words what the transfer was, where it came from and what the fee was.',
    'ax5.h': 'AI in the bot and tokens', 'ax5.p': 'The same mind trades by your strategy in the bot and checks a token’s code for traps before deployment. AI runs across the whole app.',
    'ax6.h': 'Fewer steps, your language', 'ax6.p': 'Five apps in one, quick actions and a QR scanner, 16 languages and your currency. The usual things take a couple of taps.',
    'bot.eyebrow': 'Trading bot', 'bot.h2': 'Claude trades for you. You set the limits.',
    'bot.sub': 'Describe your strategy in plain words. The server watches the market every 15 minutes for free and calls Claude only when the price moves — you don’t pay for empty checks.',
    'bot.p1': 'Practice mode', 'bot.p1s': 'The bot makes decisions and logs them, but no money moves. Test your strategy risk-free.',
    'bot.p2': 'Hard limits on the server', 'bot.p2s': 'Trade size, share of one coin, USDT reserve, daily loss, cooldown — the server cuts or cancels a trade even if Claude proposes more.',
    'bot.p3': 'Stop-loss right on the exchange', 'bot.p3s': 'After a buy, protection orders are placed on the exchange — they fire even while the bot sleeps. There’s an emergency stop.',
    'bot.p4': 'Keys without withdrawal rights', 'bot.p4s': 'The bot can only trade. Step-by-step guides for every exchange with a button to the right page.',
    'hl.eyebrow': 'Perps', 'hl.h2': 'Hyperliquid — no separate exchange needed',
    'hl.sub': 'Deposit USDC from Arbitrum and trade perpetual futures. Your wallet signs the orders; the app asks for no sign-up and no KYC.',
    'hl.p1': 'Exchange-grade chart', 'hl.p1s': 'Candles from 1 minute to a week, volumes, the order book and a full-screen mode.',
    'hl.p2': 'TP/SL and liquidation price', 'hl.p2s': 'See how far the price must move to liquidation, with a warning when it gets close.',
    'hl.p3': 'Cross or isolated margin', 'hl.p3s': 'Market or limit, long or short — with clear explanations for every field.',
    'tk.eyebrow': 'Token builder', 'tk.h2': 'Your own token — no developer needed',
    'tk.sub': 'Describe the token in words — Claude fills in the form. Or paste your own Solidity: the server compiles it and your wallet signs the deployment right on the phone.',
    'tk.p1': 'Proven OpenZeppelin blocks', 'tk.p1s': 'Burning, minting, a cap, pause, permit, per-wallet limit, transfer tax, blacklist.',
    'tk.p2': 'Code review with Claude', 'tk.p2s': 'In plain words: what the contract does, what the owner can do and where the traps are — honeypots, hidden mint, fund withdrawal.',
    'tk.p3': '7 networks plus Sepolia testnet', 'tk.p3s': 'Ethereum, BNB Chain, Base, Arbitrum, Polygon, Optimism, Avalanche. Publish the code on the explorer in one tap.',
    'tk.p4': 'My contracts', 'tk.p4s': 'Read data and call functions of your deployed contracts right from the app.',
    'cmp.eyebrow': 'Comparison', 'cmp.h2': 'What you get beyond a regular wallet',
    'sec.eyebrow': 'Security', 'sec.h2': 'Your keys never leave the phone',
    'sec.sub': 'GitWallet is non-custodial. No one but you can move your funds — not us, not the AI, not the trading bot.',
    'sec1.h': 'Secure storage', 'sec1.p': 'The secret phrase is kept only in the device’s secure storage and is never sent anywhere.',
    'sec2.h': 'PIN and biometrics', 'sec2.p': 'Unlock with a PIN, fingerprint or Face ID. Wrong attempts trigger a growing wait.',
    'sec3.h': 'The AI signs nothing', 'sec3.p': 'The assistant only proposes buttons. Texts from the blockchain are data to it, not commands: phishing in a token name won’t work.',
    'faq.eyebrow': 'Questions', 'faq.h2': 'Frequently asked questions',
    'end.h2': 'Try GitWallet', 'end.sub': 'Create a wallet in a minute or add an existing one with its secret phrase.',
    'end.android': 'Download for Android (.apk)', 'end.ios': 'iOS — coming soon',
    'end.qr': 'Scan with your phone to download',
    'end.stores': 'Available on', 'end.open': 'Open',
    'end.apknote': '.apk file, ~144 MB · Android 8.0+. Allow installs from this source when prompted.',
    'ft.t1': 'Keys stay on your phone', 'ft.t1s': 'The secret phrase is never sent anywhere',
    'ft.t2': 'No sign-up', 'ft.t2s': 'No email, phone number or ID',
    'ft.t3': 'Audited building blocks', 'ft.t3s': 'Tokens are built from OpenZeppelin contracts',
    'ft.t4': '16 languages', 'ft.t4s': 'And amounts in your currency',
    'ft.about': 'A multi-wallet with an AI assistant, a Claude trading bot, Hyperliquid perps and a token builder. One secret phrase, 14 networks.',
    'ft.x': 'Follow us on X — @gitwallet',
    'ft.mail': 'Support — gitwallet.official@gmail.com',
    'ft.h1': 'Product', 'ft.l1': 'Wallet and swaps', 'ft.l2': 'Recipient check', 'ft.l3': 'AI assistant', 'ft.l4': 'Trading bot', 'ft.l5': 'Hyperliquid perps', 'ft.l6': 'Token builder',
    'ft.h2': 'About', 'ft.l7': 'Security', 'ft.l8': 'How we compare', 'ft.l9': 'FAQ', 'ft.l10': 'Download',
    'ft.h3': 'Networks', 'ft.h4': 'Platforms', 'ft.soon1': 'coming to Google Play', 'ft.soon2': 'coming soon', 'ft.h5': 'AI inside',
    'ft.rights': 'All rights reserved.', 'ft.privacy': 'Privacy', 'ft.top': 'Back to top',
    'foot.risk': 'GitWallet is not a financial adviser. Trading crypto and leveraged futures carries the risk of losing money. The trading bot and the AI can be wrong. Third-party purchase services, exchanges and Hyperliquid operate independently of GitWallet.',
  };

  const CMP = {
    ru: { head: ['', 'Обычный кошелёк', 'GitWallet'], rows: [
      ['14 сетей из одной фразы', 'part', 'yes'],
      ['Проверка получателя и защита от «отравленных» адресов', 'no', 'yes'],
      ['ИИ-ассистент с голосом, который готовит переводы', 'no', 'yes'],
      ['Выбор ИИ: Gemini бесплатно, DeepSeek, ChatGPT, Claude', 'no', 'yes'],
      ['Торговый бот с лимитами и режимом тренировки', 'no', 'yes'],
      ['Фьючерсы Hyperliquid прямо из кошелька', 'no', 'yes'],
      ['Конструктор токенов и проверка кода ИИ', 'no', 'yes'],
      ['Фильтр спам-NFT', 'part', 'yes'],
      ['Объяснение любой операции простыми словами', 'no', 'yes'],
      ['Ключи только на устройстве', 'yes', 'yes'],
    ] },
    en: { head: ['', 'Regular wallet', 'GitWallet'], rows: [
      ['14 networks from one phrase', 'part', 'yes'],
      ['Recipient check and address-poisoning protection', 'no', 'yes'],
      ['Voice AI assistant that prepares transfers', 'no', 'yes'],
      ['Choice of AI: Gemini free, DeepSeek, ChatGPT, Claude', 'no', 'yes'],
      ['Trading bot with limits and practice mode', 'no', 'yes'],
      ['Hyperliquid perps straight from the wallet', 'no', 'yes'],
      ['Token builder and AI code review', 'no', 'yes'],
      ['Spam NFT filter', 'part', 'yes'],
      ['Any operation explained in plain words', 'no', 'yes'],
      ['Keys only on the device', 'yes', 'yes'],
    ] },
  };
  const MARK = { yes: '<span class="yes">✓</span>', no: '<span class="no">—</span>', part: { ru: '<span class="part">частично</span>', en: '<span class="part">partly</span>' } };

  const FAQ = {
    ru: [
      ['GitWallet хранит мои деньги?', 'Нет. Это некастодиальный кошелёк: секретная фраза и ключи лежат только в вашем телефоне. Мы не можем ни увидеть, ни переместить ваши средства.'],
      ['ИИ может сам отправить мои монеты?', 'Нет. Ассистент только предлагает действие кнопкой. Перевод проходит проверку адреса и подтверждается вашим PIN-кодом или биометрией.'],
      ['Ассистент бесплатный?', 'Да, если выбрать Gemini: ключ от Google AI Studio бесплатный в пределах дневных лимитов. DeepSeek, ChatGPT и Claude оплачиваются по факту использования на их сайтах — в приложении есть пошаговые инструкции, где взять ключ.'],
      ['Как работает торговый бот и сколько он стоит?', 'Бот работает на нашем сервере 24/7 с вашим ключом Claude API и API-ключом биржи без права вывода. Сервер бесплатно следит за рынком и зовёт Claude только при движении цены, поэтому расход обычно небольшой. Начните с режима тренировки — там деньги не двигаются.'],
      ['Какие сети поддерживаются?', 'Bitcoin, Ethereum, BNB Smart Chain, Solana, Tron, Polygon, Arbitrum, Optimism, Base, Avalanche C-Chain, Litecoin, Dogecoin, XRP Ledger, Cosmos Hub и тестовая сеть Sepolia.'],
      ['Можно перенести кошелёк из другого приложения?', 'Да. Введите секретную фразу из 12 или 24 слов — адреса во всех сетях восстановятся автоматически.'],
    ],
    en: [
      ['Does GitWallet hold my money?', 'No. It’s a non-custodial wallet: the secret phrase and keys live only on your phone. We can neither see nor move your funds.'],
      ['Can the AI send my coins by itself?', 'No. The assistant only proposes an action as a button. A transfer goes through the address check and is confirmed with your PIN or biometrics.'],
      ['Is the assistant free?', 'Yes, with Gemini: a Google AI Studio key is free within daily limits. DeepSeek, ChatGPT and Claude are pay-as-you-go on their own sites — the app has step-by-step guides on where to get a key.'],
      ['How does the trading bot work and what does it cost?', 'The bot runs 24/7 on our server with your Claude API key and an exchange API key without withdrawal rights. The server watches the market for free and calls Claude only when the price moves, so usage is usually small. Start in practice mode — no money moves there.'],
      ['Which networks are supported?', 'Bitcoin, Ethereum, BNB Smart Chain, Solana, Tron, Polygon, Arbitrum, Optimism, Base, Avalanche C-Chain, Litecoin, Dogecoin, XRP Ledger, Cosmos Hub and the Sepolia testnet.'],
      ['Can I move my wallet from another app?', 'Yes. Enter your 12- or 24-word secret phrase and the addresses in every network are restored automatically.'],
    ],
  };

  const NETS = [
    ['bitcoin', 'Bitcoin'], ['ethereum', 'Ethereum'], ['smartchain', 'BNB Smart Chain'], ['solana', 'Solana'], ['tron', 'Tron'],
    ['polygon', 'Polygon'], ['arbitrum', 'Arbitrum'], ['optimism', 'Optimism'], ['base', 'Base'], ['avalanchec', 'Avalanche'],
    ['litecoin', 'Litecoin'], ['doge', 'Dogecoin'], ['ripple', 'XRP Ledger'], ['cosmos', 'Cosmos Hub'],
  ];
  const LOGO = (id) => `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${id}/info/logo.png`;

  // Russian originals, captured once so switching back works.
  const RU = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => (RU[el.dataset.i18n] = el.innerHTML));

  function render(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === 'en' ? (EN[k] ?? RU[k]) : RU[k];
    });
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));
    document.title = lang === 'en' ? 'GitWallet — crypto wallet with AI: 14 chains, swaps, NFTs, bot' : 'GitWallet — крипто-кошелёк с ИИ: 14 сетей, обмен, NFT, бот';

    const c = CMP[lang];
    const cell = (m) => (m === 'part' ? MARK.part[lang] : MARK[m]);
    document.getElementById('cmp').innerHTML =
      `<div class="row">${c.head.map((h) => `<div>${h}</div>`).join('')}</div>` +
      c.rows.map(([t, a, b]) => `<div class="row"><div>${t}</div><div>${cell(a)}</div><div>${cell(b)}</div></div>`).join('');

    document.getElementById('faqList').innerHTML = FAQ[lang].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
    try { localStorage.setItem('gw.site.lang', lang); } catch (e) { /* private mode */ }
  }

  // Networks strip, doubled for a seamless loop.
  const chips = NETS.map(([id, name]) => `<span class="chip"><img src="${LOGO(id)}" alt="" loading="lazy">${name}</span>`).join('');
  document.getElementById('nets').innerHTML = chips + chips;
  document.getElementById('footNets').innerHTML = NETS.map(([, name]) => `<span>${name}</span>`).join('');
  // No X account yet: the button stays inert until there is a link.
  const xLink = document.getElementById('xLink');
  if (xLink.getAttribute('href') === '#') xLink.addEventListener('click', (e) => e.preventDefault());

  // Live app screens: each phone embeds _demo/screen.html at 390×844, scaled to the phone,
  // and plays its real in-code animation on hover (desktop) or while in view (touch).
  function initPhones() {
    const frames = [...document.querySelectorAll('iframe.appscreen')];
    // scale each fixed 390×844 iframe down to its phone's screen width
    const fit = (f) => { const w = f.parentElement.clientWidth; if (w) f.style.transform = 'scale(' + (w / 390) + ')'; };
    const fitAll = () => frames.forEach(fit);
    fitAll();
    requestAnimationFrame(fitAll);
    window.addEventListener('load', fitAll);
    // retry through the first second to defeat any layout-timing gap, then rely on the observer
    let tries = 0; const iv = setInterval(() => { fitAll(); if (++tries > 10) clearInterval(iv); }, 100);
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(fitAll);
      document.querySelectorAll('.phone .screen').forEach((s) => ro.observe(s));
    } else {
      window.addEventListener('resize', fitAll);
    }

    // play/stop with a ready-handshake: if the iframe isn't ready when we ask, it replays on 'ready'
    const send = (f, msg) => { try { f.contentWindow.postMessage({ gw: msg }, '*'); } catch (e) { /* noop */ } };
    const play = (f) => { f._want = true; send(f, 'play'); };
    const stop = (f) => { f._want = false; send(f, 'stop'); };
    window.addEventListener('message', (e) => {
      if (!e.data || e.data.gw !== 'ready') return;
      const f = frames.find((x) => x.contentWindow === e.source);
      if (f && f._want) send(f, 'play');
    });

    const animated = frames.filter((f) => /[?&]seq=/.test(f.getAttribute('src') || ''));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animated.forEach((f) => f.closest('.phone').addEventListener('click', () => play(f)));
    if (matchMedia('(hover: hover)').matches) {
      animated.forEach((f) => {
        const ph = f.closest('.phone');
        ph.addEventListener('mouseenter', () => play(f));
        ph.addEventListener('mouseleave', () => stop(f));
      });
    } else if ('IntersectionObserver' in window) {
      const loop = (f) => { play(f); f._l = setTimeout(() => { stop(f); f._l = setTimeout(() => loop(f), 1400); }, 8500); };
      const seen = new IntersectionObserver((es) => es.forEach((e) => {
        const f = e.target;
        if (e.isIntersecting && !f._on) { f._on = true; f._l = setTimeout(() => loop(f), 500); }
        if (!e.isIntersecting && f._on) { f._on = false; clearTimeout(f._l); stop(f); }
      }), { threshold: 0.5 });
      animated.forEach((f) => seen.observe(f));
    }
  }
  initPhones();

  document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => render(b.dataset.lang)));
  let start = 'ru';
  try { start = localStorage.getItem('gw.site.lang') || (navigator.language.startsWith('ru') || navigator.language.startsWith('uk') ? 'ru' : 'en'); } catch (e) { /* default */ }
  render(start === 'en' ? 'en' : 'ru');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile header menu only — desktop nav stays unchanged.
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const menu = document.getElementById('navMenu');
  const setNav = (on) => {
    if (!nav || !burger || !menu) return;
    nav.classList.toggle('open', on);
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
  };
  if (burger) {
    burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
    document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target)) setNav(false); });
  }

  // Floating back-to-top button.
  const backTop = document.getElementById('backTop');
  if (backTop) {
    const syncTop = () => backTop.classList.toggle('show', window.scrollY > 480);
    syncTop();
    window.addEventListener('scroll', syncTop, { passive: true });
  }

  // Reveal on scroll.
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12 }) : null;
  document.querySelectorAll('.rv').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));
})();
