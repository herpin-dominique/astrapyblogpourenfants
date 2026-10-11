// Connexion à l'API de Strapi (le projet blog/)
// 127.0.0.1 plutôt que localhost : Node essaie d'abord l'IPv6 (::1), où Strapi n'écoute pas
export const STRAPI_URL = import.meta.env.STRAPI_URL ?? 'http://127.0.0.1:1337';

// Les champs à inclure dans la réponse. Par défaut Strapi ne renvoie ni les
// images, ni les relations, ni les étapes : il faut les demander explicitement.
const POPULATE_EXPEDITION = {
  'populate[couverture]': 'true',
  'populate[narration]': 'true',
  'populate[monde]': 'true',
  'populate[guide][populate][avatar]': 'true',
  'populate[etapes][on][etape.recit]': 'true',
  'populate[etapes][on][etape.devinette]': 'true',
  'populate[etapes][on][etape.mot-magique]': 'true',
  'populate[etapes][on][etape.defi]': 'true',
  'populate[etapes][on][etape.mini-quiz][populate][choix]': 'true',
  'populate[etapes][on][etape.illustration][populate][image]': 'true',
};

async function demander(chemin, parametres = {}) {
  const url = new URL(`/api/${chemin}`, STRAPI_URL);
  for (const [cle, valeur] of Object.entries(parametres)) url.searchParams.set(cle, valeur);

  let reponse;
  try {
    reponse = await fetch(url);
  } catch {
    throw new Error(`Strapi ne répond pas sur ${STRAPI_URL}. Lancez « npm run develop » dans le dossier blog.`);
  }
  if (!reponse.ok) {
    throw new Error(`Strapi a répondu ${reponse.status} pour /api/${chemin}. Vérifiez les permissions du rôle Public.`);
  }
  return (await reponse.json()).data;
}

export const listerExpeditions = (filtres = {}) =>
  demander('expeditions', {
    'populate[couverture]': 'true',
    'populate[monde]': 'true',
    'sort[0]': 'publishedAt:desc',
    ...filtres,
  });

export const trouverExpedition = async (slug) =>
  (await demander('expeditions', { ...POPULATE_EXPEDITION, 'filters[slug][$eq]': slug }))[0] ?? null;

export const listerMondes = () => demander('mondes', { 'sort[0]': 'nom:asc' });

export const trouverMonde = async (slug) =>
  (await demander('mondes', { 'filters[slug][$eq]': slug }))[0] ?? null;

// Strapi renvoie des chemins comme "/uploads/volcan.jpg" : on ajoute l'adresse du serveur
export const urlMedia = (media) => {
  if (!media?.url) return null;
  return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
};

export const AGES = {
  a_partir_de_4_ans: 'Dès 4 ans',
  a_partir_de_7_ans: 'Dès 7 ans',
  a_partir_de_10_ans: 'Dès 10 ans',
};

export const AMBIANCES = {
  calme: 'Calme',
  rigolo: 'Rigolo',
  mystere: 'Mystère',
  intrepide: 'Intrépide',
  reveur: 'Rêveur',
};
