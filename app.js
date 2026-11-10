/* Cómo se hizo · escena pegajosa con personajes que hablan.
   Datos en window.STORY (data/story.js). Vanilla JS, sin dependencias. */
(function () {
  "use strict";
  var S = window.STORY;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, attrs, html) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var safe = function (fn) { try { return fn(); } catch (e) { return null; } };
  var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- datos derivados ---------- */
  var LANE = {
    podcast: { c: "#0B7A75", ct: "var(--teal)", on: "#fff", wash: "podcast" },
    comic:   { c: "#B7791F", ct: "var(--amber)", on: "#1E1A16", wash: "comic" },
    video:   { c: "#B4443A", ct: "var(--brick)", on: "#fff", wash: "video" }
  };
  var laneCss = function (id) { var l = LANE[id] || { c: "#B7791F", ct: "var(--amber)", on: "#1E1A16" }; return "--c:" + l.c + ";--ct:" + l.ct + ";--on:" + l.on; };
  var actoById = {}; S.actos.forEach(function (a) { actoById[a.id] = a; });
  var team = {}; S.equipo.forEach(function (p) { team[p.id] = p; });
  var order = ["daniel", "hector", "victor"];
  var PITCH = { daniel: 1, hector: 0.82, victor: 1.12 };
  var nombres = { daniel: "Daniel", hector: "Héctor", victor: "Víctor", mariana: "Mariana (personaje)" };
  var V = S.vinetas, NV = V.length;
  var tipoTag = { ilustracion: "Ilustración IA", captura: "Captura real" };

  /* ---------- portada ---------- */
  $("#hero-sub").textContent = S.subtitulo;
  var rot = [-2, 1.5, -1];
  $("#ribbon").innerHTML = S.carriles.map(function (c, k) {
    return '<li style="' + laneCss(c.id) + ';--r:' + rot[k % 3] + 'deg"><i></i>' + esc(c.nombre) + "</li>";
  }).join("");
  var heroCast = $("#hero-cast");
  S.lema.forEach(function (l, k) {
    var p = team[l.quien];
    var d = el("div", { "class": "hc", style: "--i:" + k + ";--c:" + ["#0B7A75", "#B7791F", "#B4443A"][k] });
    d.innerHTML = '<span class="say-b">' + esc(l.texto) + '</span><img src="' + esc(p.corte) + '" alt="Personaje en estilo cómic: ' + esc(p.nombre) + '" ' + (k === 0 ? "" : "") + 'decoding="async">';
    heroCast.appendChild(d);
  });
  $(".hc:nth-child(2) .say-b", heroCast) && ($(".hc:nth-child(2) .say-b", heroCast).style.setProperty("--bt", "-2%"));

  /* ---------- reparto de la escena ---------- */
  var castEl = $("#cast");
  order.forEach(function (id) {
    var im = el("img", { "class": "char", "data-id": id, src: team[id].corte, alt: "", decoding: "async" });
    castEl.appendChild(im);
  });
  var chars = $$(".char", castEl);
  var fc = $("#finale-cast");
  order.forEach(function (id) { fc.appendChild(el("img", { src: team[id].corte, alt: "", loading: "lazy", decoding: "async" })); });

  /* ---------- carriles de trazabilidad ---------- */
  var railsEl = $("#rails"), railByLane = {}, dotByV = {};
  S.carriles.forEach(function (c) {
    var rail = el("div", { "class": "rail", role: "group", "aria-label": c.nombre, "data-lane": c.id, style: laneCss(c.id) });
    rail.appendChild(el("span", { "class": "nm" }, esc(c.nombre)));
    var tr = el("div", { "class": "tr" });
    V.forEach(function (v, i) {
      if (v.carril !== c.id) return;
      var d = el("button", { type: "button", "class": "dot", "aria-label": c.nombre + ": " + v.titulo + " (" + v.fecha + ")", title: v.fecha + " · " + v.titulo });
      d.addEventListener("click", function () { go(v.id); });
      tr.appendChild(d); dotByV[i] = d;
    });
    rail.appendChild(tr); railsEl.appendChild(rail);
    railByLane[c.id] = rail;
  });

  /* ---------- índice ---------- */
  var idx = $("#index-panel"), btnIdx = $("#btn-index"), h = "";
  S.actos.forEach(function (a) {
    var items = V.filter(function (v) { return v.acto === a.id; });
    if (!items.length) return;
    h += "<h3>" + esc(a.nombre) + " · " + esc(a.rango) + "</h3><ol>" + items.map(function (v) { return '<li><a href="#' + v.id + '" data-go="' + v.id + '">' + esc(v.titulo) + "</a></li>"; }).join("") + "</ol>";
  });
  idx.innerHTML = h;
  function toggleIndex(force) {
    var open = typeof force === "boolean" ? force : idx.hidden;
    idx.hidden = !open; btnIdx.setAttribute("aria-expanded", open);
    if (open) { var a = $("a", idx); a && a.focus(); }
  }
  btnIdx.addEventListener("click", function () { toggleIndex(); });
  idx.addEventListener("click", function (e) { var a = e.target.closest("[data-go]"); if (a) { e.preventDefault(); toggleIndex(false); go(a.dataset.go); } });

  /* ---------- escena: elementos ---------- */
  var stage = $("#stage"), scroller = $("#scroller"), story = $("#story"), left = $(".left", stage);
  var artEl = $("#art"), imgs = [$("#img-a"), $("#img-b")], curImg = 0;
  var polas = $("#polas"), quote = $("#quote"), bubble = $("#bubble"), say = $("#say"), when = $("#when");
  var chipText = $("#chip-text"), stepsEl = $("#steps"), cue = $("#cue");
  var bar = $("#trace"), progress = $("#progress-bar");
  var ess = false, proj = false, voiceOn = false;

  S.pasos.forEach(function (p, b) {
    var li = el("li"), btn = el("button", { type: "button", "class": "step", "data-b": b }, '<span class="n">' + pad2(b + 1) + "</span>" + esc(p));
    btn.addEventListener("click", function () { goStep(cur.i, b); });
    li.appendChild(btn); stepsEl.appendChild(li);
  });
  var stepBtns = $$(".step", stepsEl);

  /* ---------- estado y construcción de pasos ---------- */
  var steps = [], N = 0, beatPx = 0, y0 = 0;
  var cur = { n: -1, i: -1, b: -1 }, phase = "hero";
  function measure() { document.documentElement.style.setProperty("--bar-h", bar.offsetHeight + "px"); }
  function build() {
    steps = [];
    V.forEach(function (v, i) { for (var b = 0; b < (ess ? 1 : 4); b++) steps.push({ i: i, b: b }); });
    N = steps.length;
    var vh = stage.offsetHeight || window.innerHeight;
    beatPx = Math.round(vh * (window.innerWidth < 900 ? 0.5 : 0.6));
    scroller.style.height = ((N - 1) * beatPx + vh) + "px";
    y0 = scroller.getBoundingClientRect().top + window.pageYOffset;
  }
  function stepY(n) { return y0 + n * beatPx; }
  function findStep(i, b) {
    for (var k = 0; k < N; k++) if (steps[k].i === i && steps[k].b === (ess ? 0 : b)) return k;
    return 0;
  }
  function jump(y) { window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: reduce ? "auto" : "smooth" }); }
  function goStep(i, b) { var n = findStep(i, b); targetN = n; lastNav = Date.now(); jump(stepY(n)); }
  function go(id) {
    for (var i = 0; i < NV; i++) if (V[i].id === id) return goStep(i, 0);
  }

  /* ---------- arte con barrido de viñeta ---------- */
  function artPath(v) { return v.imagen || "assets/vinetas/" + v.id + ".jpg"; }
  function showArt(i) {
    var v = V[i], next = imgs[1 - curImg], old = imgs[curImg];
    next.onload = function () {
      next.onload = null;
      next.classList.remove("enter"); void next.offsetWidth;
      next.classList.add("cur", "enter");
      old.classList.remove("cur");
      setTimeout(function () { next.classList.remove("enter"); }, 900);
      curImg = 1 - curImg;
    };
    next.onerror = function () { artEl.parentNode.classList.add("missing"); };
    next.alt = v.alt;
    next.src = artPath(v);
    [i - 1, i + 1].forEach(function (k) { if (k >= 0 && k < NV) { var p = new Image(); p.src = artPath(V[k]); } });
  }

  /* ---------- habla: texto palabra por palabra, voz opcional ---------- */
  var talkTimer = 0, speakTimer = 0;
  function sayText(text, b) {
    var words = String(text).split(/\s+/).filter(Boolean);
    var stepMs = Math.max(10, Math.min(42, 1100 / Math.max(1, words.length)));
    say.className = "say" + (b === 1 ? " is-prompt" : "");
    say.innerHTML = words.map(function (w, k) { return '<span class="w" style="--d:' + Math.round(k * stepMs) + 'ms">' + esc(w) + "</span>"; }).join(" ");
    return Math.round(words.length * stepMs + 450);
  }
  function finishTalk() {
    clearTimeout(talkTimer);
    chars.forEach(function (c) { c.classList.remove("talk"); });
    bubble.classList.remove("talk");
  }
  function estimatedSpeechMs(text) { return Math.max(1200, String(text).split(/\s+/).length * 420); }
  function talk(speaker, dur) {
    chars.forEach(function (c) {
      var on = c.dataset.id === speaker;
      c.classList.toggle("on", on);
      if (!on) c.classList.remove("talk");
    });
    var c = chars.filter(function (x) { return x.dataset.id === speaker; })[0];
    clearTimeout(talkTimer);
    if (c && !reduce) c.classList.add("talk");
    bubble.classList.add("talk");
    if (dur != null) talkTimer = setTimeout(finishTalk, dur);
  }

  var synth = window.speechSynthesis, esVoice = null;
  function pickVoice() {
    if (!synth) return;
    var vs = synth.getVoices() || [];
    var es = vs.filter(function (v) { return /^es/i.test(v.lang); });
    esVoice = es.filter(function (v) { return /CO|419|MX|US/i.test(v.lang); })[0] || es[0] || null;
  }
  var clip = null, speechVersion = 0, VZ = S.voces || { autorizadas: {} };
  function stopClip() {
    if (!clip) return;
    var a = clip; clip = null;
    a.onended = a.onerror = a.onloadedmetadata = a.onplaying = a.onwaiting = null;
    a.pause();
  }
  function speak(text, speaker, vid, b) {
    var version = ++speechVersion;
    clearTimeout(speakTimer); stopClip();
    if (synth) synth.cancel();
    if (!voiceOn) return;
    speakTimer = setTimeout(function () {
      function current() { return version === speechVersion && voiceOn; }
      var synthFallback = function () {
        if (!current()) return;
        talk(speaker, estimatedSpeechMs(text));
        if (!synth) return;
        var u = new SpeechSynthesisUtterance(String(text).replace(/[«»]/g, ""));
        u.lang = esVoice ? esVoice.lang : "es-ES"; if (esVoice) u.voice = esVoice;
        u.pitch = PITCH[speaker] || 1; u.rate = 1.02;
        u.onstart = function () { if (current()) talk(speaker, null); };
        u.onend = u.onerror = function () { if (current()) finishTalk(); };
        synth.speak(u);
      };
      if (VZ.autorizadas && VZ.autorizadas[speaker]) {
        var a = new Audio(VZ.carpeta + speaker + "/" + vid + "_" + b + "." + (VZ.formato || "mp3"));
        clip = a;
        function syncTalk() {
          if (!current() || clip !== a || a.paused) return;
          var seconds = a.duration - a.currentTime;
          talk(speaker, Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : estimatedSpeechMs(text));
        }
        a.onloadedmetadata = a.onplaying = syncTalk;
        a.onwaiting = function () { if (current() && clip === a) finishTalk(); };
        a.onended = function () { if (current() && clip === a) { stopClip(); finishTalk(); } };
        var failed = function () {
          if (!current() || clip !== a) return;
          stopClip(); synthFallback();
        };
        a.onerror = failed;
        talk(speaker, estimatedSpeechMs(text));
        var pr = a.play(); if (pr && pr.catch) pr.catch(failed);
      } else synthFallback();
    }, 500);
  }
  if (synth) {
    pickVoice(); if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);
  }
  if (synth || typeof Audio !== "undefined") $("#btn-voice").hidden = false;
  function setVoice(on) {
    voiceOn = on; $("#btn-voice").setAttribute("aria-pressed", on);
    if (!on) {
      ++speechVersion;
      if (synth) synth.cancel();
      clearTimeout(speakTimer); stopClip(); finishTalk();
    } else if (cur.i >= 0) speakCurrent();
    safe(function () { sessionStorage.setItem("voice", on ? "1" : "0"); });
  }
  var lastSpeech = { text: "", who: "", vid: "", b: 0 };
  function speakCurrent() { speak(lastSpeech.text, lastSpeech.who, lastSpeech.vid, lastSpeech.b); }

  /* ---------- render de un paso ---------- */
  var keyOf = ["narracion", "prompt", "resultado", "decision"];
  function render(n, force) {
    var st = steps[n]; if (!st) return;
    var vChanged = force || st.i !== cur.i, bChanged = vChanged || st.b !== cur.b;
    cur = { n: n, i: st.i, b: st.b };
    var v = V[st.i], a = actoById[v.acto], lane = LANE[v.carril];
    if (vChanged) {
      var lc = LANE[v.carril] || { c: "#B7791F", ct: "var(--amber)", on: "#1E1A16" };
      stage.style.setProperty("--c", lc.c); stage.style.setProperty("--ct", lc.ct); stage.style.setProperty("--on", lc.on);
      stage.dataset.lane = v.carril || "none";
      stage.setAttribute("aria-label", "Viñeta " + (st.i + 1) + " de " + NV + ": " + v.titulo);
      $("#st-act").textContent = a.nombre + " · " + a.rango;
      $("#st-count").textContent = pad2(st.i + 1) + " / " + pad2(NV);
      $("#st-title").textContent = v.titulo;
      showArt(st.i);
      polas.innerHTML = (v.evidencia || []).map(function (e, k) {
        var rr = [-5, 3, -2][k % 3];
        return '<button type="button" class="pola ' + (e.tipo === "captura" ? "real" : "ia") + '" style="--r:' + rr + 'deg;--i:' + k + '" data-src="' + esc(e.src) + '" data-cap="' + esc(e.titulo) + '" aria-label="Ampliar evidencia: ' + esc(e.titulo) + '"><img src="' + esc(e.src) + '" alt="" loading="lazy" decoding="async"><span>' + esc(tipoTag[e.tipo] || "") + "</span></button>";
      }).join("");
      var g = (v.globos || [])[0];
      if (g) {
        var p = team[g.quien];
        quote.innerHTML = '<span class="av"' + (p ? ' style="background-image:url(' + esc(p.cara) + ')"' : "") + ">" + (p ? "" : esc((nombres[g.quien] || "?").charAt(0))) + '</span><div class="qb"><b>' + esc(nombres[g.quien] || g.quien) + "</b>" + esc(g.texto) + "</div>";
      } else quote.innerHTML = "";
      updateRails(st.i);
      if (phase === "story" && location.hash !== "#" + v.id) safe(function () { history.replaceState(null, "", "#" + v.id); });
    }
    if (bChanged) {
      var b = st.b;
      var text = b === 0 ? v.narracion : v.pestanas[keyOf[b]];
      var speaker = order[(st.i + b) % 3];
      chipText.textContent = S.pasos[b];
      var dur = sayText(text, b);
      when.innerHTML = "<span>" + esc(v.fecha) + "</span><span>" + esc(v.herramienta) + "</span>";
      talk(speaker, dur);
      lastSpeech = { text: (b === 0 ? "" : S.pasos[b] + ". ") + text, who: speaker, vid: v.id, b: b };
      speak(lastSpeech.text, speaker, v.id, b);
      stepBtns.forEach(function (x, k) { x.setAttribute("aria-current", k === b ? "step" : "false"); x.classList.toggle("seen", k < b); if (k !== b) x.removeAttribute("aria-current"); });
      $$(".pola", polas).forEach(function (pl) { pl.classList.toggle("in", b >= 2 && !ess); });
      quote.hidden = !(b === 0 && quote.innerHTML);
      if (b === 0 && quote.innerHTML) { quote.style.animation = "none"; void quote.offsetWidth; quote.style.animation = ""; }
      artEl.style.setProperty("--z", (1.02 + 0.014 * b).toFixed(3));
      if (b > 0 || st.i > 0) cue.classList.add("gone");
    }
    progress.style.width = ((n + 1) / N * 100) + "%";
  }

  function updateRails(i) {
    S.carriles.forEach(function (c) {
      railByLane[c.id].classList.toggle("on", V[i].carril === c.id && phase !== "outro");
    });
    Object.keys(dotByV).forEach(function (k) {
      var d = dotByV[k]; k = +k;
      var all = phase === "outro";
      d.classList.toggle("done", all || k < i);
      d.classList.toggle("active", !all && k === i);
      if (!all && k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }

  /* ---------- scroll ---------- */
  var ticking = false, targetN = null, lastNav = 0;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.pageYOffset, vh = stage.offsetHeight;
      var endY = y0 + (N - 1) * beatPx + vh;
      var ph = y < y0 - vh * 0.45 ? "hero" : (y > endY - vh * 0.55 ? "outro" : "story");
      if (ph !== phase) { phase = ph; updateRails(cur.i); if (ph === "hero") safe(function () { history.replaceState(null, "", location.pathname + location.search); }); }
      var n = Math.max(0, Math.min(N - 1, Math.floor((y - y0) / beatPx + 0.03)));
      if (n !== cur.n) render(n);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", function () { targetN = null; }, { passive: true });
  window.addEventListener("touchstart", function () { targetN = null; }, { passive: true });

  /* ---------- teclado ---------- */
  function nav(d) {
    var base = (targetN != null && Date.now() - lastNav < 1000) ? targetN : (phase === "hero" ? -1 : (phase === "outro" ? N : cur.n));
    var t = Math.max(-1, Math.min(N, base + d));
    targetN = t; lastNav = Date.now();
    if (t < 0) jump(0);
    else if (t >= N) jump($("#resumen").offsetTop);
    else jump(stepY(t));
  }
  var lb = $("#lightbox");
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var tg = e.target, tag = (tg.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || lb.open) return;
    var k = e.key;
    if (k === "Escape") { if (!idx.hidden) { toggleIndex(false); btnIdx.focus(); } return; }
    var inControl = tag === "button" || tag === "summary" || (tag === "a" && tg.getAttribute("href"));
    if (k === "e" || k === "E") { toggleEssential(); return; }
    if (k === "p" || k === "P") { toggleProj(); return; }
    if (k === "v" || k === "V") { if (synth) setVoice(!voiceOn); return; }
    if (k === "i" || k === "I") { toggleIndex(); return; }
    if (tg.closest && tg.closest(".transcript")) return;
    var fwd = k === "ArrowDown" || k === "PageDown" || k === "ArrowRight" || (k === " " && !inControl);
    var back = k === "ArrowUp" || k === "PageUp" || k === "ArrowLeft";
    if (phase === "outro") {
      if (back && $("#resumen").getBoundingClientRect().top >= -8) { e.preventDefault(); nav(-1); }
      return;
    }
    if (fwd) { e.preventDefault(); nav(1); }
    else if (back) { e.preventDefault(); nav(-1); }
    else if (k === "Home") { e.preventDefault(); jump(0); targetN = -1; }
    else if (k === "End") { e.preventDefault(); jump($("#resumen").offsetTop); }
  });

  /* ---------- modos ---------- */
  var btnEss = $("#btn-essential"), btnProj = $("#btn-proj");
  function toggleEssential(force) {
    var on = typeof force === "boolean" ? force : !ess;
    if (on === ess) return;
    var keepI = cur.i < 0 ? 0 : cur.i, oldH = scroller.offsetHeight;
    ess = on; document.body.classList.toggle("essential", on); btnEss.setAttribute("aria-pressed", on);
    build();
    var nn = findStep(keepI, 0);
    if (phase === "story") window.scrollTo(0, stepY(nn));
    else if (phase === "outro") window.scrollBy(0, scroller.offsetHeight - oldH);
    render(nn, true);
    safe(function () { sessionStorage.setItem("essential", on ? "1" : "0"); });
  }
  function toggleProj(force) {
    var on = typeof force === "boolean" ? force : !proj;
    proj = on; document.body.classList.toggle("proj", on); btnProj.setAttribute("aria-pressed", on);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = on ? "#15110D" : "#FBF6EC";
    setTimeout(function () { measure(); layout(); }, 50);
    safe(function () { sessionStorage.setItem("proj", on ? "1" : "0"); });
  }
  btnEss.addEventListener("click", function () { toggleEssential(); });
  btnProj.addEventListener("click", function () { toggleProj(); });
  $("#btn-voice").addEventListener("click", function () { setVoice(!voiceOn); });
  $("#btn-start").addEventListener("click", function (e) { e.preventDefault(); goStep(0, 0); });
  $("#btn-start-ess").addEventListener("click", function () { toggleEssential(true); goStep(0, 0); });

  /* ---------- lightbox ---------- */
  function openLightbox(src, cap) { $("#lb-img").src = src; $("#lb-img").alt = cap; $("#lb-cap").textContent = cap; if (lb.showModal) lb.showModal(); }
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  polas.addEventListener("click", function (e) { var b = e.target.closest(".pola"); if (b) openLightbox(b.dataset.src, b.dataset.cap); });

  /* ---------- cierre ---------- */
  var laneOf = { "Podcast": "podcast", "Cómic": "comic", "Video": "video" };
  $("#tabla-ia").innerHTML = S.tablaIA.map(function (r) {
    return '<article class="kcard" style="' + laneCss(laneOf[r[0]]) + '"><h3><i></i>' + esc(r[0]) + "</h3><dl><dt>Lo que hizo la IA</dt><dd>" + esc(r[1]) + "</dd><dt>Lo que decidió el equipo</dt><dd>" + esc(r[2]) + "</dd></dl></article>";
  }).join("");
  $("#enlaces").innerHTML = S.enlaces.map(function (l) { return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.texto) + "</a></li>"; }).join("");
  $("#transcript-body").innerHTML = V.map(function (v, i) {
    return "<h3>" + pad2(i + 1) + ". " + esc(v.titulo) + '</h3><p class="tm">' + esc(v.fecha) + " · " + esc(v.herramienta) + "</p><p>" + esc(v.narracion) + "</p>" +
      "<p><strong>Prompt.</strong> " + esc(v.pestanas.prompt) + "</p><p><strong>Resultado.</strong> " + esc(v.pestanas.resultado) + "</p><p><strong>Decisión.</strong> " + esc(v.pestanas.decision) + "</p>";
  }).join("");
  $("#transcripcion").addEventListener("toggle", function () { if (this.open) this.scrollIntoView({ block: "start" }); });
  location.hash === "#transcripcion" && ($("#transcripcion").open = true);

  /* ---------- layout ---------- */
  function placeCast() {
    if (window.innerWidth >= 900) {
      var d = stage.getBoundingClientRect().bottom - left.getBoundingClientRect().bottom;
      stage.style.setProperty("--cb", (-d - 8) + "px");
    } else stage.style.removeProperty("--cb");
  }
  function layout() {
    var keep = phase === "story" ? cur.n : -1;
    build(); placeCast();
    if (keep >= 0) window.scrollTo(0, stepY(keep));
    if (cur.n >= 0) render(Math.min(cur.n, N - 1), false);
  }
  var rt = 0;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { measure(); layout(); onScroll(); }, 140); });
  var pendingHash = null;
  function applyHash() {
    if (!pendingHash) return;
    for (var i = 0; i < NV; i++) if (V[i].id === pendingHash) { window.scrollTo(0, stepY(findStep(i, 0))); break; }
    pendingHash = null;
  }
  window.addEventListener("load", function () { measure(); layout(); applyHash(); onScroll(); });
  window.addEventListener("pagehide", function () { ++speechVersion; clearTimeout(speakTimer); stopClip(); finishTalk(); if (synth) synth.cancel(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden && synth) synth.cancel(); });

  /* ---------- arranque ---------- */
  if (safe(function () { return sessionStorage.getItem("essential"); }) === "1") { ess = true; document.body.classList.add("essential"); btnEss.setAttribute("aria-pressed", true); }
  if (safe(function () { return sessionStorage.getItem("proj"); }) === "1") toggleProj(true);
  measure(); build(); placeCast();
  render(0, true);
  var m = location.hash.slice(1);
  if (m && V.some(function (v) { return v.id === m; })) pendingHash = m;
  onScroll();
  if (safe(function () { return sessionStorage.getItem("voice"); }) === "1" && synth) { voiceOn = true; $("#btn-voice").setAttribute("aria-pressed", true); }
})();
