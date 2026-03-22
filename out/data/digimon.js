// data/digimon.js
// Each entry defines a Digimon's display name, stage, and sprite filename.
// To add a new Digimon: add an entry here, add its sprite to /sprites,
// and wire up its evolutions in evolutions.js.

'use strict';

const DIGIMON = {
  // ── Fresh ──────────────────────────────────────────────────────────────────
  'Botamon':  { stage: 'Fresh',       sprite: 'botamon.gif'             },
  'Punimon':  { stage: 'Fresh',       sprite: 'punimon.gif'             },
  'Yokomon':  { stage: 'Fresh',       sprite: 'yokomon.gif'             },
  'Motimon':  { stage: 'Fresh',       sprite: 'motimon.gif'             },
  'Yuramon':  { stage: 'Fresh',       sprite: 'yuramon.gif'             },
  'Pichimon': { stage: 'Fresh',       sprite: 'pichimon.gif'            },
  'Poyomon':  { stage: 'Fresh',       sprite: 'poyomon.gif'             },
  

  // ── In-Training ────────────────────────────────────────────────────────────
  'Koromon':  { stage: 'In-Training', sprite: 'koromon.gif'             },
  'Tsunomon': { stage: 'In-Training', sprite: 'tsunomon.gif'            },
  'Pyokomon': { stage: 'In-Training', sprite: 'pyokomon.gif'            },
  'Pabumon':  { stage: 'In-Training', sprite: 'pabumon.gif'             },
  'Tanemon':  { stage: 'In-Training', sprite: 'tanemon.gif'             },
  'Bukamon':  { stage: 'In-Training', sprite: 'bukamon.gif'             },
  'Tokomon':  { stage: 'In-Training', sprite: 'tokomon.gif'             },
  'Nyaromon': { stage: 'In-Training', sprite: 'nyaromon.gif'            },
  

  // ── Rookie ─────────────────────────────────────────────────────────────────
  'Agumon':   { stage: 'Rookie',      sprite: 'agumon.gif'              },
  'Gabumon':  { stage: 'Rookie',      sprite: 'gabumon.gif'             },
  'Biyomon':  { stage: 'Rookie',      sprite: 'biyomon.gif'             },
  'Tentomon': { stage: 'Rookie',      sprite: 'tentomon.gif'            },
  'Palmon':   { stage: 'Rookie',      sprite: 'palmon.gif'              },
  'Gomamon':  { stage: 'Rookie',      sprite: 'gomamon.gif'             },
  'Patamon':  { stage: 'Rookie',      sprite: 'patamon.gif'             },
  'Salamon':  { stage: 'Rookie',      sprite: 'salamon.gif'             },
  

  // ── Champion ───────────────────────────────────────────────────────────────
  'Greymon':     { stage: 'Champion', sprite: 'greymon.gif'     },
  'Garurumon':   { stage: 'Champion', sprite: 'garurumon.gif'   },
  'Birdramon':   { stage: 'Champion', sprite: 'birdramon.gif'   },
  'Kabuterimon': { stage: 'Champion', sprite: 'kabuterimon.gif' },
  'Togemon':     { stage: 'Champion', sprite: 'togemon.gif'     },
  'Ikkakumon':   { stage: 'Champion', sprite: 'ikkakumon.gif'   },
  'Angemon':     { stage: 'Champion', sprite: 'angemon.gif'     },
  'Gatomon':     { stage: 'Champion', sprite: 'gatomon.gif'     },
  

  // ── Ultimate ───────────────────────────────────────────────────────────────
  'MetalGreymon':    { stage: 'Ultimate', sprite: 'metalgreymon.gif'    },
  'WereGarurumon':   { stage: 'Ultimate', sprite: 'weregarurumon.gif'   },
  'Garudamon':       { stage: 'Ultimate', sprite: 'garudamon.gif'       },
  'MegaKabuterimon': { stage: 'Ultimate', sprite: 'megakabuterimon.gif' },
  'Lillymon':        { stage: 'Ultimate', sprite: 'lillymon.gif'        },
  'Zudomon':         { stage: 'Ultimate', sprite: 'zudomon.gif'         },
  'MagnaAngemon':    { stage: 'Ultimate', sprite: 'magnaangemon.gif'    },
  'Angewomon':       { stage: 'Ultimate', sprite: 'angewomon.gif'       },
  

  // ── Mega ───────────────────────────────────────────────────────────────────
  'WarGreymon':          { stage: 'Mega', sprite: 'wargreymon.gif'          },
  'MetalGarurumon':      { stage: 'Mega', sprite: 'metalgarurumon.gif'      },
  'Phoenixmon':          { stage: 'Mega', sprite: 'phoenixmon.gif'          },
  'HerculesKabuterimon': { stage: 'Mega', sprite: 'herculeskabuterimon.gif' },
  'Rosemon':             { stage: 'Mega', sprite: 'rosemon.gif'             },
  'Vikemon':             { stage: 'Mega', sprite: 'vikemon.gif'             },
  'Seraphimon':          { stage: 'Mega', sprite: 'seraphimon.gif'          },
  'Magnadramon':         { stage: 'Mega', sprite: 'magnadramon.gif'         },
  'Valkyrimon':          { stage: 'Mega', sprite: 'valkyrimon.gif'          },
};

module.exports = { DIGIMON };
