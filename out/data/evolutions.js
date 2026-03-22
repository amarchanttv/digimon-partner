// data/evolutions.js
// Defines the evolution graph: for each Digimon, how much XP is needed
// to evolve and which Digimon it can evolve into.
//
// evolvesTo is an array — add more names to enable branching evolutions.
// Set xpToEvolve to null for Mega (final) forms.
//
// To add a new evolution path:
//   1. Add the Digimon entries to digimon.js
//   2. Add their sprites to /sprites
//   3. Add the evolution rule here

'use strict';

const EVOLUTIONS = {
  // ── Fresh → In-Training (20 XP) ───────────────────────────────────────────
  'Botamon':  { xpToEvolve: 20,  evolvesTo: ['Koromon']  },
  'Punimon':  { xpToEvolve: 20,  evolvesTo: ['Tsunomon', 'Nyaromon'] },
  'Yokomon':  { xpToEvolve: 20,  evolvesTo: ['Pyokomon'] },
  'Motimon':  { xpToEvolve: 20,  evolvesTo: ['Pabumon']  },
  'Yuramon':  { xpToEvolve: 20,  evolvesTo: ['Tanemon']  },
  'Pichimon': { xpToEvolve: 20,  evolvesTo: ['Bukamon']  },
  'Poyomon':  { xpToEvolve: 20,  evolvesTo: ['Tokomon']  },
  

  // ── In-Training → Rookie (50 XP) ──────────────────────────────────────────
  'Koromon':  { xpToEvolve: 50,  evolvesTo: ['Agumon']   },
  'Tsunomon': { xpToEvolve: 50,  evolvesTo: ['Gabumon']  },
  'Pyokomon': { xpToEvolve: 50,  evolvesTo: ['Biyomon']  },
  'Pabumon':  { xpToEvolve: 50,  evolvesTo: ['Tentomon'] },
  'Tanemon':  { xpToEvolve: 50,  evolvesTo: ['Palmon']   },
  'Bukamon':  { xpToEvolve: 50,  evolvesTo: ['Gomamon']  },
  'Tokomon':  { xpToEvolve: 50,  evolvesTo: ['Patamon']  },
  'Nyaromon': { xpToEvolve: 50,  evolvesTo: ['Salamon']  },

  // ── Rookie → Champion (150 XP) ────────────────────────────────────────────
  'Agumon':   { xpToEvolve: 150, evolvesTo: ['Greymon']      },
  'Gabumon':  { xpToEvolve: 150, evolvesTo: ['Garurumon']    },
  'Biyomon':  { xpToEvolve: 150, evolvesTo: ['Birdramon']    },
  'Tentomon': { xpToEvolve: 150, evolvesTo: ['Kabuterimon']  },
  'Palmon':   { xpToEvolve: 150, evolvesTo: ['Togemon']      },
  'Gomamon':  { xpToEvolve: 150, evolvesTo: ['Ikkakumon']    },
  'Patamon':  { xpToEvolve: 150, evolvesTo: ['Angemon']      },
  'Gatomon':  { xpToEvolve: 150, evolvesTo: ['Angewomon']    },
  'Salamon':  { xpToEvolve: 150, evolvesTo: ['Gatomon']     },

  // ── Champion → Ultimate (400 XP) ──────────────────────────────────────────
  'Greymon':     { xpToEvolve: 400, evolvesTo: ['MetalGreymon']       },
  'Garurumon':   { xpToEvolve: 400, evolvesTo: ['WereGarurumon']      },
  'Birdramon':   { xpToEvolve: 400, evolvesTo: ['Garudamon']          },
  'Kabuterimon': { xpToEvolve: 400, evolvesTo: ['MegaKabuterimon']    },
  'Togemon':     { xpToEvolve: 400, evolvesTo: ['Lillymon']           },
  'Ikkakumon':   { xpToEvolve: 400, evolvesTo: ['Zudomon']            },
  'Angemon':     { xpToEvolve: 400, evolvesTo: ['MagnaAngemon']       },
  'Gatomon':     { xpToEvolve: 400, evolvesTo: ['Angewomon']          },
  

  // ── Ultimate → Mega (800 XP) ──────────────────────────────────────────────
  'MetalGreymon':    { xpToEvolve: 800, evolvesTo: ['WarGreymon']          },
  'WereGarurumon':   { xpToEvolve: 800, evolvesTo: ['MetalGarurumon']      },
  'Garudamon':       { xpToEvolve: 800, evolvesTo: ['Phoenixmon']          },
  'MegaKabuterimon': { xpToEvolve: 800, evolvesTo: ['HerculesKabuterimon'] },
  'Lillymon':        { xpToEvolve: 800, evolvesTo: ['Rosemon']             },
  'Zudomon':         { xpToEvolve: 800, evolvesTo: ['Vikemon']             },
  'MagnaAngemon':    { xpToEvolve: 800, evolvesTo: ['Seraphimon']          },
  'Angewomon':       { xpToEvolve: 800, evolvesTo: ['Magnadramon']           },
  

  // ── Mega — no further evolution ───────────────────────────────────────────
  'WarGreymon':          { xpToEvolve: null, evolvesTo: [] },
  'MetalGarurumon':      { xpToEvolve: null, evolvesTo: [] },
  'Phoenixmon':          { xpToEvolve: null, evolvesTo: [] },
  'HerculesKabuterimon': { xpToEvolve: null, evolvesTo: [] },
  'Rosemon':             { xpToEvolve: null, evolvesTo: [] },
  'Vikemon':             { xpToEvolve: null, evolvesTo: [] },
  'Seraphimon':          { xpToEvolve: null, evolvesTo: [] },
  'Magnadramon':         { xpToEvolve: null, evolvesTo: [] },
};

// The pool of possible starting eggs (all Fresh stage)
const FRESH_EGGS = ['Botamon', 'Punimon', 'Yokomon', 'Motimon', 'Yuramon', 'Pichimon', 'Poyomon'];

module.exports = { EVOLUTIONS, FRESH_EGGS };
