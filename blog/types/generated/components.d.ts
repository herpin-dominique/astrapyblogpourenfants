import type { Schema, Struct } from '@strapi/strapi';

export interface EtapeDefi extends Struct.ComponentSchema {
  collectionName: 'components_etape_defis';
  info: {
    description: "Une activit\u00E9 \u00E0 faire en vrai, loin de l'\u00E9cran";
    displayName: 'D\u00E9fi';
    icon: 'rocket';
  };
  attributes: {
    avecUnAdulte: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    consigne: Schema.Attribute.Blocks & Schema.Attribute.Required;
    materiel: Schema.Attribute.Text;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EtapeDevinette extends Struct.ComponentSchema {
  collectionName: 'components_etape_devinettes';
  info: {
    description: 'Une question dont la r\u00E9ponse se d\u00E9voile au clic';
    displayName: 'Devinette';
    icon: 'question';
  };
  attributes: {
    indice: Schema.Attribute.String;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
    reponse: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface EtapeIllustration extends Struct.ComponentSchema {
  collectionName: 'components_etape_illustrations';
  info: {
    description: 'Une image avec sa l\u00E9gende';
    displayName: 'Illustration';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    legende: Schema.Attribute.String;
    texteAlternatif: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EtapeMiniQuiz extends Struct.ComponentSchema {
  collectionName: 'components_etape_mini_quizzes';
  info: {
    description: 'Une question \u00E0 choix multiples';
    displayName: 'Mini-quiz';
    icon: 'puzzle';
  };
  attributes: {
    choix: Schema.Attribute.Component<'quiz.choix', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 2;
        },
        number
      >;
    explication: Schema.Attribute.Text;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EtapeMotMagique extends Struct.ComponentSchema {
  collectionName: 'components_etape_mots_magiques';
  info: {
    description: 'Un mot difficile expliqu\u00E9 simplement';
    displayName: 'Mot magique';
    icon: 'magic';
  };
  attributes: {
    definition: Schema.Attribute.Text & Schema.Attribute.Required;
    exemple: Schema.Attribute.String;
    mot: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EtapeRecit extends Struct.ComponentSchema {
  collectionName: 'components_etape_recits';
  info: {
    description: "Un passage de l'histoire";
    displayName: 'R\u00E9cit';
    icon: 'feather';
  };
  attributes: {
    texte: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface QuizChoix extends Struct.ComponentSchema {
  collectionName: 'components_quiz_choix';
  info: {
    description: 'Une r\u00E9ponse possible du quiz';
    displayName: 'Choix';
    icon: 'check';
  };
  attributes: {
    estLaBonneReponse: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    texte: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'etape.defi': EtapeDefi;
      'etape.devinette': EtapeDevinette;
      'etape.illustration': EtapeIllustration;
      'etape.mini-quiz': EtapeMiniQuiz;
      'etape.mot-magique': EtapeMotMagique;
      'etape.recit': EtapeRecit;
      'quiz.choix': QuizChoix;
    }
  }
}
