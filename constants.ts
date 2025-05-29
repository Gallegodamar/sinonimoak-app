
import { WordPair, MultiSynonymWord } from './types';

const allInitialWordPairs: WordPair[] = [
  { "id": "1", "euskara": "erraztu", "sinonimo": "samurtu" },
  { "id": "2", "euskara": "hala ere", "sinonimo": "dena den" },
  { "id": "3", "euskara": "arrisku", "sinonimo": "peril" },
  { "id": "4", "euskara": "miaketa", "sinonimo": "araketa" },
  { "id": "5", "euskara": "trikimailu", "sinonimo": "azpikeria" },
  { "id": "6", "euskara": "oinarri", "sinonimo": "funts" },
  { "id": "7", "euskara": "ikur", "sinonimo": "sinbolo" },
  { "id": "8", "euskara": "baliagabetu", "sinonimo": "indargabetu" },
  { "id": "9", "euskara": "aldakuntza", "sinonimo": "aldaketa" },
  { "id": "10", "euskara": "errakuntza", "sinonimo": "hutsegite" },
  { "id": "11", "euskara": "gorabeheratsu", "sinonimo": "desobekatu" },
  { "id": "12", "euskara": "hots", "sinonimo": "hau da" },
  { "id": "13", "euskara": "ekintza", "sinonimo": "jarduera" },
  { "id": "14", "euskara": "trebakuntza", "sinonimo": "prestakuntza" },
  { "id": "15", "euskara": "esanguratsu", "sinonimo": "deigarri" },
  { "id": "16", "euskara": "berez", "sinonimo": "izatez" },
  { "id": "17", "euskara": "agian", "sinonimo": "beharbada" },
  { "id": "18", "euskara": "sotil", "sinonimo": "noble" },
  { "id": "19", "euskara": "gizagaixo", "sinonimo": "koitadu" },
  { "id": "20", "euskara": "imintzio", "sinonimo": "keinu" },
  { "id": "21", "euskara": "ziztrin", "sinonimo": "purtzil" },
  { "id": "22", "euskara": "tematu", "sinonimo": "egoskortu" },
  { "id": "23", "euskara": "lepo", "sinonimo": "sama" },
  { "id": "24", "euskara": "behartsu", "sinonimo": "txiro" },
  { "id": "25", "euskara": "txiki", "sinonimo": "ñimiño" }, // Simplified from original to ensure uniqueness for demo
  { "id": "26", "euskara": "lapur", "sinonimo": "ebasle" },
  { "id": "27", "euskara": "lohi", "sinonimo": "zikin" },
  { "id": "28", "euskara": "kalapita", "sinonimo": "istilu" },
  { "id": "29", "euskara": "arbuio", "sinonimo": "erdeinu" },
  { "id": "30", "euskara": "bederen", "sinonimo": "behintzat" },
  { "id": "31", "euskara": "amildu", "sinonimo": "jausi" },
  { "id": "32", "euskara": "saiatu", "sinonimo": "ahalegindu" },
  { "id": "33", "euskara": "betebehar", "sinonimo": "funtzio" },
  { "id": "34", "euskara": "halabehar", "sinonimo": "patu" },
  { "id": "35", "euskara": "zoritxar", "sinonimo": "zorigaizto" },
  { "id": "36", "euskara": "suntsitu", "sinonimo": "deusaztatu" },
  { "id": "37", "euskara": "kikildu", "sinonimo": "uzkurtu" },
  { "id": "38", "euskara": "gogaitu", "sinonimo": "aspertu" },
  { "id": "39", "euskara": "mengeldu", "sinonimo": "maskaldu" },
  { "id": "40", "euskara": "gozamen", "sinonimo": "plazer" },
  { "id": "41", "euskara": "onura", "sinonimo": "probetxu" },
  { "id": "42", "euskara": "zama", "sinonimo": "karga" },
  { "id": "43", "euskara": "akabatu", "sinonimo": "hil" },
  { "id": "44", "euskara": "estakuru", "sinonimo": "aitzakia" },
  { "id": "45", "euskara": "aukera", "sinonimo": "parada" },
  { "id": "46", "euskara": "doitasun", "sinonimo": "zehaztasun" },
  { "id": "47", "euskara": "dotorezia", "sinonimo": "dotoretasun" },
  { "id": "48", "euskara": "huskeria", "sinonimo": "txikikeria" },
  { "id": "49", "euskara": "doilorkeria", "sinonimo": "gaiztakeria" },
  { "id": "50", "euskara": "utzikeria", "sinonimo": "errazkeria" },
  { "id": "51", "euskara": "kementsu", "sinonimo": "adoretsu" },
  { "id": "52", "euskara": "lantzean behin", "sinonimo": "behin edo behin" },
  { "id": "53", "euskara": "xahutu", "sinonimo": "gastatu" },
  { "id": "54", "euskara": "atsegin", "sinonimo": "maite" },
  // Added more unique pairs to reach 50 for Levels 1 & 2
  { "id": "55", "euskara": "haserre", "sinonimo": "sumin" },
  { "id": "56", "euskara": "eder", "sinonimo": "polit" },
  { "id": "57", "euskara": "beldur", "sinonimo": "izu" },
  { "id": "58", "euskara": "pozik", "sinonimo": "alai" },
];

const allDifficultWordPairs: MultiSynonymWord[] = [
  { "id": "D1", "euskara": "abiapuntu", "sinonimoak": ["abiaburu", "hastapen", "hasiera"] },
  { "id": "D2", "euskara": "abizenak", "sinonimoak": ["deiturak"] },
  { "id": "D3", "euskara": "aburuz", "sinonimoak": ["ustez", "iritziz", "irudiko(z)"] },
  { "id": "D4", "euskara": "adabakiak", "sinonimoak": ["txaplatak", "txatalak", "petatxuak"] },
  { "id": "D5", "euskara": "adats", "sinonimoak": ["ilaje", "menats", "motots"] },
  { "id": "D6", "euskara": "adeitsua", "sinonimoak": ["gizabidetsua", "xaloa", "atsegina"] },
  { "id": "D7", "euskara": "adimen", "sinonimoak": ["ulermen", "adimendu", "endelgu"] },
  { "id": "D8", "euskara": "adindua", "sinonimoak": ["edadetua", "atsotua", "adintsua"] },
  { "id": "D9", "euskara": "adoretsu", "sinonimoak": ["gartsu", "kementsu", "bipil"] },
  { "id": "D10", "euskara": "afaloste", "sinonimoak": ["afalondo"] },
  { "id": "D11", "euskara": "afanez", "sinonimoak": ["joranez", "lehiaz", "gogoz"] },
  { "id": "D12", "euskara": "aforoa", "sinonimoak": ["edukiera", "lekua", "tokia"] },
  { "id": "D13", "euskara": "agergarririk", "sinonimoak": ["frogarik", "erakusgarririk", "adierazgartik"] },
  { "id": "D14", "euskara": "agerkari", "sinonimoak": ["aldizkari"] },
  { "id": "D15", "euskara": "agerkunde", "sinonimoak": ["agerpen", "agerraldi", "agertze"] },
  { "id": "D16", "euskara": "agian", "sinonimoak": ["apika", "beharbada", "akaso"] },
  { "id": "D17", "euskara": "agindu", "sinonimoak": ["prometatu", "hitzeman", "promes egin"] },
  { "id": "D18", "euskara": "agintari", "sinonimoak": ["buruzagi", "buru", "nagusi"] },
  { "id": "D19", "euskara": "agiraka", "sinonimoak": ["errieta", "haserre", "ahakar"] },
  { "id": "D20", "euskara": "agiri", "sinonimoak": ["idazki", "dokumentu"] },
  { "id": "D21", "euskara": "agitu", "sinonimoak": ["gertatu", "jazo", "iragan"] },
  { "id": "D22", "euskara": "agorril", "sinonimoak": ["abuztu", "dagonil"] },
  { "id": "D23", "euskara": "agorteak", "sinonimoak": ["lehorteak", "sikateak", "agorraldiak"] },
  { "id": "D24", "euskara": "aguazilak", "sinonimoak": ["udaltzainak", "txinelak"] },
  { "id": "D25", "euskara": "agudo", "sinonimoak": ["laster", "azkar", "fite"] },
  { "id": "D26", "euskara": "agur", "sinonimoak": ["diosal", "adio"] },
  { "id": "D27", "euskara": "agure", "sinonimoak": ["zahar", "adintsu", "aitona"] },
  { "id": "D28", "euskara": "ahaideak", "sinonimoak": ["senideak", "senitartekoak", "familiakoak"] },
  { "id": "D29", "euskara": "ahaire", "sinonimoak": ["doinu", "melodia"] },
  { "id": "D30", "euskara": "ahal den lasterren ", "sinonimoak": [" lehenbailehen", "albait arinen", "ahalik eta azkarren"] },
  // For brevity, I'll use slices for L3 and L4 from the extensive DIFFICULT_WORD_PAIRS list.
  // In a real scenario, these would be curated.
  // ... (imagine the rest of the DIFFICULT_WORD_PAIRS here)
  { "id": "D31", "euskara": "badaezpadako ", "sinonimoak": [ " zalantzazko", "duda-mudako", "ezbaiko" ] },
  { "id": "D32", "euskara": "bagak ", "sinonimoak": [ " uhinak", "olatuak" ] },
  { "id": "D33", "euskara": "bailarik ", "sinonimoak": [ " haranik", "ibarrik", "sakanik" ] },
  { "id": "D34", "euskara": "baina ", "sinonimoak": [ " ordea", "hala ere", "alabaina" ] },
  { "id": "D35", "euskara": "bakan ", "sinonimoak": [ " banaka", "urri", "eskas" ] },
  { "id": "D36", "euskara": "baldarkeria ", "sinonimoak": [ " dorpekeria", "trakeskeria" ] },
  { "id": "D37", "euskara": "baztertu ", "sinonimoak": [ " zokoratu", "alboratu", "bazterreratu" ] },
  { "id": "D38", "euskara": "begiluze ", "sinonimoak": [ " kuxkuxero", "nontzeberri", "ikusmiratzaile" ] },
  { "id": "D39", "euskara": "begirale ", "sinonimoak": [ " jagole", "zaintzaile", "artatzaile" ] },
  { "id": "D40", "euskara": "begiramen ", "sinonimoak": [ " begirune", "errespetu", "adeitasun" ] },
  { "id": "D41", "euskara": "belaunaldi ", "sinonimoak": [ " gizaldi" ] },
  { "id": "D42", "euskara": "beltzune ", "sinonimoak": [ " ubeldura", "ubelune", "belztasun" ] },
  { "id": "D43", "euskara": "beratzen ", "sinonimoak": [ " biguntzen", "leuntzen", "guritzen" ] },
  { "id": "D44", "euskara": "bertuteak ", "sinonimoak": [ " dohainak", "prestutasunak" ] },
  { "id": "D45", "euskara": "betebeharra ", "sinonimoak": [ " zeregina", "eginkizuna", "eginbeharra" ] },
  { "id": "D46", "euskara": "beterik ", "sinonimoak": [ " lepo", "gainezka", "mukuru" ] },
  { "id": "D47", "euskara": "betilun ", "sinonimoak": [ " triste", "goibel", "hits" ] },
  { "id": "D48", "euskara": "bezatu ", "sinonimoak": [ " hezi", "mantsotu", "otzandu" ] },
  { "id": "D49", "euskara": "bider ", "sinonimoak": [ " aldiz" ] },
  { "id": "D50", "euskara": "bidezidor ", "sinonimoak": [ " bidexka", "xendra", "basabide" ] },
  { "id": "D51", "euskara": "bigun ", "sinonimoak": [ " leun", "guri", "samur" ] },
  { "id": "D52", "euskara": "bilakaerak ", "sinonimoak": [ " eboluzioak", "garapenak", "eraldaketak" ] },
  { "id": "D53", "euskara": "bitxilorez ", "sinonimoak": [ " txibiritaz" ] },
  { "id": "D54", "euskara": "bizibide ", "sinonimoak": [ " ogibide", "lanbide", "ofizio" ] },
  { "id": "D55", "euskara": "biziki ", "sinonimoak": [ " arras", "oso", "biziro" ] },
  { "id": "D56", "euskara": "blai-blai", "sinonimoak": ["mela-mela", "busti-busti", "putzu-putzu"] },
  { "id": "D57", "euskara": "bokartak ", "sinonimoak": ["antxoak"] },
  { "id": "D58", "euskara": "borda ", "sinonimoak": ["etxola", "txabola"] },
  { "id": "D59", "euskara": "bordionak ", "sinonimoak": ["urdangak", "putak", "emagalduak"] },
  { "id": "D60", "euskara": "borondatea ", "sinonimoak": ["gogoa", "nahia", "desira"] },
];


// Ensure we have enough unique words for the initial pairs
const uniqueInitialWordPairs = Array.from(new Map(allInitialWordPairs.map(item => [item.id, item])).values());

export const LEVEL_1_WORDS: WordPair[] = uniqueInitialWordPairs.slice(0, 25);
export const LEVEL_2_WORDS: WordPair[] = uniqueInitialWordPairs.slice(25, 50);

// Ensure we have enough unique words for the difficult pairs
const uniqueDifficultWordPairs = Array.from(new Map(allDifficultWordPairs.map(item => [item.id, item])).values());

export const LEVEL_3_WORDS: MultiSynonymWord[] = uniqueDifficultWordPairs.slice(0, 30);
export const LEVEL_4_WORDS: MultiSynonymWord[] = uniqueDifficultWordPairs.slice(30, 60);


export const NUMBER_OF_OPTIONS = 4;
export const QUESTIONS_PER_GAME = 10;
export const FEEDBACK_DELAY_MS = 1500;
export const TIMER_DURATION_SECONDS = 10;
export const SCORE_TO_PASS_LEVEL = 7; // Example: 7 out of 10 correct to pass
