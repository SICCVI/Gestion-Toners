import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Impressions = new Mongo.Collection('impressions');

Impressions.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});


ImpressionSchema = new SimpleSchema({
  gabarit: {
    type: String,
    label: "Gabarit",
    allowedValues: ['Imprimante', 'Photocopieur', 'Fax'],
  },
  marque: {
    type: String,
    label: "Marque",
  },
	modele: {
		type: String,
		label: "Modèle",
	},
  nombretoner: {
    type: Number,
    label: "Nombre de toner(s)",
    min: 0,
  },
  note: {
    type: String,
    label: "Note",
    optional: true,
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Impressions.attachSchema( ImpressionSchema );

Meteor.methods({
  'impressions.remove'(impressionId) {
    check(impressionId, String);
    Impressions.remove(impressionId);
  },
  'impressions.insert'(gabarit, marque, modele, nombretoner) {
    check(gabarit, String);
    check(marque, String);
    check(modele, String);
    check(nombretoner, Number);
    Impressions.insert({
      gabarit, marque, modele, nombretoner,
    });
  },
  'impressions.alt-insert'(gabarit, marque, modele, nombretoner) {
    check(gabarit, String);
    check(marque, String);
    check(modele, String);
    check(nombretoner, Number);
    const newElement = Impressions.insert({
      gabarit, marque, modele, nombretoner,
    });
    return newElement;
  },
  'impressions.update'(impressionId, updateGabarit, updateMarque, updateModele, updateNombretoner) {
    check(impressionId, String);
    check(updateGabarit, String);
    check(updateMarque, String);
    check(updateModele, String);
    check(updateNombretoner, Number);
    Impressions.update(impressionId, {
    $set: {
      gabarit: updateGabarit,
      marque: updateMarque,
      modele: updateModele,
      nombretoner: updateNombretoner
    }});
  },
    'impressions.note'(impressionId, updateNote) {
    check(impressionId, String);
    check(updateNote, String);
    Impressions.update(impressionId, {
    $set: {
      note: updateNote,
    }});
  },
  'toggleEditImpression'(impressionId, currentState) {
    check(impressionId, String);
    check(currentState, Boolean);
    Impressions.update(impressionId, {
      $set: {
        editMode: !currentState
      }});
  },
/*  'impressions.addtoner'(impressionId, tonerId) {
    check(tonerId, String);
    Impressions.update(impressionId, {
      $addToSet: {
        toner : {
          tonerid: tonerId
        }
      }
    });
  },
  'impressions.removetoner'(impressionId, tonerId) {
    check(tonerId, String);
    Impressions.update(impressionId, {
      $pull: {
        toner : {
          tonerid: tonerId
        }
      }
    });
  },*/
});

ImpressionsIndex = new EasySearch.Index({
  collection: Impressions,
  fields: ['gabarit', 'marque', 'modele', 'nombretoner', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 100}
});

ModuleImpressionsIndex = new EasySearch.Index({
  collection: Impressions,
  fields: ['gabarit', 'marque', 'modele', 'nombretoner', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});