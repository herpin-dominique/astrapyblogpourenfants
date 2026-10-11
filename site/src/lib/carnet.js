// Le carnet de route de l'enfant : étoiles gagnées et tampons des mondes.
// Tout reste dans le navigateur (localStorage) : pas de compte, aucune donnée envoyée.

const CLE = 'carnet-de-route';
const VIDE = { expeditions: {} };

export const lireCarnet = () => {
  try {
    return JSON.parse(localStorage.getItem(CLE)) ?? structuredClone(VIDE);
  } catch {
    return structuredClone(VIDE);
  }
};

const ecrire = (carnet) => {
  try {
    localStorage.setItem(CLE, JSON.stringify(carnet));
  } catch {
    // Navigation privée ou stockage bloqué : le jeu marche quand même, sans mémoire
  }
  document.dispatchEvent(new CustomEvent('carnet:maj', { detail: carnet }));
};

// Étoiles du quiz selon le nombre d'essais : on récompense sans jamais punir
export const etoilesPourLeQuiz = (essais) => (essais === 1 ? 2 : 1);

// Enregistre une étape réussie. Une étape ne rapporte qu'une fois : rejouer ne
// change pas le score, il garde le premier résultat.
export const noterEtape = (slug, numero, etoiles) => {
  const carnet = lireCarnet();
  const expedition = (carnet.expeditions[slug] ??= { etapes: {} });
  if (numero in expedition.etapes) return { carnet, nouvelles: 0 };
  expedition.etapes[numero] = etoiles;
  ecrire(carnet);
  return { carnet, nouvelles: etoiles };
};

export const marquerTerminee = (slug, monde) => {
  const carnet = lireCarnet();
  const expedition = (carnet.expeditions[slug] ??= { etapes: {} });
  if (expedition.terminee) return;
  expedition.terminee = true;
  expedition.monde = monde;
  ecrire(carnet);
};

export const etoilesTotales = (carnet) =>
  Object.values(carnet.expeditions).reduce(
    (total, e) => total + Object.values(e.etapes).reduce((a, b) => a + b, 0),
    0,
  );

export const mondesTamponnes = (carnet) =>
  new Set(
    Object.values(carnet.expeditions)
      .filter((e) => e.terminee && e.monde)
      .map((e) => e.monde),
  );

export const effacerCarnet = () => ecrire(structuredClone(VIDE));
