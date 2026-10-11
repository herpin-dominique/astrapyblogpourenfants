'use strict';

// Le contenu des expéditions d'exemple, chargé par scripts/exemples.js.
// Les mondes et guides sont désignés par leur nom.

// Paragraphe de texte riche. Un morceau peut être une chaîne ou { text, bold }.
const p = (...morceaux) => ({
  type: 'paragraph',
  children: morceaux.map((m) => (typeof m === 'string' ? { type: 'text', text: m } : { type: 'text', ...m })),
});

const recit = (...paragraphes) => ({ __component: 'etape.recit', texte: paragraphes });
const motMagique = (mot, definition, exemple) => ({ __component: 'etape.mot-magique', mot, definition, exemple });
const devinette = (question, reponse, indice) => ({ __component: 'etape.devinette', question, reponse, indice });
const quiz = (question, bonne, mauvaises, explication) => ({
  __component: 'etape.mini-quiz',
  question,
  // La bonne réponse n'est pas toujours la première : on la glisse au milieu
  choix: [...mauvaises.slice(0, 1), bonne, ...mauvaises.slice(1)].map((texte) => ({
    texte,
    estLaBonneReponse: texte === bonne,
  })),
  explication,
});
const defi = (titre, consigne, materiel, avecUnAdulte = false) => ({
  __component: 'etape.defi',
  titre,
  consigne: consigne.map((c) => p(c)),
  materiel,
  avecUnAdulte,
});

const MONDES = [
  {
    nom: 'Planète Volcans',
    emoji: '🌋',
    couleur: '#d7263d',
    description: 'Des montagnes qui grondent, de la roche qui fond et un sol qui bouge sous nos pieds.',
  },
  {
    nom: 'Les Abysses',
    emoji: '🐙',
    couleur: '#1f6f8b',
    description: 'Tout au fond de l’océan, là où le soleil n’arrive jamais, vivent des créatures étonnantes.',
  },
  {
    nom: 'Ciel de nuit',
    emoji: '🌙',
    couleur: '#3a3f9e',
    description: 'La Lune, les étoiles et tout ce qui brille au-dessus de nos têtes quand on éteint la lumière.',
  },
  {
    nom: 'Sous nos pieds',
    emoji: '🍄',
    couleur: '#5f7f1f',
    description: 'Graines, fourmis, champignons : un monde entier vit dans l’herbe et sous la terre.',
  },
  {
    nom: 'Dedans moi',
    emoji: '🫀',
    couleur: '#c2410c',
    description: 'Ton corps fait des milliers de choses sans que tu y penses. On va voir comment.',
  },
  {
    nom: 'Bout du monde',
    emoji: '❄️',
    couleur: '#2b8fc7',
    description: 'Les pôles, là où il fait si froid que la mer gèle. Et pourtant, la vie s’y accroche.',
  },
  {
    nom: 'Le Temps d’avant',
    emoji: '🦕',
    couleur: '#a16207',
    description: 'Bien avant les humains, la Terre appartenait à d’autres géants. Les fossiles racontent leur histoire.',
  },
];

const GUIDES = [
  { nom: 'Capitaine Lucie', devise: 'On regarde d’abord, on s’étonne ensuite !' },
  { nom: 'Noé le hibou', devise: 'La nuit, on voit mieux… quand on sait où regarder.' },
  { nom: 'Rosalie la taupe', devise: 'Je ne vois pas grand-chose, alors je cherche partout !' },
];

const EXPEDITIONS = [
  // ——— Les deux premières expéditions ———
  {
    titre: 'Le volcan qui ronflait',
    accroche: 'Pourquoi certaines montagnes crachent-elles du feu ? Prends ton casque, on descend voir.',
    ambiance: 'intrepide',
    age: 'a_partir_de_7_ans',
    monde: 'Planète Volcans',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('Au pied du volcan, le sol est tiède. On entend comme un ronflement, très loin sous nos pieds.'),
        p('Sous la terre, il fait si chaud que la roche ', { text: 'fond', bold: true }, ' comme du chocolat oublié au soleil.'),
      ),
      motMagique(
        'Magma',
        'De la roche tellement chaude qu’elle est devenue liquide. Elle reste cachée sous la terre.',
        'Quand le magma sort du volcan, on l’appelle la lave.',
      ),
      devinette(
        'Je suis rouge et brûlante quand je sors, puis noire et dure quand je refroidis. Qui suis-je ?',
        'La lave ! En refroidissant, elle devient de la roche.',
        'On vient d’apprendre mon autre nom…',
      ),
      quiz(
        'Que fait un volcan quand il « se réveille » ?',
        'Il entre en éruption',
        ['Il bâille très fort', 'Il change de place'],
        'Une éruption, c’est quand le magma remonte et sort par le haut du volcan.',
      ),
      defi(
        'Fabrique ton volcan',
        [
          'Construis une petite montagne en pâte à modeler autour d’un verre.',
          'Verse une cuillère de bicarbonate dans le verre, puis un peu de vinaigre… et recule !',
        ],
        'Un verre, de la pâte à modeler, du bicarbonate, du vinaigre, une goutte de colorant rouge.',
        true,
      ),
    ],
  },
  {
    titre: 'Qui allume la lumière au fond de la mer ?',
    accroche: 'Tout en bas, il fait noir comme la nuit. Pourtant, quelque chose brille…',
    ambiance: 'mystere',
    age: 'a_partir_de_4_ans',
    monde: 'Les Abysses',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('Plus on descend dans la mer, plus il fait sombre. Au bout d’un moment, il fait tout noir.'),
        p('Mais regarde ! Là, une petite lumière bleue clignote. Puis une autre. Ce sont des poissons !'),
      ),
      motMagique(
        'Bioluminescence',
        'Quand un animal fabrique sa propre lumière, comme une lampe qu’il aurait dans le corps.',
        'Les lucioles aussi utilisent la bioluminescence.',
      ),
      quiz(
        'Pourquoi le fond de la mer est-il tout noir ?',
        'Parce que la lumière du soleil n’arrive pas jusque-là',
        ['Parce que les poissons dorment'],
        'L’eau arrête peu à peu la lumière du soleil. Tout au fond, il n’en reste plus du tout.',
      ),
      defi(
        'Les abysses sous la couette',
        ['Cache-toi sous ta couette avec une lampe de poche. Allume-la, éteins-la : tu es un poisson lumineux !'],
        'Une couette et une lampe de poche.',
      ),
    ],
  },

  // ——— 1. Dès 4 ans, calme ———
  {
    titre: 'Où vont les étoiles pendant la journée ?',
    accroche: 'Elles ne partent jamais… alors pourquoi on ne les voit pas ?',
    ambiance: 'calme',
    age: 'a_partir_de_4_ans',
    monde: 'Ciel de nuit',
    guide: 'Noé le hibou',
    etapes: [
      recit(
        p('Le soir, quand il fait noir, le ciel se remplit de petits points qui brillent. Ce sont les étoiles.'),
        p('Le matin, le soleil se lève… et hop ! Plus une seule étoile. Où sont-elles parties ?'),
      ),
      motMagique(
        'Étoile',
        'Un soleil, comme le nôtre, mais tellement loin qu’on ne voit qu’un tout petit point.',
        'Notre Soleil est l’étoile la plus proche de nous.',
      ),
      devinette(
        'Les étoiles sont toujours là, même le jour. Mais quelqu’un les cache avec sa grosse lumière. Qui ?',
        'Le Soleil ! Il éclaire tellement le ciel qu’on ne voit plus les étoiles, qui brillent beaucoup moins fort.',
        'Il se lève le matin…',
      ),
      quiz(
        'Quand est-ce qu’on voit le mieux les étoiles ?',
        'La nuit, loin des lumières de la ville',
        ['À midi, en plein soleil', 'Quand il pleut'],
        'Plus il fait noir autour de toi, plus tu vois d’étoiles. À la campagne, on peut en voir des milliers !',
      ),
      defi(
        'La lampe qui disparaît',
        [
          'Dans une pièce bien éclairée, allume une lampe de poche. On la voit à peine !',
          'Maintenant, éteins la lumière de la pièce. Ta lampe brille fort, comme une étoile la nuit.',
        ],
        'Une lampe de poche et une pièce où l’on peut éteindre la lumière.',
      ),
    ],
  },

  // ——— 2. Dès 4 ans, calme ———
  {
    titre: 'La graine qui voulait voyager',
    accroche: 'Une graine n’a pas de jambes. Pourtant, elle part très loin de sa maman plante.',
    ambiance: 'calme',
    age: 'a_partir_de_4_ans',
    monde: 'Sous nos pieds',
    guide: 'Rosalie la taupe',
    etapes: [
      recit(
        p('Une plante ne peut pas marcher. Mais ses graines, elles, ont envie de voir du pays.'),
        p('Si elles tombaient toutes au même endroit, il n’y aurait pas de place pour tout le monde. Alors elles voyagent !'),
      ),
      motMagique(
        'Graine',
        'Un petit paquet qui contient un bébé plante et un peu de nourriture pour l’aider à pousser.',
        'Un haricot, une pépite de pomme, un noyau de cerise : ce sont des graines.',
      ),
      quiz(
        'Comment voyage la graine du pissenlit ?',
        'Elle s’envole avec le vent',
        ['Elle roule par terre', 'Elle nage dans la rivière'],
        'Ses graines ont des petits parachutes tout doux. Un souffle de vent, et elles partent très loin !',
      ),
      devinette(
        'Je m’accroche aux poils des chiens et aux chaussettes, et je voyage sans payer mon billet. Qui suis-je ?',
        'Une graine de bardane ! Elle a des petits crochets. Un inventeur s’en est même inspiré pour créer le velcro.',
        'Tu m’as peut-être déjà retrouvée sur ton pantalon après une promenade…',
      ),
      defi(
        'Fais germer une lentille',
        [
          'Pose un peu de coton mouillé dans une soucoupe et dépose quelques lentilles dessus.',
          'Garde le coton humide. Dans deux ou trois jours, regarde bien : une petite tige va sortir !',
        ],
        'Du coton, une soucoupe, des lentilles, un peu d’eau.',
      ),
    ],
  },

  // ——— 3. Dès 7 ans, rêveur ———
  {
    titre: 'Pourquoi la Lune change de forme ?',
    accroche: 'Ronde, puis coupée en deux, puis presque disparue. Est-ce qu’elle rétrécit ?',
    ambiance: 'reveur',
    age: 'a_partir_de_7_ans',
    monde: 'Ciel de nuit',
    guide: 'Noé le hibou',
    etapes: [
      recit(
        p('Certains soirs, la Lune est toute ronde. D’autres soirs, ce n’est qu’un fin croissant. Et parfois, on ne la voit pas du tout.'),
        p('Pourtant, la Lune ne change pas. C’est toujours la même grosse boule de roche. Alors, que se passe-t-il ?'),
      ),
      devinette(
        'La Lune brille la nuit, mais elle ne fabrique aucune lumière. D’où vient sa lumière ?',
        'Du Soleil ! La Lune est comme un miroir : elle renvoie la lumière du Soleil vers nous.',
        'C’est la plus grosse lampe du ciel…',
      ),
      motMagique(
        'Phase',
        'Chacune des formes que prend la Lune : nouvelle lune, croissant, quartier, pleine lune…',
        'Ce soir, la Lune est dans sa phase de pleine lune.',
      ),
      recit(
        p('Le Soleil éclaire toujours une moitié de la Lune. Mais la Lune tourne autour de la Terre.'),
        p('Selon l’endroit où elle se trouve, on voit ', { text: 'toute', bold: true }, ' sa moitié éclairée, ', { text: 'un morceau', bold: true }, ', ou ', { text: 'rien du tout', bold: true }, '.'),
      ),
      quiz(
        'Combien de temps faut-il pour voir toutes les phases de la Lune ?',
        'Environ un mois',
        ['Une nuit', 'Une année'],
        'Il faut à peu près 29 jours et demi. C’est d’ailleurs de là que vient l’idée du mois !',
      ),
      defi(
        'Fais tourner la Lune',
        [
          'Dans une pièce noire, pose une lampe allumée sur une table : c’est le Soleil.',
          'Tiens une balle à bout de bras devant toi : c’est la Lune. Ta tête, c’est la Terre.',
          'Tourne doucement sur toi-même en regardant la balle. Tu vas voir apparaître le croissant, la demi-lune et la pleine lune !',
        ],
        'Une lampe sans abat-jour, une balle claire (ou une orange), une pièce sombre.',
      ),
    ],
  },

  // ——— 4. Dès 7 ans, rigolo ———
  {
    titre: 'Hic ! Le mystère du hoquet',
    accroche: 'Il arrive sans prévenir et repart quand il veut. Qui le déclenche ?',
    ambiance: 'rigolo',
    age: 'a_partir_de_7_ans',
    monde: 'Dedans moi',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('Tu manges ton goûter un peu trop vite et soudain… ', { text: 'HIC !', bold: true }, ' Et encore : ', { text: 'HIC !', bold: true }),
        p('Ce n’est pas toi qui le décides. Quelque chose, à l’intérieur de toi, fait des siennes.'),
      ),
      motMagique(
        'Diaphragme',
        'Un grand muscle en forme de dôme, caché sous tes poumons. C’est lui qui te fait respirer.',
        'Quand tu inspires, ton diaphragme descend et l’air entre dans tes poumons.',
      ),
      quiz(
        'Où se cache ton diaphragme ?',
        'Sous les poumons, au-dessus du ventre',
        ['Dans la tête', 'Dans les pieds'],
        'Il sépare ta poitrine de ton ventre, comme un plancher élastique.',
      ),
      recit(
        p('Le hoquet, c’est ton diaphragme qui se contracte d’un coup, sans prévenir. L’air entre très vite…'),
        p('…et une petite porte au fond de ta gorge se ferme brusquement. C’est elle qui fait le bruit « hic » !'),
      ),
      devinette(
        'Je suis plein de bulles et je pique la langue. Quand on me boit trop vite, je peux donner le hoquet. Qui suis-je ?',
        'Une boisson gazeuse ! Les bulles gonflent l’estomac, qui peut chatouiller le diaphragme.',
      ),
      defi(
        'Sens ton diaphragme travailler',
        [
          'Allonge-toi sur le dos et pose une main sur ton ventre.',
          'Respire lentement par le nez. Sens-tu ton ventre monter ? C’est ton diaphragme qui descend !',
        ],
        'Juste toi et un endroit pour t’allonger.',
      ),
    ],
  },

  // ——— 5. Dès 7 ans, rigolo ———
  {
    titre: 'Les fourmis ne se perdent jamais',
    accroche: 'Pas de carte, pas de GPS… et pourtant elles rentrent toujours à la maison.',
    ambiance: 'rigolo',
    age: 'a_partir_de_7_ans',
    monde: 'Sous nos pieds',
    guide: 'Rosalie la taupe',
    etapes: [
      recit(
        p('As-tu déjà vu une longue file de fourmis ? Elles marchent les unes derrière les autres, comme sur une route invisible.'),
        p('Comment savent-elles où aller ? Elles n’ont pas de panneaux, et beaucoup voient très mal !'),
      ),
      motMagique(
        'Phéromone',
        'Un message qui se sent au lieu de s’entendre. Les fourmis en déposent sur le sol pour se parler.',
        'Cette piste de phéromones veut dire : « Par ici, il y a à manger ! »',
      ),
      devinette(
        'Une fourmi trouve une miette. En rentrant, elle laisse derrière elle quelque chose d’invisible que ses sœurs vont suivre. Quoi ?',
        'Une piste d’odeur ! Les autres fourmis la sentent et la suivent jusqu’à la miette.',
        'On vient d’apprendre le mot magique…',
      ),
      quiz(
        'Avec quoi les fourmis sentent-elles les odeurs ?',
        'Avec leurs antennes',
        ['Avec leur nez', 'Avec leurs pattes'],
        'Les fourmis n’ont pas de nez. Leurs antennes servent à sentir, à toucher et même à goûter !',
      ),
      recit(
        p('Plus il y a de fourmis sur la piste, plus l’odeur est forte. Et plus l’odeur est forte, plus d’autres fourmis arrivent !'),
        p('Quand la miette est finie, plus personne ne remet d’odeur. La piste s’efface toute seule.'),
      ),
      defi(
        'Observe une piste de fourmis',
        [
          'Dehors, cherche une file de fourmis. Pose une petite miette de gâteau à côté, sans les écraser.',
          'Attends et regarde : combien de temps faut-il pour que d’autres fourmis arrivent ?',
        ],
        'Une miette de gâteau et un peu de patience.',
      ),
    ],
  },

  // ——— 6. Dès 7 ans, mystère ———
  {
    titre: 'Le poisson qui pêche avec une lampe',
    accroche: 'Tout au fond, une petite lumière se balance dans le noir. Attention, c’est un piège !',
    ambiance: 'mystere',
    age: 'a_partir_de_7_ans',
    monde: 'Les Abysses',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('À des milliers de mètres sous la mer, il fait noir et froid. Il y a très peu à manger.'),
        p('Soudain, une petite lumière apparaît. Elle danse doucement. Un petit poisson curieux s’approche… ', { text: 'CLAC !', bold: true }),
      ),
      motMagique(
        'Leurre',
        'Un faux appât qui sert à tromper une proie pour l’attirer.',
        'Les pêcheurs utilisent des leurres qui ressemblent à de petits poissons.',
      ),
      recit(
        p('Ce chasseur malin s’appelle la ', { text: 'baudroie abyssale', bold: true }, '.'),
        p('Sur sa tête pousse une longue tige, avec au bout une petite boule qui brille. C’est sa canne à pêche !'),
      ),
      quiz(
        'D’où vient la lumière de la baudroie ?',
        'De minuscules bactéries qui vivent dans sa boule',
        ['D’une pile cachée', 'Du reflet de la lune'],
        'Des bactéries lumineuses habitent dans le leurre. Elles ont un abri et de la nourriture ; la baudroie a sa lampe.',
      ),
      devinette(
        'J’ai une très grande bouche et des dents pointues tournées vers l’intérieur. Pourquoi ?',
        'Pour avaler des proies parfois aussi grosses qu’elle… et les empêcher de ressortir !',
      ),
      defi(
        'Ta canne à pêche lumineuse',
        [
          'Attache une petite lampe (ou une lampe frontale) au bout d’un bâton ou d’une règle.',
          'Dans le noir, fais-la danser doucement. Un membre de ta famille joue le petit poisson curieux : réussiras-tu à l’attirer ?',
        ],
        'Une petite lampe, un bâton ou une règle, du ruban adhésif.',
      ),
    ],
  },

  // ——— 7. Dès 7 ans, intrépide ———
  {
    titre: 'Pourquoi les manchots n’ont pas froid aux pieds ?',
    accroche: 'Ils marchent sur la glace toute la journée, pieds nus !',
    ambiance: 'intrepide',
    age: 'a_partir_de_7_ans',
    monde: 'Bout du monde',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('En Antarctique, il peut faire moins 40 degrés. Le vent souffle si fort qu’on a du mal à rester debout.'),
        p('Et au milieu de tout ça, des milliers de manchots empereurs passent l’hiver… sans bonnet ni chaussettes.'),
      ),
      motMagique(
        'Plumage',
        'L’ensemble des plumes d’un oiseau. Celui du manchot est si serré qu’il forme un manteau imperméable.',
        'Sous son plumage, le manchot a aussi une épaisse couche de graisse.',
      ),
      quiz(
        'Que font les manchots empereurs quand la tempête arrive ?',
        'Ils se serrent tous ensemble',
        ['Ils creusent un terrier', 'Ils s’envolent vers le sud'],
        'Collés les uns aux autres, ils se tiennent chaud. Chacun passe à son tour au milieu, puis repart au bord.',
      ),
      devinette(
        'Dans les pattes du manchot, le sang chaud qui descend vers les pieds croise le sang froid qui remonte. Que se passe-t-il ?',
        'Le sang chaud réchauffe le sang froid au passage ! Les pieds restent juste assez chauds pour ne pas geler, et le corps ne perd presque pas de chaleur.',
        'Imagine deux tuyaux collés : un chaud qui descend, un froid qui monte…',
      ),
      defi(
        'Le gant de graisse',
        [
          'Remplis un saladier d’eau et de glaçons.',
          'Mets un sachet rempli de margarine sur ta main (dans un autre sachet, pour ne pas te salir). Plonge les deux mains dans l’eau glacée.',
          'Quelle main a froid la première ? La graisse te protège, comme le manchot !',
        ],
        'Un saladier, des glaçons, deux sachets congélation, de la margarine.',
        true,
      ),
    ],
  },

  // ——— 8. Dès 10 ans, mystère ———
  {
    titre: 'Le réseau secret sous la forêt',
    accroche: 'Sous nos pieds, des kilomètres de fils invisibles relient les arbres entre eux.',
    ambiance: 'mystere',
    age: 'a_partir_de_10_ans',
    monde: 'Sous nos pieds',
    guide: 'Rosalie la taupe',
    etapes: [
      recit(
        p('Quand tu vois un champignon dans la forêt, tu n’en vois qu’un tout petit bout. Le vrai champignon est caché sous terre.'),
        p('Il forme un immense filet de fils plus fins que des cheveux, qui s’étend parfois sur des centaines de mètres.'),
      ),
      motMagique(
        'Mycélium',
        'Le réseau de filaments souterrains qui forme le corps d’un champignon. Ce qu’on cueille n’est que son « fruit ».',
        'Une seule poignée de terre de forêt peut contenir des kilomètres de mycélium.',
      ),
      recit(
        p('Ces fils s’enroulent autour des racines des arbres et passent même à l’intérieur. Les deux font un échange :'),
        p('l’arbre donne du ', { text: 'sucre', bold: true }, ' qu’il fabrique avec la lumière, et le champignon lui apporte de l’', { text: 'eau', bold: true }, ' et des ', { text: 'minéraux', bold: true }, ' qu’il va chercher loin dans le sol.'),
      ),
      quiz(
        'Comment appelle-t-on une association où chacun aide l’autre ?',
        'Une symbiose',
        ['Une compétition', 'Une hibernation'],
        'L’arbre et le champignon vivent en symbiose : chacun profite de l’autre.',
      ),
      devinette(
        'Certains scientifiques pensent que les arbres s’envoient des messages par ce réseau. D’autres ne sont pas d’accord. Que font les scientifiques quand ils ne savent pas encore ?',
        'Ils font des expériences pour vérifier ! C’est une vraie question de recherche, encore étudiée aujourd’hui.',
      ),
      defi(
        'Chasse aux champignons (sans les toucher)',
        [
          'Lors d’une promenade en forêt avec un adulte, cherche des champignons au pied des arbres.',
          'Note ou dessine ceux que tu trouves : leur couleur, leur forme, l’arbre à côté. Ne les touche pas et ne les goûte jamais : certains sont très dangereux.',
        ],
        'Un carnet, un crayon et des yeux grand ouverts.',
        true,
      ),
    ],
  },

  // ——— 9. Dès 10 ans, mystère ———
  {
    titre: 'De quelle couleur étaient les dinosaures ?',
    accroche: 'Personne ne les a jamais vus vivants. Pourtant, on connaît la couleur de certains !',
    ambiance: 'mystere',
    age: 'a_partir_de_10_ans',
    monde: 'Le Temps d’avant',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('Les dinosaures ont disparu il y a 66 millions d’années. Il ne reste d’eux que des os, des empreintes… et des fossiles.'),
        p('Pendant longtemps, les dessinateurs ont choisi leurs couleurs au hasard : vert, gris, marron. Mais depuis quelques années, tout a changé.'),
      ),
      motMagique(
        'Fossile',
        'Une trace d’un être vivant très ancien, conservée dans la roche : un os, une coquille, une empreinte, une plume…',
        'Ce fossile de feuille a plus de 300 millions d’années.',
      ),
      recit(
        p('Certains dinosaures avaient des ', { text: 'plumes', bold: true }, '. Et dans des plumes fossilisées, des scientifiques ont trouvé de minuscules grains, des milliers de fois plus petits qu’une fourmi.'),
        p('Ces grains donnaient leur couleur aux plumes. Selon leur forme, on peut deviner si la plume était noire, rousse ou même brillante comme celle d’un corbeau.'),
      ),
      quiz(
        'Quel outil faut-il pour voir ces minuscules grains de couleur ?',
        'Un microscope très puissant',
        ['Une loupe', 'Des jumelles'],
        'Ils sont si petits qu’il faut un microscope électronique, qui grossit des dizaines de milliers de fois.',
      ),
      devinette(
        'Le Sinosauropteryx, un petit dinosaure à plumes, avait une queue qui ressemblait à celle d’un raton laveur. À ton avis, comment était-elle ?',
        'Rayée ! Des anneaux roux et clairs, en alternance. C’est l’un des premiers dinosaures dont on a retrouvé les vraies couleurs.',
        'Pense aux bandes sur la queue du raton laveur…',
      ),
      defi(
        'Fabrique ton fossile',
        [
          'Prépare une pâte à sel : deux verres de farine, un verre de sel, un verre d’eau tiède. Mélange bien.',
          'Aplatis une boule de pâte et appuie fort un coquillage ou une feuille dedans. Retire-le doucement.',
          'Laisse sécher deux jours : tu as ton empreinte fossile !',
        ],
        'De la farine, du sel, de l’eau, un coquillage ou une feuille.',
      ),
    ],
  },

  // ——— 10. Dès 10 ans, intrépide ———
  {
    titre: 'Quand la Terre tremble',
    accroche: 'Le sol a l’air solide. En vrai, il bouge tout le temps, mais très lentement.',
    ambiance: 'intrepide',
    age: 'a_partir_de_10_ans',
    monde: 'Planète Volcans',
    guide: 'Capitaine Lucie',
    etapes: [
      recit(
        p('La surface de la Terre ressemble à une coquille d’œuf craquelée. Elle est découpée en une quinzaine de grandes pièces.'),
        p('Ces pièces flottent sur une roche très chaude et très lente, et elles se déplacent sans arrêt.'),
      ),
      motMagique(
        'Plaque tectonique',
        'Une des grandes pièces qui forment la surface de la Terre. Les continents et les océans sont posés dessus.',
        'La France est posée sur la plaque eurasienne.',
      ),
      quiz(
        'À quelle vitesse bougent les plaques tectoniques ?',
        'À peu près à la vitesse où poussent tes ongles',
        ['Aussi vite qu’une voiture', 'Elles ne bougent pas du tout'],
        'Quelques centimètres par an seulement. Mais en des millions d’années, cela suffit à déplacer des continents entiers !',
      ),
      recit(
        p('Parfois, deux plaques frottent l’une contre l’autre et se ', { text: 'coincent', bold: true }, '. Elles continuent de pousser, la tension monte, monte…'),
        p('…jusqu’à ce que tout glisse d’un coup. Le sol se met à trembler : c’est un ', { text: 'séisme', bold: true }, '.'),
      ),
      devinette(
        'La terre tremble et tu es dans une maison. Où vas-tu te mettre à l’abri ?',
        'Sous une table solide, en te protégeant la tête, loin des fenêtres. Quand ça s’arrête, tu sors calmement avec un adulte.',
        'Il faut quelque chose de solide au-dessus de ta tête…',
      ),
      defi(
        'Le séisme en éponge',
        [
          'Prends deux éponges et colle-les par leur côté qui gratte.',
          'Appuie-les fort l’une contre l’autre et pousse-les doucement dans deux directions opposées.',
          'Sens-tu qu’elles résistent… puis sautent d’un coup ? C’est exactement ce qui se passe pendant un séisme !',
        ],
        'Deux éponges avec un côté qui gratte.',
      ),
    ],
  },
];

module.exports = { MONDES, GUIDES, EXPEDITIONS };
