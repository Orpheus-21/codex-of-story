// Tags tell an author what a device helps most. A name in byName replaces the default of its category.
window.TAGS = {
  labels: { novel: "Novel", short: "Short story", screen: "Screenplay", game: "Game", poetry: "Poetry" },
  byCat: {
    "Structure": ["novel", "short", "screen"],
    "Time & Order": ["novel", "short", "screen"],
    "Point of View & Voice": ["novel", "short"],
    "Plot & Technique": ["novel", "short", "screen"],
    "Character": ["novel", "short", "screen", "game"],
    "Trope": ["novel", "short", "screen", "game"],
    "World & Genre": ["novel", "short", "screen", "game"],
    "Figurative Language": ["novel", "short", "poetry"],
    "Sound & Meter": ["poetry"],
    "Rhetoric": ["novel", "short", "poetry"],
    "Prose & Style": ["novel", "short"],
    "Dialogue": ["novel", "short", "screen"],
    "Meta & Experimental": ["novel", "short"]
  },
  byName: {
    "Branching narrative": ["novel", "game"], "Ergodic literature": ["novel", "game"], "Hypertext": ["novel", "game"],
    "Environmental storytelling": ["game"], "Ludonarrative dissonance": ["game"], "Player agency": ["game"],
    "Emergent narrative": ["game"], "Cutscene": ["game"], "The Quest": ["novel", "short", "screen", "game"],
    "B-story": ["screen"], "Bottle episode": ["screen"], "Set piece": ["screen", "game"], "Act break": ["screen"],
    "Match cut": ["screen"], "Smash cut": ["screen"], "Logline": ["screen", "novel"], "Cold open": ["screen"],
    "Voice-over": ["screen"], "Mise-en-scène": ["screen"], "Non-diegetic sound": ["screen", "game"],
    "Verfremdungseffekt": ["screen"], "Save the Cat beat sheet": ["screen", "novel"], "Sequence approach": ["screen"],
    "Mockumentary": ["screen", "novel"], "Running gag": ["screen", "novel"], "Button": ["screen"],
    "Talking heads": ["screen"], "Overlapping dialogue": ["screen"], "Cross-cutting": ["screen", "novel"],
    "Montage": ["screen", "novel", "short"], "Real-time narrative": ["screen", "novel"],
    "Flash fiction": ["short"], "Short story": ["short"], "Unity of effect": ["short"], "Epiphany": ["short"],
    "Vignette": ["short", "novel"], "Cliffhanger": ["novel", "screen", "game"], "Time loop": ["novel", "short", "screen", "game"],
    "Lampshade hanging": ["novel", "screen", "game"], "Plot coupon": ["novel", "game"], "Isekai": ["novel", "game"]
  }
};
