// Site content. Edit this file to add titles, tools, or links; layout lives in main.js.
// Leave a field null (or an array empty) and the page hides it.

window.PROFILE = {
  name: "Jay Sabins",
  // Reel URL (YouTube or Vimeo). Placeholder reel for now; swap the link to change it. While null, the play button reads "Reel coming soon".
  reel: "https://player.vimeo.com/video/445080033", // e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX" or "https://vimeo.com/123456789"
  reelNote: null, // optional small line under the reel, e.g. "2:30 · 2026"
  // Headshot for the About card, e.g. "assets/headshot.jpg" (portrait, about 4:5). While null, a placeholder tile shows.
  headshot: null,
  bio: [
    "Hi, I'm Jay.",
    "I'm a sound designer and audio engineer from Spokane, Washington, and a Senior Sound Designer at Gearbox Software.",
    "I started at Gearbox in 2021 as a contractor on Tiny Tina's Wonderlands, providing sound design and VO editing and implementation support. Six months later I joined the audio team full-time as a VO Designer. There I worked with actors, writers and designers on Wonderlands and its post-launch content. Then I landed my dream job on the sound design team, building and implementing content for Borderlands 4 and its DLC.",
    "Outside games, I've edited more than 35 audiobooks and spoken-word lectures for Penguin Random House Audio. I hold an Associate Degree in Audio Engineering from Spokane Falls Community College and a BA from The Evergreen State College.",
    "I live in Liberty Lake, Washington. If you want to talk about work or just say hi, my door is always open.",
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
  resume: null, // Hidden for now (Jay, 2026-11-03). Set to a PDF path, e.g. "assets/jay-sabins-resume.pdf", to show the link.
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

// Other Works page (other.html): audiobooks, linked quietly from the footer.
// Each entry: { title, author, role, year, cover, link }. Any field can be left out
// and is hidden. cover is a path like "assets/covers/<file>.jpg" (square art); cards
// without one are text only. Ordered most popular first (Jay's request, 2026-11-03).
window.AUDIOBOOKS = [
  { title: "The Tower of Nero", author: "Rick Riordan", role: "Editor", cover: "assets/covers/the-tower-of-nero.jpg", link: "https://www.audible.com/pd/The-Tower-of-Nero-Audiobook/059329095X" },
  { title: "One of Us Is Next", author: "Karen M. McManus", role: "Editor", cover: "assets/covers/one-of-us-is-next.jpg", link: "https://www.audible.com/pd/One-of-Us-Is-Next-Audiobook/1984842102" },
  { title: "The Memory Police", author: "Yoko Ogawa", role: "Editor", cover: "assets/covers/the-memory-police.jpg", link: "https://www.audible.com/pd/The-Memory-Police-Audiobook/0525634274" },
  { title: "Lives of the Stoics", author: "Ryan Holiday, Stephen Hanselman", role: "Editor", cover: "assets/covers/lives-of-the-stoics.jpg", link: "https://www.audible.com/pd/Lives-of-the-Stoics-Audiobook/0593290054" },
  { title: "Agency", author: "William Gibson", role: "Editor", cover: "assets/covers/agency.jpg", link: "https://www.audible.com/pd/Agency-Audiobook/B075H1L9TH" },
  { title: "Evil Geniuses", author: "Kurt Andersen", role: "Editor", cover: "assets/covers/evil-geniuses.jpg", link: "https://www.audible.com/pd/Evil-Geniuses-Audiobook/0593342720" },
  { title: "Storm Cursed", author: "Patricia Briggs", role: "Editor", cover: "assets/covers/storm-cursed.jpg", link: "https://www.audible.com/pd/Storm-Cursed-Audiobook/069819604X" },
  { title: "Praying for Sleep", author: "Jeffery Deaver", role: "Editor", cover: "assets/covers/praying-for-sleep.jpg", link: "https://www.audible.com/pd/Praying-for-Sleep-Audiobook/0593290763" },
  { title: "A Song for a New Day", author: "Sarah Pinsker", role: "Editor", cover: "assets/covers/a-song-for-a-new-day.jpg", link: "https://www.audible.com/pd/A-Song-for-a-New-Day-Audiobook/0593151194" },
  { title: "Real Men Knit", author: "Kwana Jackson", role: "Editor", cover: "assets/covers/real-men-knit.jpg", link: "https://www.audible.com/pd/Real-Men-Knit-Audiobook/0593165721" },
  { title: "Seven Lies", author: "Elizabeth Kay", role: "Editor", cover: "assets/covers/seven-lies.jpg", link: "https://www.audible.com/pd/Seven-Lies-Audiobook/0593213351" },
  { title: "Everything After", author: "Jill Santopolo", role: "Editor", cover: "assets/covers/everything-after.jpg", link: "https://www.audible.com/pd/Everything-After-Audiobook/0593347579" },
  { title: "DEV1AT3 (Deviate)", author: "Jay Kristoff", role: "Editor", cover: "assets/covers/deviate.jpg", link: "https://www.audible.com/pd/DEV1AT3-Deviate-Audiobook/1524780936" },
  { title: "Enemy of All Mankind", author: "Steven Johnson", role: "Editor", cover: "assets/covers/enemy-of-all-mankind.jpg", link: "https://www.audible.com/pd/Enemy-of-All-Mankind-Audiobook/0593166914" },
  { title: "A Mrs. Miracle Christmas", author: "Debbie Macomber", role: "Editor", cover: "assets/covers/a-mrs-miracle-christmas.jpg", link: "https://www.audible.com/pd/A-Mrs-Miracle-Christmas-Audiobook/0525491589" },
  { title: "Window on the Bay", author: "Debbie Macomber", role: "Editor", cover: "assets/covers/window-on-the-bay.jpg", link: "https://www.audible.com/pd/Window-on-the-Bay-Audiobook/052549166X" },
  { title: "The Henna Wars", author: "Adiba Jaigirdar", role: "Editor", cover: "assets/covers/the-henna-wars.jpg", link: "https://www.audible.com/pd/The-Henna-Wars-Audiobook/0593216563" },
  { title: "Mastering Diabetes", author: "Cyrus Khambatta, Robby Barbaro", role: "Editor", cover: "assets/covers/mastering-diabetes.jpg", link: "https://www.audible.com/pd/Mastering-Diabetes-Audiobook/0593169077" },
  { title: "Tightrope", author: "Nicholas D. Kristof, Sheryl WuDunn", role: "Editor", cover: "assets/covers/tightrope.jpg", link: "https://www.audible.com/pd/Tightrope-Audiobook/0593169751" },
  { title: "Bloom", author: "Kenneth Oppel", role: "Editor", cover: "assets/covers/bloom.jpg", link: "https://www.audible.com/pd/Bloom-Audiobook/052558742X" },
  { title: "Sal and Gabi Fix the Universe", author: "Carlos Hernandez", role: "Editor", cover: "assets/covers/sal-and-gabi-fix-the-universe.jpg", link: "https://www.audible.com/pd/Sal-and-Gabi-Fix-the-Universe-Audiobook/1984845829" },
  { title: "Dapper Dan: Made in Harlem", author: "Daniel R. Day", role: "Editor", cover: "assets/covers/dapper-dan.jpg", link: "https://www.audible.com/pd/Dapper-Dan-Made-in-Harlem-Audiobook/198488526X" },
  { title: "A History of the Bible", author: "John Barton", role: "Editor", cover: "assets/covers/a-history-of-the-bible.jpg", link: "https://www.audible.com/pd/A-History-of-the-Bible-Audiobook/1984842560" },
  { title: "Mind and Matter", author: "John Urschel, Louisa Thomas", role: "Editor", cover: "assets/covers/mind-and-matter.jpg", link: "https://www.audible.com/pd/Mind-and-Matter-Audiobook/1984839160" },
  { title: "The Fifth Domain", author: "Richard A. Clarke, Robert K. Knake", role: "Editor", cover: "assets/covers/the-fifth-domain.jpg", link: "https://www.audible.com/pd/The-Fifth-Domain-Audiobook/1984888587" },
  { title: "Shouting at the Rain", author: "Lynda Mullaly Hunt", role: "Editor", cover: "assets/covers/shouting-at-the-rain.jpg", link: "https://www.audible.com/pd/Shouting-at-the-Rain-Audiobook/0525494081" },
  { title: "The Way Back", author: "Gavriel Savit", role: "Editor", cover: "assets/covers/the-way-back.jpg", link: "https://www.audible.com/pd/The-Way-Back-Audiobook/059328612X" },
  { title: "All the Bad Apples", author: "Moïra Fowley-Doyle", role: "Editor", cover: "assets/covers/all-the-bad-apples.jpg", link: "https://www.audible.com/pd/All-the-Bad-Apples-Audiobook/059310613X" },
  { title: "The King at the Edge of the World", author: "Arthur Phillips", role: "Editor", cover: "assets/covers/the-king-at-the-edge-of-the-world.jpg", link: "https://www.audible.com/pd/The-King-at-the-Edge-of-the-World-Audiobook/0593154479" },
  { title: "The Missing Years", author: "Lexie Elliott", role: "Editor", cover: "assets/covers/the-missing-years.jpg", link: "https://www.audible.com/pd/The-Missing-Years-Audiobook/0525530762" },
  { title: "A Prayer for Travelers", author: "Ruchika Tomar", role: "Editor", cover: "assets/covers/a-prayer-for-travelers.jpg", link: "https://www.audible.com/pd/A-Prayer-for-Travelers-Audiobook/1984888528" },
  { title: "Who Put This Song On?", author: "Morgan Parker", role: "Editor", cover: "assets/covers/who-put-this-song-on.jpg", link: "https://www.audible.com/pd/Who-Put-This-Song-On-Audiobook/0593104757" },
  { title: "The Book Collectors", author: "Delphine Minoui", role: "Editor", cover: "assets/covers/the-book-collectors.jpg", link: "https://www.audible.com/pd/The-Book-Collectors-Audiobook/0593342364" },
  { title: "One-Way Ticket", author: "Jonathan Vaughters", role: "Editor", cover: "assets/covers/one-way-ticket.jpg", link: "https://www.audible.com/pd/One-Way-Ticket-Audiobook/1984891111" },
  { title: "Free to Believe", author: "Luke Goodrich", role: "Editor", cover: "assets/covers/free-to-believe.jpg", link: "https://www.audible.com/pd/Free-to-Believe-Audiobook/0593150732" },
];
