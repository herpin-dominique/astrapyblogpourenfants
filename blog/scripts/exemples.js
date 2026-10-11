'use strict';

// Ajoute des contenus d'exemple (2 mondes, 1 guide, 2 expéditions publiées).
// Usage : npm run exemples   — ne fait rien si les exemples existent déjà.

const { createStrapi, compileStrapi } = require('@strapi/strapi');

// "Le volcan qui ronflait" -> "le-volcan-qui-ronflait"
const slug = (texte) =>
  texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const p = (...morceaux) => ({
  type: 'paragraph',
  children: morceaux.map((m) => (typeof m === 'string' ? { type: 'text', text: m } : { type: 'text', ...m })),
});

const MONDES = [
  {
    nom: 'Planète Volcans',
    emoji: '🌋',
    couleur: '#d7263d',
    description: 'Des montagnes qui grondent, de la roche qui fond et des îles qui naissent au milieu de la mer.',
  },
  {
    nom: 'Les Abysses',
    emoji: '🐙',
    couleur: '#1f6f8b',
    description: 'Tout au fond de l’océan, là où le soleil n’arrive jamais, vivent des créatures étonnantes.',
  },
];

const GUIDE = { nom: 'Capitaine Lucie', devise: 'On regarde d’abord, on s’étonne ensuite !' };

const expeditions = (mondes, guide) => [
  {
    titre: 'Le volcan qui ronflait',
    accroche: 'Pourquoi certaines montagnes crachent-elles du feu ? Prends ton casque, on descend voir.',
    ambiance: 'intrepide',
    age: 'a_partir_de_7_ans',
    monde: mondes['Planète Volcans'],
    guide,
    etapes: [
      {
        __component: 'etape.recit',
        texte: [
          p('Au pied du volcan, le sol est tiède. On entend comme un ronflement, très loin sous nos pieds.'),
          p('Sous la terre, il fait si chaud que la roche ', { text: 'fond', bold: true }, ' comme du chocolat oublié au soleil.'),
        ],
      },
      {
        __component: 'etape.mot-magique',
        mot: 'Magma',
        definition: 'De la roche tellement chaude qu’elle est devenue liquide. Elle reste cachée sous la terre.',
        exemple: 'Quand le magma sort du volcan, on l’appelle la lave.',
      },
      {
        __component: 'etape.devinette',
        question: 'Je suis rouge et brûlante quand je sors, puis noire et dure quand je refroidis. Qui suis-je ?',
        indice: 'On vient d’apprendre mon autre nom…',
        reponse: 'La lave ! En refroidissant, elle devient de la roche.',
      },
      {
        __component: 'etape.mini-quiz',
        question: 'Que fait un volcan quand il « se réveille » ?',
        choix: [
          { texte: 'Il bâille très fort', estLaBonneReponse: false },
          { texte: 'Il entre en éruption', estLaBonneReponse: true },
          { texte: 'Il change de place', estLaBonneReponse: false },
        ],
        explication: 'Une éruption, c’est quand le magma remonte et sort par le haut du volcan.',
      },
      {
        __component: 'etape.defi',
        titre: 'Fabrique ton volcan',
        avecUnAdulte: true,
        consigne: [
          p('Construis une petite montagne en pâte à modeler autour d’un verre.'),
          p('Verse une cuillère de bicarbonate dans le verre, puis un peu de vinaigre… et recule !'),
        ],
        materiel: 'Un verre, de la pâte à modeler, du bicarbonate, du vinaigre, une goutte de colorant rouge.',
      },
    ],
  },
  {
    titre: 'Qui allume la lumière au fond de la mer ?',
    accroche: 'Tout en bas, il fait noir comme la nuit. Pourtant, quelque chose brille…',
    ambiance: 'mystere',
    age: 'a_partir_de_4_ans',
    monde: mondes['Les Abysses'],
    guide,
    etapes: [
      {
        __component: 'etape.recit',
        texte: [
          p('Plus on descend dans la mer, plus il fait sombre. Au bout d’un moment, il fait tout noir.'),
          p('Mais regarde ! Là, une petite lumière bleue clignote. Puis une autre. Ce sont des poissons !'),
        ],
      },
      {
        __component: 'etape.mot-magique',
        mot: 'Bioluminescence',
        definition: 'Quand un animal fabrique sa propre lumière, comme une lampe qu’il aurait dans le corps.',
        exemple: 'Les lucioles aussi utilisent la bioluminescence.',
      },
      {
        __component: 'etape.mini-quiz',
        question: 'Pourquoi le fond de la mer est-il tout noir ?',
        choix: [
          { texte: 'Parce que la lumière du soleil n’arrive pas jusque-là', estLaBonneReponse: true },
          { texte: 'Parce que les poissons dorment', estLaBonneReponse: false },
        ],
        explication: 'L’eau arrête peu à peu la lumière du soleil. Tout au fond, il n’en reste plus du tout.',
      },
      {
        __component: 'etape.defi',
        titre: 'Les abysses sous la couette',
        avecUnAdulte: false,
        consigne: [p('Cache-toi sous ta couette avec une lampe de poche. Allume-la, éteins-la : tu es un poisson lumineux !')],
        materiel: 'Une couette et une lampe de poche.',
      },
    ],
  },
];

(async () => {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  try {
    const dejaLa = await app.documents('api::monde.monde').findFirst({ filters: { nom: MONDES[0].nom } });
    if (dejaLa) {
      console.log('Les exemples existent déjà, rien à faire.');
      return;
    }

    const mondes = {};
    for (const monde of MONDES) {
      mondes[monde.nom] = (await app.documents('api::monde.monde').create({ data: { ...monde, slug: slug(monde.nom) } })).documentId;
    }
    const guide = (await app.documents('api::guide.guide').create({ data: GUIDE })).documentId;

    for (const data of expeditions(mondes, guide)) {
      await app.documents('api::expedition.expedition').create({ data: { ...data, slug: slug(data.titre) }, status: 'published' });
      console.log(`✔ ${data.titre}`);
    }
  } finally {
    // La fermeture de la connexion SQLite peut échouer sans conséquence
    await app.destroy().catch(() => {});
    process.exit(0);
  }
})();
