// Site content. Edit this file to add titles, tools, or links; layout lives in main.js.
// Leave a field null (or an array empty) and the page hides it.

window.PROFILE = {
  name: "Jay Sabins",
  // TODO: reel URL (YouTube or Vimeo). While null, the play button reads "Reel coming soon".
  reel: null, // e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX" or "https://vimeo.com/123456789"
  reelNote: null, // optional small line under the reel, e.g. "2:30 · 2026"
  bio: [
    "Hi, I'm Jay. You're here early...",
    // TODO: rest of the bio from Jay
  ],
  disciplines: ["Sound design", "Implementation", "Systems"],
  // Skills cards in About, after the three disciplines above. To add one, put it in
  // quotes and end it with a comma, e.g.  "Foley",  (order here is order on the page).
  skills: [
    "Wwise",
    "Unreal Engine",
    "Reaper",
    "Synthesis",
    "Recording",
    "VO Editing",
    "Concepting",
  ],
  tools: [], // TODO: Jay's real tools list. The prototype's list was a placeholder.
  resume: null, // TODO: path to résumé PDF, e.g. "assets/jay-sabins-resume.pdf"
  email: null, // TODO: contact email
  linkedin: null, // TODO: LinkedIn URL
  github: "https://github.com/jaysabins",
  // TODO: Formspree endpoint (free plan), e.g. "https://formspree.io/f/abcdwxyz".
  // Messages go to the email on Jay's Formspree account, so it's never in the page source.
  formEndpoint: null,
  business: "https://sabinssound.com",
};

// Shipped titles, newest first. Each card opens game.html?g=<slug>, which shows the
// title's clips. A clip is { title, url, desc }: title names the area of the game,
// url is YouTube or Vimeo, desc is optional. While `videos` is empty the page shows
// placeholder tiles.
// awards: [{ name, note }] puts a trophy on the card; hovering it shows each award's
// name (bold, if set) and note. Leave it [] for no trophy.
window.GAMES = [
  {
    slug: "borderlands-4",
    title: "Borderlands 4",
    role: "Sound Designer",
    studio: "Gearbox Software",
    year: 2025,
    platforms: [], // TODO: platforms
    art: "assets/keyart/borderlands-4.jpg",
    awards: [
      {
        name: null, // TODO: award name from Jay, e.g. the show, category and year
        note: "Jay and his team won an award for their sound design work on this title.",
      },
    ],
    videos: [], // TODO: clips of the areas Jay worked on
  },
  {
    slug: "tiny-tinas-wonderlands",
    title: "Tiny Tina's Wonderlands",
    role: "VO Designer",
    studio: "Gearbox Software",
    year: 2022,
    platforms: [], // TODO
    art: "assets/keyart/tiny-tinas-wonderlands.jpg",
    awards: [],
    videos: [], // TODO
  },
  // TODO: earlier titles, newest first.
];

// Things I've built. Each card opens tech.html?t=<slug>.
// kind: "System" or "Tool" (the tag on the card).
// `result` is what audio directors look for most; leave it null rather than writing
// placeholder text and the line is hidden.
// details: paragraphs shown only on the tech page, e.g. ["How it works...", "Why..."].
// videos: demos on the tech page, same { title, url, desc } shape as game clips.
//   [] shows placeholder tiles; null drops the Demos section.
// linkLabel: optional text for the link button (default "View").
window.TECH = [
  {
    slug: "dynamic-headgear-system",
    kind: "System",
    title: "Dynamic Headgear System",
    context: "Borderlands 4",
    desc: "Automatically applies headgear processing to a character's voice based on the visual parts they're wearing. Swap the helmet, and the voice follows.",
    result: null, // TODO: result or scale (variants covered, manual setup replaced)
    stack: [], // TODO: stack
    link: null,
    details: [], // TODO: more on how it works, from Jay
    videos: [], // TODO: demo clips
  },
  {
    slug: "batch-vo-processing-tool",
    kind: "Tool",
    title: "Batch VO Processing Tool",
    context: "Reaper",
    desc: "Batch-processes entire sets of VO across multiple languages, each language through its own FX chain.",
    result: null, // TODO: result or scale
    stack: [], // TODO: stack (Lua / ReaScript?)
    link: null, // TODO: demo link
    details: [], // TODO
    videos: [], // TODO
  },
  {
    slug: "rigsync",
    kind: "Tool",
    title: "RigSync",
    context: "Reaper",
    desc: "Keeps your REAPER setup identical on every computer by syncing it through your own private GitHub repo.",
    result: null, // TODO: result or scale
    stack: [], // TODO: stack
    link: "https://github.com/jaysabins/rigsync-releases/releases",
    linkLabel: "Releases on GitHub",
    details: [
      "RigSync is a lightweight Windows app built in Python, with nothing extra to install. It uses Git under the hood to sync your files straight between your computers and your own GitHub account, with no middleman, and your login stays safe in your computer's built-in password vault.",
    ],
    videos: null, // no Demos section
  },
];
