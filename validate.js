// @ts-nocheck
// validate.js — run with: node validate.js
// Or trigger via VS Code command: "Digimon: [Debug] Validate"
'use strict';

const path = require('path');
const fs   = require('fs');

const DIGIMON    = require('./out/data/digimon').DIGIMON;
const EVOLUTIONS = require('./out/data/evolutions').EVOLUTIONS;
const spritesDir = path.join(__dirname, 'sprites');

// ─── Data ────────────────────────────────────────────────────────────────────

const spriteFiles = new Set(fs.readdirSync(spritesDir).filter(f => f.endsWith('.gif')).map(f => f.toLowerCase()));
const allSprites  = new Set(Object.values(DIGIMON).map(d => d.sprite.toLowerCase()));

const noGif    = Object.entries(DIGIMON).filter(([,d]) => !spriteFiles.has(d.sprite.toLowerCase())).map(([n]) => n);
const noEntry  = [...spriteFiles].filter(f => !allSprites.has(f));

const upToRookie  = ['Fresh', 'In-Training', 'Rookie'];
const missingEvo  = Object.keys(DIGIMON).filter(n => upToRookie.includes(DIGIMON[n].stage) && !EVOLUTIONS[n]);
const champsMiss  = Object.keys(DIGIMON).filter(n => DIGIMON[n].stage === 'Champion' && !EVOLUTIONS[n]);

const brokenRefs = [];
Object.entries(EVOLUTIONS).forEach(([name, evo]) => {
  evo.evolvesTo.forEach(t => { if (t && !DIGIMON[t]) brokenRefs.push(`${name} → '${t}'`); });
});

const incomingCount = {};
Object.entries(EVOLUTIONS).forEach(([, evo]) => {
  evo.evolvesTo.forEach(t => { if (t) incomingCount[t] = (incomingCount[t] || 0) + 1; });
});

const stages = ['Fresh', 'In-Training', 'Rookie', 'Champion', 'Ultimate', 'Mega'];
const byStage = {};
stages.forEach(s => {
  byStage[s] = Object.keys(DIGIMON).filter(n => DIGIMON[n].stage === s).map(n => {
    const evo = EVOLUTIONS[n];
    const evolvesTo = evo ? evo.evolvesTo.filter(t => t) : [];
    return {
      name:      n,
      sprite:    DIGIMON[n].sprite.toLowerCase(),
      from:      incomingCount[n] || 0,
      to:        evolvesTo.length,
      missingEvo:!evo,
      noIncoming:(incomingCount[n] || 0) === 0 && s !== 'Fresh',
    };
  });
});

// ─── Sprites as base64 ───────────────────────────────────────────────────────

const sprites = {};
fs.readdirSync(spritesDir).filter(f => f.endsWith('.gif')).forEach(f => {
  sprites[f.toLowerCase()] = 'data:image/gif;base64,' + fs.readFileSync(path.join(spritesDir, f)).toString('base64');
});

// ─── HTML ────────────────────────────────────────────────────────────────────

const stageColor = { Fresh:'#f38ba8', 'In-Training':'#fab387', Rookie:'#a6e3a1', Champion:'#89b4fa', Ultimate:'#cba6f7', Mega:'#f9e2af' };

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Digimon Validation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');
  :root { --bg:#0a0a0f; --surface:#12121a; --border:#1e1e2e; --accent:#00d4ff; --text:#cdd6f4; --muted:#6c7086; --warn:#f9e2af; --ok:#a6e3a1; --red:#f38ba8; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--text); font-family:'Share Tech Mono',monospace; font-size:15px; padding:20px; }
  h1 { font-family:'Press Start 2P',monospace; font-size:18px; color:var(--accent); margin-bottom:6px; text-shadow:0 0 20px rgba(0,212,255,0.4); }
  .generated { font-size:12px; color:var(--muted); margin-bottom:20px; }
  .summary { display:flex; gap:10px; margin-bottom:24px; flex-wrap:wrap; }
  .badge { padding:10px 14px; border-radius:6px; font-size:13px; font-weight:bold; }
  .badge.ok   { background:#1a2e1a; border:1px solid var(--ok);   color:var(--ok);   }
  .badge.warn { background:#2e2a1a; border:1px solid var(--warn);  color:var(--warn); }
  .badge.err  { background:#2e1a1a; border:1px solid var(--red);   color:var(--red);  }
  .tabs { display:flex; gap:6px; margin-bottom:16px; flex-wrap:wrap; }
  .tab { font-family:'Press Start 2P',monospace; font-size:11px; padding:10px 16px; border:1px solid var(--border); background:var(--surface); color:var(--muted); cursor:pointer; border-radius:4px; transition:all .15s; }
  .tab:hover { color:var(--text); border-color:var(--muted); }
  .tab.active { color:#11111b; }
  .stage-info { font-size:15px; color:var(--muted); margin-bottom:14px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:10px; }
  .card { background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:12px 8px; text-align:center; position:relative; transition:border-color .15s; }
  .card:hover { border-color:var(--accent); }
  .card.no-incoming { border-color:var(--red) !important; }
  .card.missing-evo { border-color:#f9e2af88 !important; }
  .sprite { height:64px; display:flex; align-items:flex-end; justify-content:center; margin-bottom:8px; }
  .sprite img { image-rendering:pixelated; max-height:64px; max-width:100%; width:auto; }
  .name { font-size:15px; font-weight:bold; margin-bottom:6px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .counts { display:flex; justify-content:center; gap:14px; font-size:17px; }
  .from span { color:var(--accent); }
  .to   span { color:var(--ok); }
  .to.warn span { color:var(--warn); }
  .flag { position:absolute; top:5px; right:7px; font-size:13px; }
  .panel { display:none; } .panel.active { display:block; }
</style>
</head>
<body>
<h1>DIGIMON VALIDATION</h1>
<div class="generated">Generated: ${new Date().toLocaleString()}</div>

<div class="summary">
  <div class="badge ${noGif.length   ? 'err'  : 'ok'}">${noGif.length   ? '❌ No gif: ' + noGif.join(', ')    : '✓ All digimon.js entries have sprites'}</div>
  <div class="badge ${noEntry.length ? 'err'  : 'ok'}">${noEntry.length ? '❌ No entry: ' + noEntry.join(', ') : '✓ All sprites registered in digimon.js'}</div>
  <div class="badge ${missingEvo.length ? 'err'  : 'ok'}">${missingEvo.length ? '❌ Missing from evolutions.js: ' + missingEvo.join(', ') : '✓ All Fresh / In-Training / Rookie in evolutions.js'}</div>
  <div class="badge ${champsMiss.length ? 'warn' : 'ok'}">${champsMiss.length ? '⚠ Champions missing evolutions.js entry: ' + champsMiss.join(', ') : '✓ All Champions in evolutions.js'}</div>
  <div class="badge ${brokenRefs.length ? 'err'  : 'ok'}">${brokenRefs.length ? '❌ Broken evolvesTo refs:<br>' + brokenRefs.join('<br>') : '✓ No broken evolvesTo references'}</div>
</div>

<div class="tabs" id="tabs"></div>
<div id="panels"></div>

<script>
const SPRITES = ${JSON.stringify(sprites)};
const DATA    = ${JSON.stringify(byStage)};
const STAGES  = ${JSON.stringify(stages)};
const COLORS  = ${JSON.stringify(stageColor)};

const tabsEl   = document.getElementById('tabs');
const panelsEl = document.getElementById('panels');

STAGES.forEach((s, i) => {
  const tab = document.createElement('button');
  tab.className = 'tab' + (i === 0 ? ' active' : '');
  tab.dataset.s = s;
  tab.textContent = s.toUpperCase() + ' (' + DATA[s].length + ')';
  tab.style.setProperty('--c', COLORS[s]);
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.style.background = ''; t.style.borderColor = ''; t.style.color = ''; });
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.style.background = COLORS[s]; tab.style.borderColor = COLORS[s]; tab.style.color = '#11111b';
    document.getElementById('panel-' + s.replace(/[^a-z]/gi, '')).classList.add('active');
  });
  if (i === 0) { tab.style.background = COLORS[s]; tab.style.borderColor = COLORS[s]; tab.style.color = '#11111b'; }
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + s.replace(/[^a-z]/gi, '');

  const noIncoming = DATA[s].filter(d => d.noIncoming);
  panel.innerHTML =
    '<div class="stage-info">' + DATA[s].length + ' Digimon' +
    (noIncoming.length
      ? ' &nbsp;|&nbsp; <span style="color:#f38ba8">❌ ' + noIncoming.length + ' with no evolution path to them</span>'
      : ' &nbsp;|&nbsp; <span style="color:#a6e3a1">✓ all reachable</span>') +
    '</div><div class="grid">' +
    DATA[s].map(d => {
      const src = SPRITES[d.sprite] || '';
      const img = src ? '<img src="' + src + '" />' : '<span style="font-size:28px;line-height:64px">❓</span>';
      const toWarn = d.to === 0 && s !== 'Mega' ? ' warn' : '';
      const flags = (d.noIncoming ? '<span class="flag" title="Nothing evolves into this">❌</span>' : '') +
                    (d.missingEvo ? '<span class="flag" style="right:24px" title="Not in evolutions.js">⚠</span>' : '');
      return '<div class="card' + (d.noIncoming ? ' no-incoming' : '') + (d.missingEvo ? ' missing-evo' : '') + '" style="border-top:3px solid ' + COLORS[s] + '">' +
        flags +
        '<div class="sprite">' + img + '</div>' +
        '<div class="name">' + d.name + '</div>' +
        '<div class="counts"><div class="from">↓<span>' + d.from + '</span></div><div class="to' + toWarn + '">↑<span>' + d.to + '</span></div></div>' +
        '</div>';
    }).join('') + '</div>';
  panelsEl.appendChild(panel);
});
</script>
</body>
</html>`;

// ─── Output ──────────────────────────────────────────────────────────────────

const outPath = path.join(__dirname, 'digimon-validation.html');
fs.writeFileSync(outPath, html);
console.log('✅ Validation written to: ' + outPath);
