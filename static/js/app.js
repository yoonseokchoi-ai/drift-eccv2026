/* ===== DRIFT project page interactions ===== */

// ---------- Before/After comparison slider ----------
function initBASlider(root) {
  const after = root.querySelector(".ba-after");
  const handle = root.querySelector(".ba-handle");
  let dragging = false;
  const setPos = (pct) => {
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  };
  const fromEvent = (e) => {
    const r = root.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    setPos((x / r.width) * 100);
  };
  root.addEventListener("mousedown", (e) => { dragging = true; fromEvent(e); });
  window.addEventListener("mousemove", (e) => { if (dragging) fromEvent(e); });
  window.addEventListener("mouseup", () => { dragging = false; });
  root.addEventListener("touchstart", (e) => { dragging = true; fromEvent(e); }, {passive:true});
  root.addEventListener("touchmove", (e) => { if (dragging) fromEvent(e); }, {passive:true});
  root.addEventListener("touchend", () => { dragging = false; });
  setPos(50);
}

// ---------- Compare section: dataset + mode selectors ----------
function initCompare() {
  const sec = document.getElementById("compare");
  if (!sec) return;
  const beforeImg = sec.querySelector(".ba-before img");
  const afterImg = sec.querySelector(".ba-after img");
  let dataset = "hcp";
  const base = "static/images/slider/";
  const update = () => {
    beforeImg.src = `${base}${dataset}_lr.png`;
    afterImg.src  = `${base}${dataset}_drift.png`;
  };
  sec.querySelectorAll("[data-dataset]").forEach(b => b.addEventListener("click", () => {
    dataset = b.dataset.dataset;
    sec.querySelectorAll("[data-dataset]").forEach(x => x.classList.toggle("active", x === b));
    update();
  }));
  update();
}

// ---------- Tabs (gallery fixed/arbitrary) ----------
function initTabs() {
  document.querySelectorAll("[data-tabgroup]").forEach(group => {
    const g = group.dataset.tabgroup;
    document.querySelectorAll(`[data-tab='${g}']`).forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        document.querySelectorAll(`[data-tab='${g}']`).forEach(b => b.classList.toggle("active", b === btn));
        document.querySelectorAll(`[data-panel='${g}']`).forEach(p =>
          p.classList.toggle("hidden", p.dataset.name !== target));
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ba-slider").forEach(initBASlider);
  initCompare();
  initTabs();
});
