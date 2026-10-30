/* ============================================================
   EDIT ME: everything on the site that's about you lives here.
   Save the file and refresh the page to see your changes.
   ============================================================ */

window.SITE = {
  name: "Dazed",
  tagline: "Games, mods and code, conjured out of purple smoke.",
  plaque: "Wishes granted",  // the neon line in the plaque under the logo; keep it short
  projectsIntro: "Lampsmoke games first, then the mods. From closed beta to early days.",
  contactIntro: "No lamp rubbing needed. You can find me here.",

  about: {
    // Each string is one paragraph.
    paragraphs: [
      "I'm Dazed. I make games and mods, and most of my playing time goes into Project Zomboid. That's where my biggest project so far started: Dazed & Infected, a suite of 25 mods that adds depth to the survival loop while keeping the game's look and feel.",
      "My games come out under my studio name, Lampsmoke Games. Right now that's Lampbound, a puzzle game about a djinn trapped in his own lamp; Project Ironblood, a mech tactics game; Chin Check, an MMA career sim; and Dirty Money Disco, a 1980s nightclub management sim. This is where I share how they're going. Rub the lamp to look around."
    ],
    currently: "Running closed beta tests of Dazed & Infected on dedicated multiplayer servers",
    plays: ["Project Zomboid"],
    buildsWith: ["Godot 4", "GDScript", "Project Zomboid modding"]
  },

  // Ways to reach you. Leave url as "" to show the handle without a link.
  contact: [
    { label: "GitHub", handle: "github.com/Dazedgenie", url: "https://github.com/Dazedgenie" },
    { label: "Discord", handle: "discord.gg/qkP5CPHgy", url: "https://discord.gg/qkP5CPHgy", note: "Dazed & Infected testing server" }
  ]
};

/* ------------------------------------------------------------
   PROJECTS: one { ... } block per project, in the order shown.
   Each project gets its own page at #slug (e.g. #chin-check).

   slug:     short id for the page link: lowercase letters, numbers, dashes
   aliases:  optional old slugs that should still open this page
   studio:   optional, e.g. "Lampsmoke" shows "A Lampsmoke game"
   type:     "Game", "Mod" or "Code" (picks the icon and colour)
   status:   any short text. "Released", "Closed beta", "In development"
             and "Early development" each get their own colour.
   summary:  one or two sentences for the card on the Projects page
   cover:    optional card and page image (16:9 works best)
   facts:    optional label/value pairs shown beside the write-up
   body:     optional paragraphs for the project page
   sections: optional headed blocks, e.g. feature groups
   sectionsHeading: optional label shown above the sections, e.g. "Next up"
   list:     optional bullet list with its own heading
   gallery:  optional images. fit: "contain" shows the whole image in the
             thumbnail instead of cropping it (good for asset sheets).
   links:    optional buttons. primary: true makes one stand out.
   ------------------------------------------------------------ */

window.PROJECTS = [
  {
    slug: "lampbound",
    aliases: ["bound-by-wishes"],  // the game's old name, so shared links still work
    title: "Lampbound",
    studio: "Lampsmoke",
    type: "Game",
    status: "In development",
    summary: "A side-on puzzle-platformer about Iffy, a sarcastic djinn tied to his lamp. Throw it, freeze it in mid-air and pour yourself back inside to escape the prison built for him.",
    tech: ["Godot 4.7", "GDScript"],
    cover: "assets/projects/lampbound/title-screen.webp",
    coverAlt: "The Lampbound title screen: the gold Lampbound logo and Iffy, a grinning purple djinn, rising from his lamp in a torchlit treasure vault",
    facts: [
      { label: "Genre", value: "2.5D puzzle-platformer" },
      { label: "Engine", value: "Godot 4.7, GDScript" },
      { label: "Progress", value: "6 chapters and 3 endings playable" },
      { label: "Platform", value: "PC (Windows), aiming for Steam" },
      { label: "My role", value: "Design, story and direction" },
      { label: "Browser demo", value: "An early chapter 1 build, from before the rename and the new art" }
    ],
    body: [
      "Iffy has been half-freed from his lamp, but he can't stray more than 7 metres from it. You throw the lamp, call it back, pour yourself into it, and use its weight to press plates and open doors. Each shackle you break gives Iffy a new power, from freezing the lamp in mid-air to possessing iron bodies and bottling water, fire and wind.",
      "The lamp is both your tool and your leash, so every puzzle comes down to where you leave it. Iffy also grants wishes exactly as worded, and a coin flip decides whether they go right or go iffy. The story runs through six chapters, from inside the lamp to a buried dragon, and ends three different ways depending on one choice.",
      "I designed the game and its story and directed development: the mechanics, the puzzles, the story world, and the feel of every room through repeated playtesting. The code is AI-assisted, which let me focus on design and iterate quickly."
    ],
    listHeading: "So far",
    list: [
      "Six chapters, playable start to finish, each ending in boss and story scenes",
      "Three endings, decided by a single choice",
      "10 abilities: four from the start and six unlocked by breaking shackles",
      "Six boss encounters, none of them hit-it-till-it-dies",
      "A built-in map editor: levels are JSON files, and Tab switches between editing and playing",
      "Cel-shaded 3D models, dialogue portraits, title key art and a main theme",
      "Checkpoint saves, chamber select and rebindable keys",
      "An automated playtest of 1,040 checks that plays through every route"
    ],
    sectionsHeading: "Next up",
    sections: [
      { heading: "Room redo", text: "Rebuilding the rooms so every puzzle draws on all of Iffy's powers." },
      { heading: "Story and voice", text: "A final pass on the story, then voicing Iffy's lines." },
      { heading: "Map sharing", text: "Exporting and importing maps, then Steam Workshop support." },
      { heading: "Art pass", text: "The remaining backgrounds and character models in the cel-shaded style." }
    ],
    gallery: [
      { src: "assets/projects/lampbound/title-screen.webp", caption: "The title screen, with the Lampbound logo and Iffy." },
      { src: "assets/projects/lampbound/broken-wish-garden.webp", caption: "The Broken Wish Garden: \"I haven't seen the moon in three thousand years.\"" },
      { src: "assets/projects/lampbound/cisterns-iron-body.webp", caption: "The Cisterns: Iffy beside an iron body he can possess." },
      { src: "assets/projects/lampbound/iron-warden.webp", caption: "The Iron Warden's hall, the first boss room, with the weight Iffy can drop." },
      { src: "assets/projects/lampbound/the-seal.webp", caption: "The Seal: the chained eye beneath the floor at the end of chapter 1." }
    ],
    links: [
      { label: "Play the early demo", url: "play/bound-by-wishes/", primary: true }
    ]
  },
  {
    slug: "project-ironblood",
    title: "Project Ironblood",
    studio: "Lampsmoke",
    type: "Game",
    status: "Early development",
    summary: "Command a squad of piloted mechs against an alien invasion: fit their weapons, manage reactor heat, and choose which ground to defend.",
    tech: ["Godot 4.7", "GDScript"],
    facts: [
      { label: "Genre", value: "Turn-based mech tactics with a strategy campaign" },
      { label: "Engine", value: "Godot 4.7.2, GDScript" },
      { label: "Progress", value: "Playable alpha, v0.4" },
      { label: "Platform", value: "Windows, with Steam and itch.io planned" },
      { label: "Players", value: "Single-player" },
      { label: "My role", value: "Designer, art director and tester" }
    ],
    body: [
      "Project Ironblood is a turn-based tactics game about a small squad of piloted mechs holding a coastal region against an alien invasion. Each week you plan operations across six sectors, fit weapons and reactors in the hangar, and keep four pilots fit to fight. In battle you spend action points to move and shoot while watching heat, power and armor.",
      "The mech is a machine you run, not just aim. Reactors trade power against heat, damage lands on specific parts, and both sides can react mid-turn. Losses carry forward: broken parts cost materiel, pilots get injured or captured, and the alien commander hits the sectors you leave weak."
    ],
    listHeading: "So far",
    list: [
      "Battles on a 12x12 board over 10 rounds, with fog of war, reactions and interrupts, withdrawal and alien reinforcements",
      "3 mech frames, 3 reactors, 8 weapons, 4 pilots with traits, and 3 alien types with their own AI",
      "A hangar with weapon sockets, fitting rules, a paint mode, and 3D-rendered mechs that show what's fitted",
      "A campaign across a six-sector map with weekly operations, repairs, an alien commander, and win and loss tracks",
      "5 commanders to pick from, 12 command-center scenes with replies that matter, and news broadcasts",
      "Autosave plus 3 save slots, mid-battle suspend and an Ironman mode",
      "About 365 automated rule checks and 8 smoke tests"
    ],
    sectionsHeading: "Next up",
    sections: [
      { heading: "Campaign playtest", text: "Playing through two to three campaign weeks, then on to phase 2." },
      { heading: "Audio and settings", text: "Sound, a settings menu, and Steam and itch.io builds." },
      { heading: "More missions", text: "Finishing Extract missions and commander intel." }
    ],
    links: []
  },
  {
    slug: "chin-check",
    title: "Chin Check",
    studio: "Lampsmoke",
    type: "Game",
    status: "Early development",
    summary: "An MMA simulation and management game that follows one fighter's career. You run their training, then make real-time calls during fights that change how each one ends.",
    tech: ["Godot 4.7"],
    cover: "assets/projects/chin-check/test-fight.webp",
    coverAlt: "The Chin Check prototype: an octagon and a fight log showing one round of jabs and 9 passing checks",
    facts: [
      { label: "Genre", value: "Sports sim and management" },
      { label: "Engine", value: "Godot 4.7" },
      { label: "Stage", value: "Prototype fight simulation" }
    ],
    body: [
      "The first piece is the fight simulation. Two fighters trade strikes in real time, and each strike lands or misses on its own odds. Work and damage wear them down: stamina drains, and speed, striking defence and fight IQ drop as they get hurt.",
      "The simulation is deterministic, so a fight replays exactly from its seed and the calls made during it. It also runs far faster than real time, which leaves room to simulate the fights you don't watch."
    ],
    listHeading: "So far",
    list: [
      "A tick-based fight simulation with three five-minute rounds",
      "Moves loaded from data files, five so far",
      "Fatigue and injury that wear down a fighter's stats mid-fight",
      "Exact replays from a seed plus the commands given",
      "60 seconds of fight simulated in about 20 ms, over 1,000 times real time",
      "A live debug console and an automated test fight with 9 checks, all passing"
    ],
    gallery: [
      { src: "assets/projects/chin-check/test-fight.webp", caption: "A test fight: one round of jabs, the end-of-fight summary, and all 9 checks passing." },
      { src: "assets/projects/chin-check/live-fight.webp", caption: "The debug console during a live fight: three five-minute rounds at 2x speed." }
    ],
    links: []
  },
  {
    slug: "dirty-money-disco",
    title: "Dirty Money Disco",
    studio: "Lampsmoke",
    type: "Game",
    status: "Prototype",
    summary: "Turn a dead dive bar into the hottest club on a neon 1980s Miami strip, and decide how much dirty money it takes.",
    tech: ["Godot 4.7", "GDScript"],
    cover: "assets/projects/dirty-money-disco/night-crowd.webp",
    coverAlt: "A graybox prototype of an isometric nightclub at 12:24 AM, with guests on a cyan dance floor, at tables and by the jukebox",
    facts: [
      { label: "Genre", value: "Nightclub management sim" },
      { label: "Engine", value: "Godot 4.7, GDScript" },
      { label: "Progress", value: "Prototype: the graybox core loop is playable" },
      { label: "Platform", value: "PC, with Steam and itch.io planned" },
      { label: "Players", value: "Single-player" },
      { label: "My role", value: "Design director and tester" }
    ],
    body: [
      "Dirty Money Disco is a management game set on a fictional Miami-style beach strip in the summer of 1986. Each day you lay out your club, set the cover charge, pick the night's music and hire staff. Then you open the doors and watch guests arrive, dance, drink, queue for the toilets, and leave happy or fed up. Each morning you read the money report and what people are saying, and plan the next night across a 20-night campaign.",
      "The game is about the trade-off between vibe and money. Cheaper drinks fill the floor, but more staff cost wages. A planned optional crime layer adds smuggled liquor, money laundering and police heat for faster cash at a risk. The soundtrack covers four 1980s styles, synth-pop, Italo disco, Latin freestyle and electro funk, and each style draws a different crowd."
    ],
    listHeading: "So far",
    list: [
      "A day, night and morning loop over a 20-night campaign, with 8-minute nights, pause and 1x to 3x speed",
      "Grid building on a 12 by 10 club floor: place, turn and sell objects, with some unlocked by reputation",
      "Four guest types (tourist, local, club kid, high roller), each with needs for fun, thirst, bladder and comfort, and a mood",
      "Day planning: a cover charge from $0 to $30, four music styles that shift the crowd, and bartender hiring",
      "A morning report with income, wages, stock, rent, reputation and three guest reviews",
      "A 16-track soundtrack, ready to be wired in",
      "Every gameplay number in one tuning file, plus automated headless tests"
    ],
    sectionsHeading: "Next up",
    sections: [
      { heading: "First playtest", text: "Then balancing: night 1 earns too little, and reputation climbs too fast." },
      { heading: "More of the club", text: "Bouncers, DJs and cleaners, incidents, path-finding, building at night, and saves." },
      { heading: "Art and audio", text: "Replacing the gray boxes with isometric pixel art, and bringing the soundtrack and sound effects in." }
    ],
    gallery: [
      { src: "assets/projects/dirty-money-disco/day-build.webp", caption: "Day 1 at The Rusty Anchor: the build menu, cover charge, music and bartender controls. Graybox placeholder art." },
      { src: "assets/projects/dirty-money-disco/night-crowd.webp", caption: "12:24 AM on night 1: guests dancing, drinking and queueing." },
      { src: "assets/projects/dirty-money-disco/night-closeup.webp", caption: "A closer look at the dance floor at the same moment." },
      { src: "assets/projects/dirty-money-disco/morning-report.webp", caption: "The morning after night 1: the money breakdown, reputation and what the guests are saying." }
    ],
    links: []
  },

  {
    slug: "dazed-and-infected",
    title: "Dazed & Infected",
    type: "Mod",
    status: "Closed beta",
    summary: "A suite of 25 mods for Project Zomboid Build 42 that adds depth to the survival loop: power and water, food and cooking, weapons and defences, cultivation, trade and events.",
    tech: ["Project Zomboid B42", "Dazed Core"],
    cover: "assets/projects/dazed-and-infected/tractor-cover.webp",
    coverAlt: "A low-poly red vintage tractor pulling a plough",
    facts: [
      { label: "Game", value: "Project Zomboid, Build 42" },
      { label: "Size", value: "25 mods" },
      { label: "Shared library", value: "Dazed Core" },
      { label: "Testing", value: "Closed beta, dedicated multiplayer" }
    ],
    body: [
      "Everything keeps the vanilla art style and feel. The mods share one library, Dazed Core, and are built to work together: power feeds plumbing and machines, radio links signal and air drops, and the weather mods affect crops and pipes."
    ],
    sections: [
      { heading: "Power & utilities", text: "Off-grid power from solar, wind and generators, electric vehicles, running water from tanks and wells, and radio masts." },
      { heading: "Fight back", text: "Real-style firearms with handloading, traps and fortified doors, armored vehicles, and storm warnings." },
      { heading: "Live off the land", text: "Butchery by hand, cooking that depends on the cut, brutal winters, home brewing, and farm tools." },
      { heading: "Grow & get dazed", text: "Cannabis cultivation with hydroponics, garden crops for all 55 vanilla crops, and a medicine and drug system with tolerance and overdose." },
      { heading: "The living world", text: "Supply crates from the sky, a wandering barter trader, and new professions and traits." },
      { heading: "Play your way", text: "Poker, chess and other games with real stakes, lightsabers, a quieter HUD, and quality-of-life tweaks." }
    ],
    gallery: [
      { src: "assets/projects/dazed-and-infected/tractor.webp", caption: "A vintage tractor and plough, modelled for the farm tools." },
      { src: "assets/projects/dazed-and-infected/generators.webp", caption: "Makeshift, salvaged and workshop generators from all four sides, running.", fit: "contain" },
      { src: "assets/projects/dazed-and-infected/utilities-sheet.webp", caption: "Water and fuel assets. In each pair, the left is the version in the mod now and the right is the restyled version.", fit: "contain" }
    ],
    links: [
      { label: "Join the beta on Discord", url: "https://discord.gg/qkP5CPHgy", primary: true }
    ]
  }
];
