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

// Shipped titles, newest first.
window.GAMES = [
  {
    title: "Borderlands 4",
    role: "Sound Designer",
    studio: "Gearbox Software",
    year: 2025,
    platforms: [], // TODO: platforms
    art: "assets/keyart/borderlands-4.jpg",
    link: null, // optional: breakdown video or clip
  },
  {
    title: "Tiny Tina's Wonderlands",
    role: "VO Designer",
    studio: "Gearbox Software",
    year: 2022,
    platforms: [], // TODO
    art: null, // TODO: key art
    link: null,
  },
  // TODO: earlier titles, newest first.
];

// Things I've built. `result` is what audio directors look for most; leave it null
// rather than writing placeholder text and the line is hidden.
window.TECH = [
  {
    title: "Dynamic Headgear System",
    context: "Borderlands 4",
    desc: "Automatically applies headgear processing to a character's voice based on the visual parts they're wearing. Swap the helmet, and the voice follows.",
    result: null, // TODO: result or scale (variants covered, manual setup replaced)
    stack: [], // TODO: stack
    link: null,
  },
  {
    title: "Batch VO Processing Tool",
    context: "Reaper",
    desc: "Batch-processes entire sets of VO across multiple languages, each language through its own FX chain.",
    result: null, // TODO: result or scale
    stack: [], // TODO: stack (Lua / ReaScript?)
    link: null, // TODO: demo link
  },
];
