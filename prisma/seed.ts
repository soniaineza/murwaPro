import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding MurwaPro database...");

  // ─── Genres ──────────────────────────────────────────
  const genreNames = [
    "Drama", "Comedy", "Action", "Thriller", "Romance", "Horror",
    "Sci-Fi", "Documentary", "Animation", "Adventure", "Fantasy",
    "Mystery", "Crime", "Historical", "War", "Musical",
  ];

  const genres = await Promise.all(
    genreNames.map((name) =>
      prisma.genre.upsert({ where: { name }, update: {}, create: { name } })
    )
  );

  console.log(`  ✓ ${genres.length} genres`);

  // ─── Movies ──────────────────────────────────────────
  const moviesData = [
    {
      slug: "the-last-kingdom",
      title: "The Last Kingdom",
      tagline: "A powerful story of courage, betrayal and survival.",
      description: "In the heart of ancient Rwanda, a young warrior must navigate political intrigue and personal loss to unite his people.",
      poster: "https://placehold.co/400x600/1a1a2e/c8a961?text=The+Last+Kingdom",
      backdrop: "https://placehold.co/1920x1080/1a1a2e/c8a961?text=The+Last+Kingdom",
      year: 2026, duration: 124, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.7, ageRating: "PG-13", director: "Jean-Pierre Hakizimana",
      cast: ["Eric Munyeshyaka", "Diana Nikuze", "Patrick Mugarura"],
      creator: "MurwaPro Studios", access: "PREMIUM" as const,
      featured: true, trending: true, isNew: true, isRwandan: true, isAfrican: true,
      genres: ["Drama", "Historical", "Action"],
    },
    {
      slug: "echoes-of-kigali",
      title: "Echoes of Kigali",
      tagline: "Every city has its secrets.",
      description: "A detective in modern Kigali unravels a mystery that connects the city's turbulent past to a dangerous present.",
      poster: "https://placehold.co/400x600/16213e/e94560?text=Echoes+of+Kigali",
      backdrop: "https://placehold.co/1920x1080/16213e/e94560?text=Echoes+of+Kigali",
      year: 2025, duration: 112, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.2, ageRating: "R", director: "Alice Musabende",
      cast: ["Claudine Iradukunda", "Emmanuel Gatera", "Yves Irakoze"],
      access: "FREE" as const, featured: false, trending: true, isNew: false, isRwandan: true, isAfrican: true,
      genres: ["Thriller", "Mystery", "Crime"],
    },
    {
      slug: "savanna-hearts",
      title: "Savanna Hearts",
      tagline: "Love knows no borders.",
      description: "Two strangers from different African nations meet during a cross-continental journey.",
      poster: "https://placehold.co/400x600/1b262c/bbe1fa?text=Savanna+Hearts",
      backdrop: "https://placehold.co/1920x1080/1b262c/bbe1fa?text=Savanna+Hearts",
      year: 2025, duration: 108, language: "English", country: "Kenya",
      rating: 7.8, ageRating: "PG-13", director: "Amara Okonkwo",
      cast: ["David Ochieng", "Fatima Diallo", "James Mwangi"],
      access: "FREE" as const, featured: false, trending: false, isNew: true, isRwandan: false, isAfrican: true,
      genres: ["Romance", "Drama", "Adventure"],
    },
    {
      slug: "shadows-in-the-garden",
      title: "Shadows in the Garden",
      tagline: "Not everything is as it seems.",
      description: "A family reunion in a lush Rwandan countryside estate takes a dark turn when old secrets surface.",
      poster: "https://placehold.co/400x600/0f3460/533483?text=Shadows+in+the+Garden",
      backdrop: "https://placehold.co/1920x1080/0f3460/533483?text=Shadows+in+the+Garden",
      year: 2026, duration: 136, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.5, ageRating: "R", director: "Jean-Baptiste Habimana",
      cast: ["Sandrine Uwimana", "Aimable Niyongabo", "Chantal Mukamana"],
      creator: "MurwaPro Studios", access: "PREMIUM" as const,
      featured: true, trending: true, isNew: true, isRwandan: true, isAfrican: true,
      genres: ["Drama", "Mystery", "Thriller"],
    },
    {
      slug: "midnight-market",
      title: "Midnight Market",
      tagline: "When the sun goes down, the real交易 begins.",
      description: "In the vibrant night markets of Lagos, a young entrepreneur discovers an underground economy.",
      poster: "https://placehold.co/400x600/2d132c/ee4540?text=Midnight+Market",
      backdrop: "https://placehold.co/1920x1080/2d132c/ee4540?text=Midnight+Market",
      year: 2025, duration: 118, language: "English", country: "Nigeria",
      rating: 7.9, ageRating: "R", director: "Tunde Adewale",
      cast: ["Chioma Obi", "Kunle Afolayan", "Ngozi Eze"],
      access: "FREE" as const, featured: false, trending: true, isNew: false, isRwandan: false, isAfrican: true,
      genres: ["Crime", "Drama", "Thriller"],
    },
    {
      slug: "beyond-the-hills",
      title: "Beyond the Hills",
      tagline: "The journey home is never simple.",
      description: "A young Rwandan woman returns to her village after years abroad.",
      poster: "https://placehold.co/400x600/1c1c1c/c8a961?text=Beyond+the+Hills",
      backdrop: "https://placehold.co/1920x1080/1c1c1c/c8a961?text=Beyond+the+Hills",
      year: 2024, duration: 102, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.1, ageRating: "PG-13", director: "Immaculée Ilibagiza",
      cast: ["Diane Karayanzi", "Emery Gahamanyi", "Pacifique Niyonzima"],
      access: "FREE" as const, featured: false, trending: false, isNew: false, isRwandan: true, isAfrican: true,
      genres: ["Drama", "Romance"],
    },
    {
      slug: "dawn-of-ancestors",
      title: "Dawn of Ancestors",
      tagline: "The past is never dead.",
      description: "An epic fantasy rooted in African mythology. When ancient spirits awaken across the continent.",
      poster: "https://placehold.co/400x600/100c16/f7d794?text=Dawn+of+Ancestors",
      backdrop: "https://placehold.co/1920x1080/100c16/f7d794?text=Dawn+of+Ancestors",
      year: 2026, duration: 148, language: "English", country: "South Africa",
      rating: 8.9, ageRating: "PG-13", director: "Thabo Mokoena",
      cast: ["John Kani Jr.", "Lupita Ngoma", "Sello Maake"],
      access: "PREMIUM" as const, featured: true, trending: true, isNew: true, isRwandan: false, isAfrican: true,
      genres: ["Fantasy", "Adventure", "Action"],
    },
    {
      slug: "the-teacher",
      title: "The Teacher",
      tagline: "Education is the most powerful weapon.",
      description: "Based on a true story, a dedicated teacher in rural Rwanda fights to bring education to children.",
      poster: "https://placehold.co/400x600/2c3e50/e74c3c?text=The+Teacher",
      backdrop: "https://placehold.co/1920x1080/2c3e50/e74c3c?text=The+Teacher",
      year: 2024, duration: 96, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.4, ageRating: "PG", director: "Marie-Claire Dusingizimana",
      cast: ["Francine Niyonzima", "Alain Hirwa", "Odette Nyiramilimo"],
      access: "FREE" as const, featured: false, trending: false, isNew: false, isRwandan: true, isAfrican: true,
      genres: ["Drama", "Documentary"],
    },
    {
      slug: "fire-and-reed",
      title: "Fire and Reed",
      tagline: "Strength forged in flame.",
      description: "An epic historical drama about the legendary warriors of the Great Lakes region.",
      poster: "https://placehold.co/400x600/1a1a2e/e94560?text=Fire+and+Reed",
      backdrop: "https://placehold.co/1920x1080/1a1a2e/e94560?text=Fire+and+Reed",
      year: 2026, duration: 142, language: "Kinyarwanda", country: "Rwanda",
      rating: 8.6, ageRating: "R", director: "Gilbert Ndahayo",
      cast: ["Jean de Dieu Niyonzima", "Aimable Musahini", "Espérance Hakizimana"],
      creator: "MurwaPro Studios", access: "PREMIUM" as const,
      featured: true, trending: true, isNew: false, isRwandan: true, isAfrican: true,
      genres: ["Action", "Historical", "Drama"],
    },
  ];

  for (const data of moviesData) {
    const { genres: genreNames, ...movieData } = data;
    const movie = await prisma.movie.upsert({
      where: { slug: movieData.slug },
      update: movieData,
      create: movieData,
    });

    for (const name of genreNames) {
      const genre = genres.find((g) => g.name === name);
      if (genre) {
        try {
          await prisma.movieGenre.upsert({
            where: { movieId_genreId: { movieId: movie.id, genreId: genre.id } },
            update: {},
            create: { movieId: movie.id, genreId: genre.id },
          });
        } catch { /* ignore duplicates */ }
      }
    }
  }
  console.log(`  ✓ ${moviesData.length} movies`);

  // ─── Books ───────────────────────────────────────────
  const booksData = [
    {
      slug: "the-river-between-the-hills",
      title: "The River Between the Hills",
      author: "Aimable Niyongabo",
      authorBio: "A Rwandan novelist and poet.",
      cover: "https://placehold.co/400x600/1a1a2e/c8a961?text=River+Between+the+Hills",
      description: "A sweeping epic following three generations of a Rwandan family.",
      genre: "Fiction", language: "English", year: 2025, pages: 342,
      rating: 4.7, access: "PREMIUM" as const, featured: true, isNew: true, isRwandan: true, isAfrican: true,
    },
    {
      slug: "ibisigo-byose",
      title: "Ibisigo Byose",
      author: "Immaculée Mukamana",
      cover: "https://placehold.co/400x600/16213e/e94560?text=Ibisigo+Byose",
      description: "A masterful collection of poems traversing Rwandan identity.",
      genre: "Poetry", language: "Kinyarwanda", year: 2024, pages: 128,
      rating: 4.9, access: "FREE" as const, featured: true, isNew: false, isRwandan: true, isAfrican: true,
    },
    {
      slug: "african-futures",
      title: "African Futures: Stories of Tomorrow",
      author: "Chimamanda Osei",
      cover: "https://placehold.co/400x600/1b262c/bbe1fa?text=African+Futures",
      description: "Twelve visionary stories imagining Africa's future.",
      genre: "Science Fiction", language: "English", year: 2025, pages: 276,
      rating: 4.5, access: "FREE" as const, featured: false, isNew: true, isRwandan: false, isAfrican: true,
    },
    {
      slug: "umurenge-sacred",
      title: "Umurenge: The Sacred Ground",
      author: "Jean-Pierre Habimana",
      cover: "https://placehold.co/400x600/0f3460/533483?text=Umurenge+Sacred",
      description: "A novel about preserving ancestral traditions.",
      genre: "Fiction", language: "Kinyarwanda", year: 2024, pages: 398,
      rating: 4.8, access: "FREE" as const, featured: false, isNew: false, isRwandan: true, isAfrican: true,
    },
    {
      slug: "fireside-tales",
      title: "Fireside Tales of Rwanda",
      author: "Marie Gakumba",
      cover: "https://placehold.co/400x600/100c16/f7d794?text=Fireside+Tales",
      description: "Traditional Rwandan folktales passed down through generations.",
      genre: "Folklore", language: "Kinyarwanda", year: 2023, pages: 156,
      rating: 4.8, access: "FREE" as const, featured: false, isNew: false, isRwandan: true, isAfrican: true,
    },
  ];

  for (const bookData of booksData) {
    await prisma.book.upsert({
      where: { slug: bookData.slug },
      update: bookData,
      create: bookData,
    });
  }
  console.log(`  ✓ ${booksData.length} books`);

  // ─── Inganzo ─────────────────────────────────────────
  const inganzoData = [
    {
      slug: "umuhondo-w-intore",
      title: "Umuhanzi w'Intore",
      author: "Immaculée Mukamana",
      type: "IBISIGO" as const,
      language: "Kinyarwanda",
      date: new Date("2025-03-15"),
      excerpt: "Nk'umuhinzi uzira imiryango, / Nshaka ijambo ry'urukundo, / mu nzira y'ibinyejana...",
      content: "Nk'umuhinzi uzira imiryango,\nNshaka ijambo ry'urukundo,\nmu nzira y'ibinyejana.\n\nIgihe kirashira nk'amarira y'umwana,\nkandi amaso yacu arerekera hejuru,\nku mvuga y'umurage.\n\nIntore yasambaye mu gitondo,\numwima wasize mu rwego,\nikirenga cy'abanyarwanda.\n\nTubumwe mu nzira y'ibiza,\ntukurikije inzira y'abavyeyi,\nku mugongo w'intore.",
      access: "FREE" as const,
      published: true,
    },
    {
      slug: "voices-of-the-morning",
      title: "Voices of the Morning",
      author: "Chantal Uwimana",
      type: "POEM" as const,
      language: "English",
      date: new Date("2025-06-20"),
      excerpt: "The sun rises over green hills, / and the morning speaks in a thousand tongues...",
      content: "The sun rises over green hills,\nand the morning speaks in a thousand tongues,\neach one carrying the weight of history.\n\nWe are the morning,\nwe are the voices,\nwe are the green hills\nthat refuse to stop growing.",
      access: "FREE" as const,
      published: true,
    },
    {
      slug: "the-weeping-acacia",
      title: "The Weeping Acacia",
      author: "David Nkurunziza",
      type: "SHORT_STORY" as const,
      language: "English",
      date: new Date("2025-01-10"),
      excerpt: "Under the old acacia tree at the center of the village, Mama Solange sat with the patience of someone who had waited a lifetime...",
      content: "Under the old acacia tree at the center of the village, Mama Solange sat with the patience of someone who had waited a lifetime for this moment.\n\n'When I was your age,' she began, 'this tree was already old.'\n\nAnd they did listen. And the acacia whispered.",
      access: "FREE" as const,
      published: true,
    },
    {
      slug: "digital-rhythms",
      title: "Digital Rhythms",
      author: "Thierry Niyomwungere",
      type: "MODERN" as const,
      language: "English",
      date: new Date("2025-08-12"),
      excerpt: "The city pulses in binary, / ones and zeros making melodies / that our grandfathers would recognize...",
      content: "The city pulses in binary,\nones and zeros making melodies\nthat our grandfathers would recognize\nas the same rhythm of the drums.\n\nKigali sleeps with one eye open,\nneon reflecting off smartphone screens,\nwhile code compiles in the heartbeat\nof a generation building tomorrow.",
      access: "FREE" as const,
      published: true,
    },
  ];

  for (const workData of inganzoData) {
    await prisma.inganzo.upsert({
      where: { slug: workData.slug },
      update: workData,
      create: workData,
    });
  }
  console.log(`  ✓ ${inganzoData.length} inganzo works`);

  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
