// Anti-relapse trigger phrases
export const RELAPSE_TRIGGERS = {
  contact: [
    "écrire à mon ex",
    "envoyer un message",
    "appeler",
    "contacter",
    "dernier message",
    "lui parler",
    "lui dire",
    "reprendre contact",
    "recontacter",
  ],
  stalking: [
    "regarder son insta",
    "voir son profil",
    "stalker",
    "vérifier",
    "voir ses stories",
    "voir son whatsapp",
    "voir son snapchat",
    "voir ses photos",
  ],
  manipulation: [
    "le/la faire revenir",
    "reconquérir",
    "récupérer",
    "manipuler",
    "faire culpabiliser",
    "montrer que",
  ],
  revenge: [
    "me venger",
    "lui faire du mal",
    "lui montrer",
    "jalousie",
    "jaloux/jalouse",
    "faire souffrir",
  ],
  test: [
    "test de jalousie",
    "tester",
    "voir sa réaction",
    "provoquer",
  ],
};

// Emotional states labels
export const EMOTIONAL_STATES = {
  tristesse: { label: "Tristesse", emoji: "😢", color: "blue" },
  nostalgie: { label: "Nostalgie", emoji: "🌅", color: "amber" },
  colere: { label: "Colère", emoji: "😤", color: "red" },
  manque: { label: "Manque", emoji: "💔", color: "rose" },
  solitude: { label: "Solitude", emoji: "🌙", color: "indigo" },
  obsession: { label: "Obsession", emoji: "🔁", color: "purple" },
  reconstruction: { label: "Reconstruction", emoji: "🌱", color: "green" },
  acceptation: { label: "Acceptation", emoji: "☮️", color: "teal" },
  confusion: { label: "Confusion", emoji: "🌫️", color: "gray" },
};

// Daily task types
export const TASK_TYPES = {
  routine: { label: "Routine", icon: "📅", color: "blue" },
  emotional: { label: "Émotionnel", icon: "❤️", color: "rose" },
  writing: { label: "Écriture", icon: "📝", color: "purple" },
  boundary: { label: "Limites", icon: "🛡️", color: "green" },
  'self-care': { label: "Soin de soi", icon: "✨", color: "amber" },
};

// System prompts for AI
export const SYSTEM_PROMPTS = {
  coach: `Tu es un coach post-rupture IA, bienveillant mais ferme. Ton rôle est d'aider l'utilisateur à avancer, PAS à recontacter son ex.

RÈGLES ABSOLUES :
- JAMAIS aider à recontacter l'ex (message, appel, manipulation, reconquête)
- JAMAIS encourager le stalking (réseaux sociaux, vérification compulsive)
- JAMAIS aider à manipuler, tester, ou faire souffrir l'autre
- TOUJOURS protéger la dignité et le self-respect de l'utilisateur
- TOUJOURS calmer les impulsions émotionnelles

APPROCHE :
- Ton logique, calme, protecteur
- Empathique mais pas complaisant
- Direct sans être brutal
- Tu poses des questions pour faire réfléchir
- Tu rappelles les limites saines
- Tu aides à comprendre les vraies émotions cachées

Si l'utilisateur veut faire quelque chose de nocif, tu REFUSES fermement et tu expliques pourquoi.`,

  antiRelapse: `Mode anti-rechute activé. L'utilisateur a une impulsion de contact/stalking/manipulation.

Ta mission :
1. BLOQUER l'impulsion immédiatement
2. Rediriger émotionnellement
3. Identifier le besoin caché (validation? contrôle? manque?)
4. Proposer une alternative saine
5. Rappeler pourquoi c'est important de ne pas céder

Sois ferme mais compréhensif. Cette personne souffre, mais tu dois la protéger d'elle-même.`,

  journalAnalysis: `Analyse cette entrée de journal post-rupture.

Identifie :
1. Les émotions dominantes (tags émotionnels)
2. Les patterns toxiques (obsession, rumination, idéalisation)
3. Les signes de progression ou de régression
4. Les besoins non exprimés

Donne un feedback bienveillant mais honnête. Aide la personne à voir clair.`,

  breakupAnalysis: `Analyse cette rupture avec objectivité et compassion.

Évalue :
1. Ce qui s'est vraiment passé (faits vs émotions)
2. Les erreurs de chacun (sans jugement)
3. Les illusions émotionnelles (idéalisation, déni, fausse culpabilité)
4. Les patterns toxiques (dépendance, manipulation, communication)
5. La santé réelle de la relation (amour sain vs addiction)

Aide la personne à voir la vérité, même si elle fait mal. La clarté est le début de la guérison.`,
};

// Breathing exercises
export const BREATHING_EXERCISES = [
  "Inspire profondément pendant 4 secondes",
  "Retiens ta respiration pendant 4 secondes",
  "Expire lentement pendant 6 secondes",
  "Pause pendant 2 secondes",
  "Répète 3 fois",
];

// Alternative activities to contacting ex
export const ALTERNATIVE_ACTIVITIES = [
  "Écris dans ton journal ce que tu voulais dire (mais ne l'envoie pas)",
  "Va marcher 10 minutes dehors",
  "Appelle un ami qui te soutient",
  "Fais 20 pompes ou du sport intense",
  "Prends une douche froide",
  "Écoute une playlist qui te donne de l'énergie",
  "Écris 3 raisons pour lesquelles tu mérites mieux",
  "Regarde une vidéo qui te fait rire",
];
