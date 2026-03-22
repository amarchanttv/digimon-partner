// data/digimon.js
// Each entry defines a Digimon's display name, stage, and sprite filename.
// To add a new Digimon: add an entry here, add its sprite to /sprites,
// and wire up its evolutions in evolutions.js.

'use strict';

const DIGIMON = {
  // ── Fresh ──────────────────────────────────────────────────────────────────
  'Botamon':  { stage: 'Fresh',       sprite: 'botamon.gif'             },
  'Punimon':  { stage: 'Fresh',       sprite: 'punimon.gif'             },
  'Nyokimon': { stage: 'Fresh',       sprite: 'nyokimon.gif'            },
  'Pabumon':  { stage: 'Fresh',       sprite: 'pabumon.gif'             },
  'Yuramon':  { stage: 'Fresh',       sprite: 'yuramon.gif'             },
  'Pichimon': { stage: 'Fresh',       sprite: 'pichimon.gif'            },
  'Poyomon':  { stage: 'Fresh',       sprite: 'poyomon.gif'             },
  'Zurumon':  { stage: 'Fresh',       sprite: 'zurumon.gif'             },
  'Choromon':  { stage: 'Fresh',       sprite: 'choromon.gif'           },
  'Mokumon':  { stage: 'Fresh',       sprite: 'mokumon.gif'             },
  'Yukimibotamon':  { stage: 'Fresh',       sprite: 'yukimibotamon.gif'             },
  'Petitmon':  { stage: 'Fresh',       sprite: 'petitmon.gif'             },
  

  // ── In-Training ────────────────────────────────────────────────────────────
  'Koromon':  { stage: 'In-Training', sprite: 'koromon.gif'             },
  'Tsunomon': { stage: 'In-Training', sprite: 'tsunomon.gif'            },
  'Pyokomon': { stage: 'In-Training', sprite: 'pyokomon.gif'            },
  'Motimon':  { stage: 'In-Training', sprite: 'motimon.gif'             },
  'Tanemon':  { stage: 'In-Training', sprite: 'tanemon.gif'             },
  'Bukamon':  { stage: 'In-Training', sprite: 'bukamon.gif'             },
  'Tokomon':  { stage: 'In-Training', sprite: 'tokomon.gif'             },
  'Nyaromon': { stage: 'In-Training', sprite: 'nyaromon.gif'            },
  'Caprimon': { stage: 'In-Training', sprite: 'caprimon.gif'            },
  'Pagumon': { stage: 'In-Training', sprite: 'pagumon.gif'              },
  'Sunmon': { stage: 'In-Training', sprite: 'sunmon.gif'                },
  'Petimeramon': { stage: 'In-Training', sprite: 'petimeramon.gif'      },
  'Moonmon': { stage: 'In-Training', sprite: 'moonmon.gif'              },
  'Babydmon': { stage: 'In-Training', sprite: 'babydmon.gif'            },

  

  // ── Rookie ─────────────────────────────────────────────────────────────────
  'Agumon':   { stage: 'Rookie',      sprite: 'agumon.gif'              },
  'Gabumon':  { stage: 'Rookie',      sprite: 'gabumon.gif'             },
  'Biyomon':  { stage: 'Rookie',      sprite: 'biyomon.gif'             },
  'Tentomon': { stage: 'Rookie',      sprite: 'tentomon.gif'            },
  'Palmon':   { stage: 'Rookie',      sprite: 'palmon.gif'              },
  'Gomamon':  { stage: 'Rookie',      sprite: 'gomamon.gif'             },
  'Patamon':  { stage: 'Rookie',      sprite: 'patamon.gif'             },
  'Salamon':  { stage: 'Rookie',      sprite: 'salamon.gif'             },
  'Guilmon':  { stage: 'Rookie',      sprite: 'guilmon.gif'             },
  'Dracomon':  { stage: 'Rookie',      sprite: 'dracomon.gif'           },
  'Demidevimon':  { stage: 'Rookie',      sprite: 'demidevimon.gif'     },
  'Elecmon':  { stage: 'Rookie',      sprite: 'elecmon.gif'             },
  'Gaomon':  { stage: 'Rookie',      sprite: 'gaomon.gif'               },
  'Goblimon':  { stage: 'Rookie',      sprite: 'goblimon.gif'           },
  'Hagurumon':  { stage: 'Rookie',      sprite: 'hagurumon.gif'         },
  'Kunemon':  { stage: 'Rookie',      sprite: 'kunemon.gif'             },
  'Veemon':  { stage: 'Rookie',      sprite: 'veemon.gif'               },
  'Toyagumon':  { stage: 'Rookie',      sprite: 'toyagumon.gif'         },
  'Falcomon':  { stage: 'Rookie',      sprite: 'falcomon.gif'           },
  'Floramon':  { stage: 'Rookie',      sprite: 'floramon.gif'           },
  'Mushroomon':  { stage: 'Rookie',      sprite: 'mushroomon.gif'       },
  'Armadimon':  { stage: 'Rookie', sprite: 'armadimon.gif'              },
  'Bakumon':    { stage: 'Rookie', sprite: 'bakumon.gif'                },
  'Candlemon':  { stage: 'Rookie', sprite: 'candlemon.gif'              },
  'Coronamon':  { stage: 'Rookie', sprite: 'coronamon.gif'              },
  'Gazimon':    { stage: 'Rookie', sprite: 'gazimon.gif'                },
  'Gizamon':    { stage: 'Rookie', sprite: 'gizamon.gif'                },
  'Gottsumon':  { stage: 'Rookie', sprite: 'gottsumon.gif'              },
  'Kamemon':    { stage: 'Rookie', sprite: 'kamemon.gif'                },
  'Lunamon':    { stage: 'Rookie', sprite: 'lunamon.gif'                },
  'Otamamon':   { stage: 'Rookie', sprite: 'otamamon.gif'               },
  'Renamon':    { stage: 'Rookie', sprite: 'renamon.gif'                },
  'Terriermon': { stage: 'Rookie', sprite: 'terriermon.gif'             },
  'Yukiagumon': { stage: 'Rookie', sprite: 'yukiagumon.gif'             },
  

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
  'Ophanimon':          { stage: 'Mega', sprite: 'ophanimon.gif'          },
};

module.exports = { DIGIMON };
