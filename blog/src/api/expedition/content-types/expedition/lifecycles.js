'use strict';

// Récupère tout le texte d'un champ "blocks" (paragraphes, listes, titres…)
const texteDesBlocs = (noeuds = []) =>
  noeuds
    .map((noeud) => (noeud.type === 'text' ? noeud.text : texteDesBlocs(noeud.children)))
    .join(' ');

// Rassemble le texte lisible de toutes les étapes d'une expédition
const texteDesEtapes = (etapes = []) =>
  etapes
    .map((etape) => {
      switch (etape.__component) {
        case 'etape.recit':
          return texteDesBlocs(etape.texte);
        case 'etape.defi':
          return `${etape.titre} ${texteDesBlocs(etape.consigne)} ${etape.materiel ?? ''}`;
        case 'etape.devinette':
          return `${etape.question} ${etape.indice ?? ''} ${etape.reponse}`;
        case 'etape.mot-magique':
          return `${etape.mot} ${etape.definition} ${etape.exemple ?? ''}`;
        case 'etape.mini-quiz':
          return `${etape.question} ${(etape.choix ?? []).map((c) => c.texte).join(' ')} ${etape.explication ?? ''}`;
        default:
          return '';
      }
    })
    .join(' ');

// Mots lus par minute selon l'âge. Dès 4 ans, c'est un adulte qui lit à voix
// haute, lentement et avec des pauses ; à 7 ans l'enfant déchiffre encore.
const MOTS_PAR_MINUTE = {
  a_partir_de_4_ans: 100,
  a_partir_de_7_ans: 70,
  a_partir_de_10_ans: 130,
};

/**
 * Estime le temps de lecture d'une expédition, en minutes.
 *
 * @param {number} nombreDeMots - nombre de mots dans toutes les étapes
 * @param {string} age - "a_partir_de_4_ans" | "a_partir_de_7_ans" | "a_partir_de_10_ans"
 * @returns {number|null} minutes (au moins 1), ou null pour laisser le champ vide
 */
const estimerTempsDeLecture = (nombreDeMots, age) => {
  const vitesse = MOTS_PAR_MINUTE[age];
  if (!vitesse || nombreDeMots === 0) return null;
  return Math.max(1, Math.ceil(nombreDeMots / vitesse));
};

const calculer = (event) => {
  const { data } = event.params;
  // À la mise à jour, Strapi n'envoie que les champs modifiés : on ne recalcule
  // que si les étapes font partie de la modification.
  if (!data || !Array.isArray(data.etapes)) return;

  const nombreDeMots = texteDesEtapes(data.etapes).split(/\s+/).filter(Boolean).length;
  const minutes = estimerTempsDeLecture(nombreDeMots, data.age);
  if (minutes !== null) data.tempsDeLecture = minutes;
};

module.exports = {
  beforeCreate: calculer,
  beforeUpdate: calculer,
};
