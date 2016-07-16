import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Marques = new Mongo.Collection('marques');

Marques.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

MarqueSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
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

Marques.attachSchema( MarqueSchema );

Meteor.methods({
  'marques.remove'(marqueId) {
    check(marqueId, String);
    Marques.remove(marqueId);
  },
  'marques.insert'(nom) {
    check(nom, String);
    Marques.insert({
      nom,
    });
  },
  'marques.add'(nom) {
    check(nom, String);
    Marques.insert({
      nom,
    });
  },
  'marques.update'(marqueId, updateNom) {
    check(marqueId, String);
    check(updateNom, String);
    Marques.update(marqueId, {
    $set: {
      nom: updateNom,
    }});
  },
  'marques.note'(marqueId, updateNote) {
    check(marqueId, String);
    check(updateNote, String);
    Marques.update(marqueId, {
    $set: {
      note: updateNote,
    }});
  },
  'toggleEditMarque'(marqueId, currentState) {
    check(marqueId, String);
    check(currentState, Boolean);
    Marques.update(marqueId, {
      $set: {
        editMode: !currentState
      }});
  },
});

MarquesIndex = new EasySearch.Index({
  collection: Marques,
  fields: ['nom', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
