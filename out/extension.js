// @ts-nocheck
'use strict';

const vscode = require('vscode');
const { DIGIMON }                = require('./data/digimon');
const { EVOLUTIONS, FRESH_EGGS } = require('./data/evolutions');

const STAGE_SIZES = { 'Fresh': 24, 'In-Training': 32, 'Rookie': 48, 'Champion': 56, 'Ultimate': 62, 'Mega': 64 };
const XP_SAVE        = 5;
const XP_EDIT        = 1;
const XP_TERMINAL    = 3;
const XP_PER_NEW_EGG = 500;
const STATE_KEY      = 'digimonState_v4';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function canEvolve(name, xp) {
  const evo = EVOLUTIONS[name];
  return evo && evo.xpToEvolve !== null && xp >= evo.xpToEvolve && evo.evolvesTo.length > 0;
}

function randomEgg() {
  return FRESH_EGGS[Math.floor(Math.random() * FRESH_EGGS.length)];
}

function makeDigi(name) {
  return { id: Date.now() + Math.floor(Math.random() * 1000), currentName: name, xp: 0, history: [name], visible: true, unhatched: false };
}

function makeEgg() {
  return { id: Date.now() + Math.floor(Math.random() * 1000), currentName: null, xp: 0, history: [], visible: false, unhatched: true };
}

// ─── State ────────────────────────────────────────────────────────────────────

class DigimonState {
  constructor(ctx) {
    this.ctx = ctx;
    const saved = ctx.globalState.get(STATE_KEY);
    this.d = (saved && saved.collection) ? saved : null;
  }

  get ready()      { return this.d !== null && this.d.collection.length > 0; }
  get collection() { return this.d ? this.d.collection : []; }
  get totalXP()    { return this.d ? this.d.totalXP : 0; }

  hatchFirst() {
    const name = randomEgg();
    this.d = { collection: [makeDigi(name)], totalXP: 0, eggsEarned: 0, selected: null };
    this._save();
    return name;
  }

  addXP(n) {
    if (!this.ready) { return null; }
    this.d.totalXP += n;
    this.d.collection.forEach(digi => { if (!digi.unhatched) { digi.xp += n; } });
    const hasUnhatched = this.d.collection.some(d => d.unhatched);
    if (!hasUnhatched) {
      this.d.eggXP = (this.d.eggXP || 0) + n;
      const eggsNow = Math.floor(this.d.eggXP / XP_PER_NEW_EGG);
      if (eggsNow > this.d.eggsEarned) {
        this.d.eggsEarned = eggsNow;
        this.d.collection.push(makeEgg());
        this._save();
        return true;
      }
    }
    this._save();
    return null;
  }

  hatchEgg(id) {
    const egg = this.d.collection.find(d => d.id === id && d.unhatched);
    if (!egg) { return null; }
    const name = randomEgg();
    egg.unhatched = false;
    egg.currentName = name;
    egg.history = [name];
    egg.visible = true;
    this._save();
    return name;
  }

  evolve(id, targetName) {
    const digi = this.d.collection.find(d => d.id === id);
    if (!digi || !DIGIMON[targetName]) { return; }
    digi.history.push(targetName);
    digi.currentName = targetName;
    digi.xp = 0;
    this._save();
  }

  toggleVisible(id) {
    const digi = this.d.collection.find(d => d.id === id);
    if (digi) { digi.visible = !digi.visible; this._save(); }
  }

  setSelected(id) {
    this.d.selected = (this.d.selected === id) ? null : id;
    this._save();
  }

  deselect() {
    this.d.selected = null;
    this._save();
  }

  release(id) {
    this.d.collection = this.d.collection.filter(d => d.id !== id);
    if (this.d.selected === id) { this.d.selected = null; }
    this._save();
  }

  reset() { this.d = null; this._save(); }
  _save() { this.ctx.globalState.update(STATE_KEY, this.d); }

  snapshot() {
    if (!this.ready) { return { initialized: false }; }
    const selectedId = this.d.selected;
    const collection = this.d.collection.map(digi => {
      if (digi.unhatched) { return { id: digi.id, unhatched: true }; }
      const mon = DIGIMON[digi.currentName];
      const evo = EVOLUTIONS[digi.currentName];
      if (!mon) {
        // Digimon name no longer exists in data — skip it
        return { id: digi.id, unhatched: true };
      }
      const opts = evo ? evo.evolvesTo.filter(n => DIGIMON[n]).map(n => ({ name: n, sprite: DIGIMON[n].sprite, stage: DIGIMON[n].stage })) : [];
      return {
        id:          digi.id,
        size:        STAGE_SIZES[mon.stage] || 48,
        name:        digi.currentName,
        stage:       mon.stage,
        sprite:      mon.sprite,
        xp:          digi.xp,
        xpToEvolve:  evo ? evo.xpToEvolve : null,
        xpPct:       (evo && evo.xpToEvolve) ? Math.min(100, digi.xp / evo.xpToEvolve * 100) : 100,
        canEvolve:   canEvolve(digi.currentName, digi.xp),
        nextOptions: opts,
        history:     digi.history,
        visible:     digi.visible,
        selected:    digi.id === selectedId,
      };
    });
    const spritesNeeded = new Set();
    collection.filter(d => !d.unhatched).forEach(d => {
      spritesNeeded.add(d.sprite);
      d.nextOptions.forEach(o => spritesNeeded.add(o.sprite));
    });
    return {
      initialized:   true,
      collection,
      totalXP:       this.d.totalXP,
      nextEggXP:     XP_PER_NEW_EGG * (this.d.eggsEarned + 1),
      eggXP:         this.d.eggXP || 0,
      spritesNeeded: [...spritesNeeded],
    };
  }
}

// ─── Sidebar Provider ─────────────────────────────────────────────────────────

class DigimonSidebarProvider {
  constructor(ctx, state) {
    this.ctx = ctx; this.state = state; this._view = null;
    this._htmlBuilt = false; // track whether we've set the full HTML yet
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;
    this._htmlBuilt = false;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.ctx.extensionUri, 'sprites'),
        vscode.Uri.joinPath(this.ctx.extensionUri, 'media'),
      ]
    };
    this._buildHtml(); // build full HTML once

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.command) {
        case 'hatchEgg': {
          const name = this.state.hatchEgg(msg.id);
          if (name) { this._buildHtml(); vscode.window.showInformationMessage('🥚 ' + name + ' has hatched!'); }
          break;
        }
        case 'hatch': {
          const name = this.state.hatchFirst();
          this._buildHtml();
          vscode.window.showInformationMessage('🥚 ' + name + ' has hatched!');
          break;
        }
        case 'evolve': {
          this.state.evolve(msg.id, msg.target);
          this.state.deselect();
          this._buildHtml();
          vscode.window.showInformationMessage('✨ Digivolved into ' + msg.target + '!');
          break;
        }
        case 'toggleVisible': {
          this.state.toggleVisible(msg.id);
          // Full rebuild — arena walkers change
          this._buildHtml();
          break;
        }
        case 'select': {
          this.state.setSelected(msg.id);
          // Only update the UI data, don't rebuild HTML (keeps arena alive)
          this._pushUpdate();
          break;
        }
        case 'release': {
          const pick = await vscode.window.showWarningMessage('Release this Digimon?', 'Yes', 'Cancel');
          if (pick === 'Yes') { this.state.release(msg.id); this._buildHtml(); }
          break;
        }
        case 'reset': {
          const confirm = await vscode.window.showWarningMessage('Reset everything?', 'Yes', 'Cancel');
          if (confirm === 'Yes') { this.state.reset(); this._buildHtml(); }
          break;
        }
      }
    });
  }

  // Called on XP events — only push a data update, never touch the HTML
  refresh(newEgg) {
    if (!this._view) { return; }
    if (newEgg) {
      vscode.window.showInformationMessage('🥚 A new egg appeared in your roster!');
      this._buildHtml(); // egg added to roster, need to rebuild
    } else {
      this._pushUpdate(); // XP changed — just update numbers, leave arena alone
    }
  }

  // Send updated state to the already-loaded webview JS
  _pushUpdate() {
    if (!this._view) { return; }
    const snap = this.state.snapshot();
    const uris = {};
    if (snap.initialized) {
      snap.spritesNeeded.forEach(s => { uris[s] = this._uri(s); });
    }
    this._view.webview.postMessage({ command: 'update', snap, uris });
  }

  // Full HTML rebuild — only for structural changes (new digimon, evolve, hatch)
  _buildHtml() {
    if (!this._view) { return; }
    this._htmlBuilt = true;
    const snap  = this.state.snapshot();
    const nonce = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const csp   = this._view.webview.cspSource;

    const uris = {};
    if (snap.initialized) {
      snap.spritesNeeded.forEach(s => { uris[s] = this._uri(s); });
    }

    const walkOffsets = ['0s', '-2.3s', '-4.6s', '-1.1s', '-3.4s'];

    this._view.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; img-src ${csp} data:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<style>
* { box-sizing:border-box; margin:0; padding:0; }
body { background:var(--vscode-sideBar-background); color:var(--vscode-foreground); font-family:var(--vscode-font-family,sans-serif); font-size:12px; padding:10px; }

.egg-screen { text-align:center; padding:20px 0; }
.egg-screen h2 { font-size:14px; color:#89b4fa; margin-bottom:6px; }
.egg-screen p  { font-size:11px; opacity:.6; margin-bottom:16px; line-height:1.6; }
.egg-icon  { font-size:52px; margin-bottom:16px; display:block; animation:wobble 2s ease-in-out infinite; }
@keyframes wobble { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} }
.hatch-btn { background:#89b4fa; color:#11111b; border:none; border-radius:6px; padding:8px 20px; font-size:12px; font-weight:700; cursor:pointer; }
.hatch-btn:hover { opacity:.85; }

.arena { background:var(--vscode-editor-background); border:1px solid var(--vscode-panel-border,#444); border-radius:8px; height:110px; position:relative; overflow:hidden; margin-bottom:10px; }
.walker { image-rendering:pixelated; position:absolute; bottom:10px; animation:walk 12s linear infinite; cursor:pointer; }
@keyframes walk {
  0%    { left:-32px;       transform:scaleX(1);  }
  48%   { left:calc(100%);  transform:scaleX(1);  }
  50%   { left:calc(100%);  transform:scaleX(-1); }
  98%   { left:-32px;       transform:scaleX(-1); }
  100%  { left:-32px;       transform:scaleX(1);  }
}

.xp-section { margin-bottom:10px; }
.row { display:flex; justify-content:space-between; font-size:11px; margin-bottom:3px; }
.lbl { opacity:.6; }
.val { font-weight:700; color:#f9e2af; }
.bar-bg   { background:var(--vscode-panel-border,#444); border-radius:4px; height:6px; overflow:hidden; }
.bar-fill { height:100%; background:linear-gradient(90deg,#89b4fa,#a6e3a1); border-radius:4px; transition:width .4s; }

.evo-box   { background:var(--vscode-editor-background); border:1px solid #a6e3a1; border-radius:6px; padding:8px; margin-bottom:10px; text-align:center; }
.evo-title { font-size:11px; color:#a6e3a1; font-weight:700; margin-bottom:6px; }
.evo-opts  { display:flex; gap:6px; justify-content:center; flex-wrap:wrap; }
.evo-btn   { background:#a6e3a1; color:#11111b; border:none; border-radius:5px; padding:5px 12px; font-size:11px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; }
.evo-btn img { width:24px; height:24px; image-rendering:pixelated; }
.evo-btn:hover { opacity:.8; }
.evo-stage { font-size:8px; opacity:.6; }
.mega { text-align:center; font-size:11px; color:#f9e2af; background:var(--vscode-editor-background); border:1px solid #f9e2af; border-radius:6px; padding:6px; margin-bottom:10px; }

.roster-label { font-size:9px; opacity:.4; margin-bottom:6px; text-transform:uppercase; letter-spacing:.5px; }
.roster { display:flex; flex-direction:column; gap:4px; margin-bottom:10px; max-height:180px; overflow-y:auto; padding-right:2px; }
.roster::-webkit-scrollbar { width:4px; }
.roster::-webkit-scrollbar-track { background:transparent; }
.roster::-webkit-scrollbar-thumb { background:var(--vscode-panel-border,#444); border-radius:2px; }
.roster-row { display:flex; align-items:center; gap:6px; background:var(--vscode-editor-background); border:1px solid var(--vscode-panel-border,#444); border-radius:6px; padding:5px 7px; cursor:pointer; }
.roster-row.selected   { border-color:#89b4fa; }
.roster-row.hidden-digi { opacity:.45; }
.roster-row.can-evolve { border-color:#a6e3a1; box-shadow:0 0 6px rgba(166,227,161,0.35); animation:evo-pulse 2s ease-in-out infinite; }
@keyframes evo-pulse { 0%,100%{box-shadow:0 0 4px rgba(166,227,161,0.3)} 50%{box-shadow:0 0 10px rgba(166,227,161,0.6)} }
.roster-sprite { width:28px; height:28px; image-rendering:pixelated; flex-shrink:0; }
.roster-info { flex:1; min-width:0; }
.roster-name  { font-size:11px; font-weight:700; color:#89b4fa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.roster-stage { font-size:9px; opacity:.5; }
.roster-actions { display:flex; gap:4px; flex-shrink:0; }
.icon-btn { background:none; border:1px solid var(--vscode-panel-border,#444); color:var(--vscode-foreground); border-radius:4px; width:22px; height:22px; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center; opacity:.6; }
.icon-btn:hover { opacity:1; }
.icon-btn.danger:hover { border-color:#f38ba8; color:#f38ba8; }

.egg-progress { margin-bottom:10px; }
.footer { display:flex; justify-content:space-between; align-items:center; }
.total  { font-size:9px; opacity:.4; }
.rst-btn { background:none; border:1px solid var(--vscode-panel-border,#444); color:var(--vscode-foreground); border-radius:4px; padding:2px 7px; font-size:9px; cursor:pointer; opacity:.45; }
.rst-btn:hover { opacity:1; border-color:#f38ba8; color:#f38ba8; }
</style>
</head>
<body>
<div id="app"></div>
<script nonce="${nonce}">
const vsc      = acquireVsCodeApi();
let   SNAP     = ${JSON.stringify(snap)};
let   URIS     = ${JSON.stringify(uris)};
const OFFSETS  = ${JSON.stringify(walkOffsets)};

function u(f) { return URIS[f] || ''; }

// ── Called on full renders AND on postMessage updates ──────────────────────
function render(s) {
  const app = document.getElementById('app');

  if (!s.initialized) {
    app.innerHTML =
      '<div class="egg-screen">' +
        '<span class="egg-icon">🥚</span>' +
        '<h2>A mystery egg...</h2>' +
        '<p>Something is waiting inside.<br>Click to hatch your partner!</p>' +
        '<button class="hatch-btn" id="hatchBtn">Hatch Egg</button>' +
      '</div>';
    document.getElementById('hatchBtn').addEventListener('click', () => vsc.postMessage({ command:'hatch' }));
    return;
  }

  // Arena — only rendered on full rebuilds (this function), not on XP updates
  const visible = s.collection.filter(d => !d.unhatched && d.visible);
  const walkers = visible.map((d, i) =>
    '<img class="walker" src="' + u(d.sprite) + '" style="animation-delay:' + OFFSETS[i % OFFSETS.length] + ';height:' + d.size + 'px;width:auto" title="' + d.name + '"/>'
  ).join('');

  // Selected panel
  const sel = s.collection.find(d => !d.unhatched && d.selected) || null;
  const selPanel = buildSelPanel(sel);

  // Next egg progress
  const eggPct  = Math.min(100, (s.eggXP % 500) / 5);
  const eggLeft = s.nextEggXP - s.eggXP;
  const eggProgress =
    '<div class="egg-progress">' +
      '<div class="row"><span class="lbl">🥚 Next egg</span><span class="val">' + (eggLeft > 0 ? eggLeft + ' XP' : 'Ready!') + '</span></div>' +
      '<div class="bar-bg"><div id="eggBar" class="bar-fill" style="width:' + eggPct + '%;background:linear-gradient(90deg,#f9e2af,#fab387)"></div></div>' +
    '</div>';

  // Roster
  const rosterRows = buildRoster(s.collection);

  app.innerHTML =
    '<div class="arena" id="arena">' + walkers + '</div>' +
    '<div id="selPanel">' + selPanel + '</div>' +
    eggProgress +
    '<div class="roster-label">Your Digimon</div>' +
    '<div class="roster" id="roster">' + rosterRows + '</div>' +
    '<div class="footer"><span class="total" id="totalXp">Total XP: ' + s.totalXP + '</span><button class="rst-btn" id="rst">Reset All</button></div>';

  attachListeners();
}

// ── Only updates XP numbers + roster state, never touches the arena ────────
function updateData(s) {
  // Update selected panel
  const sel = s.collection.find(d => !d.unhatched && d.selected) || null;
  const selEl = document.getElementById('selPanel');
  if (selEl) { selEl.innerHTML = buildSelPanel(sel); attachEvoListeners(); }

  // Update egg progress bar
  const eggPct  = Math.min(100, (s.eggXP % 500) / 5);
  const eggLeft = s.nextEggXP - s.eggXP;
  const bar = document.getElementById('eggBar');
  if (bar) { bar.style.width = eggPct + '%'; }
  const eggRow = bar && bar.closest('.egg-progress');
  if (eggRow) {
    const valEl = eggRow.querySelector('.val');
    if (valEl) { valEl.textContent = eggLeft > 0 ? eggLeft + ' XP' : 'Ready!'; }
  }

  // Update roster rows (XP bars, evolve badges) without replacing the whole list
  const roster = document.getElementById('roster');
  if (roster) { roster.innerHTML = buildRoster(s.collection); attachRosterListeners(); }

  // Total XP
  const totalEl = document.getElementById('totalXp');
  if (totalEl) { totalEl.textContent = 'Total XP: ' + s.totalXP; }
}

function buildSelPanel(sel) {
  if (!sel) { return ''; }
  const away = sel.xpToEvolve ? (sel.xpToEvolve - sel.xp) + ' XP needed' : '–';
  let evoHtml = '';
  if (sel.canEvolve && sel.nextOptions.length > 0) {
    const btns = sel.nextOptions.map(o =>
      '<button class="evo-btn" data-id="' + sel.id + '" data-t="' + o.name + '">' +
        '<img src="' + u(o.sprite) + '"/>' + o.name +
        '<span class="evo-stage">(' + o.stage + ')</span>' +
      '</button>'
    ).join('');
    evoHtml = '<div class="evo-box"><div class="evo-title">⚡ ' + sel.name + ' is ready to Digivolve!</div><div class="evo-opts">' + btns + '</div></div>';
  } else if (!sel.xpToEvolve) {
    evoHtml = '<div class="mega">🏆 ' + sel.name + ' reached maximum evolution!</div>';
  }
  return '<div class="xp-section">' +
    '<div class="row"><span class="lbl">' + sel.name + ' XP</span><span class="val">' + sel.xp + ' / ' + (sel.xpToEvolve || '∞') + '</span></div>' +
    '<div class="row"><span class="lbl">Next evolution</span><span class="val">' + away + '</span></div>' +
    '<div class="bar-bg"><div class="bar-fill" style="width:' + sel.xpPct + '%"></div></div>' +
  '</div>' + evoHtml;
}

function buildRoster(collection) {
  return collection.map(d => {
    if (d.unhatched) {
      return '<div class="roster-row egg-row" data-id="' + d.id + '">' +
        '<span style="font-size:24px;flex-shrink:0">🥚</span>' +
        '<div class="roster-info"><div class="roster-name">Mystery Egg</div><div class="roster-stage">Waiting to hatch...</div></div>' +
        '<div class="roster-actions"><button class="icon-btn hatch-egg-btn" data-id="' + d.id + '" style="width:auto;padding:0 6px;opacity:1;background:#f9e2af;color:#11111b;border-color:#f9e2af;font-weight:700">Hatch</button></div>' +
      '</div>';
    }
    return '<div class="roster-row' +
      (d.selected    ? ' selected'    : '') +
      (!d.visible    ? ' hidden-digi' : '') +
      (d.canEvolve   ? ' can-evolve'  : '') +
      '" data-id="' + d.id + '">' +
      '<img class="roster-sprite" src="' + u(d.sprite) + '"/>' +
      '<div class="roster-info">' +
        '<div class="roster-name">' + (d.canEvolve ? '⚡ ' : '') + d.name + '</div>' +
        '<div class="roster-stage">' + d.stage + ' · ' + d.history.join(' → ') + '</div>' +
      '</div>' +
      '<div class="roster-actions">' +
        '<button class="icon-btn vis-btn" data-id="' + d.id + '">' + (d.visible ? '👁' : '🚫') + '</button>' +
        '<button class="icon-btn danger rel-btn" data-id="' + d.id + '">✕</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function attachEvoListeners() {
  document.querySelectorAll('.evo-btn').forEach(btn =>
    btn.addEventListener('click', () => vsc.postMessage({ command:'evolve', id: +btn.dataset.id, target: btn.dataset.t }))
  );
}

function attachRosterListeners() {
  document.querySelectorAll('.hatch-egg-btn').forEach(btn =>
    btn.addEventListener('click', () => vsc.postMessage({ command:'hatchEgg', id: +btn.dataset.id }))
  );
  document.querySelectorAll('.roster-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.vis-btn') || e.target.closest('.rel-btn') || e.target.closest('.hatch-egg-btn') || row.classList.contains('egg-row')) { return; }
      vsc.postMessage({ command:'select', id: +row.dataset.id });
    });
  });
  document.querySelectorAll('.vis-btn').forEach(btn =>
    btn.addEventListener('click', () => vsc.postMessage({ command:'toggleVisible', id: +btn.dataset.id }))
  );
  document.querySelectorAll('.rel-btn').forEach(btn =>
    btn.addEventListener('click', () => vsc.postMessage({ command:'release', id: +btn.dataset.id }))
  );
}

function attachListeners() {
  attachEvoListeners();
  attachRosterListeners();
  const rst = document.getElementById('rst');
  if (rst) { rst.addEventListener('click', () => vsc.postMessage({ command:'reset' })); }
}

// ── Listen for updates from extension ─────────────────────────────────────
window.addEventListener('message', e => {
  const msg = e.data;
  if (msg.command === 'update') {
    SNAP = msg.snap;
    URIS = msg.uris;
    updateData(SNAP); // patch numbers only — arena untouched
  }
});

render(SNAP);
</script>
</body>
</html>`;
  }

  _uri(f) {
    return this._view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'sprites', f)
    ).toString();
  }
}

// ─── Activate ─────────────────────────────────────────────────────────────────

function activate(ctx) {
  const state    = new DigimonState(ctx);
  const provider = new DigimonSidebarProvider(ctx, state);

  ctx.subscriptions.push(
    vscode.window.registerWebviewViewProvider('digimonPartner.mainView', provider, {
      webviewOptions: { retainContextWhenHidden: true }
    })
  );

  ctx.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(() => {
      const newEgg = state.addXP(XP_SAVE);
      provider.refresh(newEgg);
    })
  );

  let lastEdit = 0;
  ctx.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(() => {
      const now = Date.now();
      if (now - lastEdit > 5000) {
        lastEdit = now;
        const newEgg = state.addXP(XP_EDIT);
        provider.refresh(newEgg);
      }
    })
  );

  ctx.subscriptions.push(
    vscode.window.onDidOpenTerminal(() => {
      const newEgg = state.addXP(XP_TERMINAL);
      provider.refresh(newEgg);
    })
  );

  if (vscode.window.onDidEndTerminalShellExecution) {
    ctx.subscriptions.push(
      vscode.window.onDidEndTerminalShellExecution(() => {
        const newEgg = state.addXP(XP_TERMINAL);
        provider.refresh(newEgg);
      })
    );
  }

  ctx.subscriptions.push(
    vscode.commands.registerCommand('digimon.debug.addDigimon', async () => {
      const names = Object.keys(DIGIMON);
      const pick = await vscode.window.showQuickPick(
        names.map(n => ({ label: n, description: DIGIMON[n].stage })),
        { placeHolder: 'Pick a Digimon to add to your collection' }
      );
      if (pick) {
        const digi = makeDigi(pick.label);
        state.d.collection.push(digi);
        state._save();
        provider._buildHtml();
        vscode.window.showInformationMessage('🐉 Added ' + pick.label + ' to your collection!');
      }
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('digimon.debug.addXP', async () => {
      const input = await vscode.window.showInputBox({ prompt: 'How much XP to add?', value: '100' });
      if (input) {
        const amount = parseInt(input);
        if (!isNaN(amount)) {
          state.d.collection.forEach(d => { if (!d.unhatched) { d.xp += amount; } });
          state.d.totalXP += amount;
          state._save();
          provider._buildHtml();
          vscode.window.showInformationMessage('✨ Added ' + amount + ' XP to all Digimon!');
        }
      }
    })
  );
  ctx.subscriptions.push(
    vscode.commands.registerCommand('digimon.debug.validate', () => {
      const { execSync } = require('child_process');
      const path = require('path');
      const validateScript = path.join(ctx.extensionUri.fsPath, 'validate.js');
      const outFile = path.join(ctx.extensionUri.fsPath, 'digimon-validation.html');
      try {
        execSync(`node "${validateScript}"`, { cwd: ctx.extensionUri.fsPath });
        vscode.env.openExternal(vscode.Uri.file(outFile));
      } catch (e) {
        vscode.window.showErrorMessage('Validation failed: ' + e.message);
      }
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('digimon.resetPartner', async () => {
      const pick = await vscode.window.showWarningMessage('Reset all Digimon?', 'Yes', 'Cancel');
      if (pick === 'Yes') { state.reset(); provider.refresh(null); }
    })
  );
}

function deactivate() {}
module.exports = { activate, deactivate };
