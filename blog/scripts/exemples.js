'use strict';

// Ajoute les mondes, guides et expéditions d'exemple (contenu : exemples-contenu.js).
// Usage : npm run exemples
// Seul ce qui manque est créé : une expédition déjà présente (même slug) n'est pas
// modifiée, même si vous l'avez retouchée dans l'admin.

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { MONDES, GUIDES, EXPEDITIONS } = require('./exemples-contenu');

// "Le volcan qui ronflait" -> "le-volcan-qui-ronflait"
const slug = (texte) =>
  texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Typographie française : espace insécable avant ? ! : ; » et après «
const typo = (valeur) => {
  if (typeof valeur === 'string') return valeur.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
  if (Array.isArray(valeur)) return valeur.map(typo);
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([cle, v]) => [cle, cle.startsWith('__') ? v : typo(v)]));
  }
  return valeur;
};

// Retrouve un document par un champ, ou le crée s'il n'existe pas
const trouverOuCreer = async (app, uid, champ, data, options = {}) => {
  const existant = await app.documents(uid).findFirst({ filters: { [champ]: data[champ] } });
  if (existant) return { documentId: existant.documentId, cree: false };
  const cree = await app.documents(uid).create({ data, ...options });
  return { documentId: cree.documentId, cree: true };
};

(async () => {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  try {
    const mondes = {};
    for (const monde of MONDES) {
      const r = await trouverOuCreer(app, 'api::monde.monde', 'slug', typo({ ...monde, slug: slug(monde.nom) }));
      mondes[monde.nom] = r.documentId;
      if (r.cree) console.log(`+ monde ${monde.emoji} ${monde.nom}`);
    }

    const guides = {};
    for (const guide of GUIDES) {
      const r = await trouverOuCreer(app, 'api::guide.guide', 'nom', typo(guide));
      guides[guide.nom] = r.documentId;
      if (r.cree) console.log(`+ guide ${guide.nom}`);
    }

    let ajoutees = 0;
    for (const { monde, guide, ...expedition } of EXPEDITIONS) {
      const data = typo({ ...expedition, slug: slug(expedition.titre) });
      data.monde = mondes[monde];
      data.guide = guides[guide];
      const r = await trouverOuCreer(app, 'api::expedition.expedition', 'slug', data, { status: 'published' });
      if (r.cree) {
        ajoutees += 1;
        console.log(`✔ ${expedition.titre}`);
      }
    }
    console.log(ajoutees ? `${ajoutees} expédition(s) ajoutée(s).` : 'Toutes les expéditions existent déjà.');
  } finally {
    // La fermeture de la connexion SQLite peut échouer sans conséquence
    await app.destroy().catch(() => {});
    process.exit(0);
  }
})();
