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

/**
 * Estime le temps de lecture d'une expédition, en minutes.
 *
 * @param {number} nombreDeMots - nombre de mots dans toutes les étapes
 * @param {string} age - "a_partir_de_4_ans" | "a_partir_de_7_ans" | "a_partir_de_10_ans"
 * @returns {number|null} minutes (au moins 1), ou null pour laisser le champ vide
 */
const estimerTempsDeLecture = (nombreDeMots, age) => {
  // TODO : à vous de jouer !
  return null;
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
