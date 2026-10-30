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
      "My games come out under my studio name, Lampsmoke Games. Right now that's Lampbound, a puzzle game about a djinn trapped in his own lamp; Project Ironblood, a mech game; Chin Check, an MMA career sim; and Dirty Money Disco. This is where I share how they're going. Rub the lamp to look around."
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
    summary: "A side-scrolling puzzle game about Nur, a sarcastic djinn trapped in his own lamp. The lamp is both his prison and his only tool.",
    tech: ["Godot 4.7", "GDScript"],
    cover: "assets/projects/bound-by-wishes/chamber-10.webp",
    coverAlt: "Chamber 10, Hidden Step: Nur, a glowing blue djinn, stands in a dark purple chamber inside the circle of his lamp's light",
    facts: [
      { label: "Genre", value: "Side-scrolling puzzle" },
      { label: "Engine", value: "Godot 4.7, GDScript" },
      { label: "Progress", value: "2 chapters, 40 chambers" },
      { label: "My role", value: "Design, story and direction" },
      { label: "Demo", value: "Plays in the browser with keyboard and mouse" }
    ],
    body: [
      "Nur's lamp is both his prison and his only tool. He throws it, binds it in mid-air as a platform, uses its light to reveal hidden paths, and pours himself into iron bodies, all while tethered to it.",
      "I designed the game and its story and directed development: the core mechanics, the puzzle design, the story world, and the feel of every chamber through repeated playtesting. The world is a dark-fantasy kingdom told through small fragments like lost wishes and unsigned notes. The code is AI-assisted, which let me focus on design and iterate quickly."
    ],
    listHeading: "So far",
    list: [
      "Two full chapters, 40 puzzle chambers",
      "Three unlockable abilities",
      "Two boss encounters, one of which can be finished without a fight",
      "Collectible memories with animated \"ghost\" visions",
      "Custom shaders for the characters",
      "An automated playtest that solves every chamber to catch regressions"
    ],
    gallery: [
      { src: "assets/projects/bound-by-wishes/title-screen.webp", caption: "The title screen of the browser demo, from when the game was called Bound by Wishes." },
      { src: "assets/projects/bound-by-wishes/chamber-10.webp", caption: "Chamber 10, Hidden Step: the lamp can't go where the steps are. Its light can." },
      { src: "assets/projects/bound-by-wishes/chapter-2.webp", caption: "Chapter 2: The Vault, Hadir's Workshop and Unfinished Work." }
    ],
    links: [
      { label: "Play in browser", url: "play/bound-by-wishes/", primary: true },
      { label: "Download the demo", url: "https://limewire.com/d/iNKxT#OXMpsEeSAk" }
    ]
  },
  {
    // PLACEHOLDER: replace the summary and body, set the real status, and add
    // tech, a cover image and a gallery when ready.
    slug: "project-ironblood",
    title: "Project Ironblood",
    studio: "Lampsmoke",
    type: "Game",
    status: "In development",
    summary: "A mech game in the works. Details coming soon.",
    body: [
      "Project Ironblood is a mech game in development at Lampsmoke. More details and screenshots will go up here soon."
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
    // PLACEHOLDER: replace the summary and body, set the real status, and add
    // tech, a cover image and a gallery when ready.
    slug: "dirty-money-disco",
    title: "Dirty Money Disco",
    studio: "Lampsmoke",
    type: "Game",
    status: "In development",
    summary: "A new Lampsmoke game. Details coming soon.",
    body: [
      "Dirty Money Disco is in development at Lampsmoke. More details and screenshots will go up here soon."
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
