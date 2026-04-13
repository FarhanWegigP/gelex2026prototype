// ─── UKM DATA ────────────────────────────────────────────────
export type UKMCategory = "Seni" | "Olahraga" | "Rohani" | "Khusus";

export interface UKM {
  id: string;
  slug: string;
  name: string;
  category: UKMCategory;
  description: string;
  logo: string;
  shellyMessage: string;
}

export const ukmList: UKM[] = [
  {
    id: "1", slug: "bem-km",
    name: "BEM KM UGM", category: "Khusus",
    description: "Badan Eksekutif Mahasiswa Keluarga Mahasiswa UGM — lembaga eksekutif tertinggi mahasiswa UGM yang berperan dalam advokasi, pengabdian, dan pengembangan mahasiswa.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=BEM",
    shellyMessage: "BEM KM adalah rumahnya para pejuang mahasiswa UGM! 🦋",
  },
  {
    id: "2", slug: "resimen-mahasiswa",
    name: "Satuan Resimen Mahasiswa", category: "Khusus",
    description: "Unit kegiatan bela negara dan kedisiplinan mahasiswa UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=MENWA",
    shellyMessage: "Resimen Mahasiswa — berani, disiplin, dan gagah! 💪",
  },
  {
    id: "3", slug: "gmds",
    name: "Gadjah Mada Debating Society", category: "Khusus",
    description: "Komunitas debat bahasa Inggris terkemuka di UGM yang telah berprestasi di tingkat nasional dan internasional.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=GMDS",
    shellyMessage: "GMDS — jagoan debat dari UGM! 🗣️",
  },
  {
    id: "4", slug: "psm-ugm",
    name: "Paduan Suara Mahasiswa UGM", category: "Seni",
    description: "Unit paduan suara mahasiswa UGM yang telah mengharumkan nama UGM di berbagai kompetisi paduan suara nasional dan internasional.",
    logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=PSM",
    shellyMessage: "PSM UGM — suaranya bikin merinding dan terharu! 🎶",
  },
  {
    id: "5", slug: "unit-penalaran",
    name: 'Unit Penalaran Ilmiah "Interdiscipline"', category: "Khusus",
    description: "Wadah pengembangan ilmiah dan penelitian mahasiswa lintas disiplin ilmu di UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=UPII",
    shellyMessage: "UPII — otak-otak cerdas UGM berkumpul di sini! 🧠",
  },
  {
    id: "6", slug: "mapagama",
    name: "MAPAGAMA", category: "Khusus",
    description: "Mahasiswa Pecinta Alam Gadjah Mada — unit petualangan alam bebas UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=MAPA",
    shellyMessage: "MAPAGAMA suka naik gunung! Shelly lebih suka pantai sih 🐢",
  },
  {
    id: "7", slug: "hmp-ugm",
    name: "Himpunan Mahasiswa Pascasarjana UGM", category: "Khusus",
    description: "Organisasi mahasiswa pascasarjana UGM yang mewadahi kegiatan dan aspirasi mahasiswa S2 dan S3.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=HMP",
    shellyMessage: "HMP — para kakak-kakak yang sudah sangat pintar! 🎓",
  },
  {
    id: "8", slug: "gama-cendekia",
    name: "Gama Cendekia", category: "Khusus",
    description: "Unit kegiatan pengembangan intelektual dan keilmuan mahasiswa UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=GC",
    shellyMessage: "Gama Cendekia — tempat tumbuhnya cendekiawan muda! ✨",
  },
  {
    id: "9", slug: "skm-bulaksumur",
    name: "SKM Bulaksumur", category: "Khusus",
    description: "Surat Kabar Mahasiswa Bulaksumur — media pers mahasiswa UGM yang kritis dan independen.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=SKM",
    shellyMessage: "SKM Bulaksumur — penjaga kebebasan pers mahasiswa! 📰",
  },
  {
    id: "10", slug: "bppm-balairung",
    name: "BPPM Balairung", category: "Khusus",
    description: "Badan Penerbitan dan Pers Mahasiswa Balairung UGM — penerbitan majalah mahasiswa tertua di UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=BPPM",
    shellyMessage: "BPPM Balairung — majalahnya mahasiswa UGM sejak lama! 📖",
  },
  {
    id: "11", slug: "pramuka-ugm",
    name: "Pramuka UGM", category: "Khusus",
    description: "Gerakan Pramuka gugus depan UGM — membangun karakter dan jiwa kepemimpinan mahasiswa.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=PRAMUKA",
    shellyMessage: "Pramuka UGM — siap dan siaga selalu! 🌿",
  },
  {
    id: "12", slug: "kopma-ugm",
    name: "Koperasi Mahasiswa UGM", category: "Khusus",
    description: "KOPMA UGM — koperasi mahasiswa yang mendukung perekonomian dan kesejahteraan mahasiswa UGM.",
    logo: "https://placehold.co/80x80/FADADD/E8896A?text=KOPMA",
    shellyMessage: "KOPMA UGM — belanja hemat sambil berkontribusi! 🛍️",
  },
];

// ─── KOMUNITAS DATA ───────────────────────────────────────────
export interface Komunitas {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  shellyMessage: string;
}

export const komunitasList: Komunitas[] = [
  { id: "1", slug: "ugm-mun", name: "UGM MUN Community", description: "Model United Nations UGM — simulasi sidang PBB untuk mahasiswa.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=MUN", shellyMessage: "MUN — pura-puranya jadi diplomat dunia! 🌍" },
  { id: "2", slug: "kmid", name: "KMID", description: "Komunitas Mahasiswa Indonesia Damai — membangun harmoni dan toleransi.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=KMID", shellyMessage: "KMID — damai itu indah, setuju Shelly! ☮️" },
  { id: "3", slug: "arjuna-ev", name: "Arjuna EV UGM", description: "Komunitas kendaraan listrik mahasiswa UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=EV", shellyMessage: "Arjuna EV — mobil listrik buatan mahasiswa, keren! ⚡" },
  { id: "4", slug: "bimasakti", name: "Bimasakti Racing Team", description: "Tim balap mahasiswa UGM yang berlaga di kompetisi Formula SAE.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=BIMA", shellyMessage: "Bimasakti — ngebut tapi aman ya! 🏎️" },
  { id: "5", slug: "gmbb", name: "Gadjah Mada Building and Bridge", description: "Komunitas teknik sipil yang merancang jembatan dan bangunan.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=GMBB", shellyMessage: "GMBB — yang bangun jembatannya hebat sekali! 🌉" },
  { id: "6", slug: "gamantaray", name: "Gamantaray", description: "Gadjah Mada Marine and Fisheries Community — pecinta laut UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=GAMA", shellyMessage: "Gamantaray suka laut kayak Shelly! 🐠" },
  { id: "7", slug: "semar-ugm", name: "Semar UGM", description: "Komunitas pengembangan energi terbarukan mahasiswa UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=SEMAR", shellyMessage: "Semar UGM — masa depan energi bersih ada di sini! 🌱" },
  { id: "8", slug: "komastagama", name: "KOMASTAGAMA", description: "Komunitas Mahasiswa Statistika Gadjah Mada.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=KOMAS", shellyMessage: "KOMASTAGAMA — data is beautiful! 📊" },
  { id: "9", slug: "raja-garuda", name: "Raja Garuda UGM", description: "Tim kedirgantaraan mahasiswa UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=RGU", shellyMessage: "Raja Garuda — terbang tinggi menggapai langit! 🦅" },
  { id: "10", slug: "komatik", name: "KOMATIK UGM", description: "Komunitas Matematika dan Informatika UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=KOMATIK", shellyMessage: "KOMATIK — coding dan matematika is fun! 💻" },
  { id: "11", slug: "tim-yacaranda", name: "Tim Yacaranda UGM", description: "Komunitas mahasiswa lintas bidang untuk inovasi sosial.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=TYU", shellyMessage: "Tim Yacaranda — inovasi untuk Indonesia! 💡" },
  { id: "12", slug: "gmlc", name: "Gadjah Mada Leadership Community", description: "Komunitas pengembangan kepemimpinan mahasiswa UGM.", logo: "https://placehold.co/80x80/FDEEC9/E8896A?text=GMLC", shellyMessage: "GMLC — pemimpin masa depan Indonesia! 🌟" },
];

// ─── LINIMASA DATA ────────────────────────────────────────────
export interface LinimasaEvent {
  id: string;
  day: 1 | 2 | 3;
  title: string;
  time: string;
  description: string;
  type: "penampilan" | "seremonial" | "workshop";
}

export const linimasaEvents: LinimasaEvent[] = [
  { id: "1-1", day: 1, title: "Scientie Music Community", time: "09.00", description: "Penampilan pembuka dari komunitas musik sains UGM.", type: "penampilan" },
  { id: "1-2", day: 1, title: "Sastro Moeni", time: "10.30", description: "Penampilan sastra dan puisi yang memukau.", type: "penampilan" },
  { id: "1-3", day: 1, title: "Lentera Cita Kirana", time: "12.00", description: "Pertunjukan inspiratif penuh cahaya dan semangat.", type: "penampilan" },
  { id: "1-4", day: 1, title: "Alur Jejak Rasa", time: "14.00", description: "Ekspresi seni yang menelusuri perjalanan emosi.", type: "penampilan" },
  { id: "1-5", day: 1, title: "Melodi Semasa Ria", time: "16.00", description: "Melodi nostalgia masa remaja yang penuh keceriaan.", type: "penampilan" },
  { id: "1-6", day: 1, title: "Harmoni Bunga Asmara", time: "19.00", description: "Penutup malam pertama yang romantis dan harmonis.", type: "penampilan" },
  { id: "2-1", day: 2, title: "Rampoe UGM", time: "09.00", description: "Tarian tradisional Aceh yang energetik dan membanggakan.", type: "penampilan" },
  { id: "2-2", day: 2, title: "Sastra Oebah", time: "10.30", description: "Pertunjukan sastra yang menggetarkan jiwa.", type: "penampilan" },
  { id: "2-3", day: 2, title: "SAKA UGM", time: "12.00", description: "Penampilan seni budaya dari UKM SAKA UGM.", type: "penampilan" },
  { id: "2-4", day: 2, title: "Nomophobia: Gemuruh Derap Ilusi", time: "14.00", description: "Pertunjukan teatrikal tentang ketergantungan teknologi.", type: "penampilan" },
  { id: "2-5", day: 2, title: "Semesta Bersinggungan", time: "19.00", description: "Kolaborasi lintas UKM dalam satu panggung epik.", type: "penampilan" },
  { id: "3-1", day: 3, title: "Balada Laskar Memori", time: "10.00", description: "Penampilan musikal penuh kenangan dan nostalgia.", type: "penampilan" },
  { id: "3-2", day: 3, title: "Seremonial Penutupan", time: "14.00", description: "Upacara resmi penutupan GELEX 2026.", type: "seremonial" },
  { id: "3-3", day: 3, title: "Irama Kilau Semesta", time: "19.00", description: "Grand finale spektakuler penutup GELEX 2026.", type: "penampilan" },
];

// ─── GAMES DATA ───────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  shellyReaction: string;
}

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "UKM apa yang bergerak di bidang debat bahasa Inggris di UGM?", options: ["PSM UGM", "GMDS", "BEM KM", "MAPAGAMA"], correctAnswer: 1, shellyReaction: "Betul! GMDS jagoannya debat! 🎉" },
  { id: "q2", question: "Apa kepanjangan dari KOPMA?", options: ["Komunitas Pemuda Mahasiswa", "Koperasi Mahasiswa", "Komite Pengawas Mahasiswa", "Komunitas Peduli Masyarakat"], correctAnswer: 1, shellyReaction: "Benar! Belanja di KOPMA yuk! 🛍️" },
  { id: "q3", question: "Sekber apa yang menaungi UKM seni di UGM?", options: ["Sekber Olahraga", "Sekber Khusus", "Sekber Seni", "Sekber Rohani"], correctAnswer: 2, shellyReaction: "Tepat sekali! Seni itu indah! 🎨" },
  { id: "q4", question: "Berapa total UKM yang ada di GELEX 2026?", options: ["40 UKM", "45 UKM", "50 UKM", "55 UKM"], correctAnswer: 3, shellyReaction: "Wah 55 UKM! Banyak banget ya! ✨" },
  { id: "q5", question: "Di mana lokasi Gelanggang Mahasiswa UGM?", options: ["Blimbingsari, Caturtunggal", "Bulaksumur, Sleman", "Babarsari, Depok", "Condongcatur, Sleman"], correctAnswer: 0, shellyReaction: "Betul! Itu rumah Shelly! 🐢🏠" },
  { id: "q6", question: "Tanggal berapa GELEX 2026 diselenggarakan?", options: ["1-3 Juli 2026", "1-3 Agustus 2026", "17-19 Agustus 2026", "1-3 September 2026"], correctAnswer: 1, shellyReaction: "Catat tanggalnya ya! 📅" },
  { id: "q7", question: "Apa tagline GELEX 2026?", options: ["Resonansi Harmoni Gelanggang", "Where Creativity Comes Alive and Talent Shines", "Bersatu dalam Keberagaman", "Gelanggang untuk Semua"], correctAnswer: 1, shellyReaction: "Keren kan tagline-nya! ✨" },
  { id: "q8", question: "PSM UGM adalah singkatan dari?", options: ["Persatuan Seni Mahasiswa", "Paguyuban Seniman Muda", "Paduan Suara Mahasiswa", "Perkumpulan Seni Musik"], correctAnswer: 2, shellyReaction: "PSM — suaranya merdu sekali! 🎵" },
  { id: "q9", question: "MAPAGAMA bergerak di bidang apa?", options: ["Teknologi Informasi", "Pecinta Alam", "Seni Budaya", "Kewirausahaan"], correctAnswer: 1, shellyReaction: "Iya! MAPAGAMA suka petualangan alam! 🏔️" },
  { id: "q10", question: "Maskot GELEX 2026 bernama?", options: ["Ramon", "Gantari", "Shelly", "Gelang"], correctAnswer: 2, shellyReaction: "Itu aku! Halo! 🐢💛" },
];

export interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: "across" | "down";
  startRow: number;
  startCol: number;
}

export const crosswordClues: CrosswordClue[] = [
  { number: 1, clue: "Kitab suci umat Islam", answer: "QURAN", direction: "across", startRow: 0, startCol: 0 },
  { number: 2, clue: "Tempat ibadah umat Hindu", answer: "PURA", direction: "down", startRow: 0, startCol: 4 },
  { number: 3, clue: "Hari besar umat Kristen", answer: "NATAL", direction: "across", startRow: 2, startCol: 0 },
  { number: 4, clue: "Kitab suci agama Buddha", answer: "TRIPITAKA", direction: "down", startRow: 0, startCol: 2 },
  { number: 5, clue: "Tempat ibadah umat Islam", answer: "MASJID", direction: "across", startRow: 4, startCol: 0 },
];
