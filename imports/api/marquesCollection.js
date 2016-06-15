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
  fields: ['nom'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});
