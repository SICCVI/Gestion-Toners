//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const ImpressionsCollection = new Mongo.Collection('impressions');

//PERMISSIONS
ImpressionsCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
ImpressionSchema = new SimpleSchema({
  impression_gabarit: {
    type: String,
    label: "Gabarit",
    allowedValues: ['Imprimante', 'Photocopieur', 'Fax'],
  },
  impression_marque: {
    type: String,
    label: "Marque",
  },
  impression_modele: {
    type: String,
    label: "Modèle",
  },
  impression_nombretoner: {
    type: Number,
    label: "Nombre de toner(s)",
    min: 0,
  },
  impression_note: {
    type: String,
    label: "Note",
    optional: true,
  },
  impression_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  impression_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  impression_modifiedAt: {
    type: Date,
    label: "Dernière modification le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
});
ImpressionsCollection.attachSchema( ImpressionSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
ImpressionsIndex = new EasySearch.Index({
  collection: ImpressionsCollection,
  fields: ['impression_gabarit', 'impression_marque', 'impression_modele', 'impression_nombretoner', 'impression_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
//INDEX POUR LE MODULE D'ASSOCIATION
ModuleImpressionsIndex = new EasySearch.Index({
  collection: ImpressionsCollection,
  fields: ['impression_gabarit', 'impression_marque', 'impression_modele', 'impression_nombretoner', 'impression_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'impressions.remove'(impressionId) {
    check(impressionId, String);
    ImpressionsCollection.remove(impressionId);
  },
  //INSERTION
  'impressions.insert'(gabarit, marque, modele, nombretoner) {
    check(gabarit, String);
    check(marque, String);
    check(modele, String);
    check(nombretoner, Number);
    const newID = ImpressionsCollection.insert({
      gabarit, marque, modele, nombretoner,
    });
    return newID;
  },
  //UPDATE
  'impressions.update'(impressionId, updateGabarit, updateMarque, updateModele, updateNombretoner) {
    check(impressionId, String);
    check(updateGabarit, String);
    check(updateMarque, String);
    check(updateModele, String);
    check(updateNombretoner, Number);
    const updateDate = new Date();
    ImpressionsCollection.update(impressionId, {
      $set: {
        impression_gabarit: updateGabarit,
        impression_marque: updateMarque,
        impression_modele: updateModele,
        impression_nombretoner: updateNombretoner,
        impression_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'impressions.add-note'(impressionId, updateNote) {
    check(impressionId, String);
    check(updateNote, String);
    ImpressionsCollection.update(impressionId, {
      $set: {
        impression_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'impressions.toggle-editMode'(impressionId, currentState) {
    check(impressionId, String);
    check(currentState, Boolean);
    ImpressionsCollection.update(impressionId, {
      $set: {
        impression_editMode: !currentState
      }
    });
  },
});
