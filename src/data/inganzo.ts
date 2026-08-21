import { Inganzo } from "./types";

export const inganzo: Inganzo[] = [
  {
    id: "1",
    slug: "umuhondo-w-intore",
    title: "Umuhanzi w'Intore",
    author: "Immaculée Mukamana",
    type: "ibisigo",
    language: "Kinyarwanda",
    date: "2025-03-15",
    excerpt:
      "Nk'umuhinzi uzira imiryango, / Nshaka ijambo ry'urukundo, / mu nzira y'ibinyejana...",
    content:
      "Nk'umuhinzi uzira imiryango,\nNshaka ijambo ry'urukundo,\nmu nzira y'ibinyejana.\n\nIgihe kirashira nk'amarira y'umwana,\nkandi amaso yacu arerekera hejuru,\nku mvuga y'umurage.\n\nIntore yasambaye mu gitondo,\numwima wasize mu rwego,\nikirenga cy'abanyarwanda.\n\nTubumwe mu nzira y'ibyiza,\ntukurikije inzira y'abavyeyi,\nku mugongo w'intore.",
    access: "free",
  },
  {
    id: "2",
    slug: "voices-of-the-morning",
    title: "Voices of the Morning",
    author: "Chantal Uwimana",
    type: "poem",
    language: "English",
    date: "2025-06-20",
    excerpt:
      "The sun rises over green hills,\nand the morning speaks in a thousand tongues,\neach one carrying the weight of history...",
    content:
      "The sun rises over green hills,\nand the morning speaks in a thousand tongues,\neach one carrying the weight of history.\n\nI hear my grandmother's voice\nin the rhythm of the rain,\nfalling soft on corrugated tin.\n\nThe children run to school,\ntheir laughter a melody\nthat the city needs more of.\n\nWe are the morning,\nwe are the voices,\nwe are the green hills\nthat refuse to stop growing.",
    access: "free",
  },
  {
    id: "3",
    slug: "ibanga-ry-intama",
    title: "Ibanga ry'Intama",
    author: "Jean-Pierre Habimana",
    type: "traditional",
    language: "Kinyarwanda",
    date: "2024-11-01",
    excerpt:
      "Mu gihe ubutumbatumbu bwari bwo aho buri, / intama yari ishimye ku bwami bw'inkoko...",
    content:
      "Mu gihe ubutumbatumbu bwari bwo aho buri,\nintama yari ishimye ku bwami bw'inkoko.\n\n'Nimwe mwese icyubahiro cy'urukundo,'\nyavuze intama, 'nta noneho ntangara.+'\n\nUbutumwa bw'ibanga ryaryo:\nubumwe bushimishije.\nNta cyanke, nta cyanke.",
    access: "free",
  },
  {
    id: "4",
    slug: "the-weeping-acacia",
    title: "The Weeping Acacia",
    author: "David Nkurunziza",
    type: "short-story",
    language: "English",
    date: "2025-01-10",
    excerpt:
      "Under the old acacia tree at the center of the village, Mama Solange sat with the patience of someone who had waited a lifetime for this moment...",
    content:
      "Under the old acacia tree at the center of the village, Mama Solange sat with the patience of someone who had waited a lifetime for this moment.\n\nThe children gathered around her, drawn by the same force that had kept them coming since before they could walk. Her voice was not loud, but it was the kind of voice that made silence listen.\n\n'When I was your age,' she began, and the wind paused to hear, 'this tree was already old. It had seen things that would make the stars weep.'\n\nThe youngest child, little Diane, reached for a low branch. Its bark was rough and warm.\n\n'This tree,' Mama Solange continued, 'holds the memories of every person who ever stood beneath it. If you listen carefully, you can hear them breathing.'\n\nAnd they did listen. And the acacia whispered.",
    access: "free",
  },
  {
    id: "5",
    slug: "ingabire-yumugisha",
    title: "Ingabire y'Umugisha",
    author: "Espérance Nyirahabimana",
    type: "ibisigo",
    language: "Kinyarwanda",
    date: "2025-04-07",
    excerpt:
      "Ingabire y'umugisha iri mu rukundo,\nmu nkunga y'abana,\nmu myaka y'ubukwe...",
    content:
      "Ingabire y'umugisha iri mu rukundo,\nmu nkunga y'abana,\nmu myaka y'ubukwe.\n\nNta kintu kirusha ubwiza\nbw'umwana utera icumi,\nnta jambo rirusha ubwasha\nriri mu kera ry'umwami.\n\nUmuco wacu uri mu guha,\nmu gushimira ibintu nto,\nmu kwizera ibyo twiboneye.\n\nUmugisha udusha twese,\numugisha uruhurira mu buryo,\numugisha ni we wisi.",
    access: "free",
  },
  {
    id: "6",
    slug: "digital-rhythms",
    title: "Digital Rhythms",
    author: "Thierry Niyomwungere",
    type: "modern",
    language: "English",
    date: "2025-08-12",
    excerpt:
      "The city pulses in binary, / ones and zeros making melodies / that our grandfathers would recognize...",
    content:
      "The city pulses in binary,\nones and zeros making melodies\nthat our grandfathers would recognize\nas the same rhythm of the drums.\n\nKigali sleeps with one eye open,\nneon reflecting off smartphone screens,\nwhile code compiles in the heartbeat\nof a generation building tomorrow.\n\nWe type in languages\nthat our ancestors spoke,\nwe build with values\nthey planted in our soil.\n\nThe future is not foreign —\nit grows from the same earth,\ndigital roots reaching deep\ninto traditional ground.",
    access: "free",
  },
  {
    id: "7",
    slug: "imvugo-yumunsi",
    title: "Imvugo y'Umunsi",
    author: "Claude Ndayisaba",
    type: "imivugo",
    language: "Kinyarwanda",
    date: "2025-05-22",
    excerpt:
      "Umunsi mugisha, / umunsi webwaco, / umunsi w'urukundo...",
    content:
      "Umunsi mugisha,\numunsi webwaco,\numunsi w'urukundo.\n\nAmaHejuru yacu yumva,\nInzuki zacu zongera,\nAmatungo yacu yongera.\n\nIgihe kiza,\nkera bakabivuga,\niburyo bwa rugamba,\nibumoso bw'umugisha.\n\nTurayobora umunsi,\nturayobora neza,\nturayobora umwe.",
    access: "free",
  },
];

export function getInganzoByType(
  type: string
): Inganzo[] {
  return inganzo.filter((i) => i.type === type);
}

export function getInganzoBySlug(slug: string): Inganzo | undefined {
  return inganzo.find((i) => i.slug === slug);
}
