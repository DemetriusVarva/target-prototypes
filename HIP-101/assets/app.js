/* HIP-101 prototype engine — vanilla JS + Motion One (optional). */
(function () {
  var M = window.Motion || null;
  var B = window.BRANDS || {};
  var qs = new URLSearchParams(location.search);
  var id = (qs.get("id") || "generic").toLowerCase();
  var brand = B[id] || B.generic;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- catalog ---------- */
  var CAT = {
    coffee:   [["Kawa", coffee()], ["Wypieki", bakery()], ["Śniadania", breakfast()]],
    bakery:   [["Pieczywo", bread()], ["Kawa", coffee()], ["Śniadania", breakfast()]],
    chocolate:[["Czekolada", choco()], ["Kawa", coffee()], ["Desery", desserts()]],
    icecream: [["Lody", icecream()], ["Kawa", coffee()], ["Desery", desserts()]]
  };
  function coffee(){return [["Cappuccino","☕",14],["Flat White","☕",16],["Latte","🥛",15],["Espresso","☕",9],["Matcha Latte","🍵",18]];}
  function bakery(){return [["Croissant maślany","🥐",9],["Pain au chocolat","🥐",11],["Jagodzianka","🫐",8],["Cynamonka","🌀",10]];}
  function bread(){return [["Chleb na zakwasie","🍞",9],["Bagietka","🥖",6],["Chleb razowy","🍞",11],["Bułki (6 szt.)","🥯",12]];}
  function breakfast(){return [["Kanapka jajeczna","🥪",16],["Bagietka z szynką","🥖",18],["Jogurt z granolą","🥣",14]];}
  function choco(){return [["Czekolada do picia","🍫",22],["Torcik Wedlowski","🎂",19],["Praliny (6 szt.)","🍬",28]];}
  function desserts(){return [["Sernik","🍰",15],["Szarlotka","🥧",14],["Deser dnia","🍮",16]];}
  function icecream(){return [["Lody rodzinne","🍨",24],["Gałka lodów","🍦",8],["Sorbet owocowy","🍧",12]];}

  /* ---------- state ---------- */
  var cart = [];
  var pickup = "8:30";

  /* ---------- apply branding ---------- */
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
    $("#heroMsg").textContent = brand.message;
    $("#heroCta").textContent = brand.cta.text;
    $("#lcBrand").textContent = (brand.short || brand.name);
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
  function renderMenu() {
    var cats = CAT[brand.focus] || CAT.coffee;
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
      list.appendChild(card([brand.signature.name, focusEmoji(), brand.signature.price], true));
    }
    items.forEach(function (it) { list.appendChild(card(it, false)); });
    if (M) M.animate($$(".card", list), { opacity: [0, 1], transform: ["translateY(14px)", "none"] }, { delay: M.stagger(0.05), duration: 0.4 });
  }
  function focusEmoji(){return {coffee:"⭐",bakery:"⭐",chocolate:"🍫",icecream:"🍨"}[brand.focus]||"⭐";}
  function card(it, sig) {
    var el = document.createElement("div");
    el.className = "card" + (sig ? " sig" : "");
    el.innerHTML =
      (sig ? '<div class="tag-sig">POLECAMY</div>' : '') +
      '<div class="thumb">' + it[1] + '</div>' +
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
    if (found) found.qty++; else cart.push({ name: it[0], price: it[2], emoji: it[1], qty: 1 });
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
    fly.style.left = (s.left - app.left + 6) + "px"; fly.style.top = (s.top - app.top + 6) + "px"; fly.style.opacity = 1;
    var dx = (target.left - s.left) + 6, dy = (target.top - s.top);
    if (M) M.animate(fly, { transform: ["translate(0,0) scale(1)", "translate(" + dx + "px," + dy + "px) scale(.3)"], opacity: [1, 1, 0] }, { duration: 0.7, easing: "ease-in" });
    else { fly.style.transition = "transform .7s ease-in,opacity .7s"; fly.style.transform = "translate(" + dx + "px," + dy + "px) scale(.3)"; setTimeout(function(){fly.style.opacity=0;},600); setTimeout(function(){fly.style.transition="";fly.style.transform="";},760); }
  }
  function renderCart() {
    var list = $("#cartList");
    if (!cart.length) { list.innerHTML = '<div class="cart-empty">Koszyk jest pusty.<br>Dodaj coś pysznego z menu 🥐</div>'; }
    else {
      list.innerHTML = "";
      cart.forEach(function (x, i) {
        var row = document.createElement("div"); row.className = "cart-row";
        row.innerHTML = '<div class="thumb" style="width:40px;height:40px;font-size:20px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 20%,#fff)">' + x.emoji + '</div>' +
          '<div class="nm">' + x.name + '</div>' +
          '<div class="qty"><button data-d="-1">–</button><b>' + x.qty + '</b><button data-d="1">+</button></div>' +
          '<div class="pr" style="font-weight:800;color:var(--main);min-width:56px;text-align:right">' + money(x.price * x.qty) + '</div>';
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
      el.onclick = function () { pickup = t; $$(".tchip", wrap).forEach(function(x){x.classList.remove("is-active");}); el.classList.add("is-active"); $("#pickupPill").textContent = "Odbiór " + t; $("#confirmSub").textContent = "Odbiór o " + t + " — pomiń kolejkę."; };
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
    var items = [[brand.signature ? brand.signature.name : "Kawa dnia", "wczoraj, " + (brand.short||""), brand.signature ? brand.signature.price : 14],
      ["Cappuccino ×2", "3 dni temu", 28], ["Croissant maślany", "w tym tygodniu", 9]];
    items.forEach(function (it) {
      var row = document.createElement("div"); row.className = "hrow";
      row.innerHTML = '<div><div class="hl">' + it[0] + '</div><div class="hd">' + it[1] + '</div></div><div class="hp">' + money(it[2]) + '</div>';
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
    if (M) M.animate(scr, { opacity: [0.4, 1], transform: ["translateX(24px)", "none"] }, { duration: 0.35, easing: [.2,.8,.2,1] });
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
    el.innerHTML = '<b>🎯 Ból, który zamykamy</b><span class="q">' + p.quote + '</span><span class="s">✓ ' + p.solve + '</span>';
    scr.appendChild(el);
  }

  /* ---------- helpers ---------- */
  function money(v){return (v.toFixed(2)).replace(".", ",") + " zł";}

  /* ---------- clock ---------- */
  function clock(){var d=new Date();$("#clock").textContent=d.getHours()+":"+String(d.getMinutes()).padStart(2,"0");}

  /* ---------- wire up ---------- */
  function bind() {
    $$("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go); }); });
    $$("[data-back]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.back); }); });
    $$("[data-pay]").forEach(function (b) { b.addEventListener("click", function () { pay(b.dataset.pay); }); });
    $("#demoToggle").addEventListener("click", function () {
      demoOn = !demoOn; document.body.classList.toggle("demo", demoOn);
      this.classList.toggle("on", demoOn); this.textContent = demoOn ? "🎯 Tryb demo: WŁ." : "🎯 Tryb demo: pokaż bóle";
      $("#demoLegend").textContent = "Przełączaj ekrany — na każdym pokażę realny cytat z opinii tej sieci";
      renderPain($(".screen.is-active").dataset.screen);
    });
  }

  /* ---------- init ---------- */
  applyBrand(); buildSwitcher(); renderMenu(); renderCart(); renderHistory(); bind(); clock(); setInterval(clock, 20000);
})();
