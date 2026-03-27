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
  'Botamon':       { xpToEvolve: 20,  evolvesTo: ['Koromon', 'Pagumon', 'Tokomon']               },
  'Punimon':       { xpToEvolve: 20,  evolvesTo: ['Tsunomon', 'Nyaromon']                        },
  'Nyokimon':      { xpToEvolve: 20,  evolvesTo: ['Pyokomon', 'Tanemon', 'Koromon']              },
  'Pabumon':       { xpToEvolve: 20,  evolvesTo: ['Motimon', 'Pyokomon', 'Tanemon']              },
  'Yuramon':       { xpToEvolve: 20,  evolvesTo: ['Tanemon', 'Koromon', 'Petimeramon']           },
  'Pichimon':      { xpToEvolve: 20,  evolvesTo: ['Bukamon']                         },
  'Poyomon':       { xpToEvolve: 20,  evolvesTo: ['Tokomon', 'Bukamon']                          },
  'Zurumon':       { xpToEvolve: 20,  evolvesTo: ['Motimon', 'Koromon', 'Caprimon', 'Pagumon']   },
  'Choromon':      { xpToEvolve: 20,  evolvesTo: ['Caprimon']                                    },
  'Mokumon':       { xpToEvolve: 20,  evolvesTo: ['Caprimon', 'Sunmon', 'Petimeramon']           },
  'Yukimibotamon': { xpToEvolve: 20,  evolvesTo: ['Moonmon', 'Tsunomon', 'Nyaromon']             },
  'Petitmon':      { xpToEvolve: 20,  evolvesTo: ['Babydmon']                                    },
  

  // ── In-Training → Rookie (50 XP) ──────────────────────────────────────────
  'Koromon':     { xpToEvolve: 50,  evolvesTo: ['Agumon', 'Dracomon', 'Guilmon', 'Veemon', 'Toyagumon', 'Yukiagumon']       },
  'Tsunomon':    { xpToEvolve: 50,  evolvesTo: ['Gabumon', 'Elecmon', 'Gaomon', 'Goblimon', 'Veemon']                       },
  'Pyokomon':    { xpToEvolve: 50,  evolvesTo: ['Biyomon', 'Elecmon', 'Demidevimon', 'Floramon', 'Falcomon', 'Mushroomon']  },
  'Motimon':     { xpToEvolve: 50,  evolvesTo: ['Tentomon', 'Gottsumon', 'Hagurumon', 'Kunemon']                            },
  'Tanemon':     { xpToEvolve: 50,  evolvesTo: ['Palmon', 'Renamon', 'Mushroomon', 'Floramon', 'Kunemon']                   },
  'Bukamon':     { xpToEvolve: 50,  evolvesTo: ['Gomamon', 'Gizamon', 'Kamemon', 'Otamamon']                  },
  'Tokomon':     { xpToEvolve: 50,  evolvesTo: ['Patamon', 'Coronamon', 'Terriermon', 'Armadimon', 'Falcomon']   },
  'Nyaromon':    { xpToEvolve: 50,  evolvesTo: ['Salamon', 'Terriermon', 'Lunamon', 'Renamon']                              },
  'Caprimon':    { xpToEvolve: 50,  evolvesTo: ['Hagurumon', 'Toyagumon', 'Gottsumon', 'Armadimon']               },
  'Pagumon':     { xpToEvolve: 50,  evolvesTo: ['Gazimon', 'Demidevimon', 'Otamamon', 'Lopmon', 'Goblimon']                           },
  'Sunmon':      { xpToEvolve: 50,  evolvesTo: ['Coronamon', 'Guilmon', 'Salamon', 'Candlemon']                   },
  'Petimeramon': { xpToEvolve: 50,  evolvesTo: ['Candlemon', 'Agumon', 'Coronamon', 'Bakumon', 'Guilmon' ]                  },
  'Moonmon':     { xpToEvolve: 50,  evolvesTo: ['Lunamon', 'Gazimon', 'Renamon']                 },
  'Babydmon':    { xpToEvolve: 50,  evolvesTo: ['Dracomon', 'Otamamon']                      },
 

  // ── Rookie → Champion (150 XP) ────────────────────────────────────────────
  'Agumon':     { xpToEvolve: 150, evolvesTo: ['Greymon', 'GeoGreymon', 'Tyranomon', 'Meramon', 'Darktyranomon']      },
  'Gabumon':    { xpToEvolve: 150, evolvesTo: ['Garurumon', 'Ikkakumon', 'Veedramon', 'Frigimon', 'Gaogamon', 'Seadramon']    },
  'Biyomon':    { xpToEvolve: 150, evolvesTo: ['Birdramon', 'Airdramon', 'Unimon', 'Kokatorimon', 'Kabuterimon', 'Wizardmon']    },
  'Tentomon':   { xpToEvolve: 150, evolvesTo: ['Kabuterimon', 'Kuwagamon', 'Woodmon', 'Airdramon']  },
  'Palmon':     { xpToEvolve: 150, evolvesTo: ['Togemon', 'Vegiemon', 'Woodmon', 'Kiwimon', 'Kuwagamon', 'Mojyamon']      },
  'Gomamon':    { xpToEvolve: 150, evolvesTo: ['Ikkakumon', 'Ankylomon', 'Frigimon','Seadramon', 'Shellmon', 'Gesomon', 'Mojyamon']    },
  'Patamon':    { xpToEvolve: 150, evolvesTo: ['Angemon', 'Kyubimon', 'Unimon', 'Wizardmon', 'Centarumon']      },
  'Salamon':    { xpToEvolve: 150, evolvesTo: ['Gatomon', 'Veedramon', 'Gargomon', 'Centarumon', 'Sorcerimon', 'Darcmon']     },
  'Guilmon':    { xpToEvolve: 150, evolvesTo: ['Growlmon', 'Tyranomon', 'GeoGreymon', 'Meramon', 'Darktyranomon'] },
  'Dracomon':   { xpToEvolve: 150, evolvesTo: ['Coredramon', 'Tyranomon', 'Veedramon', 'Seadramon'] },
  'Demidevimon':{ xpToEvolve: 150, evolvesTo: ['Devimon', 'Icedevimon', 'Bakemon', 'Kyubimon', 'Ogremon', 'Devidramon' ] },
  'Elecmon':    { xpToEvolve: 150, evolvesTo: ['Leomon', 'Angemon', 'Gekomon', 'Garurumon', 'Unimon', 'Kokatorimon', 'Thunderballmon'] },
  'Gaomon':     { xpToEvolve: 150, evolvesTo: ['Gaogamon', 'Leomon', 'Garurumon', 'Gargomon', 'Togemon', 'Ogremon'] },
  'Goblimon':   { xpToEvolve: 150, evolvesTo: ['Ogremon', 'Nanimon', 'Coredramon', 'Gaogamon'] },
  'Hagurumon':  { xpToEvolve: 150, evolvesTo: ['Guardromon', 'Clockmon', 'Starmon', 'Thunderballmon'] },
  'Kunemon':    { xpToEvolve: 150, evolvesTo: ['Kabuterimon', 'Kuwagamon', 'Bakemon', 'Vegiemon', 'Thunderballmon'] },
  'Veemon':     { xpToEvolve: 150, evolvesTo: ['Veedramon', 'Meramon', 'Numemon', 'Raremon'] },
  'Toyagumon':  { xpToEvolve: 150, evolvesTo: ['Guardromon', 'Starmon', 'Sukamon', 'Clockmon', 'Greymon'] },
  'Falcomon':   { xpToEvolve: 150, evolvesTo: ['Peckmon', 'Airdramon', 'Exveemon', 'Kiwimon'] },
  'Floramon':   { xpToEvolve: 150, evolvesTo: ['Kiwimon', 'Vegiemon', 'Woodmon', 'Togemon'] },
  'Mushroomon': { xpToEvolve: 150, evolvesTo: ['Woodmon', 'Sukamon', 'Vegiemon'] },
  'Armadimon':  { xpToEvolve: 150, evolvesTo: ['Ankylomon', 'Monochromon', 'Tortomon', 'Geremon'] },
  'Bakumon':    { xpToEvolve: 150, evolvesTo: ['Meramon', 'Bakemon', 'Unimon', 'Kyubimon', 'Garurumon'] },
  'Candlemon':  { xpToEvolve: 150, evolvesTo: ['Wizardmon', 'Bakemon', 'Meramon', 'Geogreymon'] },
  'Coronamon':  { xpToEvolve: 150, evolvesTo: ['Firamon', 'Meramon', 'Birdramon', 'Growlmon', 'Geogreymon', 'Lynxmon'] },
  'Gazimon':    { xpToEvolve: 150, evolvesTo: ['Numemon', 'Gaogamon', 'Leomon', 'Devidramon'] },
  'Gizamon':    { xpToEvolve: 150, evolvesTo: ['Ankylomon', 'Geremon', 'Raremon'] },
  'Gottsumon':  { xpToEvolve: 150, evolvesTo: ['Ankylomon', 'Clockmon', 'Starmon', 'Monochromon', 'Guardromon'] },
  'Kamemon':    { xpToEvolve: 150, evolvesTo: ['Shellmon', 'Sorcerimon', 'Seadramon', 'Tortomon'] },
  'Lunamon':    { xpToEvolve: 150, evolvesTo: ['Lekismon', 'Frigimon', 'Sorcerimon', 'Gatomon'] },
  'Otamamon':   { xpToEvolve: 150, evolvesTo: ['Gekomon', 'Seadramon', 'Raremon', 'Gesomon', 'Numemon'] },
  'Renamon':    { xpToEvolve: 150, evolvesTo: ['Kyubimon', 'Lekismon', 'Garurumon', 'Lynxmon']},
  'Terriermon': { xpToEvolve: 150, evolvesTo: ['Gargomon', 'Ikkakumon', 'Ogremon', 'Angemon', 'Lekismon'] },
  'Yukiagumon': { xpToEvolve: 150, evolvesTo: ['Bakemon', 'Icedevimon', 'Seadramon', 'Frigimon'] },
  'Lopmon': { xpToEvolve: 150, evolvesTo: ['Wizardmon', 'Gargomon', 'Leomon', 'Darcmon', 'Devimon'] },

  // ── Champion → Ultimate (400 XP) ──────────────────────────────────────────
  'Greymon':     { xpToEvolve: 400, evolvesTo: ['MetalGreymon']       },
  'Garurumon':   { xpToEvolve: 400, evolvesTo: ['WereGarurumon']      },
  'Birdramon':   { xpToEvolve: 400, evolvesTo: ['Garudamon']          },
  'Kabuterimon': { xpToEvolve: 400, evolvesTo: ['MegaKabuterimon']    },
  'Togemon':     { xpToEvolve: 400, evolvesTo: ['Lillymon']           },
  'Ikkakumon':   { xpToEvolve: 400, evolvesTo: ['Zudomon']            },
  'Angemon':     { xpToEvolve: 400, evolvesTo: ['MagnaAngemon']       },
  'Gatomon':     { xpToEvolve: 400, evolvesTo: ['Angewomon']          },
  'Airdramon': { xpToEvolve: 400, evolvesTo: [] },
  'Ankylomon': { xpToEvolve: 400, evolvesTo: [] },
  'Bakemon': { xpToEvolve: 400, evolvesTo: [] },
  'Centarumon': { xpToEvolve: 400, evolvesTo: [] },
  'Clockmon': { xpToEvolve: 400, evolvesTo: [] },
  'Coredramon': { xpToEvolve: 400, evolvesTo: [] },
  'Darcmon': { xpToEvolve: 400, evolvesTo: [] },
  'DarkTyranomon': { xpToEvolve: 400, evolvesTo: [] },
  'Devidramon': { xpToEvolve: 400, evolvesTo: [] },
  'Devimon': { xpToEvolve: 400, evolvesTo: [] },
  'Firamon': { xpToEvolve: 400, evolvesTo: [] },
  'Frigimon': { xpToEvolve: 400, evolvesTo: [] },
  'Gaogamon': { xpToEvolve: 400, evolvesTo: [] },
  'Gargomon': { xpToEvolve: 400, evolvesTo: [] },
  'Gekomon': { xpToEvolve: 400, evolvesTo: [] },
  'GeoGreymon': { xpToEvolve: 400, evolvesTo: [] },
  'Geremon': { xpToEvolve: 400, evolvesTo: [] },
  'Gesomon': { xpToEvolve: 400, evolvesTo: [] },
  'Growlmon': { xpToEvolve: 400, evolvesTo: [] },
  'Guardromon': { xpToEvolve: 400, evolvesTo: [] },
  'IceDevimon': { xpToEvolve: 400, evolvesTo: [] },
  'Kiwimon': { xpToEvolve: 400, evolvesTo: [] },
  'Kokatorimon': { xpToEvolve: 400, evolvesTo: [] },
  'Kuwagamon': { xpToEvolve: 400, evolvesTo: [] },
  'Kyubimon': { xpToEvolve: 400, evolvesTo: [] },
  'Lekismon': { xpToEvolve: 400, evolvesTo: [] },
  'Leomon': { xpToEvolve: 400, evolvesTo: [] },
  'Lynxmon': { xpToEvolve: 400, evolvesTo: [] },
  'Meramon': { xpToEvolve: 400, evolvesTo: [] },
  'Mojyamon': { xpToEvolve: 400, evolvesTo: [] },
  'Monochromon': { xpToEvolve: 400, evolvesTo: [] },
  'Numemon': { xpToEvolve: 400, evolvesTo: [] },
  'Ogremon': { xpToEvolve: 400, evolvesTo: [] },
  'Peckmon': { xpToEvolve: 400, evolvesTo: [] },
  'Raremon': { xpToEvolve: 400, evolvesTo: [] },
  'Seadramon': { xpToEvolve: 400, evolvesTo: [] },
  'Shellmon': { xpToEvolve: 400, evolvesTo: [] },
  'Sorcerimon': { xpToEvolve: 400, evolvesTo: [] },
  'Starmon': { xpToEvolve: 400, evolvesTo: [] },
  'Sukamon': { xpToEvolve: 400, evolvesTo: [] },
  'Thunderballmon': { xpToEvolve: 400, evolvesTo: [] },
  'Tortomon': { xpToEvolve: 400, evolvesTo: [] },
  'Tyranomon': { xpToEvolve: 400, evolvesTo: [] },
  'Unimon': { xpToEvolve: 400, evolvesTo: [] },
  'Veedramon': { xpToEvolve: 400, evolvesTo: [] },
  'Vegiemon': { xpToEvolve: 400, evolvesTo: [] },
  'Wizardmon': { xpToEvolve: 400, evolvesTo: [] },
  'Woodmon': { xpToEvolve: 400, evolvesTo: [] },
  

  // ── Ultimate → Mega (800 XP) ──────────────────────────────────────────────
  'MetalGreymon':    { xpToEvolve: 800, evolvesTo: ['WarGreymon']          },
  'WereGarurumon':   { xpToEvolve: 800, evolvesTo: ['MetalGarurumon']      },
  'Garudamon':       { xpToEvolve: 800, evolvesTo: ['Phoenixmon']          },
  'MegaKabuterimon': { xpToEvolve: 800, evolvesTo: ['HerculesKabuterimon'] },
  'Lillymon':        { xpToEvolve: 800, evolvesTo: ['Rosemon']             },
  'Zudomon':         { xpToEvolve: 800, evolvesTo: ['Vikemon']             },
  'MagnaAngemon':    { xpToEvolve: 800, evolvesTo: ['Seraphimon']          },
  'Angewomon':       { xpToEvolve: 800, evolvesTo: ['Magnadramon', 'Ophanimon', 'Valkyrimon']},
  

  // ── Mega — no further evolution ───────────────────────────────────────────
  'WarGreymon':          { xpToEvolve: null, evolvesTo: [] },
  'MetalGarurumon':      { xpToEvolve: null, evolvesTo: [] },
  'Phoenixmon':          { xpToEvolve: null, evolvesTo: [] },
  'HerculesKabuterimon': { xpToEvolve: null, evolvesTo: [] },
  'Rosemon':             { xpToEvolve: null, evolvesTo: [] },
  'Vikemon':             { xpToEvolve: null, evolvesTo: [] },
  'Seraphimon':          { xpToEvolve: null, evolvesTo: [] },
  'Magnadramon':         { xpToEvolve: null, evolvesTo: [] },
  'Valkyrimon':         { xpToEvolve: null, evolvesTo:  [] },
};

const { DIGIMON } = require('./digimon');
 
// Automatically includes any Digimon with stage 'Fresh' — no need to update manually
const FRESH_EGGS = Object.keys(DIGIMON).filter(name => DIGIMON[name].stage === 'Fresh');

module.exports = { EVOLUTIONS, FRESH_EGGS };
