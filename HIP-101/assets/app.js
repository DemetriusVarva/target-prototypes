/* HIP-101 prototype engine — vanilla JS + Motion One (optional). */
(function () {
  var M = window.Motion || null;
  var B = window.BRANDS || {};
  var HERO = window.HERO || {};
  var qs = new URLSearchParams(location.search);
  var id = (qs.get("id") || "generic").toLowerCase();
  var brand = B[id] || B.generic;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* real food photos (Unsplash CDN) */
  function img(pid, w) { return "https://images.unsplash.com/photo-" + pid + "?w=" + (w || 160) + "&q=70&auto=format&fit=crop"; }

  /* ---------- catalog: [name, photoId, price] ---------- */
  var CAT = {
    coffee:   [["Kawa", coffee()], ["Wypieki", bakery()], ["Śniadania", breakfast()]],
    bakery:   [["Pieczywo", bread()], ["Kawa", coffee()], ["Śniadania", breakfast()]],
    chocolate:[["Czekolada", choco()], ["Kawa", coffee()], ["Desery", desserts()]],
    icecream: [["Lody", icecream()], ["Kawa", coffee()], ["Desery", desserts()]]
  };
  function coffee(){return [["Cappuccino","1572442388796-11668a67e53d",14],["Flat White","1461023058943-07fcbe16d735",16],["Latte","1461023058943-07fcbe16d735",15],["Espresso","1510707577719-ae7c14805e3a",9],["Matcha Latte","1536256263959-770b48d82b0a",18]];}
  function bakery(){return [["Croissant maślany","1481391319762-47dff72954d9",9],["Pain au chocolat","1623334044303-241021148842",11],["Jagodzianka","1551024601-bec78aea704b",8],["Cynamonka","1509365465985-25d11c17e812",10]];}
  function bread(){return [["Chleb na zakwasie","1549931319-a545dcf3bc73",9],["Bagietka","1608198093002-ad4e005484ec",6],["Chleb razowy","1598373182133-52452f7691ef",11],["Bułki (6 szt.)","1568254183919-78a4f43a2877",12]];}
  function breakfast(){return [["Kanapka jajeczna","1528735602780-2552fd46c7af",16],["Bagietka z szynką","1509722747041-616f39b57569",18],["Jogurt z granolą","1488477181946-6428a0291777",14]];}
  function choco(){return [["Czekolada do picia","1517578239113-b03992dcdd25",22],["Torcik Wedlowski","1578985545062-69928b1d9587",19],["Praliny (6 szt.)","1548741487-18d363dc4469",28]];}
  function desserts(){return [["Sernik","1533134242443-d4fd215305ad",15],["Szarlotka","1568571780765-9276ac8b75a2",14],["Deser dnia","1551024601-bec78aea704b",16]];}
  function icecream(){return [["Lody rodzinne","1497034825429-c343d7c6a68f",24],["Gałka lodów","1567206563064-6f60f40a2b57",8],["Sorbet owocowy","1501443762994-82bd5dace89a",12]];}

  /* ---------- state ---------- */
  var cart = [];
  var pickup = "8:30";

  /* ---------- apply branding + home personalization ---------- */
  function applyBrand() {
    var c = brand.colors, r = document.documentElement.style;
    r.setProperty("--main", c.main); r.setProperty("--accent", c.accent);
    r.setProperty("--dark", c.dark); r.setProperty("--neutral", c.neutral);
    (c.palette || []).forEach(function (h, i) { r.setProperty("--p" + (i + 1), h); });
    r.setProperty("--cta-bg", brand.cta.bg); r.setProperty("--cta-fg", brand.cta.color);
    r.setProperty("--font-h", '"' + brand.font.heading + '",serif');
    r.setProperty("--font-b", '"' + brand.font.body + '",system-ui,sans-serif');
    var fam = function (n) { return n.replace(/ /g, "+") + ":wght@400;500;600;700;800"; };
    $("#fontlink").href = "https://fonts.googleapis.com/css2?family=" + fam(brand.font.heading) + "&family=" + fam(brand.font.body) + "&display=swap";
    document.title = brand.name + " — zamów naprzód (prototyp)";
    $("#brandmark").textContent = initials(brand.short || brand.name);
    $("#brandname").textContent = brand.name;
    $("#heroTitle").textContent = brand.hero;
    $("#heroAuthentic").textContent = brand.authentic || brand.message;
    $("#heroCta").textContent = brand.cta.text;
    $("#lcBrand").textContent = (brand.short || brand.name);
    // heritage pill
    var sp = $("#sincePill");
    if (brand.since) { sp.textContent = "OD " + brand.since; sp.style.display = ""; } else { sp.style.display = "none"; }
    // hero photo by focus
    var hid = HERO[brand.focus] || HERO.coffee;
    $("#heroPhoto").style.backgroundImage = "linear-gradient(120deg, color-mix(in srgb,var(--main) 35%, transparent), transparent), url(" + img(hid, 900) + ")";
    // signature card
    $("#hsImg").src = img(brand.sigId, 160);
    $("#hsName").textContent = brand.signature ? brand.signature.name : "—";
    $("#hsPrice").textContent = brand.signature ? money(brand.signature.price) : "";
    // stats
    $("#heroStats").innerHTML =
      stat(brand.locations + "+", "lokalizacji") +
      stat("&lt;10s", "płatność BLIK") +
      stat("×3", "wzrost F&B*");
  }
  function stat(a, b){return '<div class="stat"><b>'+a+'</b><span>'+b+'</span></div>';}
  function initials(n){return n.replace(/[^A-Za-zА-Яа-яЁёŁłĆćŚśŻżŹźÓ ]/g,"").split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join("").toUpperCase()||"TS";}

  /* ---------- switcher ---------- */
  function buildSwitcher() {
    var wrap = $("#switcher");
    Object.keys(B).forEach(function (k) {
      var b = document.createElement("button");
      b.textContent = (k === "generic" ? "★ Ogólny" : B[k].short || B[k].name);
      if (k === id) b.className = "is-active";
      b.onclick = function () { qs.set("id", k); location.search = qs.toString(); };
      wrap.appendChild(b);
    });
  }

  /* ---------- menu ---------- */
  function injectCollectBanner() {
    if ($("#collectBanner")) return;
    var head = $('.screen[data-screen="menu"] .scr-head');
    if (!head) return;
    var b = document.createElement("div");
    b.id = "collectBanner"; b.className = "collect-banner";
    b.innerHTML = '<span class="dot"></span><span>Zamówienie z odbiorem — <b>będzie gotowe o ' + pickup + '</b>, bez kolejki</span>';
    head.insertAdjacentElement("afterend", b);
  }
  function renderMenu() {
    var cats = CAT[brand.focus] || CAT.coffee;
    injectCollectBanner();
    var chips = $("#catChips"); chips.innerHTML = "";
    cats.forEach(function (c, i) {
      var el = document.createElement("button");
      el.className = "chip" + (i === 0 ? " is-active" : "");
      el.textContent = c[0];
      el.onclick = function () { $$(".chip", chips).forEach(function (x){x.classList.remove("is-active");}); el.classList.add("is-active"); drawList(c[1], i === 0); };
      chips.appendChild(el);
    });
    drawList(cats[0][1], true);
  }
  function drawList(items, withSig) {
    var list = $("#menuList"); list.innerHTML = "";
    if (withSig && brand.signature) {
      list.appendChild(card([brand.signature.name, brand.sigId, brand.signature.price], true));
    }
    items.forEach(function (it) { list.appendChild(card(it, false)); });
    if (M) M.animate($$(".card", list), { opacity: [0, 1], transform: ["translateY(16px)", "none"] }, { delay: M.stagger(0.05), duration: 0.4 });
  }
  function card(it, sig) {
    var el = document.createElement("div");
    el.className = "card" + (sig ? " sig" : "");
    el.innerHTML =
      (sig ? '<div class="tag-sig">POLECAMY</div>' : '') +
      '<div class="thumb"><img loading="lazy" alt="" src="' + img(it[1], 160) + '"></div>' +
      '<div class="info"><div class="nm">' + it[0] + '</div>' +
      '<div class="ds">' + (sig ? "sygnatura marki" : "świeże, na miejscu") + '</div>' +
      '<div class="pr">' + money(it[2]) + '</div></div>' +
      '<button class="add" aria-label="Dodaj">+</button>';
    el.querySelector(".add").onclick = function (e) { addToCart(it, e.currentTarget); };
    return el;
  }

  /* ---------- cart ---------- */
  function addToCart(it, srcBtn) {
    var found = cart.find(function (x){return x.name === it[0];});
    if (found) found.qty++; else cart.push({ name: it[0], price: it[2], pid: it[1], qty: 1 });
    updateBadge(); flyDot(srcBtn);
    renderCart();
  }
  function updateBadge() {
    var n = cart.reduce(function (s, x){return s + x.qty;}, 0);
    var badge = $("#cartBadge"); badge.textContent = n;
    if (M && n) M.animate(badge, { transform: ["scale(1.6)", "scale(1)"] }, { duration: 0.4 });
  }
  function flyDot(srcBtn) {
    if (!srcBtn) return;
    var fly = $("#fly"), app = $("#app").getBoundingClientRect();
    var s = srcBtn.getBoundingClientRect();
    var target = $('#tabbar button[data-go="cart"]').getBoundingClientRect();
    fly.style.left = (s.left - app.left + 8) + "px"; fly.style.top = (s.top - app.top + 8) + "px"; fly.style.opacity = 1;
    var dx = (target.left - s.left) + 6, dy = (target.top - s.top);
    if (M) M.animate(fly, { transform: ["translate(0,0) scale(1)", "translate(" + dx + "px," + dy + "px) scale(.3)"], opacity: [1, 1, 0] }, { duration: 0.7, easing: "ease-in" });
    else { fly.style.transition = "transform .7s ease-in,opacity .7s"; fly.style.transform = "translate(" + dx + "px," + dy + "px) scale(.3)"; setTimeout(function(){fly.style.opacity=0;},600); setTimeout(function(){fly.style.transition="";fly.style.transform="";},760); }
  }
  function renderCart() {
    var list = $("#cartList");
    if (!cart.length) { list.innerHTML = '<div class="cart-empty">Koszyk jest pusty.<br>Dodaj coś pysznego z menu.</div>'; }
    else {
      list.innerHTML = "";
      cart.forEach(function (x, i) {
        var row = document.createElement("div"); row.className = "cart-row";
        row.innerHTML = '<div class="thumb-sm"><img loading="lazy" alt="" src="' + img(x.pid, 96) + '"></div>' +
          '<div class="nm">' + x.name + '</div>' +
          '<div class="qty"><button data-d="-1">–</button><b>' + x.qty + '</b><button data-d="1">+</button></div>' +
          '<div class="cprice">' + money(x.price * x.qty) + '</div>';
        row.querySelectorAll(".qty button").forEach(function (btn) {
          btn.onclick = function () { x.qty += (+btn.dataset.d); if (x.qty <= 0) cart.splice(i, 1); updateBadge(); renderCart(); };
        });
        list.appendChild(row);
      });
    }
    renderTimes(); renderSummary();
  }
  function renderTimes() {
    var wrap = $("#timeChips"); wrap.innerHTML = "";
    ["Teraz +15 min", "8:30", "9:00", "12:30", "17:30"].forEach(function (t, i) {
      var el = document.createElement("button"); el.className = "tchip" + ((t === pickup || (i === 1 && pickup === "8:30")) ? " is-active" : "");
      el.textContent = t;
      el.onclick = function () { pickup = t; $$(".tchip", wrap).forEach(function(x){x.classList.remove("is-active");}); el.classList.add("is-active"); $("#pickupPill").textContent = "Odbiór " + t; $("#confirmSub").textContent = "Odbiór o " + t + " — pomiń kolejkę."; var cb = $("#collectBanner"); if (cb) cb.querySelector("b").textContent = "będzie gotowe o " + t; };
      wrap.appendChild(el);
    });
  }
  function renderSummary() {
    var sub = cart.reduce(function (s, x){return s + x.price * x.qty;}, 0);
    $("#cartSummary").innerHTML =
      '<div class="row"><span>Suma</span><span>' + money(sub) + '</span></div>' +
      '<div class="row"><span>Odbiór własny</span><span>0,00 zł</span></div>' +
      '<div class="row total"><span>Do zapłaty</span><span>' + money(sub) + '</span></div>';
    $("#payAmount").textContent = money(sub);
  }

  /* ---------- payment ---------- */
  function pay(method) {
    $("#payProcessing").classList.add("on");
    setTimeout(function () { $("#payProcessing").classList.remove("on"); go("confirm"); runTracker(); }, 1400);
  }
  function runTracker() {
    setTimeout(function () { $("#stepPrep").classList.add("done"); }, 900);
    setTimeout(function () { $("#stepReady").classList.add("done"); }, 2200);
  }

  /* ---------- loyalty history ---------- */
  function renderHistory() {
    var h = $("#history"); h.innerHTML = "";
    var items = [[brand.signature ? brand.signature.name : "Kawa dnia", "wczoraj", brand.signature ? brand.signature.price : 14, brand.sigId],
      ["Cappuccino ×2", "3 dni temu", 28, "1572442388796-11668a67e53d"], ["Croissant maślany", "w tym tygodniu", 9, "1481391319762-47dff72954d9"]];
    items.forEach(function (it) {
      var row = document.createElement("div"); row.className = "hrow";
      row.innerHTML = '<div class="thumb-sm"><img loading="lazy" alt="" src="' + img(it[3], 96) + '"></div><div class="hinfo"><div class="hl">' + it[0] + '</div><div class="hd">' + it[1] + '</div></div><div class="hp">' + money(it[2]) + '</div>';
      h.appendChild(row);
    });
  }

  /* ---------- navigation ---------- */
  function go(name) {
    $$(".screen").forEach(function (s) { s.classList.toggle("is-active", s.dataset.screen === name); });
    $$("#tabbar button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.go === name); });
    var scr = $('.screen[data-screen="' + name + '"]'); if (scr) scr.scrollTop = 0;
    if (name === "cart") renderCart();
    if (name === "loyalty") { renderHistory(); if (M) M.animate("#lcBar", { width: ["0%", "80%"] }, { duration: 1 }); }
    if (name === "confirm") { $("#checkMark").style.animation = "none"; void $("#checkMark").offsetWidth; $("#checkMark").style.animation = ""; }
    renderPain(name);
  }

  /* ---------- demo mode: pains ---------- */
  var demoOn = false;
  function renderPain(name) {
    $$(".pain-badge").forEach(function (n){n.remove();});
    if (!demoOn) return;
    var p = (brand.pains || []).find(function (x){return x.screen === name;});
    if (!p) return;
    var scr = $('.screen[data-screen="' + name + '"]');
    var el = document.createElement("div"); el.className = "pain-badge";
    el.innerHTML = '<b>Ból, który zamykamy</b><span class="q">' + p.quote + '</span><span class="s">✓ ' + p.solve + '</span>';
    scr.appendChild(el);
  }

  /* ---------- helpers ---------- */
  function money(v){return (v.toFixed(2)).replace(".", ",") + " zł";}
  function clock(){var d=new Date();$("#clock").textContent=d.getHours()+":"+String(d.getMinutes()).padStart(2,"0");}

  /* ---------- wire up ---------- */
  function bind() {
    $$("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go); }); });
    $$("[data-back]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.back); }); });
    $$("[data-pay]").forEach(function (b) { b.addEventListener("click", function () { pay(b.dataset.pay); }); });
    $("#demoToggle").addEventListener("click", function () {
      demoOn = !demoOn; document.body.classList.toggle("demo", demoOn);
      this.classList.toggle("on", demoOn);
      this.innerHTML = '<span class="dm-dot"></span>' + (demoOn ? "Tryb demo — WŁ." : "Tryb demo — pokaż bóle");
      $("#demoLegend").textContent = "Przełączaj ekrany — na każdym pokażę realny cytat z opinii tej sieci";
      renderPain($(".screen.is-active").dataset.screen);
    });
  }

  /* ---------- init ---------- */
  applyBrand(); buildSwitcher(); renderMenu(); renderCart(); renderHistory(); bind(); clock(); setInterval(clock, 20000);
})();
