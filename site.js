(() => {
  const REVEAL = '[data-reveal]';

  const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // rAF is throttled or dead in some embedded webviews / background tabs.
  // Every scheduled path below must also work on plain timers.
  function soon(fn, ms) {
    let done = false;
    const run = () => { if (done) return; done = true; fn(); };
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run);
    setTimeout(run, ms == null ? 32 : ms);
  }

  function show(el) {
    if (el.dataset.revealed) return;
    el.dataset.revealed = '1';
    el.style.opacity = '1';
    el.style.transform = 'none';
  }

  let revealIO = null;
  function getRevealIO() {
    if (revealIO || REDUCE || typeof IntersectionObserver !== 'function') return revealIO;
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); revealIO.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    return revealIO;
  }

  let sweepQueued = false;
  function sweep() {
    if (sweepQueued) return;
    sweepQueued = true;
    soon(() => {
      sweepQueued = false;
      const vh = window.innerHeight;
      document.querySelectorAll(REVEAL + ':not([data-revealed])').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 1.1 && r.bottom > -80) { show(el); if (revealIO) revealIO.unobserve(el); }
      });
    });
  }

  function forceAll() {
    document.querySelectorAll(REVEAL + ':not([data-revealed])').forEach(show);
  }

  // Auto-tag block content so every section reveals on scroll, not just hand-marked nodes.
  const NO_AUTO_ANCESTOR = 'nav, header, footer, [data-car-track]';
  const AUTO_SCOPES = [
    'section > div',
    'section > div > div',
    'section > div > div > div',
    '[data-acc-body] > div',
    '[data-acc-body] > div > div'
  ].join(', ');
  function autoTag(root) {
    root.querySelectorAll(AUTO_SCOPES).forEach((scope) => {
      if (scope.closest(NO_AUTO_ANCESTOR)) return;
      let i = 0;
      Array.prototype.forEach.call(scope.children, (el) => {
        if (el.hasAttribute('data-reveal') || el.hasAttribute('data-reveal-init')) return;
        if (el.closest('[data-reveal]') || el.closest(NO_AUTO_ANCESTOR)) return;
        const tag = el.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'BR' || tag === 'SPAN') return;
        // A wrapper whose own descendant is already marked stays untouched; the marked child animates.
        if (el.querySelector('[data-reveal], [data-reveal-init]')) return;
        el.setAttribute('data-reveal', String(Math.min(i * 60, 180)));
        i++;
      });
    });
    // Media rows the scope walk can't reach (films, guideline slots, analytics, carousel-free grids).
    root.querySelectorAll('.films > *, .guideline > *, .analytics > *, .step').forEach((el, n) => {
      if (el.hasAttribute('data-reveal') || el.hasAttribute('data-reveal-init')) return;
      if (el.closest(NO_AUTO_ANCESTOR)) return;
      el.setAttribute('data-reveal', String((n % 4) * 60));
    });
  }

  function reveal(root) {
    autoTag(root);
    const io = getRevealIO();
    root.querySelectorAll(REVEAL + ':not([data-reveal-init])').forEach((el) => {
      el.dataset.revealInit = '1';
      if (REDUCE) { show(el); return; }
      const d = parseInt(el.dataset.reveal || '0', 10);
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = `opacity .7s cubic-bezier(.22,.61,.36,1) ${d}ms, transform .7s cubic-bezier(.22,.61,.36,1) ${d}ms`;
      if (io) io.observe(el); else { show(el); return; }
      // Per-element guarantee: nothing stays invisible, whenever it streamed in.
      setTimeout(() => { if (!el.dataset.revealed) { show(el); if (revealIO) revealIO.unobserve(el); } }, 1200 + d);
    });
  }

  function accordions(root) {
    root.querySelectorAll('[data-acc]').forEach((item) => {
      if (item.dataset.accInit) return;
      item.dataset.accInit = '1';
      const head = item.querySelector('[data-acc-head]');
      const body = item.querySelector('[data-acc-body]');
      const sign = item.querySelector('[data-acc-sign]');
      if (!head || !body) return;
      body.style.overflow = 'hidden';
      body.style.transition = 'height .45s cubic-bezier(.22,.61,.36,1), opacity .35s ease';
      head.setAttribute('role', 'button');
      head.setAttribute('tabindex', '0');
      const open = item.dataset.acc === 'open';
      body.style.height = open ? body.scrollHeight + 'px' : '0px';
      body.style.opacity = open ? '1' : '0';
      if (sign) sign.style.transform = open ? 'rotate(45deg)' : 'none';
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      head.style.cursor = 'pointer';
      const toggle = () => {
        const isOpen = body.style.height !== '0px';
        body.style.height = isOpen ? '0px' : body.scrollHeight + 'px';
        body.style.opacity = isOpen ? '0' : '1';
        if (sign) sign.style.transform = isOpen ? 'none' : 'rotate(45deg)';
        head.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      };
      head.addEventListener('click', toggle);
      head.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(); }
      });
    });
  }

  function carousels(root) {
    root.querySelectorAll('[data-carousel]').forEach((wrap) => {
      // JS-property guard: DC re-render strips data-* attributes we add.
      if (wrap.__ssCarousel) return;
      wrap.__ssCarousel = true;
      wrap.dataset.carInit = '1';

      const track = wrap.querySelector('[data-car-track]');
      const prev = wrap.querySelector('[data-car-prev]');
      const next = wrap.querySelector('[data-car-next]');
      if (!track) return;

      track.style.scrollBehavior = 'auto';

      const items = () => Array.from(track.children);
      const maxLeft = () => track.scrollWidth - track.clientWidth;

      // Timer-driven tween — never depends on requestAnimationFrame.
      let tweenTimer = null;
      const tween = (to) => {
        const from = track.scrollLeft;
        const dist = to - from;
        if (tweenTimer) { clearInterval(tweenTimer); tweenTimer = null; }
        if (!dist) return;
        const dur = 520;
        const t0 = (window.performance && performance.now) ? performance.now() : Date.now();
        tweenTimer = setInterval(() => {
          const now = (window.performance && performance.now) ? performance.now() : Date.now();
          const p = Math.min((now - t0) / dur, 1);
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          track.scrollLeft = from + dist * e;
          if (p >= 1) { clearInterval(tweenTimer); tweenTimer = null; track.scrollLeft = to; }
        }, 16);
      };

      const go = (dir) => {
        const list = items();
        if (!list.length) return;
        const base = list[0].offsetLeft;
        const cur = track.scrollLeft;
        const max = maxLeft();
        let target;
        if (dir > 0) {
          if (cur >= max - 4) target = 0;
          else {
            const nxt = list.find((el) => el.offsetLeft - base > cur + 4);
            target = nxt ? nxt.offsetLeft - base : max;
          }
        } else {
          const prevs = list.filter((el) => el.offsetLeft - base < cur - 4);
          target = prevs.length ? prevs[prevs.length - 1].offsetLeft - base : max;
        }
        tween(Math.min(Math.max(target, 0), max));
      };

      let paused = false;
      const bump = () => {
        paused = true;
        clearTimeout(wrap._resume);
        wrap._resume = setTimeout(() => { paused = false; }, 6000);
      };

      if (prev) prev.addEventListener('click', () => { go(-1); bump(); });
      if (next) next.addEventListener('click', () => { go(1); bump(); });

      wrap.addEventListener('mouseenter', () => { paused = true; });
      wrap.addEventListener('mouseleave', () => { paused = false; });
      track.addEventListener('pointerdown', bump);
      track.addEventListener('wheel', bump, { passive: true });

      if (!REDUCE) {
        setInterval(() => {
          if (paused) return;
          if (!wrap.isConnected) return;
          const r = wrap.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return; // offscreen
          go(1);
        }, 3800);
      }
    });
  }

  function videos(root) {
    root.querySelectorAll('[data-video]').forEach((el) => {
      if (el.dataset.vidInit) return;
      el.dataset.vidInit = '1';
      const label = el.dataset.videoTitle || 'video';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', 'Play ' + label);
      const play = () => {
        const id = el.dataset.video;
        if (!id) return;
        openVideoModal(id, el.dataset.videoTitle || 'Video');
      };
      el.addEventListener('click', play);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); play(); }
      });
    });
  }

  // ---- shared vertical video modal ----
  let videoOverlay = null;
  function buildVideoModal() {
    videoOverlay = document.createElement('div');
    videoOverlay.id = 'video-overlay';
    videoOverlay.setAttribute(
      'style',
      'position: fixed; inset: 0; z-index: 210; display: none; align-items: center; justify-content: center; background: rgba(10,10,10,0.9); padding: 24px;'
    );

    const frame = document.createElement('div');
    frame.id = 'video-overlay-frame';
    frame.setAttribute(
      'style',
      'position: relative; width: 100%; max-width: 420px; aspect-ratio: 9 / 16; background: #000; border-radius: 16px; overflow: hidden;'
    );

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute(
      'style',
      'position: absolute; top: -44px; right: 0; border: 0; background: none; font-size: 20px; color: #f1f0ed; cursor: pointer; z-index: 2;'
    );
    closeBtn.addEventListener('click', closeVideoModal);

    frame.appendChild(closeBtn);
    videoOverlay.appendChild(frame);
    document.body.appendChild(videoOverlay);

    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) closeVideoModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeVideoModal();
    });
  }

  function openVideoModal(id, title) {
    if (!videoOverlay) buildVideoModal();
    const frame = document.getElementById('video-overlay-frame');
    const old = frame.querySelector('iframe');
    if (old) old.remove();
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    f.title = title;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    f.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;border:0;');
    frame.appendChild(f);
    videoOverlay.style.display = 'flex';
  }

  function closeVideoModal() {
    if (!videoOverlay) return;
    videoOverlay.style.display = 'none';
    const frame = document.getElementById('video-overlay-frame');
    const old = frame && frame.querySelector('iframe');
    if (old) old.remove();
  }

  function marquees(root) {
    root.querySelectorAll('[data-marquee]').forEach((m) => {
      if (m.dataset.mqInit) return;
      m.dataset.mqInit = '1';
      m.innerHTML += m.innerHTML;
    });
  }


  // ---- media visibility (admin-controlled) ----
  const MEDIA_KEY = 'ss.media.hidden';
  const MEDIA_LIST = [
    { id: 'sis-film-nykaa', label: 'Film — Sisters in Sweat × Nykaa Wellness', page: 'Home · Sisters in Sweat' },
    { id: 'sis-film-mille', label: 'Film — Sisters in Sweat × Mille', page: 'Home · Sisters in Sweat' },
    { id: 'sis-film-dame', label: 'Film — Sisters in Sweat × Dame Health', page: 'Home · Sisters in Sweat' },
    { id: 'gl-logo', label: 'Brand identity — logo & wordmark', page: 'Home · Sisters in Sweat' },
    { id: 'gl-colour', label: 'Brand identity — colour palette', page: 'Home · Sisters in Sweat' },
    { id: 'gl-type', label: 'Brand identity — typography', page: 'Home · Sisters in Sweat' },
    { id: 'gl-tone', label: 'Brand identity — brand voice', page: 'Home · Sisters in Sweat' },
    { id: 'gl-social', label: 'Brand identity — social templates', page: 'Home · Sisters in Sweat' },
    { id: 'gl-cobrand', label: 'Brand identity — co-branding rules', page: 'Home · Sisters in Sweat' },
    { id: 'sis-analytics-1', label: 'Analytics — 3K profile visits', page: 'Home · Sisters in Sweat' },
    { id: 'sis-analytics-2', label: 'Analytics — 873 profile visits', page: 'Home · Sisters in Sweat' },
    { id: 'sis-analytics-3', label: 'Analytics — reel engagement (1.4K shares)', page: 'Home · Sisters in Sweat' },
    { id: 'sis-analytics-4', label: 'Analytics — reel engagement (327 shares)', page: 'Home · Sisters in Sweat' },
    { id: 'cs-sis-image', label: 'Case study image — Sisters in Sweat', page: 'Home · Case studies' },
    { id: 'cs-talview-image', label: 'Case study image — Talview', page: 'Home · Case studies' },
    { id: 'cs-mohmani-image', label: 'Case study image — Mohmani', page: 'Home · Case studies' },
    { id: 'pr-nextleap', label: 'NextLeap fellowship image', page: 'Projects · Product' },
    { id: 'pv-film-nykaa', label: 'Video — Sisters in Sweat × Nykaa Wellness', page: 'Projects · Video editing' },
    { id: 'pv-film-mille', label: 'Video — Sisters in Sweat × Mille', page: 'Projects · Video editing' },
    { id: 'pv-film-dame', label: 'Video — Sisters in Sweat × Dame Health', page: 'Projects · Video editing' },
    { id: 'pv-film-paradyes', label: 'Video — Collab With Paradyes', page: 'Projects · Video editing' },
    { id: 'pv-film-wellness-co', label: 'Video — Sisters in Sweat × Wellness Co.', page: 'Projects · Video editing' },
    { id: 'pv-film-new-1', label: 'Video — Reel Edit 01 (needs a real title)', page: 'Projects · Video editing' },
    { id: 'pv-film-new-2', label: 'Video — Reel Edit 02 (needs a real title)', page: 'Projects · Video editing' },
    { id: 'pv-film-new-3', label: 'Video — Reel Edit 03 (needs a real title)', page: 'Projects · Video editing' },
    { id: 'pv-film-new-4', label: 'Video — Reel Edit 04 (needs a real title)', page: 'Projects · Video editing' },
    { id: 'pv-film-new-5', label: 'Video — Reel Edit 05 (needs a real title)', page: 'Projects · Video editing' },
    { id: 'gd-yoga-multi', label: 'Poster — World Yoga Day multi-city', page: 'Projects · Graphic design' },
    { id: 'gd-yoga-mumbai', label: 'Poster — World Yoga Day Mumbai', page: 'Projects · Graphic design' },
    { id: 'gd-matcha', label: 'Poster — Glow Glossary matcha', page: 'Projects · Graphic design' },
    { id: 'gd-jiujitsu', label: 'Poster — Jiu jitsu workshop', page: 'Projects · Graphic design' },
    { id: 'gd-padel', label: 'Poster — Padel coaching', page: 'Projects · Graphic design' },
    { id: 'gd-pickleball', label: 'Poster — Pickleball workshop', page: 'Projects · Graphic design' },
    { id: 'gd-frisbee', label: 'Poster — Ultimate frisbee workshop', page: 'Projects · Graphic design' },
    { id: 'gd-coldbrew', label: 'Poster — Cold brew workshop', page: 'Projects · Graphic design' },
    { id: 'gd-sound', label: 'Poster — Sound healing workshop', page: 'Projects · Graphic design' },
    { id: 'cert-lvmh', label: 'Certificate — Inside LVMH', page: 'Certifications' },
    { id: 'cert-aaft', label: 'Certificate — AAFT', page: 'Certifications' },
    { id: 'cert-nextleap', label: 'Badge — NextLeap Top Fellow', page: 'Certifications' },
    { id: 'sv-film-nykaa', label: 'Services film — Nykaa Wellness', page: 'Services' },
    { id: 'sv-film-mille', label: 'Services film — Mille', page: 'Services' },
    { id: 'sv-film-dame', label: 'Services film — Dame Health', page: 'Services' }
  ];

  function readHidden() {
    try { return JSON.parse(localStorage.getItem(MEDIA_KEY)) || []; } catch (e) { return []; }
  }
  function writeHidden(arr) {
    try { localStorage.setItem(MEDIA_KEY, JSON.stringify(arr)); } catch (e) { /* storage blocked */ }
  }
  function applyMedia(root) {
    const hidden = readHidden();
    (root || document).querySelectorAll('[data-media]').forEach((el) => {
      const want = hidden.indexOf(el.dataset.media) !== -1 ? 'none' : '';
      if (el.style.display !== want) el.style.display = want;
    });
  }

  window.SSMedia = {
    list: MEDIA_LIST,
    hidden: readHidden,
    isHidden: (id) => readHidden().indexOf(id) !== -1,
    set(id, visible) {
      const h = readHidden();
      const i = h.indexOf(id);
      if (visible && i !== -1) h.splice(i, 1);
      if (!visible && i === -1) h.push(id);
      writeHidden(h);
      applyMedia(document);
    },
    showAll() { writeHidden([]); applyMedia(document); },
    apply: applyMedia
  };

  window.addEventListener('storage', (e) => { if (e.key === MEDIA_KEY) applyMedia(document); });

  function focusStyles() {
    if (document.getElementById('__om-focus')) return;
    const st = document.createElement('style');
    st.id = '__om-focus';
    st.textContent = '[data-acc-head]:focus-visible,[data-video]:focus-visible{outline:2px solid #121110;outline-offset:3px;}';
    document.head.appendChild(st);
  }

  function init(root) {
    focusStyles();
    const r = root || document;
    applyMedia(r); reveal(r); accordions(r); carousels(r); videos(r); marquees(r);
  }

  let scanQueued = false;
  function scan() {
    if (scanQueued) return;
    scanQueued = true;
    setTimeout(() => { scanQueued = false; init(document); sweep(); }, 100);
  }

  function boot() {
    if (window.__ssBooted) return;
    if (!document.body) { soon(boot, 16); return; }
    window.__ssBooted = true;

    init(document);
    sweep();

    try {
      new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
    } catch (e) { /* polling below covers it */ }

    let n = 0;
    const poll = setInterval(() => {
      init(document);
      sweep();
      if (++n > 24 || document.readyState === 'complete') clearInterval(poll);
    }, 250);

    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });
    window.addEventListener('load', () => { init(document); sweep(); setTimeout(sweep, 200); });

    // Repeating backstop through the streaming window: covers content that
    // arrives after any single deadline would have passed.
    let guards = 0;
    const guard = setInterval(() => {
      forceAll();
      if (++guards > 12 && document.readyState === 'complete') clearInterval(guard);
    }, 800);
  }

  boot();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('load', boot);
})();

// ---- contact popup ----
(function () {
  const LINKEDIN = 'https://www.linkedin.com/in/shubha1907/';
  const EMAIL = 'shubhasingh1907@gmail.com';
  const PHONE_DISPLAY = '+91 70075 88317';
  const PHONE_WA = '917007588317';
  const PHONE_TEL = '+917007588317';

  let overlay = null;

  function rowLink(href, label, sub) {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute(
      'style',
      'display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0; border-bottom: 1px solid #e3e1dc; text-decoration: none; color: #121110;'
    );
    a.innerHTML =
      '<span style="font-size: 16px; font-weight: 500;">' + label + '</span>' +
      '<span style="font-size: 14px; color: #6e6b65;">' + sub + ' →</span>';
    return a;
  }

  function build() {
    overlay = document.createElement('div');
    overlay.id = 'contact-overlay';
    overlay.setAttribute(
      'style',
      'position: fixed; inset: 0; z-index: 200; display: none; align-items: center; justify-content: center; background: rgba(18,17,16,0.55); padding: 24px;'
    );

    const modal = document.createElement('div');
    modal.setAttribute(
      'style',
      'width: 100%; max-width: 420px; background: #f1f0ed; border-radius: 20px; padding: 32px; position: relative; font-family: "Instrument Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;'
    );

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute(
      'style',
      'position: absolute; top: 20px; right: 20px; border: 0; background: none; font-size: 16px; color: #6e6b65; cursor: pointer;'
    );
    closeBtn.addEventListener('click', close);

    const heading = document.createElement('h2');
    heading.textContent = "Let's talk";
    heading.setAttribute(
      'style',
      'margin: 0 0 6px; font-size: 26px; font-weight: 500; letter-spacing: -0.03em; color: #121110;'
    );

    const sub = document.createElement('p');
    sub.textContent = 'Pick whichever works best for you.';
    sub.setAttribute('style', 'margin: 0 0 18px; font-size: 14px; color: #6e6b65;');

    const list = document.createElement('div');
    list.appendChild(rowLink('mailto:' + EMAIL, 'Email', EMAIL));
    const callRow = rowLink('tel:' + PHONE_TEL, 'Phone', PHONE_DISPLAY);
    callRow.style.borderBottom = 'none';
    list.appendChild(callRow);

    modal.appendChild(closeBtn);
    modal.appendChild(heading);
    modal.appendChild(sub);
    modal.appendChild(list);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  function open() {
    if (!overlay) build();
    overlay.style.display = 'flex';
  }
  function close() {
    if (overlay) overlay.style.display = 'none';
  }

  function wire(root) {
    (root || document).querySelectorAll('[data-contact-trigger]').forEach((el) => {
      if (el.dataset.contactWired) return;
      el.dataset.contactWired = '1';
      el.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => wire(document));
  } else {
    wire(document);
  }
  window.addEventListener('load', () => wire(document));

  window.SSContact = { open, close };
})();
