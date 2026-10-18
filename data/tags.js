// Tags tell an author what a device helps most. A name in byName replaces the default of its category.
window.TAGS = {
  // Basic terms for a new reader. The Start here filter shows these.
  start: ["Plot", "Conflict", "Character", "Protagonist", "Antagonist", "Theme", "Setting", "Point of view", "Narrator", "First-person narration", "Third-person limited", "Unreliable narrator", "Voice", "Three-act structure", "Hero's Journey", "Rising action", "Inciting incident", "Climax", "Character arc", "Stakes", "Exposition", "Foreshadowing", "Plot twist", "Red herring", "Flashback", "In medias res", "Pacing", "Show, don't tell", "Characterization", "Dialogue", "Subtext", "Metaphor", "Simile", "Symbol", "Motif", "Irony", "Genre", "Trope", "Cliché", "World-building"],
  // The category chips show in these groups. Each category needs one plain sentence.
  groups: [
    ["The shape of a story", ["Structure", "Plot & Technique", "Time & Order"]],
    ["People and voice", ["Character", "Point of View & Voice", "Dialogue"]],
    ["Worlds and patterns", ["World & Genre", "Trope", "Forms & Traditions"]],
    ["Language and play", ["Prose & Style", "Figurative Language", "Rhetoric", "Sound & Meter", "Meta & Experimental"]]
  ],
  blurbs: {
    "Structure": "The overall shape of a story: acts, beats and plot patterns.",
    "Plot & Technique": "Tools that build events: setups, twists, tension and endings.",
    "Time & Order": "How a story handles time: flashbacks, skips and pace.",
    "Character": "Roles and types of people in a story, and how they change.",
    "Point of View & Voice": "Who tells the story, how close they stand, and how they sound.",
    "Dialogue": "How characters speak, and how to write it on the page.",
    "World & Genre": "Settings, genres and the rules of a story world.",
    "Trope": "Common story patterns that readers know on sight.",
    "Forms & Traditions": "Kinds of work and old storytelling forms, from the novella and the epic to the sonnet.",
    "Prose & Style": "Choices of word and sentence that make a voice.",
    "Figurative Language": "Figures that say one thing and mean another: metaphor, irony, allusion.",
    "Rhetoric": "Figures of persuasion and sentence pattern from Greek and Roman teaching.",
    "Sound & Meter": "The sound and rhythm of words: rhyme, meter, alliteration.",
    "Meta & Experimental": "Stories that play with their own form, and theory about how we read."
  },
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
    "Meta & Experimental": ["novel", "short"],
    "Forms & Traditions": ["novel", "short"]
  },
  byName: {
    "Haiku": ["poetry"], "Sonnet": ["poetry"], "Villanelle": ["poetry"], "Sestina": ["poetry"], "Ballad": ["poetry"], "Elegy": ["poetry"], "Ode": ["poetry"], "Flyting": ["poetry"], "Oriki": ["poetry"], "Ghazal": ["poetry"], "Prose poem": ["poetry"],
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
    "Treatment": ["screen", "novel"], "Beat": ["screen", "novel", "short"], "Screwball comedy": ["screen"], "Slapstick": ["screen", "novel"],
    "Jump scare": ["screen", "game", "novel"], "Mock-heroic": ["poetry", "novel"], "Wayang": ["screen", "game"],
    "Lampshade hanging": ["novel", "screen", "game"], "Plot coupon": ["novel", "game"], "Isekai": ["novel", "game"]
  }
};
