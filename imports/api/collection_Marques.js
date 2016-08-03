//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const MarquesCollection = new Mongo.Collection('marques');

//PERMISSIONS
MarquesCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
MarqueSchema = new SimpleSchema({
  marque_nom: {
    type: String,
    label: "Nom",
  },
  marque_note: {
    type: String,
    label: "Note",
    optional: true,
  },
  marque_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  marque_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  marque_modifiedAt: {
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
MarquesCollection.attachSchema( MarqueSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
MarquesIndex = new EasySearch.Index({
  collection: MarquesCollection,
  fields: ['marque_nom', 'marque_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'marques.remove'(marqueId) {
    check(marqueId, String);
    MarquesCollection.remove(marqueId);
  },
  //INSERTION
  'marques.insert'(nom) {
    check(nom, String);
    const newID = MarquesCollection.insert({
      nom,
    });
    return newID;
  },
  //UPDATE
  'marques.update'(marqueId, updateNom) {
    check(marqueId, String);
    check(updateNom, String);
    const updateDate = new Date();
    MarquesCollection.update(marqueId, {
      $set: {
        marque_nom: updateNom,
        marque_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'marques.add-note'(marqueId, updateNote) {
    check(marqueId, String);
    check(updateNote, String);
    MarquesCollection.update(marqueId, {
      $set: {
        marque_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'marques.toggle-editMode'(marqueId, currentState) {
    check(marqueId, String);
    check(currentState, Boolean);
    MarquesCollection.update(marqueId, {
      $set: {
        marque_editMode: !currentState
      }
    });
  },
});
